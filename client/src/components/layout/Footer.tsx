import React, { useContext } from "react";
import "./Footer.scss";
import { ThemeContext } from "@/theme/ThemeProvider";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
export const Footer = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  return (
    <>
      <div className="footer">
        <div className="btn-box">
          <button className="btn" onClick={toggleDarkMode}>
            {isDarkMode ? (
              <WbSunnyIcon className="my-icon" />
            ) : (
              <BedtimeIcon className="my-icon" />
            )}
          </button>
        </div>
        <div className="img-box">
          DK{" "}
          <img
            className="imgUrl"
            src="https://github.com/yeomdogyeong.png"
            alt="Profile icon"
          />
        </div>
      </div>
    </>
  );
};
