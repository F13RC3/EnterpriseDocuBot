import React, { useState } from 'react';

const ChatInterface = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // In a docker-compose setup, we can access the backend via the exposed port on localhost
      // VITE_API_URL can be injected for production via GitHub Actions or Docker env vars.
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      
      const response = await fetch(`${API_URL}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'An error occurred while processing your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel">
      <form onSubmit={handleSubmit} className="input-group">
        <textarea
          placeholder="Ask a legal question, request a clause analysis, or ask to draft a new clause..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !query.trim()}>
          {isLoading ? (
            <><span className="spinner"></span> Processing...</>
          ) : (
            'Process Request'
          )}
        </button>
      </form>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className="result-section">
          <div className={`result-badge ${result.action === 'draft' ? 'badge-draft' : 'badge-analyze'}`}>
            {result.action === 'draft' ? 'Drafting Mode' : 'Analysis Mode'}
          </div>
          
          <div className="result-content">
            {result.action === 'draft' ? result.draft : result.analysis}
          </div>

          {result.validation_status && (
            <div className="validation-box">
              <h3>Validation Review</h3>
              <p>{result.validation_status}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
