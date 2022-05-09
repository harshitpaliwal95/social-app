import React from 'react';
import {Routes, Route } from 'react-router-dom';
import './App.css';
import { Login, Signup } from './pages';

function App() {
  return (
    <div className="App">
     <Routes>
       <Route path='/' element={<Login/>}/>
       <Route path='/Signup' element={<Signup/>}/>
     </Routes>
    </div>
  );
}

export default App;
