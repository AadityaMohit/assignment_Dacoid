import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('intern@dacoid.com');
  const [password, setPassword] = useState('Test123');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f4f6', // light gray background
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          width: '320px',
        }}
      >
        <h2 style={{ fontSize: '24px', marginBottom: '16px', textAlign: 'center' }}>Login</h2>

        <input
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            width: '100%',
            marginBottom: '16px',
            borderRadius: '4px',
            fontSize: '16px',
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          type="password"
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            width: '100%',
            marginBottom: '16px',
            borderRadius: '4px',
            fontSize: '16px',
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button
          onClick={handleLogin}
          style={{
            backgroundColor: '#3b82f6', // blue
            color: '#ffffff',
            padding: '10px 16px',
            borderRadius: '4px',
            width: '100%',
            fontSize: '16px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
