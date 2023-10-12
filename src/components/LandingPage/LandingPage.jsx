import React from 'react';
import TopMoviesList from '../TopMovies/TopMoviesList';
import TopActorsList from '../TopActors/TopActorsList';

function LandingPage() {
    return (
        <div>
            <h1>Welcome to Movie Rentals!</h1>
            {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TopMoviesList />
                <TopActorsList />
            </div> */}
        </div>
    );
}

export default LandingPage;
