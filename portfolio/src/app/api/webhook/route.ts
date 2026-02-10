import { NextResponse } from 'next/server';
import { cacheService } from '@/services/cache';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Verify webhook signature (optional - implement if using GitHub webhooks)
        // const signature = request.headers.get('x-hub-signature-256');

        console.log('Webhook received:', body);

        // Invalidate caches to force fresh data
        cacheService.delete('github:activity');
        cacheService.delete('github:analytics');

        return NextResponse.json({
            status: 'ok',
            message: 'Cache invalidated'
        });
    } catch (error) {
        console.error('Webhook error:', error);

        return NextResponse.json(
            {
                error: 'Webhook processing failed',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
