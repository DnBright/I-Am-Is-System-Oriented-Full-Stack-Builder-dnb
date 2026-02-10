// GitHub API Types
export interface GitHubEvent {
    id: string;
    type: string;
    actor: {
        login: string;
        avatar_url: string;
    };
    repo: {
        name: string;
        url: string;
    };
    payload: {
        commits?: Array<{
            sha: string;
            message: string;
            author: {
                name: string;
                email: string;
            };
        }>;
        action?: string;
        ref?: string;
        ref_type?: string;
    };
    created_at: string;
}

export interface GitHubRepository {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    topics: string[];
}

export interface GitHubCommit {
    sha: string;
    commit: {
        author: {
            name: string;
            email: string;
            date: string;
        };
        message: string;
    };
    html_url: string;
}

export interface GitHubContributor {
    login: string;
    contributions: number;
    avatar_url: string;
}
