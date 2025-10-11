'use client';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface MathProblem {
  problem_text: string;
  final_answer: number;
}

interface MathProblemContextType {
  problem: MathProblem | null;
  feedback: string;
  userAnswer: string;
  setUserAnswer: (answer: string) => void;
  isCorrect: boolean | null;
  isLoading: boolean;
  generateProblem: () => Promise<void>;
  submitAnswer: (answer: string) => Promise<void>;
  error: string | null;
}

const MathProblemContext = createContext<MathProblemContextType | undefined>(
  undefined
);

export const MathProblemProvider = ({ children }: { children: ReactNode }) => {
  const [problem, setProblem] = useState<MathProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const generateProblem = async () => {
    setProblem(null);
    setUserAnswer('');
    setIsLoading(true);
    setFeedback('');
    setIsCorrect(null);
    setError(null);
    try {
      const res = await fetch('/api/generate-problem');
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate problem');
      }
      setSessionId(data.session_id);
      setProblem({
        problem_text: data.problem_text,
        final_answer: data.final_answer,
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to generate problem'
      );
      console.error('Error generating math problem:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async (userAnswer: string) => {
    setIsLoading(true);
    setFeedback('');
    setIsCorrect(null);
    try {
      const res = await fetch('/api/submit-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          user_answer: userAnswer,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit answer');
      }
      setIsCorrect(data.is_correct);
      setFeedback(data.feedback_text);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to submit answer'
      );
      console.error('Error submitting answer:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MathProblemContext.Provider
      value={{
        userAnswer,
        setUserAnswer,
        problem,
        feedback,
        isCorrect,
        isLoading,
        generateProblem,
        submitAnswer,
        error,
      }}
    >
      {children}
    </MathProblemContext.Provider>
  );
};

export const useMathProblem = () => {
  const context = useContext(MathProblemContext);
  if (!context) {
    throw new Error(
      'useMathProblemContext must be used within a MathProblemProvider'
    );
  }
  return context;
};
