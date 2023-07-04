import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [url, setUrl] = useState('');
  const [brokenLinks, setBrokenLinks] = useState([]);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`http://localhost:3001/proxy?url=${encodeURIComponent(url)}`);
      const html = response.data;
      // Resto do código de verificação dos links quebrados
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Link Checker</h1>
      <form onSubmit={handleSubmit}>
        <label>
          URL:
          <input type="text" value={url} onChange={handleUrlChange} />
        </label>
        <button type="submit">Verificar</button>
      </form>
      <h2>Broken Links:</h2>
      {brokenLinks.map((link, index) => (
        <div key={index}>
          <p>URL: {link.link}</p>
          <p>Status: {link.status}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
