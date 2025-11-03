'use client';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import {
  MathProblem,
  MathProblemState,
  ProblemSessionConfigState,
} from '../../lib/@types/problemTypes';
import { getSession, updateSession } from '@/lib/sessionStorage';
interface AnswerResponse {
  is_correct: boolean;
  feedback_text: string;
  solution: string;
  created_at: string;
  error?: string;
}

interface MathProblemResponse {
  generatedProblems: MathProblem[];
  error?: string;
}

interface LoadingState {
  type: 'generate' | 'submit-answer' | null;
  isLoading: boolean | null;
}

interface MathProblemContextType {
  generateProblemBatch: (count: number, gradeLevel: number) => Promise<void>;
  setCurrentProblemId: React.Dispatch<React.SetStateAction<string>>;
  setProblemSessionConfig: React.Dispatch<
    React.SetStateAction<ProblemSessionConfigState>
  >;
  setProblem: React.Dispatch<React.SetStateAction<MathProblemState[] | null>>;
  problemSessionConfig: ProblemSessionConfigState;
  currentProblemId: string;
  problem: MathProblemState[] | null;
  score: number;
  isLoading: LoadingState;
  // generateProblem: () => Promise<void>;
  submitAnswer: (
    answer: string,
    question_id: string,
    gradeLevel: number
  ) => Promise<void>;
  error: string | null;
  invalidateCurrentSession: () => void;
}

const MathProblemContext = createContext<MathProblemContextType | undefined>(
  undefined
);

const initialLoading: LoadingState = {
  type: null,
  isLoading: false,
};

export const MathProblemProvider = ({ children }: { children: ReactNode }) => {
  const [problem, setProblem] = useState<MathProblem[] | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [currentProblemId, setCurrentProblemId] = useState<string>('');
  const [gradeLevel, setGradeLevel] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<LoadingState>(initialLoading);

  const [score, setScore] = useState<number>(0);
  const [problemHistory, setProblemHistory] = useState<ProblemHistory[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  // const generateProblem = async () => {
  //   setProblem(null);
  //   setUserAnswer('');
  //   setIsLoading({ type: 'generate', isLoading: true });
  //   setFeedback('');
  //   setIsCorrect(null);
  //   setError(null);
  //   try {
  //     const res = await fetch('/api/math-problem');
  //     const data = (await res.json()) as MathProblemResponse;
  //     if (!res.ok) {
  //       throw new Error(data.error || 'Failed to generate problem');
  //     }
  //     setSessionId(data.session_id);
  //     setProblem({
  //       problem_text: data.problem_text,
  //       problem_type: data.problem_type,
  //       difficulty_level: data.difficulty_level,
  //       hint: data.hint,
  //     });
  //   } catch (error) {
  //     setError(
  //       error instanceof Error ? error.message : 'Failed to generate problem'
  //     );
  //     console.error('Error generating math problem:', error);
  //   } finally {
  //     setIsLoading(initialLoading);
  //   }
  // };

  const generateProblemBatch = async (count: number, grade: number) => {
    setProblem(null);
    setUserAnswer('');
    setIsLoading({ type: 'generate', isLoading: true });
    setFeedback('');
    setIsCorrect(null);
    setError(null);
    try {
      const res = await fetch('/api/math-problem', {
        method: 'POST',
        body: JSON.stringify({
          count,
          gradeLevel: grade,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate problem batch');
      }
      setProblem(data.generatedProblems);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Failed to generate problem batch'
      );
      console.error('Error generating math problem batch:', error);
    } finally {
      setIsLoading(initialLoading);
    }
  };

  const submitAnswer = async (
    userAnswer: string,
    question_id: string,
    gradeLevel: number
  ) => {
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
          question_id: question_id,
          user_answer: userAnswer,
          gradeLevel: gradeLevel,
        }),
      });
      const data = (await res.json()) as AnswerResponse;
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit answer');
      }
      const problemText = problem?.find(
        (p) => p.question_id === question_id
      ).problem_text;
      setProblemHistory((prev) => [
        ...prev,
        {
          id: question_id,
          problem_text: problemText || '',
          user_answer: userAnswer,
          feedback: data.feedback_text,
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
            problem_text: problemText || '',
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

  const invalidateCurrentSession = (): void => {
    setProblem(null);
    setUserAnswer('');
    setCurrentProblemId('');
    setFeedback('');
    setIsCorrect(null);
    setIsLoading(initialLoading);
    setScore(0);
    setProblemHistory([]);
    setShowHistory(false);
    setError(null);
  };

  return (
    <MathProblemContext.Provider
      value={{
        generateProblemBatch,
        setCurrentProblemId,
        currentProblemId,
        gradeLevel,
        setGradeLevel,
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
        // generateProblem,
        submitAnswer,
        error,
        invalidateCurrentSession,
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
