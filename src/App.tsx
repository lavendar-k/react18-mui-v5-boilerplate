import React from "react";
import "./App.css";
import { useAuthContext } from "./Provider/AuthProvider";

function App() {
  const [{ email }, { setEmail }] = useAuthContext();

  return (
    <div className="App">
      <header className="App-header"></header>
      <input
        type="text"
        value={email as string}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
    </div>
  );
}

export default App;
