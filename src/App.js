import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import logo from './logo.svg';
import './App.css';

import HomeView from './views/homeView';
import CreateView from './views/createView'

function App() {
  return (
    <BrowserRouter>
        <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/create" element={<CreateView />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
