import { NextResponse } from 'next/server';
import { getSong } from '@/lib/api';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ group: string; slug: string }> }
) {
    const { group, slug } = await params;
    const song = await getSong(group, slug);
    if (!song) {
        return new NextResponse('Not Found', { status: 404 });
    }
    return NextResponse.json(song);
}
