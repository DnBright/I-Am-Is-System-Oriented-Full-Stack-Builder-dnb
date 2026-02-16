import { NextResponse } from 'next/server';
import { githubClient } from '@/lib/github';
import { cacheService } from '@/services/cache';

const CACHE_KEY = 'github:activity';
const CACHE_TTL = 30; // 30 seconds for faster updates

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
            // Exclude ALL CreateEvent (branch, tag, repo creation - not interesting)
            if (event.type === 'CreateEvent') {
                return false;
            }

            // Include meaningful development activities only
            return [
                'PushEvent',           // Code commits (highest priority)
                'PullRequestEvent',    // PR activities
                'IssuesEvent',         // Issue management
                'ReleaseEvent',        // Version releases
                'WatchEvent',          // Stars received
                'ForkEvent',           // Forks received
                'DeleteEvent'          // Branch/tag deletions
            ].includes(event.type);
        });

        // Enrich PushEvents with commit details
        const enrichedEvents = await Promise.all(
            relevantEvents.map(async (event) => {
                if (event.type === 'PushEvent' && event.payload.head) {
                    try {
                        // Fetch commits between before and head
                        const compareUrl = `https://api.github.com/repos/${event.repo.name}/compare/${event.payload.before}...${event.payload.head}`;
                        const compareRes = await fetch(compareUrl, {
                            headers: {
                                'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                                'Accept': 'application/vnd.github.v3+json'
                            }
                        });

                        if (compareRes.ok) {
                            const compareData = await compareRes.json();
                            // Add commits to payload
                            event.payload.commits = compareData.commits.map((c: any) => ({
                                sha: c.sha,
                                message: c.commit.message,
                                author: {
                                    name: c.commit.author.name,
                                    email: c.commit.author.email
                                }
                            }));
                        }
                    } catch (error) {
                        console.error('Failed to fetch commits for event:', error);
                        // Keep event without commits
                    }
                }
                return event;
            })
        );

        const response = {
            events: enrichedEvents,
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
