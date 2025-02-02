import { atom } from "recoil";

export const itemState = atom({
  key: "itemKey",
  default: [{ id: 1, name: "motte", price: 2500 }],
});
