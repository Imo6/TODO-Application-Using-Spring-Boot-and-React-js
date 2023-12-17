import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import API_URL from '../apiConfig';

function Signin({ isAuthenticated, setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  let history = useHistory();

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Concatenate API_URL with the endpoint
      const response = await axios.post(`${API_URL}/api/auth/signin`, { username, password });
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('name', response.data.username);
      setIsAuthenticated(true);
    } catch (error) {
      setMessage('');
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Error: something happened');
      }
      setIsAuthenticated(false);
      return;
    }

    setUsername('');
    setPassword('');
    setErrorMessage('');
    setMessage('Sign in successful');
    await timeout(1000);
    history.push("/");
  }

  useEffect(() => {
    setMessage('')
  }, [username, password])

  const showMessage = () => {
    if (message === '') {
      return <div></div>
    }
    return <div className="alert alert-success" role="alert">
      {message}
    </div>
  }

  const showErrorMessage = () => {
    if (errorMessage === '') {
      return <div></div>
    }

    return <div className="alert alert-danger" role="alert">
      {errorMessage}
    </div>
  }

  return (
    <div className="container">
      <div className="card card-container">
        <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="profile-img"
        className="profile-img-card"
        />
        <form onSubmit={onSubmit}>
          <h1>Sign In</h1>
          <div className="form-group">
            <label>Username</label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
              className="form-control">
            </input>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              value={password}
              type="password"
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="form-control">
            </input>
          </div>
          <button className="btn btn-primary">Sign In</button>
        </form>
        {showMessage()}
        {showErrorMessage()}
      </div>
    </div>
  )
}

export default Signin;
