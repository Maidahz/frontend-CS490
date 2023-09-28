import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class TopMoviesList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        movielist: null,
        error: null, //error statement
      };
    }
  
    // loads and renders data after component is displayed
    componentDidMount() {
      // fetchModel("http://localhost:3000/user/" + this.props.match.params.userId).then(response => {
      //   this.setState({ user: response.data });
      // });
      axios.get('http://localhost:5000/top-rented-movies')
      .then(response => {
        this.setState({ movielist: response.data });
      })
      .catch (error => {
        console.log("Error: fetching top movies.", error);
        this.setState({ error: 'Error fetching top movies.' }); // Set error state
      });
    }

  render() {
    const { movielist, error } = this.state; // Correct variable name, destructured from state
    console.log(movielist);
    return (
        <div>
            <h1>Top 5 Rented Movies</h1>
            {error && <p>{error}</p>} {/* Display error message if there is an error */}
            <ul>
                {movielist ? movielist.map(movie => ( // Corrected here
                    <li key={movie.film_title}>
                        <Link to={`/movie/${movie.film_title}`}>{movie.film_title}</Link>
                    </li>
                )) : <p>Loading...</p>}
            </ul>
        </div>
    );
  }
}

export default TopMoviesList;
