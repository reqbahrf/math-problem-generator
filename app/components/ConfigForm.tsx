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
    <div className='space-y-4 text-center'>
      <div>
        <label>Number of Problems (1-20)</label>
        <select
          name='count'
          value={config.count}
          onChange={handleConfigChange}
          className='border p-2 bg-white dark:bg-gray-800 rounded w-full text-black dark:text-white'
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option
              key={num}
              value={num}
              className='bg-white dark:bg-gray-700 text-black dark:text-white'
            >
              {num}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Grade Level (1-12)</label>
        <select
          name='gradeLevel'
          value={config.gradeLevel}
          onChange={handleConfigChange}
          className='border p-2 bg-white dark:bg-gray-800 rounded w-full text-black dark:text-white'
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
            <option
              key={num}
              value={num}
              className='bg-white dark:bg-gray-700 text-black dark:text-white'
            >
              {num}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-center gap-4'>
        <button
          onClick={closeModal}
          className='px-4 py-2 rounded text-black dark:text-white'
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className='bg-blue-600 px-4 py-2 rounded text-black dark:text-white'
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default ConfigForm;
