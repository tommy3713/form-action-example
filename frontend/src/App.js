import React, { useState } from 'react';
import './App.css';
function App() {
  // The URL to your backend API
  const apiUrl = 'http://localhost:3000/data';
  const getImageApiUrl = 'http://localhost:3000/get-image'

  return (
    <div className="App">
      <header className="App-header">
        <p>Submit data to Fastify backend</p>
        <form action={apiUrl} method="POST">
          <input
            name="data"
            type="text"
            placeholder="Enter some data"
          />
          <button type="submit">Submit</button>
        </form>
        <form action={getImageApiUrl} method="POST">
          <button type="submit">Get Image</button>
        </form>
      </header>
    </div>
  );
}
export default App;
