'use client';

import React from 'react';

interface LoadingProps {
  message?: string;
}

const Loading = ({ message = 'Loading...' }: LoadingProps) => {
  return (
    <div className='flex flex-col items-center justify-center py-10 text-gray-600 dark:text-gray-300'>
      <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400'></div>
      <p className='mt-4 text-center'>{message}</p>
    </div>
  );
};

export default Loading;
