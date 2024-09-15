'use client';

import { AuroraBackground } from '@/components/ui/aurora-background';
import HomePage from './home-page';

export default function Home() {
  return (
    <main className='flex flex-col justify-between items-center w-screen h-screen'>
      <AuroraBackground className='p-24 pt-20 w-screen h-screen'>
        <HomePage />
      </AuroraBackground>
    </main>
  );
}
