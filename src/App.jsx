// import React, { useState, useEffect } from 'react';

// function App() {
//   const [healthCheckResponse, setHealthCheckResponse] = useState('');

//   useEffect(() => {
//     console.log('Fetching data...');
//     // Make a GET request to the health check endpoint on your back-end.
//     fetch('http://localhost:3001/health')
//       .then(response => response.text())
//       .then(data => {
//         console.log('Response received:' , data);
//         // Update the state with the response data.
//         setHealthCheckResponse(data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <div className="App">
//       <h1>Front-End and Back-End Integration</h1>
//       <p>Health Check Response from FrontEnd!: {healthCheckResponse}</p>
//     </div>
//   );
// }

// export default App;
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage  from './components/LandingPage.jsx';
// import TopMoviesList from './components/TopMoviesList.jsx';
import MovieDetails from './components/MovieDetails.jsx';
import TopActorsList from './components/TopActorsList.jsx';
import ActorDetails from './components/ActorDetails.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/actor-details/:id" element={<ActorDetails />} />
      </Routes>
    </Router>
  );
}
export default App;
