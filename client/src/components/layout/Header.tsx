import React, { useContext } from "react";
import "./Header.scss";
import { ThemeContext } from "@/theme/ThemeProvider";

export const Header = () => {
  const { toggleDarkMode } = useContext(ThemeContext);
  return (
    <div className="header">
      <button onClick={toggleDarkMode}>button for darkmode</button>
      <div>b</div>
      <div>c</div>
    </div>
  );
};
