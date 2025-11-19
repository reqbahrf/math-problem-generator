import React from 'react';
import { motion } from 'motion/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const Features = () => {
  const ASSETS_BASE_SOURCE = 'https://reanz-arthur-monera.vercel.app';

  const features = [
    {
      title: 'AI-Powered Math Problem Generation',
      description:
        'Generate math problems dynamically using Gemini AI. Supports Grades 1-12 and multiple difficulty levels like Easy, Medium, and Hard.',
      image: '/assets/math-ai-project/index.webp',
    },
    {
      title: 'Session Configuration',
      description:
        'Configure session settings such as number of problems and grade level. making it adaptive to the user choices.',
      image: '/assets/math-ai-project/session-settings.webp',
    },
    {
      title: 'Step-by-Step Learning Assistance',
      description:
        'Each problem includes hints and detailed step-by-step solutions to help students learn effectively and confidently.',
      image: '/assets/math-ai-project/ai-step-by-step-enhanced.webp',
    },
    {
      title: 'Instant Feedback & Answer Evaluation',
      description:
        'Get immediate AI feedback on your answers with clear explanations and encouragement for improvement.',
      image: '/assets/math-ai-project/ai-instant-feedback.webp',
    },
    {
      title: 'View Summary of Results',
      description:
        'View a summary of your results, including the number of correct answers, the number of incorrect answers, and step-by-step solutions for each problem.',
      image: '/assets/math-ai-project/ai-view-summary.webp',
    },
    {
      title: 'Session Management & History',
      description:
        'Save, resume, or delete practice sessions easily. Review your progress anytime through detailed history summaries.',
      image: '/assets/math-ai-project/ai-chart-insight.webp',
    },
    {
      title: 'Performance Insights & Charts',
      description:
        'Visualize your progress with interactive line and pie charts that show accuracy trends and problem distributions.',
      image: '/assets/math-ai-project/ai-session-management.webp',
    },
    {
      title: 'Dark / Light Mode',
      description:
        'Switch seamlessly between light and dark modes with preferences saved automatically.',
      image: '/assets/math-ai-project/ai-darkmode.webp',
    },
  ];

  return (
    <section className=' px-6 py-20 transition-colors duration-300 md:px-20 bg-white dark:bg-gray-800 relative'>
      <h2 className='text-2xl text-center mb-3 font-semibold text-gray-800 dark:text-white'>
        Features
      </h2>
      <div className='space-y-20'>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`flex flex-col items-center justify-between gap-10 md:flex-row ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Image */}
            <div className='flex h-auto w-auto justify-center md:w-1/2'>
              <LazyLoadImage
                effect='blur'
                threshold={300}
                wrapperProps={{
                  style: { transitionDelay: '0.3s' },
                }}
                src={`${ASSETS_BASE_SOURCE}${feature.image}`}
                className='w-full rounded-2xl object-contain shadow-lg sm:h-[200px] md:h-[400px]'
                alt={feature.title}
              />
            </div>

            {/* Text */}
            <div className='w-full text-center md:w-1/2 md:text-left'>
              <h3 className='mb-3 text-2xl font-semibold text-gray-800 dark:text-white'>
                {feature.title}
              </h3>
              <p className='text-base leading-relaxed text-gray-600 md:text-lg dark:text-gray-300'>
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
