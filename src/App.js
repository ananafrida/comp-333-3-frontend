import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import logo from './logo.svg';
import './App.css';

import HomeView from './views/homeView';

function App() {
  return (
    <BrowserRouter>
        <Routes>
              <Route path="/" element={<HomeView />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
