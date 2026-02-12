import { NextResponse } from 'next/server';
import { githubClient } from '@/lib/github';
import { cacheService } from '@/services/cache';
import {
    calculateCodingHours,
    calculateCommitFrequency,
    calculateConsistencyScore,
    calculateLanguageDistribution,
    calculateContributionHeatmap,
    calculateStreaks
} from '@/lib/analytics';

const CACHE_KEY = 'github:analytics';
const CACHE_TTL = 600; // 10 minutes

export async function GET() {
    try {
        // Check cache first
        const cached = cacheService.get(CACHE_KEY);
        if (cached) {
            return NextResponse.json({
                ...cached,
                cached: true
            });
        }

        // Fetch data from GitHub
        const [commits, languageStats] = await Promise.all([
            githubClient.getAllRecentCommits(365),
            githubClient.getLanguageStats()
        ]);

        // Try to fetch contribution calendar from GraphQL
        let contributionCalendar;
        let contributionHeatmap;
        let totalCommits;
        let consistencyScore = 0;
        let currentStreak = 0;
        let longestStreak = 0;

        try {
            contributionCalendar = await githubClient.getContributionCalendar();

            // Convert GitHub contribution calendar to our format
            contributionHeatmap = contributionCalendar.weeks
                .flatMap((week: any) => week.contributionDays)
                .map((day: any) => {
                    const count = day.contributionCount;
                    let level: 0 | 1 | 2 | 3 | 4 = 0;
                    if (count > 0) level = 1;
                    if (count >= 3) level = 2;
                    if (count >= 6) level = 3;
                    if (count >= 10) level = 4;

                    return {
                        date: day.date,
                        count: count,
                        level: level
                    };
                });

            totalCommits = contributionCalendar.totalContributions;

            // Calculate consistency from contribution data
            const activeDays = contributionHeatmap.filter(d => d.count > 0).length;
            const totalDays = contributionHeatmap.length;
            const recentDays = contributionHeatmap.slice(-30);
            const recentActiveDays = recentDays.filter(d => d.count > 0).length;

            // Consistency score based on active days
            const activeDaysScore = Math.min(100, (activeDays / totalDays) * 100);
            const recentScore = Math.min(100, (recentActiveDays / 30) * 100);
            consistencyScore = Math.round((activeDaysScore * 0.5) + (recentScore * 0.5));

            // Calculate current streak
            let streak = 0;
            for (let i = contributionHeatmap.length - 1; i >= 0; i--) {
                if (contributionHeatmap[i].count > 0) {
                    streak++;
                } else {
                    break;
                }
            }
            currentStreak = streak;

            // Calculate longest streak
            let maxStreak = 0;
            let tempStreak = 0;
            for (const day of contributionHeatmap) {
                if (day.count > 0) {
                    tempStreak++;
                    maxStreak = Math.max(maxStreak, tempStreak);
                } else {
                    tempStreak = 0;
                }
            }
            longestStreak = maxStreak;

        } catch (error) {
            console.error('Failed to fetch contribution calendar, using fallback:', error);
            // Fallback to calculated heatmap
            contributionHeatmap = calculateContributionHeatmap(commits, 365);
            totalCommits = commits.length;
            const { currentStreak: cs, longestStreak: ls } = calculateStreaks(commits);
            currentStreak = cs;
            longestStreak = ls;
            consistencyScore = calculateConsistencyScore(commits);
        }

        // Calculate analytics from commits (for charts only)
        const codingHours = calculateCodingHours(commits);
        const commitFrequency = calculateCommitFrequency(commits);
        const focusAreas = calculateLanguageDistribution(languageStats);

        // Calculate summary stats
        const activeDaysCount = contributionHeatmap.filter((d: any) => d.count > 0).length;
        const averageCommitsPerDay = activeDaysCount > 0
            ? Math.round((totalCommits / activeDaysCount) * 10) / 10
            : 0;

        const response = {
            codingHours,
            commitFrequency,
            consistencyScore,
            focusAreas,
            contributionHeatmap,
            totalCommits,
            averageCommitsPerDay,
            currentStreak,
            longestStreak,
            lastUpdated: new Date().toISOString(),
            cached: false
        };

        // Cache the response
        cacheService.set(CACHE_KEY, response, CACHE_TTL);

        return NextResponse.json(response);
    } catch (error) {
        console.error('GitHub analytics API error:', error);

        return NextResponse.json(
            {
                error: 'Failed to calculate analytics',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
