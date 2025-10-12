### Requirements Checklist

- [x] AI generates appropriate Primary 5 level math problems
- [x] Problems and answers are saved to Supabase
- [x] User submissions are saved with feedback
- [x] AI generates helpful, personalized feedback
- [x] UI is clean and mobile-responsive
- [x] Error handling for API failures
- [x] Loading states during API calls

## Assessment Submission

When submitting your assessment, provide:

1. **GitHub Repository URL**: https://github.com/reqbahrf/math-problem-generator.git
2. **Live Demo URL**: https://mathgenai.vercel.app
3. **Supabase Credentials**: Add these to your README for testing:
   ```
   SUPABASE_URL: https://tpkrfcfsjjsjxwfvyngp.supabase.co
   SUPABASE_ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwa3JmY2Zzampzanh3ZnZ5bmdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwMjgwNDYsImV4cCI6MjA3NTYwNDA0Nn0.TNqPvAmvJp3FPfviQNUacaUD9peAcr68ShSmZy4b844
   ```

## Implementation Notes

_Please fill in this section with any important notes about your implementation, design decisions, challenges faced, or features you're particularly proud of._

### My Implementation:

- In my implementation, I have included a dark mode and light mode toggle button. utilising the tailwindcss **dark** class to let the user choose their preferred mode. and to lessen the eye strain when using the web app at nighttime.
- I have included a label in the problem card to let the user know the type of the problem and the difficulty level of the problem. as well as a hint toggle button to let the user get a hint for the problem.
- I have also included a rate limit middleware on the **/api/** route to prevent the user from making too many requests to the API.

## Additional Features (Optional)

If you have time, consider adding:

- [x] Difficulty levels (Easy/Medium/Hard)
- [x] Problem history view
- [x] Score tracking
- [x] Different problem types (addition, subtraction, multiplication, division)
- [x] Hints system
- [x] Step-by-step solution explanations

---

Good luck with your assessment! 🎯
