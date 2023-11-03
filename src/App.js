import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import logo from './logo.svg';
import './App.css';

import HomeView from './views/homeView';
import CreateView from './views/createView';
import ReadView from './views/readView';
import UpdateView from './views/updateView';
import DeleteView from './views/deleteView';
import LoginView from './views/loginView';
import RegisterView from './views/registerView';

function App() {
  return (
    // setting different routing parth for different files 
    <BrowserRouter>
        <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/create" element={<CreateView />} />
              <Route path="/read" element={<ReadView />} />
              <Route path="/update=" element={<UpdateView />} />
              <Route path="/delete" element={<DeleteView />} />
              <Route path="/register" element={<RegisterView />} />
              <Route path="/login" element={<LoginView />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
