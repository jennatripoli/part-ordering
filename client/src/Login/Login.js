import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  async function validateLogin() {
    axios.post('http://localhost:8000/api/validate_login/', {
      username: username,
      password: password,
    })
      .then(response => {
        navigate('/submit-request', { state: { username: username } });
      })
      .catch(error => {
        setMessage('Incorrect username or password.');
      });
  }

  return (
    <div className='principle-container'>
      <label className='login-title'>Beach Cities Robotics</label>
      <label className='login-subtitle'>Part Ordering Management System</label>
      <div className='login-input-container'>
        <input
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className='login-input'
        />
        <input
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className='login-input'
          type='password'
        />
      </div>
      
      <button className='login-button' onClick={() => validateLogin()}>Login</button>
      <br />
      <label className='login-message'>{message}</label>
    </div>
  )
}

export default Login;