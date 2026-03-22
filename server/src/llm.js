const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });
const Groq = require("groq-sdk");
const { buildPrompt } = require("./prompt");

async function summarizeText(text) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is missing. Check your .env file.");
  }

  const groq = new Groq({ apiKey });
  const prompt = buildPrompt(text);

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  const raw = response.choices?.[0]?.message?.content;

  if (!raw) {
    throw new Error("No response received from Groq.");
  }

  const cleaned = raw.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error("Groq returned invalid JSON. Try again.");
  }
}

module.exports = { summarizeText };