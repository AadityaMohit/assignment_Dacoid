import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/links/all', {
          headers: { Authorization: token }
        });
        setLinks(res.data);
      } catch (error) {
        console.error('Failed to fetch links:', error);
      }
    };
    fetchLinks();
  }, []);

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '16px' }}>Dashboard</h1>
      
      <Link
        to="/create"
        style={{
          color: '#2563eb', // blue-600
          textDecoration: 'underline',
          fontSize: '16px',
        }}
      >
        Create New Link
      </Link>

      <table
        style={{
          width: '100%',
          marginTop: '16px',
          borderCollapse: 'collapse',
          border: '1px solid #ddd',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#e5e7eb' /* gray-200 */ }}>
            <th style={cellHeaderStyle}>Short URL</th>
            <th style={cellHeaderStyle}>Original URL</th>
            <th style={cellHeaderStyle}>Clicks</th>
            <th style={cellHeaderStyle}>Created</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link._id}>
              <td style={cellStyle}>
                <a
                  href={`http://localhost:5000/${link.shortCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#1d4ed8', textDecoration: 'none' }}
                >
                  {link.shortCode}
                </a>
              </td>
              <td style={cellStyle}>{link.longUrl}</td>
              <td style={cellStyle}>{link.clicks}</td>
              <td style={cellStyle}>{new Date(link.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const cellStyle = {
  border: '1px solid #ddd',
  padding: '12px',
  textAlign: 'left',
  fontSize: '15px',
};

const cellHeaderStyle = {
  ...cellStyle,
  fontWeight: 'bold',
  backgroundColor: '#f3f4f6',
};

export default Dashboard;
