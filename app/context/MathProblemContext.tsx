'use client';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { MathProblem, ProblemHistory } from '../types/problemTypes';
import { getSession, updateSession } from '@/lib/sessionStorage';
interface AnswerResponse {
  is_correct: boolean;
  feedback_text: string;
  solution: string;
  created_at: string;
  error?: string;
}

interface MathProblemResponse extends MathProblem {
  session_id: string;
  error?: string;
}

interface LoadingState {
  type: 'generate' | 'submit-answer' | null;
  isLoading: boolean | null;
}

interface MathProblemContextType {
  problem: MathProblem | null;
  feedback: string;
  userAnswer: string;
  score: number;
  problemHistory: ProblemHistory[];
  showHistory: boolean;
  setShowHistory: (show: boolean) => void;
  setUserAnswer: (answer: string) => void;
  isCorrect: boolean | null;
  isLoading: LoadingState;
  generateProblem: () => Promise<void>;
  submitAnswer: (answer: string) => Promise<void>;
  error: string | null;
}

const MathProblemContext = createContext<MathProblemContextType | undefined>(
  undefined
);

const initialLoading: LoadingState = {
  type: null,
  isLoading: false,
};

export const MathProblemProvider = ({ children }: { children: ReactNode }) => {
  const [problem, setProblem] = useState<MathProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<LoadingState>(initialLoading);

  const [score, setScore] = useState<number>(0);
  const [problemHistory, setProblemHistory] = useState<ProblemHistory[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const generateProblem = async () => {
    setProblem(null);
    setUserAnswer('');
    setIsLoading({ type: 'generate', isLoading: true });
    setFeedback('');
    setIsCorrect(null);
    setError(null);
    try {
      const res = await fetch('/api/math-problem');
      const data = (await res.json()) as MathProblemResponse;
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate problem');
      }
      setSessionId(data.session_id);
      setProblem({
        problem_text: data.problem_text,
        problem_type: data.problem_type,
        difficulty_level: data.difficulty_level,
        hint: data.hint,
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to generate problem'
      );
      console.error('Error generating math problem:', error);
    } finally {
      setIsLoading(initialLoading);
    }
  };

  const submitAnswer = async (userAnswer: string) => {
    setIsLoading({ type: 'submit-answer', isLoading: true });
    setFeedback('');
    setIsCorrect(null);
    try {
      const res = await fetch('/api/math-problem/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          user_answer: userAnswer,
        }),
      });
      const data = (await res.json()) as AnswerResponse;
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit answer');
      }
      setIsCorrect(data.is_correct);
      setScore((prev) => (data.is_correct ? prev + 1 : prev));
      setFeedback(data.feedback_text);
      setProblemHistory((prev) => [
        ...prev,
        {
          id: sessionId,
          problem_text: problem?.problem_text || '',
          user_answer: userAnswer,
          is_correct: data.is_correct,
          solution: data.solution,
          created_at: data.created_at,
        },
      ]);
      const currentSessionId = sessionStorage.getItem('activeSession');
      if (currentSessionId) {
        const localSession = await getSession(currentSessionId);
        if (localSession) {
          localSession.problems.push({
            problem_text: problem?.problem_text || '',
            user_answer: userAnswer,
            is_correct: data.is_correct,
            feedback: data.feedback_text,
            solution: data.solution,
            created_at: data.created_at,
          });
          localSession.score = localSession.problems.filter(
            (p) => p.is_correct
          ).length;
          await updateSession(localSession);
        }
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to submit answer'
      );
      console.error('Error submitting answer:', error);
    } finally {
      setIsLoading(initialLoading);
    }
  };

  return (
    <MathProblemContext.Provider
      value={{
        userAnswer,
        setUserAnswer,
        score,
        problemHistory,
        showHistory,
        setShowHistory,
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
