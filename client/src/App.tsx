import "./App.scss";
import React from "react";
import { TodoList } from "./components/TodoList";
import { BrowserRouter, Route, Routes } from "react-router";
import { Calendars } from "./components/Calendars";
import { Home } from "./components/Home";
import { ThemeProvider } from "./theme/ThemeProvider";
import "./scss/font.scss";
import { ShopHome } from "./components/shopping/ShopHome";
import { DetailPage } from "./components/shopping/DetailPage";
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shopping" element={<ShopHome />} />
          <Route path="/shoppingItem" element={<DetailPage />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/todo/calendar" element={<Calendars />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
