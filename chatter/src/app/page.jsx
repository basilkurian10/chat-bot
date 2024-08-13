
"use client"
import { useState } from "react";
import { HfInference } from "@huggingface/inference";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRobot } from '@fortawesome/free-solid-svg-icons'; // Importing icons

const responses = {
  tiredness: "Feeling unusually tired and weak can be caused by a variety of factors, including stress, lack of sleep, or underlying health conditions. It’s important to consider other symptoms you might be experiencing and consult a healthcare professional for a thorough evaluation and accurate diagnosis.",
  anxiety: "Anxiety and feeling overwhelmed can be challenging. It’s beneficial to practice relaxation techniques such as deep breathing, meditation, or physical exercise. However, if these feelings persist, it’s crucial to seek support from a mental health professional who can provide tailored strategies and support.",
  headache: "Persistent headaches can have various causes, including tension, dehydration, or more serious conditions like migraines or sinusitis. It’s important to track the frequency, duration, and intensity of your headaches and consult a healthcare provider to determine the underlying cause and appropriate treatment.",
  medication: "It’s important to read the information provided with your medication and discuss any concerns with your healthcare provider. Common side effects are usually listed, but if you experience any severe or unusual symptoms, contact your doctor immediately for guidance.",
  sleep: "Improving sleep quality can often be achieved by maintaining a consistent sleep schedule, creating a relaxing bedtime routine, and ensuring your sleep environment is comfortable. Limiting screen time before bed and avoiding caffeine in the evening can also help. If sleep issues persist, consider consulting a healthcare provider for further evaluation."
};

export default function MentalHealthChatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  

  const handleSend = async () => {
    if (!input.trim()) return;

    // const res = await fetch('/api/chat', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ input }),
    // });

    // const data = await res.json();
    // console.log("data",data)

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    let botResponse = "";

    // try {
    //   for await (const chunk of inference.chatCompletionStream({
    //     model: "microsoft/DialoGPT-large",
    //     messages: [...messages, userMessage],
    //     max_tokens: 150,  // Reduced token limit for more concise responses
    //   })) {
    //     if (chunk.choices[0]?.delta?.content) {
    //       botResponse += chunk.choices[0].delta.content;
    //     }

    //     // Break the loop if the response seems complete
    //     if (chunk.choices[0]?.finish_reason) {
    //       break;
    //     }
    //   }
 

    

    const responseKey = Object.keys(responses).find(key => input.toLowerCase().includes(key));

    setMessages((prev) => [...prev, { role: "assistant", content: responseKey ? responses[responseKey] : "I'm here to help. Please provide more details or consult a healthcare professional for specific concerns." }]);
  };

  return (
    <div>
      <div style={{ width: '100%', overflow: 'hidden', height: '200px' }}> {/* Adjust height as needed */}
      <div className="relative w-full h-60">
      <img
        src="/mental22.jpg"
        alt="Cover"
        style={{
          width: '100%',
          height: '100%', // Ensures the image covers the specified height
          objectFit: 'cover', // Adjusts the image to cover the entire area without distortion
        }}
      />
      <div className="absoltue left-0 top-1/2">Mind Mate</div>
      </div>
    </div>
    <div className="p-20">
      <h1>Mental Health Advisor Chatbot</h1>
      <div style={{ marginBottom: "20px", height: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
      {messages.map((msg, index) => (
        <div key={index} style={{ marginBottom: "10px", display: 'flex', alignItems: 'center' }}>
          <FontAwesomeIcon
            icon={msg.role === "user" ? faUser : faRobot}
            style={{ marginRight: "10px", color: msg.role === "user" ? "#007bff" : "#28a745" }}
          />
          <div>
            <strong>{msg.role === "user" ? "You" : "Advisor"}:</strong> {msg.content}
          </div>
        </div>
      ))}
      </div>
      <input
        type="text"
        placeholder="Ask anything"
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
    <div className="p-20 w-full flex flex-row justify-between">
    <div>
      <iframe
        width="740"
        height="500"
        src="https://www.youtube.com/watch?v=5oHnGu-TZ3E"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    <div>
      <iframe
        src="/Mental_Health_ChatBot.pdf"
        width="500px"
        height="500px"
        style={{ border: 'none' }}
        title="Report"
      ></iframe>
    </div>
    </div>
    </div>
  );
}

