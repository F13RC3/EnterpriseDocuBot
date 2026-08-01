import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const DocViewer = ({ content }) => {
  return (
    <div className="doc-viewer glass-panel">
      <div className="markdown-body">
        <Markdown 
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({node, ...props}) => {
              let href = props.href;
              // If the link is relative (not http, mailto, or anchor), point it to the GitHub repository
              if (href && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('#')) {
                const cleanPath = href.replace(/^(\.\/|\/)/, '');
                href = `https://github.com/f13rc3/EnterpriseDocuBot/blob/main/${cleanPath}`;
              }
              return <a {...props} href={href} target="_blank" rel="noopener noreferrer" />;
            }
          }}
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
};

export default DocViewer;
