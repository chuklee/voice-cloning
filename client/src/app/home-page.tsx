'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUp, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const youtubeVideosExamples = [
  {
    videoUrl:
      'https://www.youtube.com/watch?v=DteuaGMck4k&list=PLTYUE9O6WCrin42VsDN7JaZV0rpSOn2j2',
    thumbnailUrl: 'http://img.youtube.com/vi/DteuaGMck4k/maxresdefault.jpg',
  },
  {
    videoUrl: 'https://www.youtube.com/watch?v=wCRWEKPfLmM',
    thumbnailUrl: 'http://img.youtube.com/vi/wCRWEKPfLmM/maxresdefault.jpg',
  },
  {
    videoUrl: 'https://www.youtube.com/watch?v=mqcnM5BATIQ',
    thumbnailUrl: 'http://img.youtube.com/vi/mqcnM5BATIQ/maxresdefault.jpg',
  },
];

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [reponseError, setResponseError] = useState('');
  const [responseOk, setResponseOk] = useState<any | null>(null);
  const [videoUrl, setVideoUrl] = useState('');

  const handleSend = async () => {
    setLoading(true);
    setResponseError('');

    try {
      const llmResponse = await fetch('http://localhost:8000/', {
        method: 'POST',
        body: JSON.stringify({ text: videoUrl }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const llmResponseJson = await llmResponse.json();
      if (llmResponseJson.error) {
        setResponseError('Planning solver failed: ' + llmResponseJson.error);
        setLoading(false);
        return;
      }
      setResponseOk(llmResponseJson);
      setLoading(false);
    } catch (error) {
      setResponseError('Planning solver failed: ' + error);
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && videoUrl) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVideoUrl(event.target.value.trim());
  };

  return (
    <div className='z-50 flex flex-col items-center w-full h-full'>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className='mb-16 font-light text-4xl pointer-events-none'
      >
        <span className='font-light text-red-600'>YouTuber</span>{' '}
        <span className='font-light text-black'>Voice</span>{' '}
        <span className='font-light text-black'>Cloner</span>
      </motion.h2>
      <div className='flex flex-row justify-evenly gap-48 py-8'>
        {youtubeVideosExamples.map(({ videoUrl, thumbnailUrl }, index) => (
          <YoutubeTemplateCard
            key={index}
            index={index}
            setVideoUrl={setVideoUrl}
            thumbnailUrl={thumbnailUrl}
            videoUrl={videoUrl}
          />
        ))}
      </div>

      <AnimatePresence>
        {loading && (
          <div className='flex justify-center items-center space-x-2'>
            <span className='sr-only'>Loading...</span>
            <div className='bg-black/20 rounded-full w-4 h-4 animate-bounce [animation-delay:-0.3s]'></div>
            <div className='bg-black/20 rounded-full w-4 h-4 animate-bounce [animation-delay:-0.15s]'></div>
            <div className='bg-black/20 rounded-full w-4 h-4 animate-bounce'></div>
          </div>
        )}
        {!loading && (reponseError || responseOk) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className='mt-2 text-gray-800'
          >
            {reponseError ? (
              <div className='text-red-500'>{reponseError}</div>
            ) : (
              <div>{JSON.stringify(responseOk)}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className='flex justify-center items-center p-4 w-[45%]'
      >
        <Textarea
          onKeyDown={handleKeyDown}
          value={videoUrl}
          onChange={handleChange}
          className='bg-gray-50 shadow-sm rounded-2xl min-h-0 text-gray-500 overflow-x-auto resize-none'
          placeholder='Enter a YouTube video URL here!'
          rows={1}
          style={{
            width: videoUrl.length
              ? `${Math.min(videoUrl.length * 10, window.innerWidth * 0.6)}px`
              : '33%',
            transition: 'width 0.2s ease',
          }}
        />
        <Button
          disabled={!videoUrl || loading}
          onClick={handleSend}
          className='shadow-sm ml-4 rounded-2xl w-12 h-12'
        >
          {loading ? (
            <Loader2 className='animate-spin' size={24} color='white' />
          ) : (
            <ArrowUp size={24} color='white' />
          )}
        </Button>
      </motion.div>
    </div>
  );
}

interface YoutubeTemplateCardProps {
  index: number;
  setVideoUrl: React.Dispatch<React.SetStateAction<string>>;
  thumbnailUrl: string;
  videoUrl: string;
}

function YoutubeTemplateCard({
  index,
  setVideoUrl,
  thumbnailUrl,
  videoUrl,
}: YoutubeTemplateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.2 + index / 10,
        type: 'just',
      }}
      onClick={() => setVideoUrl(videoUrl)}
      className='relative transform transition-transform duration-300 cursor-pointer ease-in-out hover:scale-105'
    >
      <div className='relative border-2 border-gray-300 hover:border-gray-800/50 shadow-gray-800/50 shadow-xl rounded-xl transform transition-transform duration-300 overflow-hidden ease-in-out hover:scale-105'>
        <Image
          src={thumbnailUrl}
          alt='thumbnail'
          width={850}
          height={850}
          className='rounded-xl'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent pointer-events-none'></div>
      </div>
    </motion.div>
  );
}
