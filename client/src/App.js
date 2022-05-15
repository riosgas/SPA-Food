import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";

import React from 'react';

import LandingPage from './components/landingPage/landingPage.js';
import Home from "./components/home/home.js";
import Detail from './components/detail/detail.js';
import CreateRecipe from './components/createRecipe/createRecipe';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/recipe/:id" element={<Detail/>}/>
        <Route path="/recipe/create" exact strict element={<CreateRecipe/>}/>
        <Route path="/*" element={<Navigate to="/home" replace/>}/>
      </Routes>
    </div>
  )
}

export default App;
