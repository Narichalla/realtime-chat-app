import { useState } from "react";
import { sendAiMessage } from "../../../lib/api-client";

const AiChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInput("");
    setLoading(true);

    try {
      const { reply } = await sendAiMessage(input, messages);
      setMessages([...updatedHistory, { role: "model", text: reply }]);
    } catch {
      setMessages([...updatedHistory, { role: "model", text: "Something went wrong. Try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Messages area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {messages.length === 0 && (
          <p style={{ color: "#888", fontSize: "13px", textAlign: "center", marginTop: "20px" }}>
            Ask me anything!
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: m.role === "user" ? "#7C3AED" : "#2a2a3d",
              color: "#fff",
              padding: "9px 13px",
              borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              maxWidth: "80%",
              fontSize: "13.5px",
              lineHeight: "1.5",
              whiteSpace: "pre-wrap",
            }}
          >
            {m.text}
          </div>
        ))}
        {loading && (
          <div
            style={{
              alignSelf: "flex-start",
              backgroundColor: "#2a2a3d",
              color: "#aaa",
              padding: "9px 13px",
              borderRadius: "14px 14px 14px 4px",
              fontSize: "13px",
            }}
          >
            Thinking...
          </div>
        )}
      </div>

      {/* Input row */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          padding: "12px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          backgroundColor: "#1e1e2e",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder="Type a message..."
          style={{
            flex: 1,
            backgroundColor: "#2a2a3d",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            padding: "9px 12px",
            color: "#fff",
            fontSize: "13.5px",
            outline: "none",
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            backgroundColor: "#7C3AED",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "9px 14px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
            fontWeight: "600",
            fontSize: "13.5px",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AiChat;