import { useEffect, useRef, useState } from "react";
import Axios from "../axios/axios";
import { Dropdown } from "./Dropdown";
import "../scss/TodoList.scss";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
interface CompletedList {
  id: string;
  type?: "dropdown" | null;
  edit?: boolean;
  contents?: string;
}
export const TodoList = () => {
  const [change, setChange] = useState("");
  const [value, setValue] = useState("");
  //편집해서 바뀌는 내용 state
  const [edit, setEdit] = useState("");
  //tag + todo 드래그 가능한 리스트 모음
  const [combinedList, setCombinedList] = useState<CompletedList[]>([]);
  let uuid = self.crypto.randomUUID().slice(0, 6);

  //드래그할 아이템의 인덱스
  const dragItem = useRef<number | null>(null);
  //드랍할 위치의 아이템의 인덱스
  const dragOverItem = useRef<number | null>(null);

  const addTodo = async (id: string) => {
    try {
      await addDoc(collection(db, "todos"), {
        id,
        content: value,
        type: null,
        edit: false,
      });
      console.log("Todo added!");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  //드래그할 아이템을 집었을때
  const dragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    dragItem.current = position;
    console.log(dragItem.current);
  };

  //드래그할 아이템이 어떤 인덱스 위에 포개졌을때
  const dragEnter = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    dragOverItem.current = position;
    console.log(dragOverItem.current);
    // console.log("over", e.target.innerHTML);
  };

  //드래그한 아이템을 놨을때
  //아래에서 위로 올리는게 안됌
  const drop = (e: React.DragEvent<HTMLDivElement>) => {
    // const condition = e.target.innerHTML;
    // if (condition.includes("drop-container")) {
    //   const enterIdx = dragOverItem.current;
    //   const minusIdx = enterIdx - 1;
    //   const plusIdx = enterIdx + 1;
    //   console.log(combinedList[minusIdx]);
    //   const item1 = combinedList[minusIdx].type;
    //   const item2 = combinedList[plusIdx].type;
    //   if (item1 === "dropdown" || item2 === "dropdown") {
    //     return;
    //   }
    // }
    const newList = [...combinedList];
    //null일 경우의 조건을 추가해서 조건을 맞춤
    if (dragItem.current === null || dragOverItem.current === null) return;
    const [remove] = newList.splice(dragItem.current, 1);
    newList.splice(dragOverItem.current, 0, remove);
    setCombinedList(newList);
    dragOverItem.current = null;
    dragItem.current = null;
  };

  //input 바뀔때 실행
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const word = event.target.value;
    setValue(word);
  };

  //투두 입력
  const EnterTodo = () => {
    // const newArr = todos.push(message)
    //     setTodos(todos.push(message));

    const newList = [
      ...combinedList,
      { id: uuid, contents: value, edit: false },
    ];
    setCombinedList(newList);
    setValue("");
  };

  //투두 삭제
  const handleDelete = (id: string) => {
    const newList = combinedList.filter((el) => el.id !== id);
    setCombinedList(newList);
  };
  //엔터 시 한글 두 번 중복 방지
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
      EnterTodo();
    }
  };

  const handleEdit = (id: string) => {
    const newList = [...combinedList];
    const select = combinedList.find((el) => el.id === id);
    const idx = combinedList.findIndex((el) => el.id === id);

    if (select) {
      select.edit = true;
      newList.splice(idx, 1, select);
    }

    setCombinedList(newList);
    //select가 있으면 편집기능 on
    // if (select) {
    //   select.edit = true;
    // }
  };

  const handleEditSucess = (id: string) => {
    const newList = [...combinedList];
    const select = combinedList.find((el) => el.id === id);
    const idx = combinedList.findIndex((el) => el.id === id);

    if (select) {
      select.edit = false;
      select.contents = edit;
      newList.splice(idx, 1, select);
    }
    console.log(select);
    setCombinedList(newList);
  };

  const editOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit(e.target.value);
    console.log(edit);
  };

  //서버에서 요청받기
  const handleData = async () => {
    const res = await Axios.get("todos");
    console.log(res);
  };

  const plusPlace = () => {
    setCombinedList([...combinedList, { id: uuid, type: "dropdown" }]);
    console.log(combinedList);
  };

  const deleteDrop = (id: string) => {
    const newList = combinedList.filter((el) => el.id !== id);
    setCombinedList(newList);
    console.log(combinedList);
  };

  useEffect(() => {}, [combinedList]);

  return (
    <div id="todoBox">
      <section className="todo-container">
        <div className="todo-container__header-box">
          <div className="todo-container__input-box">
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
          <div className="todo-container__place-box" onClick={plusPlace}>
            + 장소
          </div>
        </div>
        <div className="todo-container__list">
          {combinedList.map((item, idx) => (
            <div
              key={item.id}
              className="todo-container__item"
              draggable
              onDragStart={(e) => dragStart(e, idx)}
              onDragEnter={(e) => dragEnter(e, idx)}
              onDragEnd={(e) => drop(e)}
              onDragOver={(e) => e.preventDefault()}
            >
              {item.type === "dropdown" ? (
                <div key={item.id} className="drop">
                  <Dropdown deleteDrop={() => deleteDrop(item.id)} />
                </div>
              ) : item.edit ? (
                <div className="edit">
                  <input value={edit} onChange={(e) => editOnChange(e)} />
                  <button
                    className="todo-container__item-edit-success"
                    onClick={() => handleEditSucess(item.id)}
                  >
                    완료
                  </button>
                </div>
              ) : (
                <div className="todo" key={item.id}>
                  <div className="todo-container__item-content">
                    {item.contents}
                  </div>
                  <div className="todo-container__item-edit-box">
                    <div
                      className="todo-container__item-edit"
                      onClick={() => handleEdit(item.id)}
                    >
                      수정
                    </div>

                    <div
                      className="todo-container__item-delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      x
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="btn-box">
          <button onClick={() => addTodo(uuid)}>console</button>
          <button onClick={handleData}>goData!</button>
        </div>
      </section>
    </div>
  );
};
