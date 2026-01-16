import { NextResponse } from 'next/server';
import { getLyrics } from '@/lib/api';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ group: string; slug: string; lang: string }> }
) {
    const { group, slug, lang } = await params;
    // Sanitize lang parameter to remove .txt extension if present
    const cleanLang = lang.endsWith('.txt') ? lang.slice(0, -4) : lang;
    const lyrics = await getLyrics(group, slug, cleanLang);

    if (!lyrics) {
        return new NextResponse('Not Found', { status: 404 });
    }

    return new NextResponse(lyrics, {
        headers: { 'Content-Type': 'text/plain' },
    });
}
