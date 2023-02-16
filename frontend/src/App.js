import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ResultImageCard } from './components/ResultImageCard';
import { ResultImageCards } from './components/ResultImageCards';
import Navbar  from './components/Navbar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About'
import Regression from './components/Regression';
import Classification from './components/Classification';


function App() {


  return (
    <div className="App">
      <Router>
        <Navbar/ >
        <Routes>
          <Route path="/about" element={<About/>} />
          <Route path="/regression" element={<Regression/>}/>
          <Route path='/classification' element={<Classification/>}/>
          <Route path="/" element={<Home/>} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;