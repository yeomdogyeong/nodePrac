import { useEffect, useRef, useState } from "react";
import Axios from "../axios/axios";
import "../scss/Todo.scss";
export const Todo = () => {
  const [change, setChange] = useState("");
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  //드래그할 아이템의 인덱스
  const dragItem = useRef();
  //드랍할 위치의 아이템의 인덱스
  const dragOverItem = useRef();

  //드래그할 아이템을 집었을때
  const dragStart = (e, position) => {
    dragItem.current = position;
    // console.log("start", e.target.innerHTML);
    console.log("dragItem", dragItem);
  };

  //드래그할 아이템이 어떤 인덱스 위에 포개졌을때
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    // console.log("over", e.target.innerHTML);
    console.log("dragOver", dragOverItem);
  };

  //드래그한 아이템을 놨을때
  //아래에서 위로 올리는게 안됌
  const drop = () => {
    const newList = [...todos];
    //newlist를 잘라야지
    const [remove] = newList.splice(dragItem.current, 1);
    newList.splice(dragOverItem.current, 0, remove);
    setTodos(newList);
    dragOverItem.current = null;
    dragItem.current = null;
  };

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
        <div className="todo-container__input-box">
          hi,
          <input
            className="todo-container__input"
            placeholder="망고에게 보낼말 입력하세요"
            value={value}
            onChange={onChangeInput}
            onKeyDown={handleKeyDown}
          />
          <button className="todo-container__enter-btn" onClick={EnterTodo}>
            Enter!!
          </button>
        </div>
        <div className="todo-container__list">
          {todos.map((item, idx) => (
            <div
              key={idx}
              className="todo-container__item"
              draggable
              onDragStart={(e) => dragStart(e, idx)}
              onDragEnter={(e) => dragEnter(e, idx)}
              onDragEnd={drop}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="todo-container__item-index">{idx}</div>
              <div className="todo-container__item-content">{item}</div>
              <div className="todo-container__item-delete">x</div>
            </div>
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
