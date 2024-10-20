import React, { useState } from 'react';
import axios from 'axios';

const IntegrationForm = () => {
  const [message, setMessage] = useState('');
  const [channel, setChannel] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await axios.post('https://slack.com/api/chat.postMessage', {
        text: message,
        channel: channel
      });
      setResponse(result.data);
      setMessage('');
      setChannel('');
    } catch (err) {
      setError('Error enviando mensaje. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="integration-form">
      <h2>Integración con Slack</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Mensaje para Slack"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Canal de Slack"
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar a Slack'}
        </button>
      </form>
      {response && <p>Mensaje enviado correctamente.</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default IntegrationForm;
