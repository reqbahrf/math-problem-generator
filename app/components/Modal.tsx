'use client';
import React from 'react';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ title, onClose, children }: ModalProps) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50'>
      <div className='relative w-full max-w-[50vw] max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl'>
        <div className='sticky top-0 flex justify-between items-center p-4 bg-white dark:bg-gray-800'>
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
