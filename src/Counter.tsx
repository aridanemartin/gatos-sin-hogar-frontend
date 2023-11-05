import React from "react";

interface CounterProps {
  count: number;
  setCount: (count: number) => void;
  kilian: string;
}

export const Counter = ({ count, setCount, kilian }: CounterProps) => {
  console.log("se rerenderiza el contador");
  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count} and {kilian}
      </button>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </>
  );
};
