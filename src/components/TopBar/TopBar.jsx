import React from 'react';
import './Top-Bar.css';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: 'Home Page', // Initial title
    };
  }

  handleButtonClick = (newTitle) => {
    this.setState({ pageTitle: newTitle });
  };

  handleMoviesButtonClick = () => {
    this.handleButtonClick('Movies');
    this.props.toggleTopActors();
    this.props.toggleTopMovies();
  };

  handleCustomersButtonClick = () => {
    this.handleButtonClick('Customers');
    // Call any additional handling for Customers button click here
    // Example: this.props.onCustomersReportsClick();
  };

  handleReportsButtonClick = () => {
    this.handleButtonClick('Reports');
    // Call any additional handling for Reports button click here
    // Example: this.props.onCustomersReportsClick();
  };

  render() {
    const { pageTitle } = this.state;

    return (
      <div className="topbar">
        <h1>{pageTitle}</h1>
        <div className="buttons">
          <button
            className="button"
            onClick={this.handleMoviesButtonClick}
          >
            Movies
          </button>
          <button
            className="button"
            onClick={this.handleCustomersButtonClick}
          >
            Customers
          </button>
          <button
            className="button"
            onClick={this.handleReportsButtonClick}
          >
            Reports
          </button>
        </div>
      </div>
    );
  }
}

export default TopBar;
