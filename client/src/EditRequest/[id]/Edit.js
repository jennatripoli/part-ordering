import './Edit.css';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import validator from 'validator';

function Edit() {
  const [supplier, setSupplier] = useState('');
  const [partNumber, setPartNumber] = useState('');
  const [partUrl, setPartUrl] = useState('');
  const [message, setMessage] = useState('');

  const [suppliers, setSuppliers] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const id = location.state.id;

  useEffect(() => {
    if (!location?.state?.username) navigate('/');
    getRequest();
    getSuppliers();
  }, []);

  const getRequest = () => {
    axios.post('http://localhost:8000/api/get_request/', {
      id: id,
    })
      .then(response => {
        setSupplier(response.data.message.supplier);
        setPartNumber(response.data.message.part_number);
        setPartUrl(response.data.message.part_url);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const getSuppliers = () => {
    axios.get('http://localhost:8000/api/get_suppliers/')
      .then(response => {
        setSuppliers(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const saveRequest = () => {
    if (supplier === '' || partNumber === '' || partUrl === '') {
      setMessage('Please fill out all fields.');
    } else if (!validator.isURL(partUrl)) {
      setMessage('Part URL must be a valid URL.');
    } else {
      axios.post('http://localhost:8000/api/update_request/', {
        id: id,
        supplier: supplier,
        part_number: partNumber,
        part_url: partUrl,
      })
        .then(response => {
          setMessage(response.data.message);
        })
        .catch(error => {
          setMessage('Failed to update request.');
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

      <label className='title'>Edit Request</label>
      <div className='edit-request-input-container'>
        <div className='edit-request-input-row'>
          UUID:
          <input
            value={id}
            disabled readOnly
            className='edit-request-input'
          />
        </div>
        <div className='edit-request-input-row'>
          Supplier:
          <select id="supplier"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className='edit-request-input'
          >
            <option label=" " disabled></option>
            {suppliers.map(function (data) {
              console.log('data: ', data, '\nsupplier: ', supplier);
              return (<option key={data} value={data} selected={data === supplier ? "selected" : null}>{data}</option>)
            })}
          </select>
        </div>
        <div className='edit-request-input-row'>
          Part Number:
          <input
            value={partNumber}
            onChange={(e) => setPartNumber(e.target.value)}
            className='edit-request-input'
          />
        </div>
        <div className='edit-request-input-row'>
          Part URL:
          <input
            value={partUrl}
            type="url"
            onChange={(e) => setPartUrl(e.target.value)}
            className='edit-request-input'
          />
        </div>
      </div>

      <button className='edit-request-button' onClick={() => saveRequest()}>Save Changes</button>
      <br />
      <label className='edit-request-message'>{message}</label>
    </div>
  );
}

export default Edit;