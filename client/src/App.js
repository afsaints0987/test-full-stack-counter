import React, { useState, useEffect, useCallback } from "react";

function App() {
  const [counter, setCounter] = useState(0);

  const fetchCount = useCallback(async () => {
    const data = await fetch("http://localhost:5500");
    const count = await data.json();
    setCounter(count);
  }, []);

  const updateCount = useCallback(async () => {
    const response = await fetch("http://localhost:5500/count", {
      method: "POST",
    });
    const count = await response.json();
    setCounter(count);
  }, []);

  useEffect(() => {
    fetchCount();
    const interval = setInterval(fetchCount, 1000);
    return () => clearInterval(interval);
  }, [fetchCount]);

  return (
    <div className="app">
      <h1>{counter}</h1>
      <button onClick={updateCount}>Press Me</button>
    </div>
  );
}

export default App;
