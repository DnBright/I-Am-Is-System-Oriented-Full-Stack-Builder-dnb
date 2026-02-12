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

        // Filter and prioritize meaningful events
        // Priority: PushEvent > PullRequestEvent > IssuesEvent > Others
        const relevantEvents = events.filter(event => {
            // Exclude repository creation events (not interesting)
            if (event.type === 'CreateEvent' && event.payload.ref_type === 'repository') {
                return false;
            }

            // Include meaningful development activities
            return [
                'PushEvent',           // Code commits (highest priority)
                'PullRequestEvent',    // PR activities
                'IssuesEvent',         // Issue management
                'CreateEvent',         // Branch/tag creation (but not repos)
                'ReleaseEvent',        // Version releases
                'WatchEvent',          // Stars received
                'ForkEvent'            // Forks received
            ].includes(event.type);
        });

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
