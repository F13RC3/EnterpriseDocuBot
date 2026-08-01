import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import DocViewer from './components/DocViewer';

// Import raw markdown files using Vite's path aliases and ?raw suffix
import architectureMd from '@docs/system_architecture.md?raw';
import manualMd from '@docs/user_manual.md?raw';
import interviewMd from '@docs/interview_questions.md?raw';
import readmeMd from '@root/README.md?raw';

function App() {
  const [activeView, setActiveView] = useState('chat'); // 'chat', 'architecture', 'manual', 'interview', 'readme'

  const renderContent = () => {
    switch(activeView) {
      case 'architecture': return <DocViewer content={architectureMd} />;
      case 'manual': return <DocViewer content={manualMd} />;
      case 'interview': return <DocViewer content={interviewMd} />;
      case 'readme': return <DocViewer content={readmeMd} />;
      default: return <ChatInterface />;
    }
  };

  return (
    <div className="app-container">
      <nav className="nav-bar glass-panel">
        <div className="nav-brand" onClick={() => setActiveView('chat')} style={{ cursor: 'pointer' }}>EDB ⚖️</div>
        <div className="nav-links">
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('chat'); }} className={activeView === 'chat' ? 'active-link' : ''}>Chat</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('readme'); }} className={activeView === 'readme' ? 'active-link' : ''}>Readme</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('architecture'); }} className={activeView === 'architecture' ? 'active-link' : ''}>Architecture</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('manual'); }} className={activeView === 'manual' ? 'active-link' : ''}>Manual</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('interview'); }} className={activeView === 'interview' ? 'active-link' : ''}>Interview Q&A</a>
          <a href="graphify-out/graph.html" target="_blank" rel="noopener noreferrer" className="highlight-link">Knowledge Graph 🧬</a>
        </div>
      </nav>

      <header className="header">
        <h1>EnterpriseDocuBot</h1>
        <p>Intelligent Contract Analysis & Generation Engine</p>
      </header>
      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
