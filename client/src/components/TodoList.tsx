import { useEffect, useRef, useState } from "react";
import Axios from "../axios/axios";
import { Dropdown } from "./Dropdown";
import "../scss/TodoList.scss";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate, useParams, useSearchParams } from "react-router";
import Calendar from "react-calendar";
import { Button } from "./ui/button";
import { Layout } from "./layout/Layout";
interface CompletedList {
  id: string;
  type?: "dropdown" | null;
  edit?: boolean;
  contents?: string;
  date: string;
}
export const TodoList = () => {
  const [change, setChange] = useState("");
  const [value, setValue] = useState("");
  //편집해서 바뀌는 내용 state
  const [edit, setEdit] = useState<string>("");
  //tag + todo 드래그 가능한 리스트 모음
  // const [saveList, setSaveList] = useState<CompletedList[]>([]);
  const [combinedList, setCombinedList] = useState<CompletedList[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  //null일 때 값 처리
  const todoDay = searchParams.get("day") ?? "";
  const { id } = useParams();

  let uuid = self.crypto.randomUUID().slice(0, 6);
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const date = `${year}-${month}-${day}`;
  const newDateSlice = newDate.toString().substring(0, 15);

  //드래그할 아이템의 인덱스
  const dragItem = useRef<number | null>(null);
  //드랍할 위치의 아이템의 인덱스
  const dragOverItem = useRef<number | null>(null);

  const navigate = useNavigate();

  const goToAbout = (route: string) => {
    navigate(`/${route}`);
  };

  //localstorage에 문자열 데이터를 객체/배열로 변환
  const goToObj = (value: string) => {
    return JSON.parse(value);
  };
  //객체를 json으로 변환
  const goToJson = <T,>(value: T) => {
    return JSON.stringify(value);
  };

  const addTodo = async (uuid: string) => {
    const newList = {
      id: uuid,
      contents: value,
      type: null,
      edit: false,
      date,
    };
    // await addDoc(collection(db, "todos"), newList);
    console.log(newList);
    const getList = goToObj(localStorage.getItem(todoDay) || "[]");
    getList.push(newList);
    localStorage.setItem(todoDay, goToJson(getList));

    setValue("");
    setCombinedList(JSON.parse(localStorage.getItem(todoDay) ?? "[]"));
  };

  //로컬스토리지에서 오늘의
  //TodoList 불러옴ㄴ
  const getAllTodos = () => {
    let todos = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key !== null && key === todoDay) {
        const value = localStorage.getItem(key);
        console.log("v", value);
        if (value) {
          todos.push(JSON.parse(value));
        }
      }
    }

    if (todos.length === 0) {
      todos.push([]);
    }
    setCombinedList(todos[0]);
    console.log(todos);
    // setSaveList(todos[0]);
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
      { id: uuid, contents: value, edit: false, date: date },
    ];
    setCombinedList(newList);
    setValue("");
  };

  //투두 삭제
  const handleDelete = (id: string) => {
    const newList = combinedList.filter((el) => el.id !== id);
    //삭제된 배열 로컬스토리지에 적용 + todoDay이 null이 아니라는거 인증
    if (todoDay !== null) {
      localStorage.setItem(todoDay, JSON.stringify(newList));
    }
    //빈배열일때 localStorage에서 해당 키,밸류 삭제
    if (newList.length === 0) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key === todoDay) {
          localStorage.removeItem(todoDay);
        }
      }
    }
    console.log(newList);
    setCombinedList(newList);
  };
  //엔터 시 한글 두 번 중복 방지
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
      addTodo(uuid);
    }
  };

  const handleEdit = (id: string) => {
    const newList = [...combinedList];
    const select = combinedList.find((el) => el.id === id);
    const idx = combinedList.findIndex((el) => el.id === id);

    if (select) {
      select.edit = true;
      setEdit(select.contents ?? "");
      newList.splice(idx, 1, select);
    }

    setCombinedList(newList);
    if (todoDay !== null) {
      localStorage.setItem(todoDay, JSON.stringify(newList));
    }
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
    if (todoDay !== null) {
      localStorage.setItem(todoDay, JSON.stringify(newList));
    }
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
    setCombinedList([...combinedList, { id: uuid, type: "dropdown", date }]);
    console.log(combinedList);
  };

  const deleteDrop = (id: string) => {
    const newList = combinedList.filter((el) => el.id !== id);
    setCombinedList(newList);
    console.log(combinedList);
  };

  useEffect(() => {
    getAllTodos();
    console.log(todoDay);
  }, []);

  return (
    <Layout>
      <div id="todoBox">
        <section className="todo-container">
          <div className="todo-container__header-box">
            <div className="todo-container__input-box">
              <input
                className="todo-container__input-box-input"
                placeholder="망고에게 보낼말 입력하세요"
                value={value}
                onChange={onChangeInput}
                onKeyDown={handleKeyDown}
              />
              {/* <Button>Enter</Button> */}
              <button
                className="todo-container__input-box-button"
                onClick={() => addTodo(uuid)}
              >
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
                className="todo-container__list__item"
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
                    <div className="content">{item.contents}</div>
                    <div className="edit-box">
                      <div className="edit" onClick={() => handleEdit(item.id)}>
                        수정
                      </div>

                      <div
                        className="delete"
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
            {/* <Button>Test Button</Button>

            <button onClick={() => goToAbout("calendar")}>goCalender</button>
            <button onClick={handleData}>goData!</button> */}
          </div>
        </section>
      </div>
    </Layout>
  );
};
