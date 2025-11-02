'use client';
import React from 'react';

interface ModalProps {
  title: string;
  size: 'sm' | 'md' | 'md-f-h' | 'full' | 'responsive';
  headerColor?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ title, size, headerColor, onClose, children }: ModalProps) => {
  let sizeClass = '';
  switch (size) {
    case 'sm':
      sizeClass = 'max-w-[50vw] max-h-[30vh]';
      break;
    case 'md':
      sizeClass = 'max-w-[70vw] max-h-[50vh]';
      break;
    case 'full':
      sizeClass = 'max-w-full max-h-full';
      break;
    case 'responsive':
      sizeClass =
        'w-full h-full max-w-full max-h-full md:max-w-[50vw] md:max-h-[90vh]';
      break;
    default:
      break;
  }
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div
        className={`relative ${sizeClass} overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl`}
      >
        <div
          className={`sticky top-0 flex justify-between items-center p-4 ${
            headerColor || 'bg-white dark:bg-gray-800'
          }`}
        >
          <h2 className='text-2xl text-center font-bold text-gray-700 dark:text-white'>
            {title}
          </h2>
          <button
            onClick={onClose}
            className='text-2xl right-90 text-gray-600 dark:text-gray-400'
          >
            &times;
          </button>
        </div>
        <div className='flex flex-col gap-4 mt-4 p-6'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
