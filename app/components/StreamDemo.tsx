// app/components/StreamDemo.tsx
"use client";

import { useState } from "react";

export default function StreamDemo() {
  const [text, setText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const handleStream = async () => {
    setText("");
    setIsStreaming(true);

    const response = await fetch("/api/fake-stream");

    if (!response.body) {
      setIsStreaming(false);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      setText((prev) => prev + chunk);
    }

    setIsStreaming(false);
  };

  return (
    <div className="px-20 pt-10">
      <button
        onClick={handleStream}
        disabled={isStreaming}
        className="border px-4 py-2 rounded-lg disabled:opacity-50"
      >
        {isStreaming ? "Streaming..." : "Start Stream"}
      </button>

      <p className="mt-6 text-lg min-h-[2rem]">
        {text}
        {isStreaming && <span className="animate-pulse">▍</span>}
      </p>
    </div>
  );
}
