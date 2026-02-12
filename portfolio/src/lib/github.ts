import { GitHubEvent, GitHubRepository, GitHubCommit } from '@/types/github';

const GITHUB_API_BASE = 'https://api.github.com';

class GitHubClient {
    private token: string;
    private username: string;

    constructor() {
        this.token = process.env.GITHUB_TOKEN || '';
        this.username = process.env.GITHUB_USERNAME || '';
    }

    private async fetch<T>(endpoint: string): Promise<T> {
        const url = `${GITHUB_API_BASE}${endpoint}`;

        const headers: HeadersInit = {
            'Accept': 'application/vnd.github.v3+json',
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const response = await fetch(url, {
            headers,
            next: { revalidate: 300 }, // Cache for 5 minutes
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    async getUserEvents(page: number = 1, perPage: number = 30): Promise<GitHubEvent[]> {
        return this.fetch<GitHubEvent[]>(
            `/users/${this.username}/events?page=${page}&per_page=${perPage}`
        );
    }

    async getUserRepos(): Promise<GitHubRepository[]> {
        return this.fetch<GitHubRepository[]>(
            `/users/${this.username}/repos?sort=updated&per_page=100`
        );
    }

    async getRepoCommits(repo: string, since?: string): Promise<GitHubCommit[]> {
        const sinceParam = since ? `?since=${since}` : '';
        return this.fetch<GitHubCommit[]>(
            `/repos/${this.username}/${repo}/commits${sinceParam}`
        );
    }

    async getAllRecentCommits(days: number = 365): Promise<GitHubCommit[]> {
        const repos = await this.getUserRepos();
        const since = new Date();
        since.setDate(since.getDate() - days);

        const commitPromises = repos.map(repo =>
            this.getRepoCommits(repo.name, since.toISOString())
                .catch(() => []) // Ignore errors for individual repos
        );

        const commitsArrays = await Promise.all(commitPromises);
        return commitsArrays.flat();
    }

    async getLanguageStats(): Promise<Record<string, number>> {
        const repos = await this.getUserRepos();
        const languageStats: Record<string, number> = {};

        for (const repo of repos) {
            if (repo.language) {
                languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
            }
        }

        return languageStats;
    }

    async getContributionCalendar(): Promise<any> {
        const query = `
            query($username: String!) {
                user(login: $username) {
                    contributionsCollection {
                        contributionCalendar {
                            totalContributions
                            weeks {
                                contributionDays {
                                    contributionCount
                                    date
                                }
                            }
                        }
                    }
                }
            }
        `;

        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: { username: this.username }
            })
        });

        if (!response.ok) {
            throw new Error(`GitHub GraphQL API error: ${response.status}`);
        }

        const data = await response.json();
        return data.data.user.contributionsCollection.contributionCalendar;
    }
}

export const githubClient = new GitHubClient();
