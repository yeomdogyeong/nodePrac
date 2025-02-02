import { Underline } from "lucide-react";
import React, { useState } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { todoListState } from "@/Recoil/todoListState";
import { StateHeader } from "./StateHeader";

export const Todo = () => {
  const [inputV, setInputV] = useState("");
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputV(e.target.value);
  };
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [id, setId] = useState(3);
  const text = useRecoilValue(todoListState);

  const getId = () => {
    return setId(id + 1);
  };
  const addItem = () => {
    setTodoList((oldV) => [
      ...oldV,
      {
        id: id,
        value: `${inputV}`,
        do: false,
        extra: editContent,
        edit: false,
      },
    ]);
    getId();
  };

  const removeItem = (id: number) => {
    const newList = todoList.filter((el) => el.id !== id);
    setTodoList(newList);
  };

  const toggleTodo = (id: number) => {
    const newList = todoList.map((el) =>
      el.id === id ? { ...el, do: !el.do } : el
    );
    setTodoList(newList);
  };
  //
  const [editContent, setEditContent] = useState("");
  const finishEdit = (e: any, id: number) => {
    // setEditContent(e.target.value);
    setTodoList(
      todoList.map((el) => (el.id === id ? { ...el, edit: false } : el))
    );
  };

  const startEdit = (id: number) => {
    console.log(id);
    setTodoList(
      todoList.map((el) => (el.id === id ? { ...el, edit: true } : el))
    );
  };
  const editTodo = (id: number, e: any) => {
    const newList = todoList.map((el) =>
      el.id === id ? { ...el, extra: e.target.value } : el
    );
    setEditContent(e.target.value);
    setTodoList(newList);
  };
  return (
    <div>
      <StateHeader />
      <input value={inputV} onChange={handleInput} />
      <button onClick={addItem}>plus</button>
      {text.map((el) => (
        <div key={el.id}>
          <div>id: {el.id}</div>
          <div>name: {el.value}</div>

          <div
            style={{ textDecoration: el.do === true ? "line-through" : "" }}
            onClick={() => toggleTodo(el.id)}
          >
            do
          </div>

          <button onClick={() => removeItem(el.id)}>delete</button>
          <br />
          {el.edit ? (
            <>
              <input value={el.extra} onChange={(e) => editTodo(el.id, e)} />
              <button onClick={(e) => finishEdit(e, el.id)}>done</button>{" "}
            </>
          ) : (
            <button onClick={() => startEdit(el.id)}>{el.extra}</button>
          )}
        </div>
      ))}
    </div>
  );
};
