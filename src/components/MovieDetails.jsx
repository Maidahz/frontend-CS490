import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams(); // Destructure id from useParams

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        console.log("ID", id); //Log the id
        const response = await axios.get(`http://localhost:5000/movie/${id}`);
        console.log("Received movie details:", response.data); //Log the response
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  return (
    <div>
      {movie ? (
        <div>
          <h1>{movie.film_title}</h1><p>{movie.description}</p>
          <p>Release Year: {movie.release_year}</p>
          <p>Category: {movie.category_name}</p>
          <p>Rental Duration: {movie.rental_duration} days</p>
          <p>Rental Rate: ${movie.rental_rate}</p>
          <p>Length: {movie.length} minutes</p>
          <p>Rating: {movie.rating}</p>
          {/* Other movie details here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MovieDetails;
