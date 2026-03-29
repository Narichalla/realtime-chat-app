import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithAi = async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: history.map((msg) => ({
        role: msg.role,           // "user" or "model"
        parts: [{ text: msg.text }],
      })),
    });

    const result = await chat.sendMessage(message);
    const reply = result.response.text();

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "AI service failed" });
  }
};