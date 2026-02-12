import { NextResponse } from 'next/server';
import { cacheService } from '@/services/cache';

export async function POST() {
    try {
        // Clear both activity and analytics cache
        cacheService.delete('github:activity');
        cacheService.delete('github:analytics');

        return NextResponse.json({
            success: true,
            message: 'All caches cleared successfully'
        });
    } catch (error) {
        console.error('Cache clear error:', error);
        return NextResponse.json(
            { error: 'Failed to clear cache' },
            { status: 500 }
        );
    }
}
