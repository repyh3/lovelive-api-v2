import { NextResponse } from 'next/server';
import { getIdols } from '@/lib/api';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const group = searchParams.get('group');

    if (!group) {
        return new NextResponse('Missing group parameter', { status: 400 });
    }

    const idols = await getIdols(group);
    return NextResponse.json(idols);
}
