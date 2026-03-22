function buildPrompt(text) {
  return `You are an assistant that converts unstructured text into a strict JSON summary.
Return only valid JSON with this exact shape:
{
  "summary": "one sentence summary here",
  "keyPoints": ["point 1", "point 2", "point 3"],
  "sentiment": "positive | neutral | negative"
}

Rules:
- summary must be exactly one sentence
- keyPoints must contain exactly 3 short bullet-style strings
- sentiment must be one of: positive, neutral, negative
- do not include markdown
- do not include extra keys
- return only raw JSON, nothing else

Text to analyze:
${text}`;
}

module.exports = { buildPrompt };