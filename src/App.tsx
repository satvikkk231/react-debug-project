import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // Sample bug: undefined variable
  const [count, setCount] = useState(0);
  const undefinedVariable = undefined; // This will cause issues
  
  // Debug function to demonstrate debugging
  const debugFunction = () => {
    console.log('Debug: Current count is', count);
    console.log('Debug: Undefined variable is', undefinedVariable);
    
    // This will cause an error
    try {
      console.log('Debug: Trying to access undefined property:', undefinedVariable.someProperty);
    } catch (error) {
      console.error('Debug: Caught error:', error);
    }
  };

  const handleClick = () => {
    setCount(count + 1);
    debugFunction(); // Call debug function
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>Count: {count}</p>
        <button onClick={handleClick} style={{ padding: '10px 20px', margin: '10px' }}>
          Increment Count (Debug)
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
