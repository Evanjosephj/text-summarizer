function validateInput(text) {
  if (!text || typeof text !== "string") {
    return { valid: false, error: "Input must be a string." };
  }
  if (text.trim().length === 0) {
    return { valid: false, error: "Input text cannot be empty." };
  }
  if (text.trim().length < 10) {
    return { valid: false, error: "Input text is too short to summarize." };
  }
  return { valid: true };
}

module.exports = { validateInput };