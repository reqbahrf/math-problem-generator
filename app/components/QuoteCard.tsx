import React from 'react';

interface QuoteCardProps {
  quote: string;
  authorOrReference: string;
}

const QuoteCard = ({ quote, authorOrReference }: QuoteCardProps) => {
  if (!quote || !authorOrReference) return null;

  return (
    <div className='max-w-xl mx-auto my-6 overflow-hidden transition-all duration-300 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg dark:shadow-gray-700 dark:hover:shadow-gray-600 relative'>
      {/* Animated gradient border */}
      <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-spin-slow opacity-75'></div>
      <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 animate-pulse opacity-50'></div>

      {/* Inner content container */}
      <div className='relative bg-white dark:bg-gray-800 rounded-lg m-1'>
        <div className='p-6'>
          {/* Decorative Quote Icon */}
          <div className='mb-2 text-4xl font-serif text-indigo-200 dark:text-indigo-300'>
            &ldquo;
          </div>

          {/* The Quote Text */}
          <p className='relative z-10 -mt-6 text-xl italic font-medium leading-relaxed text-gray-800 dark:text-gray-100'>
            {quote}
          </p>

          {/* The Author/Reference */}
          <div className='flex items-center mt-6'>
            <div className='h-px w-8 bg-indigo-500 dark:bg-indigo-400 mr-3'></div>
            <span className='text-sm font-bold tracking-wide text-gray-500 dark:text-gray-400 uppercase'>
              {authorOrReference}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
