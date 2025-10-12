'use client';
import React from 'react';

const ErrorCard = ({ error }: { error: string }) => {
  return (
    <div
      className='bg-red-100 border border-red-400 text-red-700 mx-8 my-4 rounded relative'
      role='alert'
    >
      <div className='font-bold bg-red-500 text-white rounded-tl p-2 rounded-tr'>
        Error!
      </div>
      <div className='block px-4 py-3'>{error}</div>
    </div>
  );
};

export default ErrorCard;
