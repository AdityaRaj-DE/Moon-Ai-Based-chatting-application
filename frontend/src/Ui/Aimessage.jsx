import React, { useState } from "react";
import axios from "axios";
import Markdown from "markdown-to-jsx";

const AIChat = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    if (!prompt.trim()) return;

    try {
      // Call the backend route
      const res = await axios.get("VITE_API_URL/ai/get-result", {
        params: { prompt },
      });

      if (res.data.success) {
        setResponse(res.data.data); // Update the response state
      } else {
        setResponse("Failed to get a response from AI.");
      }
    } catch (error) {
      console.error("Error calling AI API:", error.message);
      setResponse("An error occurred while fetching the AI response.");
    }
  };

  return (
    <div className="w-full">
      <div className="py-3 rounded-xl mt-2 w-full flex flex-row gap-2">
        <input
          className="bg-[#eaeaea] w-full py-2 px-4 border-none rounded-xl"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your query..."
        />
        <button className="bg-teal-500 w-10 pt-1 border-none rounded-xl" onClick={handleSend}>
          <i className="ri-send-plane-fill text-white"></i>
        </button>
      </div>
      <div className="bg-zinc-100 h-[30.2rem] w-full rounded-xl p-2 overflow-y-scroll no-scrollbar">
        {!response ? (
          <div className="flex justify-center items-center h-full">
            <div className=" ">
              <i className="ri-gemini-fill text-9xl text-zinc-300"></i>
              <i className="ri-gemini-fill text-3xl text-zinc-300"></i>
              <div>
                <i className="ri-gemini-fill ml-28 text-2xl text-zinc-300"></i>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent animate-gradient rounded-xl p-1">
            <div className="p-4 rounded-lg bg-white text-zinc-700">
              <Markdown
                options={{
                  overrides: {
                    pre: {
                      component: ({ children }) => (
                        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
                          {children}
                        </pre>
                      ),
                    },
                    code: {
                      component: ({ children }) => (
                        <code className="font-mono">{children}</code>
                      ),
                    },
                  },
                }}
              >
                {response}
              </Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChat;
