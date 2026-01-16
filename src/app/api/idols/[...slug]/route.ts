import { NextResponse } from 'next/server';
import { findIdol, getIdol } from '@/lib/api';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string[] }> }
) {
    const { slug } = await params;

    // Case 1: /api/idols/[slug] (Global Search)
    if (slug.length === 1) {
        const idolSlug = slug[0];
        const idol = await findIdol(idolSlug);
        if (!idol) {
            return new NextResponse('Not Found', { status: 404 });
        }
        return NextResponse.json(idol);
    }

    // Case 2: /api/idols/[group]/[slug] (Specific Group Search)
    if (slug.length === 2) {
        const [group, idolSlug] = slug;
        const idol = await getIdol(group, idolSlug);
        if (!idol) {
            return new NextResponse('Not Found', { status: 404 });
        }
        return NextResponse.json(idol);
    }

    return new NextResponse('Bad Request', { status: 400 });
}
