import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import API_URL from '../apiConfig';

function Signup({ isAuthenticated, setIsAuthenticated }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  let history = useHistory();

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must be at least 6 characters long and include at least one uppercase letter, one special character, and one digit.'
      );
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match.');
      return false;
    } else {
      setConfirmPasswordError('');
      return true;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate password
    if (!validatePassword(password)) {
      return;
    }
    if (!validateConfirmPassword(confirmPassword)) {
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/auth/signup`, {
        name,
        username,
        password,
        confirmPassword,
      });
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
    setConfirmPassword(''); // Clear confirmPassword after successful submission
    setErrorMessage('');
    setMessage('Sign up successful');
    await timeout(1000);
    history.push('/');
  };

  useEffect(() => {
    setMessage('');
  }, [username, password]);

  const showMessage = () => {
    if (message === '') {
      return <div></div>;
    }
    return (
      <div className="alert alert-success" role="alert">
        {message}
      </div>
    );
  };

  const showErrorMessage = () => {
    if (errorMessage === '') {
      return <div></div>;
    }

    return (
      <div className="alert alert-danger" role="alert">
        {errorMessage}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <form onSubmit={onSubmit}>
          <h1>Sign Up</h1>
          <div className="form-group">
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              value={password}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              placeholder="Password"
              className="form-control"
            />
            {passwordError && <div className="error">{passwordError}</div>}
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              value={confirmPassword}
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validateConfirmPassword(e.target.value);
              }}
              placeholder="Confirm Password"
              className="form-control"
            />
            {confirmPasswordError && <div className="error">{confirmPasswordError}</div>}
          </div>
          <button className="btn btn-primary">Sign Up</button>
        </form>
        {showMessage()}
        {showErrorMessage()}
      </div>
    </div>
  );
}

export default Signup;


