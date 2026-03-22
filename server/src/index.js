const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });
const express = require("express");
const cors = require("cors");
const { summarizeText } = require("./llm");
const { validateInput } = require("./validate");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/summarize", async (req, res) => {
  const text = req.body?.text?.trim();

  const validation = validateInput(text);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  try {
    const result = await summarizeText(text);
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to summarize text." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
