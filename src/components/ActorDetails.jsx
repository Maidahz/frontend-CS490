import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ActorDetails() {
    const [details, setDetails] = useState(null);
    const { id } = useParams(); 

    useEffect(() => {
        async function fetchActorDetails() {
            try {
                const response = await axios.get(`http://localhost:5000/actor/${id}`);
                setDetails(response.data);
            } catch (error) {
                console.error("Error fetching actor details:", error);
            }
        }
        fetchActorDetails();
    }, [id]);

    if (!details) return <div>Loading...</div>;
    return (
        <div>
            {details ? (
                <div>
                    <h1>{details.actor.first_name} {details.actor.last_name}</h1>
                    <h2>Top Movies</h2>
                    <ul>
                        {details.movies.map(movie => (
                            <li key={movie.film_id}>{movie.title}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ActorDetails;
