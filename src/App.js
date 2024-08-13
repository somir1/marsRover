import React from 'react';
import './App.css'; // Importing the CSS file
import Search from './components/Search';

function App() {
  return (
    <div className="App flex justify-center w-full p-4 min-h-screen">
      <main className="flex flex-col justify-start items-center w-full max-w-4xl">
        <div className="w-full text-center text-5xl">
          <h2 className="drop-shadow-md text-white">Welcome</h2>
          <p className="text-white text-lg sm:text-xl mt-4">
            Please input a date below. If no images show, please select any date after the year 2013.
          </p>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-full max-w-md">
            <Search />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
