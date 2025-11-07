'use client';

import React, { useState } from 'react';
import { createNewSession } from '@/lib/sessionStorage';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface ConfigFormProps {
  closeModal: () => void;
  router: AppRouterInstance;
}

const ConfigForm: React.FC<ConfigFormProps> = ({ closeModal, router }) => {
  const [config, setConfig] = useState({
    count: 1,
    gradeLevel: 5,
  });

  const handleConfigChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: Number(value) });
  };

  const handleConfirm = async () => {
    const id = await createNewSession();
    sessionStorage.setItem('activeSession', id);
    router.push(
      `/generator?count=${config.count}&gradeLevel=${config.gradeLevel}`
    );
    closeModal();
  };

  return (
    <div className='min-w-[50vw] md:min-w-[40vw] p-6 space-y-6 bg-white dark:bg-gray-800'>
      <div className='space-y-2 text-left'>
        <label className='block text-lg font-medium text-gray-700 dark:text-gray-300'>
          Number of Problems (1-20)
        </label>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          Select the total number of math problems you want to generate for this session (1 to 20).
        </p>
        <select
          name='count'
          value={config.count}
          onChange={handleConfigChange}
          className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition duration-150 ease-in-out'
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option
              key={num}
              value={num}
              className='bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
            >
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className='space-y-2 text-left'>
        <label className='block text-lg font-medium text-gray-700 dark:text-gray-300'>
          Grade Level (1-12)
        </label>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          Choose the grade level to adjust the complexity and type of math problems generated (1 to 12).
        </p>
        <select
          name='gradeLevel'
          value={config.gradeLevel}
          onChange={handleConfigChange}
          className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition duration-150 ease-in-out'
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
            <option
              key={num}
              value={num}
              className='bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
            >
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-center gap-3 pt-4'>
        <button
          onClick={closeModal}
          className='px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-150 ease-in-out'
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className='px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out'
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default ConfigForm;
