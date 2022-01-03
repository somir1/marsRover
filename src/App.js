import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Search from './components/Search';

function App() {


  return (
        <div className="App">
          <div className = "test">
            <h2>Welcome</h2>
            <p>Please input a date below if no images show please select any date after the year 2013 </p>
            <Search></Search>
          </div>
        </div>
  );
}

export default App;
