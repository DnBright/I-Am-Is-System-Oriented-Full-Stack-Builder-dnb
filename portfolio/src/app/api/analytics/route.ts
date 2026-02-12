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
        const [commits, languageStats, contributionCalendar] = await Promise.all([
            githubClient.getAllRecentCommits(365),
            githubClient.getLanguageStats(),
            githubClient.getContributionCalendar()
        ]);

        // Calculate analytics
        const codingHours = calculateCodingHours(commits);
        const commitFrequency = calculateCommitFrequency(commits);
        const consistencyScore = calculateConsistencyScore(commits);
        const focusAreas = calculateLanguageDistribution(languageStats);

        // Convert GitHub contribution calendar to our format
        const contributionHeatmap = contributionCalendar.weeks
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

        const { currentStreak, longestStreak } = calculateStreaks(commits);

        // Calculate summary stats
        const totalCommits = contributionCalendar.totalContributions;
        const averageCommitsPerDay = commitFrequency.length > 0
            ? Math.round((totalCommits / commitFrequency.length) * 10) / 10
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
