// Analytics Types
export interface CodingSession {
    date: string;
    hours: number;
    commits: number;
}

export interface CommitFrequency {
    date: string;
    count: number;
}

export interface LanguageDistribution {
    language: string;
    percentage: number;
    bytes: number;
}

export interface AnalyticsData {
    codingHours: CodingSession[];
    commitFrequency: CommitFrequency[];
    consistencyScore: number;
    focusAreas: LanguageDistribution[];
    totalCommits: number;
    averageCommitsPerDay: number;
    longestStreak: number;
    currentStreak: number;
}

export interface ContributionDay {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4; // GitHub-style intensity levels
}

export interface WeeklyStats {
    week: string;
    commits: number;
    hours: number;
}
