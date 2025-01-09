import React, { useContext } from "react";
import "./Header.scss";
import { ThemeContext } from "@/theme/ThemeProvider";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import { useNavigate } from "react-router";
export const Header = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const date = `${year}년 ${month}월 ${day}일`;
  const goToAbout = (route: string) => {
    navigate(`/${route}`);
  };

  return (
    <>
      <div className={`header ${isDarkMode ? "dark" : ""}`}>
        <div className="home-box">
          <HomeSharpIcon />
        </div>
        <div className="title">오늘은 {date} !</div>
        <div className="btn-box">
          <button className="btn" onClick={() => goToAbout("calendar")}>
            <CalendarMonthSharpIcon />
          </button>
        </div>
      </div>
      <div className={`header2 ${isDarkMode ? "dark" : ""}`}></div>
    </>
  );
};
