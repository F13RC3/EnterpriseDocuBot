import React from 'react';
import ChatInterface from './components/ChatInterface';

function App() {
  const repoUrl = 'https://github.com/kei0s/EnterpriseDocuBot';

  return (
    <div className="app-container">
      <nav className="nav-bar glass-panel">
        <div className="nav-brand">EDB Docs</div>
        <div className="nav-links">
          <a href={`${repoUrl}/blob/main/docs/system_architecture.md`} target="_blank" rel="noopener noreferrer">Architecture</a>
          <a href={`${repoUrl}/blob/main/docs/user_manual.md`} target="_blank" rel="noopener noreferrer">Manual</a>
          <a href={`${repoUrl}/blob/main/docs/interview_questions.md`} target="_blank" rel="noopener noreferrer">Interview Q&A</a>
          <a href="graphify-out/graph.html" target="_blank" rel="noopener noreferrer" className="highlight-link">Knowledge Graph 🧬</a>
        </div>
      </nav>

      <header className="header">
        <h1>EnterpriseDocuBot</h1>
        <p>Intelligent Contract Analysis & Generation Engine</p>
      </header>
      <main>
        <ChatInterface />
      </main>
    </div>
  );
}

export default App;
