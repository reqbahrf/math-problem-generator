# Math Problem Generator

## 🎯 **Core Features**

- **AI-Powered Math Problem Generation**

  - Uses **Gemini AI** to generate math problems dynamically.
  - Supports **Grade 1–12** with difficulty levels (_Easy, Medium, Hard_).
  - Generates problems from various types: _Addition, Subtraction, Multiplication, Division, Geometry,_ etc.

- **Step-by-Step Learning Assistance**

  - Provides **AI-generated hints** and **detailed step-by-step solutions**.
  - Offers **feedback** after each answer submission to help students learn from mistakes.

- **Answer Evaluation & Feedback**
  - Compares user answers with correct solutions.
  - Gives **instant feedback** on correctness with AI-crafted explanations.
  - Displays progress bars and visual indicators for completion.

## 💾 **Session Management**

- **Local Session Storage (IndexedDB)**

  - Automatically saves user sessions locally.
  - Supports **resuming unfinished sessions**.
  - Sessions store all problems, answers, scores, and timestamps.

- **Session Expiration & Cleanup**

  - Deletes **sessions older than one year**.
  - Includes utilities to **delete individual or all sessions** manually.

- **View Session History**
  - Dedicated page showing all past sessions.
  - Displays summary statistics for each session:
    - Total problems answered
    - Correct vs. incorrect answers
    - Average performance

## 📊 **Analytics & Visualization**

- **Interactive Charts**

  - **Pie chart** for problem type distribution.
  - **Line chart** for difficulty level distribution.
  - Helps visualize learning trends over time.

- **Result Summary Modal**

  - After completing a session, users can view a **comprehensive performance summary** in a modal.
  - Shows each question, user’s answer, correctness, and feedback.

## 🧭 **User Interface & Experience**

- **Dark / Light Mode Support**

  - Theme toggling with persistence across sessions.
  - Smooth transitions and FOUC prevention via an initialization script.

- **Responsive, Animated UI**

  - Built with **Next.js 14 + React 18** using **Framer Motion** for smooth animations.
  - Interactive buttons, modals, and transitions.

- **Configurable Session Setup**

  - Users can select:
    - Number of problems per session
    - Grade level difficulty
  - Quick “Start Practicing” and “View Previous Sessions” actions.

## 🌐 **Technical Integrations**

- **Supabase Backend**

  - Stores generated problems, submissions, and feedback logs.
  - Cleans up outdated records automatically.

- **Google Generative AI (Gemini)**

  - Generates problems and personalized feedback using large language model prompts.
