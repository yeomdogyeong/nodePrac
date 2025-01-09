import "./App.scss";
import React from "react";
import { TodoList } from "./components/TodoList";
import { BrowserRouter, Route, Routes } from "react-router";
import { Calendars } from "./components/Calendars";
import { Home } from "./components/Home";
import { ThemeProvider } from "./theme/ThemeProvider";
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/calendar" element={<Calendars />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
