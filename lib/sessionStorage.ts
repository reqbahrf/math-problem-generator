import { v4 as uuidv4 } from 'uuid';

const DB_NAME = 'math_problem_app';
const STORAGE_NAME = 'sessions';
const DB_VERSION = 1;

export interface LocalSession {
  id: string;
  createdAt: string;
  problems: {
    problem_text: string;
    user_answer: string;
    is_correct: boolean;
    feedback: string;
    solution: string;
    created_at: string;
  }[];
  score: number;
}

export async function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORAGE_NAME)) {
        db.createObjectStore(STORAGE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function createNewSession(): Promise<string> {
  const db = await initDB();
  const id = uuidv4();
  const tx = db.transaction(STORAGE_NAME, 'readwrite');
  const store = tx.objectStore(STORAGE_NAME);
  const newSession: LocalSession = {
    id,
    createdAt: new Date().toISOString(),
    problems: [],
    score: 0,
  };
  store.put(newSession);
  return id;
}

export async function getSession(id: string): Promise<LocalSession | null> {
  const db = await initDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORAGE_NAME, 'readonly');
    const store = tx.objectStore(STORAGE_NAME);
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result || null);
  });
}

export async function getAllSessions(): Promise<LocalSession[]> {
  const db = await initDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORAGE_NAME, 'readonly');
    const store = tx.objectStore(STORAGE_NAME);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
  });
}

export async function updateSession(session: LocalSession): Promise<void> {
  const db = await initDB();
  const tx = db.transaction(STORAGE_NAME, 'readwrite');
  tx.objectStore(STORAGE_NAME).put(session);
}

export async function deleteSession(id: string): Promise<void> {
  const db = await initDB();
  const tx = db.transaction(STORAGE_NAME, 'readwrite');
  tx.objectStore(STORAGE_NAME).delete(id);
}

export async function deleteAllSessions(): Promise<void> {
  const db = await initDB();
  const tx = db.transaction(STORAGE_NAME, 'readwrite');
  tx.objectStore(STORAGE_NAME).clear();
}
