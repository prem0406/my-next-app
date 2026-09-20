"use client";
import { useEffect, useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  //We can use useEffect to update the date when the component mounts
  // This will prevent the hydration error that occurs when the server-rendered HTML does not match the client-rendered HTML.
  const [date, setDate] = useState("");
  useEffect(() => {
    setDate(new Date().toUTCString());
  }, []);

  return (
    <div className="px-20 pt-10">
      <button
        className="border bg-blue-400 px-4 py-2 rounded-xl text-lg text-white"
        onClick={() => setCount(count + 1)}
      >
        Count: {count}
      </button>
      <p>Today's Date: {date}</p>
    </div>
  );
}
