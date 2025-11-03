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
import { getSession, LocalSession, updateSession } from '@/lib/sessionStorage';
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
  resumeSavedSession: (session: LocalSession) => void;
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
  const [problemSessionConfig, setProblemSessionConfig] =
    useState<ProblemSessionConfigState>({
      count: 0,
      gradeLevel: 0,
    });
  const [problem, setProblem] = useState<MathProblemState[] | null>(null);
  const [currentProblemId, setCurrentProblemId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<LoadingState>(initialLoading);

  const [score, setScore] = useState<number>(0);

  const [error, setError] = useState<string | null>(null);

  const generateProblemBatch = useCallback(
    async (count: number, grade: number) => {
      setProblem(null);
      setIsLoading({ type: 'generate', isLoading: true });
      setError(null);
      try {
        const res = await fetch('/api/math-problem', {
          method: 'POST',
          body: JSON.stringify({
            count,
            gradeLevel: grade,
          }),
        });
        const data = (await res.json()) as MathProblemResponse;
        if (!res.ok) {
          throw new Error(data.error || 'Failed to generate problem batch');
        }
        setProblem(
          data.generatedProblems.map((p) => ({
            ...p,
            isAnswered: false,
            userAnswer: null,
            isCorrect: null,
            feedback: null,
            solution: null,
            createdAt: null,
          }))
        );
        setCurrentProblemId(data.generatedProblems[0].question_id);
        const currentSessionId = sessionStorage.getItem('activeSession');
        if (currentSessionId) {
          const localSession = await getSession(currentSessionId);
          if (localSession) {
            for (const p of data.generatedProblems) {
              localSession.problems.push({
                questionId: p.question_id,
                problemText: p.problem_text,
                problemType: p.problem_type,
                difficultyLevel: p.difficulty_level,
                hint: p.hint,
                userAnswer: null,
                isCorrect: null,
                feedback: null,
                solution: null,
                createdAt: null,
              });
            }
            localSession.count = count;
            localSession.gradeLevel = grade;
            await updateSession(localSession);
          }
        }
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
    },
    []
  );

  const submitAnswer = useCallback(
    async (userAnswer: string, question_id: string, gradeLevel: number) => {
      setIsLoading({ type: 'submit-answer', isLoading: true });
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
        setProblem((prev) =>
          prev.map((p) => {
            if (p.question_id === question_id) {
              return {
                ...p,
                userAnswer: userAnswer,
                isAnswered: true,
                isCorrect: data.is_correct,
                feedback: data.feedback_text,
                solution: data.solution,
                createdAt: data.created_at,
              };
            }
            return p;
          })
        );
        const currentSessionId = sessionStorage.getItem('activeSession');
        if (currentSessionId) {
          const localSession = await getSession(currentSessionId);
          if (localSession) {
            const problemIndex = localSession.problems.findIndex(
              (p) => p.questionId === question_id
            );
            if (problemIndex !== -1) {
              localSession.problems[problemIndex] = {
                ...localSession.problems[problemIndex],
                userAnswer: userAnswer,
                isCorrect: data.is_correct,
                feedback: data.feedback_text,
                solution: data.solution,
                createdAt: data.created_at,
              };
            }
            localSession.score = localSession.problems.filter(
              (p) => p.isCorrect
            ).length;
            localSession.status = localSession.problems.every(
              (p) => p.userAnswer !== null
            )
              ? 'Completed'
              : 'Incomplete';
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
    },
    []
  );

  const resumeSavedSession = useCallback(async (session: LocalSession) => {
    setProblem(
      session.problems.map((p) => ({
        question_id: p.questionId,
        problem_text: p.problemText,
        problem_type: p.problemType,
        difficulty_level: p.difficultyLevel,
        hint: p.hint,
        solution: p.solution,
        isAnswered: p.userAnswer ? true : false,
        userAnswer: p.userAnswer,
        isCorrect: p.isCorrect,
        feedback: p.feedback,
        createdAt: p.createdAt,
      }))
    );
    setCurrentProblemId(
      session.problems.find((p) => !p.userAnswer)?.questionId ?? null
    );
    setProblemSessionConfig({
      count: session.count,
      gradeLevel: session.gradeLevel,
    });
  }, []);

  const invalidateCurrentSession = (): void => {
    setProblem(null);
    setCurrentProblemId('');
    setIsLoading(initialLoading);
    setScore(0);
    setError(null);
  };

  return (
    <MathProblemContext.Provider
      value={{
        generateProblemBatch,
        setCurrentProblemId,
        currentProblemId,
        problemSessionConfig,
        setProblemSessionConfig,
        score,
        problem,
        setProblem,
        isLoading,
        submitAnswer,
        error,
        invalidateCurrentSession,
        resumeSavedSession,
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
