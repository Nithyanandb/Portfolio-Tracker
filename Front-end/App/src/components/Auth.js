import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:2000/login', {
          username,
          password
        });
        console.log(response.data);
        // Handle successful login
      } else {
        const response = await axios.post('http://localhost:2000/register', {
          username,
          password
        });
        console.log(response.data);
        // Handle successful registration
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
            />
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
        </button>
        <p>
          {isLogin ? (
            <span>
              Don't have an account?{' '}
              <a href="#" onClick={() => setIsLogin(false)}>
                Register here
              </a>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <a href="#" onClick={() => setIsLogin(true)}>
                Login here
              </a>
            </span>
          )}
        </p>
      </form>
    </div>
  );
};

export default Auth;