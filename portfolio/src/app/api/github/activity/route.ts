import { NextResponse } from 'next/server';
import { githubClient } from '@/lib/github';
import { cacheService } from '@/services/cache';

const CACHE_KEY = 'github:activity';
const CACHE_TTL = 60; // 1 minute for "real-time" feel

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

        // Fetch from GitHub API
        const events = await githubClient.getUserEvents(1, 30);

        // Filter relevant events
        const relevantEvents = events.filter(event =>
            ['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'CreateEvent'].includes(event.type)
        );

        const response = {
            events: relevantEvents,
            lastUpdated: new Date().toISOString(),
            cached: false
        };

        // Cache the response
        cacheService.set(CACHE_KEY, response, CACHE_TTL);

        return NextResponse.json(response);
    } catch (error) {
        console.error('GitHub activity API error:', error);

        return NextResponse.json(
            {
                error: 'Failed to fetch GitHub activity',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
