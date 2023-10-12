// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import './actor-details.css';

// function ActorDetails() {
//   const [details, setDetails] = useState(null);
//   const { id } = useParams();

//   useEffect(() => {
//     async function fetchActorDetails() {
//       try {
//         const response = await axios.get(`http://localhost:5000/actor/${id}`);
//         setDetails(response.data);
//       } catch (error) {
//         console.error("Error fetching actor details:", error);
//       }
//     }
//     fetchActorDetails();
//   }, [id]);

//   if (!details) return <div>Loading...</div>;

//   // Slice the movies array to get only the top 5 movies
//   const top5Movies = details.movies.slice(0, 5);

//   return (
//     <div>
//       <div>
//         <h1>{details.actor.first_name} {details.actor.last_name}</h1>
//         <h2>Top Movies</h2>
//         <ul>
//           {top5Movies.map(movie => (
//             <li key={movie.film_id}>{movie.title}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default ActorDetails;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './actor-details.css';

function ActorDetails({ actorId }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (actorId) {
      async function fetchActorDetails() {
        try {
          const response = await axios.get(`http://localhost:5000/actor/${actorId}`);
          setDetails(response.data);
        } catch (error) {
          console.error("Error fetching actor details:", error);
        }
      }
      fetchActorDetails();
    }
  }, [actorId]);

  return (
    <div className="actor-details-card">
      <h2>Actor Details</h2>
      {details ? (
        <>
          <p>Name: {details.actor.first_name} {details.actor.last_name}</p>
          {/* Add more actor details here */}
          <h3>Top 5 Movies</h3>
          <ul>
            {details.movies.map((movie) => (
              <li key={movie.film_id}>{movie.title}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Select an actor to view details.</p>
      )}
    </div>
  );
}

export default ActorDetails;
