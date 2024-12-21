import { useState } from "react";
import Axios from "../axios/axios";
import "../scss/Todo.scss";
export const Todo = () => {
  const [message, setMessage] = useState("");

  const onChangeInput = (event) => {
    setMessage(event.target.value);
  };

  const onClickBtn = async () => {
    const res = await Axios.get("todos");
    console.log(res);
  };

  return (
    <div id="todoBox">
      <section className="todo-container">
        <div>
          hi,
          <input
            placeholder="망고에게 보낼말 입력하세요"
            value={message}
            onChange={onChangeInput}
          />
        </div>
        <div>
          <button onClick={() => console.log(message)}>console</button>
          <button onClick={onClickBtn}>goData!</button>
        </div>
        <div>aa</div>
      </section>
    </div>
  );
};
