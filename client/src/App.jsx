import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Axios from "./axios/axios";
function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [value, setValue] = useState("");
  const onChangeInput = (event) => {
    setValue(event.target.value);
    setMessage(value);
  };

  const onClickBtn = async () => {
    const res = await Axios.get("todos");
    console.log(res);
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <div>
          <div>
            hi,{" "}
            <input
              placeholder="망고에게 보낼말 입력하세요"
              value={message}
              onChange={onChangeInput}
            />
          </div>
          <button onClick={onClickBtn}>go!</button>
        </div>

        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
