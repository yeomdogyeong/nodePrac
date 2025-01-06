import "./App.scss";
import React from "react";
import { TodoList } from "./components/TodoList";
import { BrowserRouter, Route, Routes } from "react-router";
import { Calendars } from "./components/Calendars";
import { Home } from "./components/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/calendar" element={<Calendars />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
