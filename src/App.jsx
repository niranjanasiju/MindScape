import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import Navbar from "./Navbar/Navbar"; // Import Navbar
import ToDoList from "./ToDoList/ToDoList"; // Import ToDoList component
import LandingPage from "./LandingPage/LandingPage"; // Import LandingPage component
import LoginPage from "./LoginPage";
import AudioToText from '../src/AudioToText'

import PomodoroPage from "./Pomodoro";
import Diary from "./Diary/Diary";
function App() {
  return (
    <BrowserRouter>
      
      <div className="container">
        <Routes>
          
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/todo" element={<ToDoList />} />
          <Route path="/pomodoro" element={<PomodoroPage />} />
          <Route path="/recordaudio" element={<AudioToText/>} />
          <Route path="/diary" element={<Diary/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;