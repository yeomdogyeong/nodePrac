import React from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

const textState = atom({
  key: "testState",
  default: "a",
});

const charCountState = selector({
  key: "charState",
  get: ({ get }: any) => {
    const text = get(textState);
    return text.length;
  },
});

export const State = () => {
  const [text, setText] = useRecoilState(textState);

  const count = useRecoilValue(charCountState);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    <div>
      <input value={text} onChange={handleInput} />
      {text}
      <div>length:{count}</div>
    </div>
  );
};
