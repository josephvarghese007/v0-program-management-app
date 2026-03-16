import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  try {
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return NextResponse.json(user);
    }
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          phone: data.phone,
        },
      });
    } else {
      // Update phone or name if needed
      user = await prisma.user.update({
        where: { email: data.email },
        data: {
          name: data.name,
          phone: data.phone || user.phone,
        },
      });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create/update user' }, { status: 500 });
  }
}
