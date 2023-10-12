import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TopMoviesList from '../components/TopMovies/TopMoviesList';
import TopActorsList from '../components/TopActors/TopActorsList';
import MovieDetails from '../components/MovieDetails/MovieDetails';
import ActorDetails from '../components/ActorDetails/ActorDetails';

function HomePage() {
  return (
    <div>
      <h1>Welcome to Movie Rentals!</h1>
      <Routes>
        <Route path="/" element={(
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <TopMoviesList />
            <TopActorsList />
          </div>
        )} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/actor/:id" element={<ActorDetails />} />
      </Routes>
    </div>
  );
}

export default HomePage;



