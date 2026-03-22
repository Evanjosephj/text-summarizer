# Text Summarizer

A full-stack AI-powered tool that accepts unstructured text and returns a structured summary using Groq's LLM API.

## Features
- One-sentence summary
- Three key points
- Sentiment label (positive / neutral / negative)
- Clean web UI with dark/light mode
- REST API backend

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| LLM | Groq API (llama-3.3-70b-versatile) |
| Styling | React Icons, inline styles |

## Project Structure
```
text-summarizer/
  client/          ← React frontend
    src/
      App.jsx
      main.jsx
      components/
        ResultCard.jsx
  server/          ← Express backend
    src/
      index.js     ← API routes
      llm.js       ← Groq API call
      prompt.js    ← Prompt design
      validate.js  ← Input validation
    .env.example
  README.md
```

## Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/text-summarizer
cd text-summarizer
```

### 2. Setup server
```bash
cd server
npm install
cp .env.example .env
```

Add your Groq API key to `server/.env`:
```
GROQ_API_KEY=your_groq_api_key_here
```

Get a free API key at: https://console.groq.com

### 3. Setup client
```bash
cd ../client
npm install
```

### 4. Run the app

**Terminal 1 — Start server:**
```bash
cd server
node src/index.js
```

**Terminal 2 — Start client:**
```bash
cd client
npm run dev
```

Open http://localhost:5173 in your browser.

## API

### POST /api/summarize

**Request:**
```json
{
  "text": "Your unstructured text here..."
}
```

**Response:**
```json
{
  "summary": "One sentence summary.",
  "keyPoints": ["Point 1", "Point 2", "Point 3"],
  "sentiment": "positive | neutral | negative"
}
```

## Example Output

**Input:**
```
Artificial intelligence is transforming the world. Companies are investing billions in AI research. 
Many jobs are changing because of automation. Some experts believe AI will create more jobs than 
it destroys, while others warn of significant unemployment. Governments are now starting to 
regulate AI development to ensure safety and fairness.
```

**Output:**
```json
{
  "summary": "Artificial intelligence is transforming the world and changing the job market, with companies investing heavily in AI research and governments starting to regulate its development.",
  "keyPoints": [
    "AI is transforming the world",
    "AI is changing the job market",
    "Governments are regulating AI development"
  ],
  "sentiment": "neutral"
}
```

## Why Groq?

I chose Groq over OpenAI and Gemini because:
- Free tier is generous (14,400 requests/day)
- Very fast response times
- Compatible with OpenAI-style SDK
- No credit card required

## Prompt Design

The prompt is designed to return strict JSON only:
- Defines exact output shape upfront
- Lists explicit rules (no markdown, no extra keys)
- Restricts sentiment to three allowed values only
- This reduces parsing errors and inconsistent output

## Trade-offs & Shortcuts

- Skipped authentication — not needed for this scope
- No test coverage — prioritized working code within time limit
- Simple inline styles instead of CSS framework — keeps dependencies minimal
- Single API endpoint — clean and easy to explain

## What I Would Add With More Time

- File upload support (PDF, .txt)
- Batch processing of multiple files
- Copy to clipboard button
- Export result as JSON or PDF
- Rate limiting on the backend
- Unit tests for prompt and validation logic