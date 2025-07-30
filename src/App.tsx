import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // Debug state
  const [count, setCount] = useState(0);
  
  // Debug function to demonstrate debugging
  const debugFunction = () => {
    console.log('Debug: Current count is', count);
    console.log('Debug: App is running successfully!');
    
    // Simulate a potential error
    try {
      const testObject = { message: 'Hello from debug!' };
      console.log('Debug: Test object:', testObject.message);
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
