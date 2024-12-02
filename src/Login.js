import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple authentication logic
    switch(username.toLowerCase()) {
      case 'basic':
        if (password === 'basic123') {
          navigate('/basic', { state: { userType: 'Basic' } });
          return;
        }
        break;
      case 'intermediate':
        if (password === 'inter123') {
          navigate('/intermediate', { state: { userType: 'Intermediate' } });
          return;
        }
        break;
      case 'advanced':
        if (password === 'advanced123') {
          navigate('/advanced', { state: { userType: 'Advanced' } });
          return;
        }
        break;
      default:
        alert('Invalid username or password');    
    }
  };

  return (
    <div className="login-container">
        <div className="login-box">
          <form onSubmit={handleSubmit} className="login-form">
            <h2 className="login-title">Login</h2>
            
            <div className="login-input-container">
              <div className="login-input-group left-aligned">
                <label htmlFor="username" className="login-input-label">Username</label>
                <input
                  type="text"
                  id="username"
                  className="login-input-field"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter your username"
                />
              </div>
              
              <div className="login-input-group left-aligned">
                <label htmlFor="password" className="login-input-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="login-input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
            </div>
            
            <div className="login-button-container">
              <button type="submit" className="login-button">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Login;