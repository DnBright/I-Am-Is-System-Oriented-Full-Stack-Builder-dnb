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

        // Calculate analytics
        const codingHours = calculateCodingHours(commits);
        const commitFrequency = calculateCommitFrequency(commits);
        const consistencyScore = calculateConsistencyScore(commits);
        const focusAreas = calculateLanguageDistribution(languageStats);
        const contributionHeatmap = calculateContributionHeatmap(commits, 365);
        const { currentStreak, longestStreak } = calculateStreaks(commits);

        // Calculate summary stats
        const totalCommits = commits.length;
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
