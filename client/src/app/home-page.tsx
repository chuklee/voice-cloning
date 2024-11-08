'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Copy, DownloadIcon, Loader2, Play } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState, useContext } from 'react';

const youtubeVideosExamples = [
  {
    videoUrl: 'https://www.youtube.com/watch?v=Bo-SWglfNZY',
    thumbnailUrl: 'http://img.youtube.com/vi/Bo-SWglfNZY/maxresdefault.jpg',
  },
  {
    videoUrl: 'https://www.youtube.com/watch?v=i9TOYfoV_2o',
    thumbnailUrl: 'http://img.youtube.com/vi/i9TOYfoV_2o/maxresdefault.jpg',
  },
  {
    videoUrl: 'https://www.youtube.com/watch?v=WnERfBKZlwE',
    thumbnailUrl: 'http://img.youtube.com/vi/WnERfBKZlwE/maxresdefault.jpg',
  },
  {
    videoUrl: 'https://www.youtube.com/watch?v=a3ShvjMH5JU',
    thumbnailUrl:
      'https://siecledigital.fr/wp-content/uploads/2016/02/simpsons-live.jpg',
  },
];

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [reponseError, setResponseError] = useState('');
  const [responseOk, setResponseOk] = useState<any | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [innerOperationMessage, setInnerOperationMessage] = useState('');
  const [audioLanguage, setAudioLanguage] = useState('');
  const [cloningLoading, setCloningLoading] = useState(false);
  const [audioPlayerReady, setAudioPlayerReady] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setAudioPlayerReady(false);
    setResponseError('');
    setAudioLanguage('');
    setInnerOperationMessage('Fetching audio from Youtube video...');

    try {
      await fetch('http://localhost:3333/convert', {
        method: 'POST',
        body: JSON.stringify({ youtube_url: videoUrl }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setInnerOperationMessage(
        prev => prev + '✅\nUnderstanding the language...',
      );

      // {
      //     "language_code": "en"
      const languageResponse = await fetch(
        'http://localhost:4444/get-audio-language',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const languageResponseJson = await languageResponse.json();

      if (!languageResponseJson.language_code) {
        setResponseError('Language not detected');
        setLoading(false);
        setInnerOperationMessage('');
        return;
      }

      const languageCode = languageResponseJson.language_code;
      setAudioLanguage(languageCode);

      setInnerOperationMessage(
        prev =>
          prev +
          '(' +
          languageCode +
          ') ' +
          '✅\nCloning ready. Waiting for text...',
      );
    } catch (error) {
      setResponseError('Planning solver failed: ' + error);
      setLoading(false);
      setInnerOperationMessage('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && videoUrl) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVideoUrl(event.target.value.trim());
  };
  const handleCloneSubmit = async (text: string) => {
    setLoading(true);
    setCloningLoading(true);
    setAudioPlayerReady(false);
    const languageRegex = /\(([^)]+)\)/;
    const languageMatch = text.match(languageRegex);
    const overrideLanguage = languageMatch ? languageMatch[1] : '';

    setInnerOperationMessage(
      prev => prev + '✅\nCloning voice for "' + text + '"...',
    );
    const languageRegex = /\(([^)]+)\)/;
    const languageMatch = text.match(languageRegex);
    const overrideLanguage = languageMatch ? languageMatch[1] : '';

    // Si un match est trouvé, supprimer le texte correspondant (avec les parenthèses) du texte
    const cleanedText = languageMatch
      ? text.replace(languageRegex, '').trim()
      : text;
    console.log(cleanedText, overrideLanguage);
    try {
      await fetch('http://localhost:5555/clone-voice', {
        method: 'POST',
        body: JSON.stringify({
          text: cleanedText,
          language: overrideLanguage || audioLanguage,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setInnerOperationMessage(
        prev => prev + '✅\nVoice cloned ! Press play to listen',
      );
      setAudioPlayerReady(true);
      setCloningLoading(false);
      setLoading(false);
    } catch (error) {
      setResponseError('Cloning voice failed: ' + JSON.stringify(error));
      setLoading(false);
      setAudioPlayerReady(false);
    }
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
            disabled={loading}
            index={index}
            isFirst={index === 0}
            isLast={index === youtubeVideosExamples.length - 1}
            setVideoUrl={setVideoUrl}
            thumbnailUrl={thumbnailUrl}
            videoUrl={videoUrl}
          />
        ))}
      </div>

      <AnimatePresence>
        {loading && (
          <div className='flex justify-center items-center space-x-2 pt-10'>
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
            className='mt-2 pt-10 text-gray-800'
          >
            {reponseError ? (
              <div className='text-red-500'>{reponseError}</div>
            ) : (
              <div>{JSON.stringify(responseOk)}</div>
            )}
          </motion.div>
        )}

        {innerOperationMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className='mt-10 p-2 rounded-xl text-gray-800 animate-pulse pointer-events-none'
          >
            {innerOperationMessage.split('\n').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className='flex justify-center items-center p-4 pt-20 w-[45%] scale-110'
      >
        <Textarea
          onKeyDown={handleKeyDown}
          value={videoUrl}
          onChange={handleChange}
          className='bg-gray-50 shadow-blue-900/20 shadow-sm rounded-2xl min-h-0 text-gray-500 overflow-x-auto resize-none'
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
          onClick={handleSubmit}
          className='flex flex-row justify-center gap-2 shadow-sm ml-4 rounded-2xl h-12'
        >
          <div className='flex justify-center items-center'>Clone voice</div>
          <div className='flex'>
            {loading ? (
              <Loader2 className='animate-spin' size={24} color='white' />
            ) : (
              <Copy size={24} color='white' />
            )}
          </div>
        </Button>
      </motion.div>
      {audioLanguage && (
        <CloneTextInput
          initialValue={'Hello, world!'}
          onSend={handleCloneSubmit}
          loading={cloningLoading}
        />
      )}
      {audioPlayerReady && <CloneAudioPlayer />}
    </div>
  );
}

function CloneAudioPlayer() {
  return (
    <div className='flex items-center'>
      <audio controls className='mr-4'>
        <source src='/api/audio' type='audio/wav' />
        Your browser does not support the audio element.
      </audio>
      <a href='/api/audio' download>
        <DownloadIcon size={24} color='rgb(75 85 90)' />
      </a>
    </div>
  );
}

interface CloneTextInputProps {
  initialValue: string;
  onSend: (text: string) => void;
  loading: boolean;
}

function CloneTextInput({
  initialValue,
  onSend,
  loading,
}: CloneTextInputProps) {
  const [value, setValue] = useState(initialValue);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.ctrlKey && value) {
      event.preventDefault();
      onSend(value);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className='flex justify-center items-center p-4 rounded-lg w-[45%]'
    >
      <div className='flex items-center w-3/4'>
        <Textarea
          onKeyDown={handleKeyDown}
          ref={textAreaRef}
          value={value}
          className='bg-gray-50 shadow-sm rounded-2xl text-gray-500 overflow-hidden resize-none'
          placeholder='Type your planning problem here !'
          onChange={handleChange}
        />
      </div>
      <Button
        disabled={!value || loading}
        title='CTRL + Enter to send'
        variant={'default'}
        onClick={() => onSend(value)}
        className='flex justify-center items-center shadow-sm ml-4 rounded-2xl w-12 h-12'
      >
        {loading ? (
          <Loader2 className='animate-spin' size={24} color='white' />
        ) : (
          <ArrowUp size={24} color='white' />
        )}
      </Button>
    </motion.div>
  );
}

interface YoutubeTemplateCardProps {
  index: number;
  setVideoUrl: React.Dispatch<React.SetStateAction<string>>;
  thumbnailUrl: string;
  videoUrl: string;
  isFirst: boolean;
  isLast: boolean;
  disabled: boolean;
}

function YoutubeTemplateCard({
  index,
  setVideoUrl,
  thumbnailUrl,
  videoUrl,
  isFirst,
  isLast,
  disabled,
}: YoutubeTemplateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.2 + index / 10,
        type: 'just',
      }}
      onClick={() => !disabled && setVideoUrl(videoUrl)}
      className='relative transform transition-transform duration-300 cursor-pointer ease-in-out hover:scale-105'
    >
      <div
        className={`relative shadow-lg shadow-blue-700/40 rounded-xl transform transition-transform duration-300 overflow-hidden ease-in-out hover:scale-105 ${isFirst ? 'hover:rotate-[-3deg]' : isLast ? 'hover:rotate-[3deg]' : 'hover:rotate-0'}`}
      >
        <Image
          src={thumbnailUrl}
          alt='thumbnail'
          width={850}
          height={850}
          className='rounded-xl'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-blue-900/35 hover:from-blue-900/10 to-transparent pointer-events-none'></div>
      </div>
    </motion.div>
  );
}
