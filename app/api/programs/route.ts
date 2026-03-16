import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(programs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newProgram = await prisma.program.create({
      data: {
        title: data.title,
        icon: data.icon,
        category: data.category,
        type: data.type,
        time: data.time,
        platform: data.platform,
        link: data.link,
        day: data.day,
        occurrence: data.occurrence,
        venue: data.venue,
        note: data.note,
        description: data.description,
        maxAttendees: data.maxAttendees ? parseInt(data.maxAttendees) : null,
      },
    });
    return NextResponse.json(newProgram, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create program' }, { status: 500 });
  }
}
