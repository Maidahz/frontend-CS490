import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
//import TopBar from '../components/TopBar'
import './customers.css'

{/* <style>
  .input-search{
    margin-right: 10px;
  }
</style> */}

function CustomersPage() {

    return (
      <div>
        <h1>Welcome to Customers Page!</h1>
        {/* customer list */}

        {/* <input className = 'input-search' type='text' placeholder="customer id, first name, last name"></input> */}

        <div>
        <p className='p1'>
          First Name: 
        </p>
        <input className = 'input-search' type='text' placeholder=" first name"></input>
        <p className='p1'>
          Last Name:
        </p>
        <input className = 'input-search' type='text' placeholder=" last name"></input>
        <p className='p1'>
          Customer ID:
        </p>
        <input className = 'input-search' type='text' placeholder=" Customer ID"></input>
        </div>
        <div className='customer-div'>
        <button className='customer-button'>
          customer add
        </button>
        <button className='customer-button'>
          customer delete
        </button>
        <button className='customer-button'>
          customer edit
        </button>

        
        </div>

      </div>


    );
  }
  
  export default CustomersPage;
  