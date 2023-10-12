import React, { useState, useEffect } from 'react';

function App() {
  const [healthCheckResponse, setHealthCheckResponse] = useState('');

  useEffect(() => {
    console.log('Fetching data...');
    // Make a GET request to the health check endpoint on your back-end.
    fetch('http://localhost:3001/health')
      .then(response => response.text())
      .then(data => {
        console.log('Response received:' , data);
        // Update the state with the response data.
        setHealthCheckResponse(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Front-End and Back-End Integration</h1>
      <p>Health Check Response from FrontEnd!: {healthCheckResponse}</p>
    </div>
  );
}

export default App;
