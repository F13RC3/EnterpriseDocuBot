import React, { useState } from 'react';

const ChatInterface = ({ setActiveView }) => {
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
        <div className="error-message" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div><strong>Error:</strong> {error}</div>
          <div style={{ fontSize: '0.9em', opacity: 0.9, lineHeight: '1.4' }}>
            <strong>Note:</strong> If you are viewing this on GitHub Pages, the backend API must be running locally on your machine (localhost:8000) for it to work.
          </div>
          <button 
            type="button"
            onClick={() => {
              if (setActiveView) {
                setActiveView('readme');
                // Allow time for the DocViewer to render the markdown, then scroll
                setTimeout(() => {
                  const headings = Array.from(document.querySelectorAll('.markdown-body h2, .markdown-body h3'));
                  const targetHeading = headings.find(h => h.textContent.includes('Live Demo'));
                  if (targetHeading) {
                    targetHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 150);
              }
            }}
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '6px',
              color: '#34d399',
              fontSize: '0.95rem',
              textAlign: 'center',
              fontWeight: '600',
              width: 'fit-content',
              transition: 'background-color 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.3)'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(16, 185, 129, 0.15)'}
          >
            📖 Read Setup Instructions
          </button>
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
