import { NextResponse } from 'next/server';
import { getGroup } from '@/lib/api';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const group = await getGroup(slug);
    if (!group) {
        return new NextResponse('Not Found', { status: 404 });
    }
    return NextResponse.json(group);
}
