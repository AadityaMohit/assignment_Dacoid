import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateLink = () => {
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/links/create',
        { longUrl, customAlias },
        { headers: { Authorization: token } }
      );
      alert(`Short URL: ${res.data.shortUrl}`);
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to create link');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>Create New Short Link</h1>
      
      <input
        style={inputStyle}
        placeholder="Long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />
      
      <input
        style={inputStyle}
        placeholder="Custom Alias (optional)"
        value={customAlias}
        onChange={(e) => setCustomAlias(e.target.value)}
      />
      
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          padding: '10px 16px',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Create
      </button>
    </div>
  );
};

const inputStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  width: '100%',
  marginBottom: '16px',
  fontSize: '16px',
  borderRadius: '4px',
};

export default CreateLink;
