import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const DocViewer = ({ content }) => {
  return (
    <div className="doc-viewer glass-panel">
      <div className="markdown-body">
        <Markdown remarkPlugins={[remarkGfm]}>
          {content}
        </Markdown>
      </div>
    </div>
  );
};

export default DocViewer;
