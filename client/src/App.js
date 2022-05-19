import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
//import './App.css';

import LandingPage from './components/landingPage/';
import Home from "./components/home/";
import Detail from './components/detail/';
import CreateRecipe from './components/createRecipe/';
import Suggestions from './components//home/suggestions';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/sugg" element={<Suggestions/>}/>
        <Route path="/recipe/:id" element={<Detail/>}/>
        <Route path="/recipe/create" exact strict element={<CreateRecipe/>}/>
        <Route path="/*" element={<Navigate to="/home" replace/>}/>
      </Routes>
    </div>
  )
}

export default App;
