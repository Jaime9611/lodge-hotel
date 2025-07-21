import { useState } from "react";
import "./App.css";

function App(props) {
  const [count, setCount] = useState(1);
  return (
    <div>
      <h1>
        Hello {props.name} x{count}!
      </h1>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
  a;
}

export default App;
