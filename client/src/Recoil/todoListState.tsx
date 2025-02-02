import { atom } from "recoil";

export const todoListState = atom({
  key: "todoListState",
  default: [
    { id: 1, value: "mango", do: false, extra: "wow", edit: false },
    { id: 2, value: "dg", do: false, extra: "dummy!", edit: false },
  ],
});
