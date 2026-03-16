import { prisma } from '../lib/db';

const initialPrograms = [
  {
    title: 'Divine Mercy Chaplet',
    category: 'daily',
    icon: '🙏',
    type: 'online',
    link: 'https://us02web.zoom.us/j/83202505304?pwd=M2dlemdzWElvcWdPWEJ2ek1mTnNxQT09',
    platform: 'Zoom',
    time: '9:30 PM IST',
  },
  {
    title: 'Daily Rosary',
    category: 'daily',
    icon: '📿',
    type: 'online',
    link: 'https://meet.google.com/fbg-yaib-xsr',
    platform: 'Google Meet',
    time: '9:00 PM IST',
  },
  {
    title: 'Monday Gatherings',
    category: 'weekly',
    icon: '🌟',
    type: 'offline',
    day: 'Monday',
    time: '7:00 PM',
    venue: 'Assisi Santhi Kendra, Karukutty',
  },
  {
    title: 'Chat With Jesus',
    category: 'weekly',
    icon: '✝️',
    type: 'offline',
    day: 'Wednesday',
    time: '5:00 PM',
    venue: 'Jolly Nursery, Angamaly (Opp. LF Hospital)',
  },
  {
    title: 'Parish & Campus Prayer Groups',
    category: 'weekly',
    icon: '⛪',
    type: 'offline',
    day: 'Various',
    venue: 'Multiple locations',
  },
  {
    title: 'Zonal Adoration',
    category: 'weekly',
    icon: '🕯️',
    type: 'offline',
    day: 'Wednesday',
    time: '7:00 PM',
    venue: 'Assisi Santhi Kendra, Karukutty',
  },
  {
    title: 'House Holds',
    category: 'monthly',
    icon: '🏠',
    type: 'offline',
    occurrence: 'First Sundays',
    time: '3:00 PM',
    venue: 'Morning Star Home Science College',
  },
  {
    title: 'Canteen',
    category: 'monthly',
    icon: '🎉',
    type: 'offline',
    occurrence: 'Second Saturdays',
    time: '2:00 PM',
    venue: 'Angamaly Basilica',
    note: 'For Teens',
  },
];

async function main() {
  console.log('Initializing database with seed data...');

  for (const program of initialPrograms) {
    await prisma.program.upsert({
      where: { title: program.title },
      update: {},
      create: program,
    });
  }

  console.log('Database initialized successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
