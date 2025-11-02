'use client';

import { useRouter } from 'next/navigation';

interface BackButtonProps {
  label?: string;
  className?: string;
  beforeBack?: () => Promise<void>;
}

export default function BackButton({
  label = 'Go Back',
  className = '',
  beforeBack,
}: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => beforeBack ? beforeBack().then(() => router.back()) : router.back()}
      className={`flex items-center gap-2 px-4 py-2 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 font-medium ${className}`}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth={2}
        stroke='currentColor'
        className='w-5 h-5'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15 19l-7-7 7-7'
        />
      </svg>
      {label}
    </button>
  );
}
