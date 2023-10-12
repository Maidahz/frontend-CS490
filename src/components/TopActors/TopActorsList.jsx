// import React from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './Top-Actors.css'


// class TopActorsList extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         actorlist: null,
//         error: null, //error statement
//       };
//     }
//     // loads and renders data after component is displayed
//     componentDidMount() {
//         axios.get('http://localhost:5000/top-actors')
//         .then(response => {
//             //console.log('Received Actor Data:', response.data); // log receieved data
//           this.setState({ actorlist: response.data });
//         })
//         .catch (error => {
//           console.log("Error: fetching top actors.", error);
//           this.setState({ error: 'Error fetching top actors.' }); // Set error state
//         });
//       }


// getTop5Actors = () => {
//     const { actorlist } = this.state;
    
//     // Check if actorlist is not null or undefined before slicing and sorting
//     if(actorlist) {
//         // Sort the actorlist array by movie_count in descending order
//         const sortedActorList = actorlist.slice().sort((a, b) => b.movie_count - a.movie_count);
        
//         // Take the top 5 actors
//         return sortedActorList.slice(0, 5);
//     } else {
//         // Return an empty array or suitable default if actorlist is null or undefined
//         return [];
//     }
// };

// render() {
//     // console.log('TopActorList Render Method Called');
//     const { actorlist, error } = this.state; // Correct variable name, destructured from state
//     const top5Actors = this.getTop5Actors();

//     return (
//         <div className='.list-container'>
//             <h1>Top 5 Actors</h1>
//             {error && <p>{error}</p>} {/* Display error message if there is an error */}
//             <ul>
//             {top5Actors.map(actor => (
//                 <li key={actor.actor_id}>
//                     <Link to={`/actor-details/${actor.actor_id}`}>
//                     {actor.actor_name}
//                     </Link>
//                 </li>
//                 ))}

//         </ul>
//         </div>
//     );
//   }
// }

// export default TopActorsList;

import React from 'react';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import './Top-Actors.css';
import ActorDetails from '../ActorDetails/ActorDetails';
class TopActorsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      actorlist: null,
      error: null,
      selectedActor: null, // store selected actor details
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/top-actors')
      .then((response) => {
        this.setState({ actorlist: response.data });
      })
      .catch((error) => {
        console.log('Error: fetching top actors.', error);
        this.setState({ error: 'Error fetching top actors.' });
      });
  }

  handleActorClick = (actorId) => {
    // Call a function passed from App.jsx to handle the actor click
   // this.props.onActorClick(actorId);
   this.setState({selectedActor: actorId});
  };
  //Get top 5 actors based on the movie count
  getTop5Actors = () => {
    const { actorlist } = this.state;

    if (actorlist) {
      const sortedActorList = actorlist.slice().sort((a, b) => b.movie_count - a.movie_count);
      return sortedActorList.slice(0, 5);
    } else {
      return [];
    }
  };

  render() {
    const { actorlist, error, selectedActor } = this.state;
    const top5Actors = this.getTop5Actors();

    return (
      <div className="top-actors">
        <h1 className="top-actors h1">Top 5 Actors </h1>
        {error && <p>{error}</p>}
        <div className="actor-list">
          {/* //may adjust background */}
        <div className='top-actors-list'>
          <ul className="top-actors ul"> 
            {top5Actors.map((actor) => (
              <li key={actor.actor_id}>
                <span
                  className='actor-name'
                  onClick={()=> this.handleActorClick(actor.actor_id)}
                >
                  {actor.actor_name}
                </span>
              </li> 
            ))}
          </ul>
        </div>
      </div>
      <ActorDetails actorId={selectedActor} />
      </div>
    );
  }
}

export default TopActorsList;
