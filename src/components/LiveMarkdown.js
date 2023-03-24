import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function LiveMarkdown() {
  const [markdownInput, setMarkdownInput] = useState("");

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(markdownInput);
  };

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const code = String(children).replace(/\n$/, "");
      const language = match ? match[1] : "javascript"; // set default language to javascript
      const handleClick = () => {
        navigator.clipboard.writeText(code);
      };
      return !inline && match ? (
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: "1",
              padding: "0.5rem",
            }}
          >
            <button className="btn btn-primary" onClick={handleClick}>
              Copy to Clipboard
            </button>
          </div>
          <SyntaxHighlighter
            children={code}
            style={docco}
            language={language}
            PreTag="div"
            {...props}
          />
        </div>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="head">MARKDOWN</div>
        <textarea
          autoFocus
          className="textarea"
          value={markdownInput}
          onChange={(e) => setMarkdownInput(e.target.value)}
        ></textarea>
        <button onClick={handleCopyToClipboard} className="btn btn-primary">
          Copy Markdown
        </button>
      </div>
      <div className="wrapper">
        <div className="head">PREVIEW</div>
        <ReactMarkdown children={markdownInput} components={components} />
      </div>
    </div>
  );
}
