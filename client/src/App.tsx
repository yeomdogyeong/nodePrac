import "./App.scss";
import React from "react";
import { TodoList } from "./components/TodoList";
import { BrowserRouter, Route, Routes } from "react-router";
import { Calendars } from "./components/Calendars";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/calendar" element={<Calendars />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
