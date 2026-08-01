import React from 'react';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <div className="app-container">
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
