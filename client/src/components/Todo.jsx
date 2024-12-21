import { useEffect, useState } from "react";
import Axios from "../axios/axios";
import "../scss/Todo.scss";
export const Todo = () => {
  const [change, setChange] = useState("");
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  //key로 정해질 랜덤한 수
  //얘떔에 계속 오류남; 뭐야
  // let uuid = self.crypto.randomUUID();

  //input 바뀔때 실행
  const onChangeInput = (event) => {
    const word = event.target.value;
    setValue(word);
  };
  const EnterTodo = () => {
    // const newArr = todos.push(message)
    //     setTodos(todos.push(message));

    setTodos([...todos, value]);

    console.log(todos);

    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
      EnterTodo();
    }
  };

  const handleData = async () => {
    const res = await Axios.get("todos");
    console.log(res);
  };

  useEffect(() => {}, [todos]);

  return (
    <div id="todoBox">
      <section className="todo-container">
        <div>
          hi,
          <input
            placeholder="망고에게 보낼말 입력하세요"
            value={value}
            onChange={onChangeInput}
            onKeyDown={handleKeyDown}
          />
          <button onClick={EnterTodo}>Enter!!</button>
        </div>
        <div>
          {todos.map((item, idx) => (
            <div key={idx}>{item}</div>
          ))}
        </div>
        <div className="btn-box">
          <button onClick={() => console.log(change)}>console</button>
          <button onClick={handleData}>goData!</button>
        </div>
      </section>
    </div>
  );
};
