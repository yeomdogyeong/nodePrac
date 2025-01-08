import React from "react";
import { Header } from "./Header";
import "./Layout.scss";
import { Footer } from "./Footer";
export const Layout = ({ children }: any) => {
  return (
    <div className="container">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
