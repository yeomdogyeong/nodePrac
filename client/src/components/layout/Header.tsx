import React, { useContext } from "react";
import "./Header.scss";
import { ThemeContext } from "@/theme/ThemeProvider";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CalendarMonthSharpIcon from "@mui/icons-material/CalendarMonthSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import { useNavigator } from "@/util/useNavigator";
import { useDate } from "@/util/useDate";
useNavigator;
export const Header = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const { goToAbout } = useNavigator();
  // const newDate = new Date();
  // const year = newDate.getFullYear();
  // const month = newDate.getMonth() + 1;
  // const day = newDate.getDate();
  // const date = `${year}년 ${month}월 ${day}일`;
  const date = useDate();
  return (
    <>
      <div className={`header ${isDarkMode ? "dark" : ""}`}>
        <div className="home-box" onClick={() => goToAbout("")}>
          <HomeSharpIcon />
        </div>
        <div
          style={{
            fontFamily: "Ownglyph_ParkDaHyun",
            fontSize: "20px",
          }}
          className="title"
        >
          오늘은 {date} !
        </div>
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
