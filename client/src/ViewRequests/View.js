import './View.css';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function View() {
  const [requests, setRequests] = useState([]);
  const [requestsHTML, setRequestsHTML] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location?.state?.username) navigate('/');
    getRequests();
  }, []);

  const getRequests = () => {
    axios.get('http://localhost:8000/api/get_requests/')
      .then(response => {
        setRequests(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const deleteRequest = (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      axios.delete('http://localhost:8000/api/delete_request/', {
        data: { id: id }
      })
        .then(response => {
          console.log(response);
          getRequests();
        })
        .catch(error => {
          window.alert('Failed to delete this request.');
          console.log(error);
        });
    }
  }

  useEffect(() => {
    const tempRequestsHTML = []
    requests.forEach((key, index) => {
      const request = (
        <div key={key.id}>
          Supplier: {key.supplier} <br />
          Part Number: {key.part_number} <br />
          Part URL: {key.part_url} <br />
          Submitter: {key.submitter ? key.submitter : 'Unknown User'} <br />
          <button
            className='request-button'
            onClick={() => navigate(`/edit-request/${key.id}`,
              { state: { username: location?.state?.username, id: key.id } })}
          >Edit
          </button>
          <button 
            className='request-button'
            onClick={() => deleteRequest(key.id)}
          >Delete
          </button>
          <br /><br />
        </div>
      )
      tempRequestsHTML.push(request)
      setRequestsHTML(tempRequestsHTML);
    });
  }, [requests]);

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

      {requestsHTML}

    </div>
  )
}

export default View;