import React from "react";
import "./StateHeader.scss";
import { itemState } from "@/Recoil/itemState";
import { useRecoilState, useRecoilValue } from "recoil";
export const StateHeader = () => {
  const [state, setState] = useRecoilState(itemState);
  const item = useRecoilValue(itemState);
  return (
    <div className="header-container">
      <div className="site-container">homeSiteName</div>
      <div className="buy-container">{item.length}</div>
    </div>
  );
};
