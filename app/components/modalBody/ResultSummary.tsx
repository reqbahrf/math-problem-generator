import React from 'react';

interface ResultSummaryProps {
  renderedProblem: React.JSX.Element[];
}

const ResultSummary: React.FC<ResultSummaryProps> = ({ renderedProblem }) => {
  return <div className='flex flex-col gap-4'>{renderedProblem}</div>;
};

export default ResultSummary;
