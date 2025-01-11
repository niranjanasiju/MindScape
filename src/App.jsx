import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar"; // Import Navbar
import ToDoList from "./ToDoList/ToDoList"; // Import ToDoList component
import LandingPage from "./LandingPage/LandingPage"; // Import LandingPage component

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Navbar now within BrowserRouter */}
      <div className="container">
        <Routes>
          <Route path="/" element={<ToDoList />} />
          <Route path="/landing" element={<LandingPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
