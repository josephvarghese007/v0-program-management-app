import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  try {
    const registrations = await prisma.registration.findMany({
      where: { userId },
    });
    return NextResponse.json(registrations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { userId, programId } = data;

    const registration = await prisma.registration.create({
      data: {
        userId,
        programId,
      },
    });
    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create registration' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const programId = searchParams.get('programId');

  if (!userId || !programId) {
    return NextResponse.json({ error: 'userId and programId are required' }, { status: 400 });
  }

  try {
    // Delete the unique registration
    await prisma.registration.deleteMany({
      where: {
        userId,
        programId,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete registration' }, { status: 500 });
  }
}
