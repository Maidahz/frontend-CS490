import React from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';

import './Top-Movies.css';
import MovieDetails from '../MovieDetails/MovieDetails';

class TopMoviesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movielist: null,
      error: null,
      selectedMovie: null,
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/top-rented-movies')
      .then((response) => {
        this.setState({ movielist: response.data });
      })
      .catch((error) => {
        console.log('Error: fetching top movies.', error);
        this.setState({ error: 'Error fetching top movies.' });
      });
  }

  handleMovieClick = (movieId) => {
    // Call a function passed from App.jsx to handle the movie click
    this.setState({ selectedMovie: movieId });
  };

  render() {
    const { movielist, error, selectedMovie } = this.state;

    return (
      <div className="top-movies">
        <h1>Top 5 Rented Movies</h1>
        {error && <p>{error}</p>}
        <ul>
          {movielist
            ? movielist.slice(0, 5).map((movie) => (
                <li key={movie.film_title}>
                  {/* <Link
                    to={`/homepage/movie/${movie.film_title}`}
                    onClick={() => this.handleMovieClick(movie.id)} // Pass movie id on click
                  > */}
                  <span
                    className='movie-name'
                    onClick={() => this.handleMovieClick(movie.id)}  // Use a span with an onClick event to handle the click
                  >
                    {movie.film_title}
                  </span>
                </li>
              ))
            : <p>Loading...</p>}
        </ul>
        <MovieDetails id={selectedMovie} />  {/* Render the MovieDetails component and pass the selected movie's id to it */}
      </div>
    );
  }
}

export default TopMoviesList;
