import { GitHubCommit, GitHubEvent } from '@/types/github';
import {
    AnalyticsData,
    CodingSession,
    CommitFrequency,
    LanguageDistribution,
    ContributionDay
} from '@/types/analytics';
import { format, parseISO, differenceInHours, startOfDay, subDays } from 'date-fns';

/**
 * Calculate coding hours from commits
 * Assumption: Commits within 2 hours of each other are part of the same session
 */
export function calculateCodingHours(commits: GitHubCommit[]): CodingSession[] {
    if (commits.length === 0) return [];

    // Sort commits by date
    const sortedCommits = [...commits].sort((a, b) =>
        new Date(a.commit.author.date).getTime() - new Date(b.commit.author.date).getTime()
    );

    const sessions: Map<string, { hours: number; commits: number }> = new Map();
    const SESSION_GAP_HOURS = 2;

    let sessionStart = new Date(sortedCommits[0].commit.author.date);
    let sessionEnd = sessionStart;
    let currentDay = format(sessionStart, 'yyyy-MM-dd');

    for (let i = 1; i < sortedCommits.length; i++) {
        const commitDate = new Date(sortedCommits[i].commit.author.date);
        const hoursSinceLastCommit = differenceInHours(commitDate, sessionEnd);

        if (hoursSinceLastCommit <= SESSION_GAP_HOURS) {
            // Same session
            sessionEnd = commitDate;
        } else {
            // New session - record the previous one
            const hours = Math.max(0.5, differenceInHours(sessionEnd, sessionStart));
            const existing = sessions.get(currentDay) || { hours: 0, commits: 0 };
            sessions.set(currentDay, {
                hours: existing.hours + hours,
                commits: existing.commits + 1
            });

            sessionStart = commitDate;
            sessionEnd = commitDate;
            currentDay = format(commitDate, 'yyyy-MM-dd');
        }
    }

    // Record the last session
    const hours = Math.max(0.5, differenceInHours(sessionEnd, sessionStart));
    const existing = sessions.get(currentDay) || { hours: 0, commits: 0 };
    sessions.set(currentDay, {
        hours: existing.hours + hours,
        commits: existing.commits + 1
    });

    return Array.from(sessions.entries()).map(([date, data]) => ({
        date,
        hours: Math.round(data.hours * 10) / 10,
        commits: data.commits
    }));
}

/**
 * Calculate commit frequency by day
 */
export function calculateCommitFrequency(commits: GitHubCommit[]): CommitFrequency[] {
    const frequency: Map<string, number> = new Map();

    commits.forEach(commit => {
        const date = format(new Date(commit.commit.author.date), 'yyyy-MM-dd');
        frequency.set(date, (frequency.get(date) || 0) + 1);
    });

    return Array.from(frequency.entries())
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => a.date.localeCompare(b.date));
}

/**
 * Calculate consistency score (0-100)
 * Based on: streak length, commit regularity, and activity distribution
 */
export function calculateConsistencyScore(commits: GitHubCommit[]): number {
    if (commits.length === 0) return 0;

    const frequency = calculateCommitFrequency(commits);
    const days = frequency.length;

    if (days === 0) return 0;

    // Factor 1: Activity spread (how many days out of last 90)
    const spreadScore = Math.min(100, (days / 90) * 100);

    // Factor 2: Regularity (variance in daily commits)
    const avgCommitsPerDay = commits.length / days;
    const variance = frequency.reduce((sum, day) => {
        return sum + Math.pow(day.count - avgCommitsPerDay, 2);
    }, 0) / days;
    const regularityScore = Math.max(0, 100 - (variance * 5));

    // Factor 3: Recent activity (last 7 days)
    const recentCommits = commits.filter(c => {
        const commitDate = new Date(c.commit.author.date);
        const daysSince = differenceInHours(new Date(), commitDate) / 24;
        return daysSince <= 7;
    });
    const recentScore = Math.min(100, (recentCommits.length / 7) * 50);

    // Weighted average
    return Math.round(
        (spreadScore * 0.4) + (regularityScore * 0.3) + (recentScore * 0.3)
    );
}

/**
 * Calculate language distribution
 */
export function calculateLanguageDistribution(
    languageStats: Record<string, number>
): LanguageDistribution[] {
    const total = Object.values(languageStats).reduce((sum, count) => sum + count, 0);

    if (total === 0) return [];

    return Object.entries(languageStats)
        .map(([language, bytes]) => ({
            language,
            bytes,
            percentage: Math.round((bytes / total) * 100)
        }))
        .sort((a, b) => b.percentage - a.percentage);
}

/**
 * Calculate contribution heatmap data
 */
export function calculateContributionHeatmap(
    commits: GitHubCommit[],
    days: number = 365
): ContributionDay[] {
    const frequency = calculateCommitFrequency(commits);
    const frequencyMap = new Map(frequency.map(f => [f.date, f.count]));

    const heatmap: ContributionDay[] = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
        const date = format(subDays(today, i), 'yyyy-MM-dd');
        const count = frequencyMap.get(date) || 0;

        // Calculate intensity level (0-4)
        let level: 0 | 1 | 2 | 3 | 4 = 0;
        if (count > 0) level = 1;
        if (count >= 3) level = 2;
        if (count >= 6) level = 3;
        if (count >= 10) level = 4;

        heatmap.push({ date, count, level });
    }

    return heatmap;
}

/**
 * Calculate streak (current and longest)
 */
export function calculateStreaks(commits: GitHubCommit[]): {
    currentStreak: number;
    longestStreak: number;
} {
    const frequency = calculateCommitFrequency(commits);
    const dates = frequency.map(f => f.date).sort();

    if (dates.length === 0) return { currentStreak: 0, longestStreak: 0 };

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 1;

    const today = format(new Date(), 'yyyy-MM-dd');
    const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd');

    // Check if there's activity today or yesterday for current streak
    if (dates.includes(today) || dates.includes(yesterday)) {
        currentStreak = 1;

        for (let i = dates.length - 2; i >= 0; i--) {
            const current = parseISO(dates[i + 1]);
            const previous = parseISO(dates[i]);
            const daysDiff = differenceInHours(current, previous) / 24;

            if (daysDiff <= 1.5) { // Allow some flexibility
                currentStreak++;
            } else {
                break;
            }
        }
    }

    // Calculate longest streak
    for (let i = 1; i < dates.length; i++) {
        const current = parseISO(dates[i]);
        const previous = parseISO(dates[i - 1]);
        const daysDiff = differenceInHours(current, previous) / 24;

        if (daysDiff <= 1.5) {
            tempStreak++;
            longestStreak = Math.max(longestStreak, tempStreak);
        } else {
            tempStreak = 1;
        }
    }

    longestStreak = Math.max(longestStreak, tempStreak);

    return { currentStreak, longestStreak };
}
