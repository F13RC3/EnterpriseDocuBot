import React, { useState, useMemo } from 'react';
import ChatInterface from './components/ChatInterface';
import DocViewer from './components/DocViewer';

// Import raw markdown files using Vite's path aliases and ?raw suffix
import architectureMd from '@docs/system_architecture.md?raw';
import manualMd from '@docs/user_manual.md?raw';
import interviewMd from '@docs/interview_questions.md?raw';
// Use explicit relative path to bypass alias resolution issues in Docker
import readmeMd from '../../README.md?raw';

function App() {
  const [activeView, setActiveView] = useState('chat'); // 'chat', 'architecture', 'manual', 'interview', 'readme'

  // Pre-compute random particles so they don't reset on tab switch
  const particles = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${15 + Math.random() * 20}s`,
      animationDelay: `-${Math.random() * 20}s`,
      size: `${2 + Math.random() * 4}px`,
      baseOpacity: 0.2 + Math.random() * 0.8
    }));
  }, []);

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
    <div className="os-desktop">
      {/* Space Particles Background */}
      <div className="space-particles-container">
        {particles.map((p) => (
          <div 
            key={p.id} 
            className="particle"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay,
              opacity: p.baseOpacity
            }}
          ></div>
        ))}
      </div>

      <div className="os-window">
        {/* macOS Style Title Bar */}
        <div className="window-titlebar">
          <div className="window-controls">
            <span className="control-dot close"></span>
            <span className="control-dot minimize"></span>
            <span className="control-dot maximize"></span>
          </div>
          <div className="window-title">EnterpriseDocuBot — Intelligent Legal Engine</div>
          <div className="window-spacer"></div>
        </div>

        <div className="window-body">
          {/* Sidebar Navigation */}
          <nav className="window-sidebar">
            <div className="sidebar-section">
              <h3 className="sidebar-title">Applications</h3>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('chat'); }} className={activeView === 'chat' ? 'sidebar-item active' : 'sidebar-item'}>💬 Chat</a>
              <a href={`${import.meta.env.BASE_URL}graphify-out/graph.html`} target="_blank" rel="noopener noreferrer" className="sidebar-item">🧬 Graph Engine</a>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">Documentation</h3>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('readme'); }} className={activeView === 'readme' ? 'sidebar-item active' : 'sidebar-item'}>📖 Readme</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('architecture'); }} className={activeView === 'architecture' ? 'sidebar-item active' : 'sidebar-item'}>🏗 Architecture</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('manual'); }} className={activeView === 'manual' ? 'sidebar-item active' : 'sidebar-item'}>📘 User Manual</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setActiveView('interview'); }} className={activeView === 'interview' ? 'sidebar-item active' : 'sidebar-item'}>🧠 Q&A Prep</a>
            </div>
          </nav>

          {/* Main Content Area */}
          <main className="window-content">
             {activeView === 'chat' && (
               <header className="content-header">
                 <h1><span className="gradient-text">EnterpriseDocuBot</span> ⚖️</h1>
                 <p>AI-Powered Contract Analysis & Generation</p>
               </header>
             )}
             {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
