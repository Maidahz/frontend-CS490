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
        address_id: newCustomer.address_id,
        active: newCustomer.active,
        create_date: newCustomer.create_date,
        last_update: newCustomer.last_update,
      };

      await axios.post('http://localhost:5000/api/customers', newCustomerData);
      fetchCustomers();
      setNewCustomer({
        customer_id: '',
        store_id: '',
        first_name: '',
        last_name: '',
        email: '',
        address_id: '',
        active: '',
        create_date: '',
        last_update: '', 
      });
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  }

  const updateCustomer = async (customer_id) => {
    try {
        const store_id = prompt('Enter new Store ID:', '');
        const first_name = prompt('Enter new First Name:', '');
        const last_name = prompt('Enter new Last Name:', '');
        const email = prompt('Enter new Email:', '');
        const address_id = prompt('Enter new Address:', '');
        const active = prompt('Enter new acitve:', '');
        const create_date = prompt('Enter new create date:', '');
        const last_update = prompt('Enter new last update:', '');

        if (store_id && first_name && last_name && email && address_id && active && create_date && last_update) {
            const updatedData = {
                store_id,
                first_name,
                last_name,
                email,
                address_id,
                active,
                create_date,
                last_update,
            };
            await axios.put(`http://localhost:5000/api/customers/${customer_id}`, updatedData);
            fetchCustomers();
        }
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
  // Customer Details here
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const getCustomerDetails = async (customer_id) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/customers/details/${customer_id}`);
        setSelectedCustomer(response.data);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    }

  //Movie Returned Code here
  const markMovieReturn = async (customer_id, movie_id) => {
    try {
      await axios.put(`http://localhost:5000/api/customers/return/${customer_id}/${movie_id}`);
      console.log('Movie marked as returned');
    } catch (error) {
      console.error('Error marking movie return:', error);
    }
  }

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
        <input
          type="text"
          placeholder="address_id"
          value={newCustomer.address_id}
          onChange={(e) => setNewCustomer({ ...newCustomer, address_id: e.target.value })}
        />
        <input
          type="text"
          placeholder="active"
          value={newCustomer.active}
          onChange={(e) => setNewCustomer({ ...newCustomer, active: e.target.value })}
        />
        <input
          type="text"
          placeholder="create_date"
          value={newCustomer.create_date}
          onChange={(e) => setNewCustomer({ ...newCustomer, create_date: e.target.value })}
        />
        <input
          type="text"
          placeholder="last_update"
          value={newCustomer.last_update}
          onChange={(e) => setNewCustomer({ ...newCustomer, last_update: e.target.value })}
        />
        <button onClick={addCustomer}>Add Customer</button>
      </div>
      <div>
        <h2>Customer List</h2>
        <ul>
          {customers.map((customer) => (
            <li key={customer.customer_id}>
              {customer.customer_id} {customer.store_id} {customer.first_name} {customer.last_name} ({customer.email} {customer.address_id}{customer.active} {customer.create_date}{customer.last_update})
              <button onClick={() => getCustomerDetails(customer.customer_id)}>
                View Details
              </button>
              <button onClick={() => {
                const movie_id = prompt('Enter the movie ID to mark as returned:');
                if (movie_id) markMovieReturn(customer.customer_id, movie_id);
          }}>
              Mark Movie Return
              </button>
              <button onClick={() => updateCustomer(customer.customer_id, { first_name: 'Updated' })}>
                Update
              </button>
              <button onClick={() => deleteCustomer(customer.customer_id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      {selectedCustomer && (
        <div>
            <h3>Customer Details:</h3>
            <p><strong>Customer ID:</strong> {selectedCustomer.customer_id}</p>
            <p><strong>Store ID:</strong> {selectedCustomer.store_id}</p>
            <p><strong>First Name:</strong> {selectedCustomer.first_name}</p>
            <p><strong>Last Name:</strong> {selectedCustomer.last_name}</p>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <p><strong>Address ID:</strong> {selectedCustomer.address_id}</p>
            <p><strong>Active:</strong> {selectedCustomer.active}</p>
            <p><strong>Create Date:</strong> {selectedCustomer.create_date}</p>
            <p><strong>Last Update:</strong> {selectedCustomer.last_update}</p>
        </div>
      )}
    </div>
  );
}

export default CustomersPage;
