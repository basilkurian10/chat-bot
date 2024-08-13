
"use client"
import { useState } from "react";
import { HfInference } from "@huggingface/inference";

const inference = new HfInference("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");

export default function MentalHealthChatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    let botResponse = "";

    try {
      for await (const chunk of inference.chatCompletionStream({
        model: "microsoft/DialoGPT-medium",
        messages: [...messages, userMessage],
        max_tokens: 150,  // Reduced token limit for more concise responses
      })) {
        if (chunk.choices[0]?.delta?.content) {
          botResponse += chunk.choices[0].delta.content;
        }

        // Break the loop if the response seems complete
        if (chunk.choices[0]?.finish_reason) {
          break;
        }
      }
    } catch (error) {
      botResponse = "Sorry, I'm having trouble understanding. Can you please rephrase?";
    }

    setMessages((prev) => [...prev, { role: "assistant", content: botResponse.trim() }]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mental Health Advisor Chatbot</h1>
      <div style={{ marginBottom: "20px", height: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <strong>{msg.role === "user" ? "You" : "Advisor"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        style={{ width: "80%", padding: "10px", marginRight: "10px" }}
      />
      <button onClick={handleSend} style={{ padding: "10px 20px" }}>
        Send
      </button>
      <p style={{ marginTop: "20px", fontSize: "12px", color: "gray" }}>
        Disclaimer: This chatbot is not a substitute for professional mental health services.
      </p>
    </div>
  );
}

