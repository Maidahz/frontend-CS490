// import React from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './Top-Movies.css'

// class TopMoviesList extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         movielist: null,
//         error: null, //error statement
//       };
//     }
//     // loads and renders data after component is displayed
//     componentDidMount() {
//       axios.get('http://localhost:5000/top-rented-movies')
//       .then(response => {
//         this.setState({ movielist: response.data });
//       })
//       .catch (error => {
//         console.log("Error: fetching top movies.", error);
//         this.setState({ error: 'Error fetching top movies.' }); // Set error state
//       });
//     }

//   render() {
//     const { movielist, error} = this.state; // Correct variable name, destructured from state
//     //console.log(movielist);
//     return (
//         <div className='.list-container'>
//             <h1>Top 5 Rented Movies</h1>
//             {error && <p>{error}</p>} {/* Display error message if there is an error */}
//             <ul>
//                 {movielist ? movielist.map(movie => ( // Corrected here
//                     <li key={movie.film_title}>
//                         <Link to={`/movie/${movie.film_title}`}>{movie.film_title}</Link>
//                     </li>
//                 )) : <p>Loading...</p>}
//             </ul>
//         </div>
//     );
//   }
// }

// export default TopMoviesList;

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Top-Movies.css';

class TopMoviesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movielist: null,
      error: null,
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
    this.props.onMovieClick(movieId);
  };

  render() {
    const { movielist, error } = this.state;

    return (
      <div className="top-movies">
        <h1>Top 5 Rented Movies</h1>
        {error && <p>{error}</p>}
        <ul>
          {movielist
            ? movielist.slice(0, 5).map((movie) => (
                <li key={movie.film_title}>
                  <Link
                    to={`/homepage/movie/${movie.film_title}`}
                    onClick={() => this.handleMovieClick(movie.id)} // Pass movie id on click
                  >
                    {movie.film_title}
                  </Link>
                </li>
              ))
            : <p>Loading...</p>}
        </ul>
      </div>
    );
  }
}

export default TopMoviesList;
