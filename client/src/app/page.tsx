'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUp, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
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
