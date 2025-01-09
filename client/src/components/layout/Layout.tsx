import React, { useContext } from "react";
import { Header } from "./Header";
import "./Layout.scss";
import { Footer } from "./Footer";
import { ThemeContext } from "@/theme/ThemeProvider";
export const Layout = ({ children }: any) => {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <div className={`container ${isDarkMode ? "dark" : ""}`}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
