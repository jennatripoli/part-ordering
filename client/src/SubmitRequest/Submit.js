import './Submit.css';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';

function Submit() {
  const [supplier, setSupplier] = useState('');
  const [partNumber, setPartNumber] = useState('');
  const [partUrl, setPartUrl] = useState('');
  const [message, setMessage] = useState('');

  const [suppliers, setSuppliers] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location?.state?.username) navigate('/');
    getSuppliers();
  }, []);

  const getSuppliers = () => {
    axios.get('http://localhost:8000/api/get_suppliers/')
      .then(response => {
        setSuppliers(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const submitRequest = () => {
    if (supplier === '' || partNumber === '' || partUrl === '') {
      setMessage('Please fill out all fields.');
    } else if (!validator.isURL(partUrl)) {
      setMessage('Part URL must be a valid URL.');
    } else {
      axios.post('http://localhost:8000/api/submit_request/', {
        supplier: supplier,
        part_number: partNumber,
        part_url: partUrl,
        submitter: location?.state?.username,
      })
        .then(response => {
          setMessage(response.data.message);
        })
        .catch(error => {
          setMessage('Failed to submit request.');
          console.log(error);
        });
    }
  }

  return (
    <div className='principle-container'>
      <div className='header'>
        <div className='header-text-container'>
          <label className='header-title'>Beach Cities Robotics</label>
          <label className='header-subtitle'>Part Ordering Management System</label>
        </div>
        <div className='header-button-container'>
          <button className='header-button' onClick={() => navigate('/view-requests', { state: { username: location?.state?.username } })}>View</button>
          <button className='header-button' onClick={() => navigate('/submit-request', { state: { username: location?.state?.username } })}>Create</button>
          <button className='header-button' onClick={() => navigate('/')}>Logout</button>
        </div>
      </div>

      <label className='title'>Create a New Request</label>
      <div className='submit-request-input-container'>
        <div className='submit-request-input-row'>
          Supplier:
          <select id="supplier"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className='submit-request-input'
          >
            <option label=" " disabled></option>
            {suppliers.map(function (data) {
              return (<option key={data} value={data}>{data}</option>)
            })}
          </select>
        </div>
        <div className='submit-request-input-row'>
          Part Number:
          <input
            value={partNumber}
            onChange={(e) => setPartNumber(e.target.value)}
            className='submit-request-input'
          />
        </div>
        <div className='submit-request-input-row'>
          Part URL:
          <input
            value={partUrl}
            type="url"
            onChange={(e) => setPartUrl(e.target.value)}
            className='submit-request-input'
          />
        </div>
      </div>

      <button className='submit-request-button' onClick={() => submitRequest()}>Submit Request</button>
      <br />
      <label className='submit-request-message'>{message}</label>
    </div>
  );
}

export default Submit;