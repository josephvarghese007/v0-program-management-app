import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }

  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });
    return NextResponse.json(subscription);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subscription' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { userId, programCategory, enableEmail, enableSMS } = data;

    const subscription = await prisma.subscription.upsert({
      where: { userId },
      update: {
        programCategory: programCategory !== undefined ? programCategory : undefined,
        enableEmail: enableEmail !== undefined ? enableEmail : undefined,
        enableSMS: enableSMS !== undefined ? enableSMS : undefined,
      },
      create: {
        userId,
        programCategory: programCategory || 'all',
        enableEmail: enableEmail ?? true,
        enableSMS: enableSMS ?? false,
      },
    });

    return NextResponse.json(subscription, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 });
  }
}
