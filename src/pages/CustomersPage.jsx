// import React from 'react';
// import { HashRouter, Routes, Route, Link } from 'react-router-dom';
// //import TopBar from '../components/TopBar'
// import './customers.css'
// import axios from 'axios';

// function CustomersPage() {

//     return (
//       <div>
//         <h1>Welcome to Customers Page!</h1>
//         {/* customer list */}

//         {/* <input className = 'input-search' type='text' placeholder="customer id, first name, last name"></input> */}

//         <div>
//         <p className='p1'>
//           First Name: 
//         </p>
//         <input className = 'input-search' type='text' placeholder=" first name"></input>
//         <p className='p1'>
//           Last Name:
//         </p>
//         <input className = 'input-search' type='text' placeholder=" last name"></input>
//         <p className='p1'>
//           Customer ID:
//         </p>
//         <input className = 'input-search' type='text' placeholder=" Customer ID"></input>
//         </div>
//         <div className='customer-div'>
//         <button className='customer-button'>
//           customer add
//         </button>
//         <button className='customer-button'>
//           customer delete
//         </button>
//         <button className='customer-button'>
//           customer edit
//         </button>

        
//         </div>

//       </div>


//     );
//   }
  
//   export default CustomersPage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function CustomersPage() {
//   const [customers, setCustomers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchField, setSearchField] = useState('first_name');

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const fetchCustomers = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/customers');
//       setCustomers(response.data);
//     } catch (error) {
//       console.error('Error fetching customers:', error);
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get('/api/customers', {
//         params: { searchTerm, searchField },
//       });
//       setCustomers(response.data);
//     } catch (error) {
//       console.error('Error searching customers:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Welcome to Customers Page!</h1>

//       <div>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <select
//           value={searchField}
//           onChange={(e) => setSearchField(e.target.value)}
//         >
//           <option value="first_name">First Name</option>
//           <option value="last_name">Last Name</option>
//           <option value="customer_id">Customer ID</option>
//         </select>
//         <button onClick={handleSearch}>Search</button>
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>Customer ID</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {customers.map((customer) => (
//             <tr key={customer.customer_id}>
//               <td>{customer.customer_id}</td>
//               <td>{customer.first_name}</td>
//               <td>{customer.last_name}</td>
//               <td>{customer.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default CustomersPage;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    customer_id: '',
    store_id: '',
    first_name: '',
    last_name: '',
    email: '',
  });
  //searching and filtering customers code
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('first_name');
  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/customers/search', {
        params: {
          searchTerm: searchTerm,
          searchField: searchField
        }
      });
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [searchTerm, searchField]);

  const addCustomer = async () => {
    try {
      const newCustomerData = {
        customer_id: parseInt(newCustomer.customer_id),
        store_id: parseInt(newCustomer.store_id),
        first_name: newCustomer.first_name,
        last_name: newCustomer.last_name,
        email: newCustomer.email,
      };

      await axios.post('http://localhost:5000/api/customers', newCustomerData);
      fetchCustomers();
      setNewCustomer({
        customer_id: '',
        store_id: '',
        first_name: '',
        last_name: '',
        email: '',
      });
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  }

  const updateCustomer = async (customer_id, updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/customers/${customer_id}`, updatedData);
      fetchCustomers();
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  }

  const deleteCustomer = async (customer_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/customers/${customer_id}`);
      fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  }//searching data code here
  const handleSearch = async () => {
    try {
      const response = await axios.get('/api/customers', {
        params: { searchTerm, searchField },
      });
      setCustomers(response.data);
    } catch (error) {
      console.error('Error searching customers:', error);
    }
  };
  return (
    <div>
      <h1>Welcome to Customers Page!</h1>
      <div>
      <h2>Filter/Search Customers</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        >
          <option value="first_name">First Name</option>
          <option value="last_name">Last Name</option>
          <option value="customer_id">Customer ID</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <h2>Add Customer</h2>
        <input
          type="text"
          placeholder="Customer ID"
          value={newCustomer.customer_id}
          onChange={(e) => setNewCustomer({ ...newCustomer, customer_id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Store ID"
          value={newCustomer.store_id}
          onChange={(e) => setNewCustomer({ ...newCustomer, store_id: e.target.value })}
        />
        <input
          type="text"
          placeholder="First Name"
          value={newCustomer.first_name}
          onChange={(e) => setNewCustomer({ ...newCustomer, first_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newCustomer.last_name}
          onChange={(e) => setNewCustomer({ ...newCustomer, last_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newCustomer.email}
          onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
        />
        <button onClick={addCustomer}>Add Customer</button>
      </div>
      <div>
        <h2>Customer List</h2>
        <ul>
          {customers.map((customer) => (
            <li key={customer.customer_id}>
              {customer.customer_id} {customer.store_id} {customer.first_name} {customer.last_name} ({customer.email})
              <button onClick={() => updateCustomer(customer.customer_id, { first_name: 'Updated' })}>
                Update
              </button>
              <button onClick={() => deleteCustomer(customer.customer_id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CustomersPage;
