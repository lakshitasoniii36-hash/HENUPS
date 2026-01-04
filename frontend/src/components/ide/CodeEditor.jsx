import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const sampleCode = {
  python: `# Python Sample
import numpy as np
from typing import List

def calculate_fibonacci(n: int) -> List[int]:
    """Generate Fibonacci sequence up to n terms."""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    
    return fib

# Example usage
result = calculate_fibonacci(10)
print(f"Fibonacci sequence: {result}")
`,
  javascript: `// JavaScript Sample
import React, { useState, useEffect } from 'react';

const DataFetcher = ({ url }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default DataFetcher;
`,
  css: `/* Modern CSS Styling */
:root {
  --primary-color: #FF79C6;
  --secondary-color: #8BE9FD;
  --background: #0D0D0D;
  --text: #EDEDED;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--background);
  color: var(--text);
}

.button {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 121, 198, 0.3);
}
`
};

function syntaxHighlight(code, language) {
  // Simple regex-based syntax highlighting
  const patterns = {
    keyword: /\b(import|from|def|class|if|else|elif|for|while|return|const|let|var|function|async|await|try|catch|export|default)\b/g,
    string: /(["'`])(?:(?=(\\?))\2.)*?\1/g,
    comment: /(#.*$|//.*$|\/\*[\s\S]*?\*\/)/gm,
    number: /\b\d+\.?\d*\b/g,
    function: /\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\s*\()/g
  };

  let highlighted = code
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  highlighted = highlighted.replace(patterns.comment, '<span style="color: #6272A4">$&</span>');
  highlighted = highlighted.replace(patterns.string, '<span style="color: #50FA7B">$&</span>');
  highlighted = highlighted.replace(patterns.keyword, '<span style="color: #FF79C6">$&</span>');
  highlighted = highlighted.replace(patterns.number, '<span style="color: #FFB86C">$&</span>');
  highlighted = highlighted.replace(patterns.function, '<span style="color: #8BE9FD">$&</span>');

  return highlighted;
}

export default function CodeEditor({ file }) {
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    if (file) {
      const lang = file.language || 'javascript';
      setLanguage(lang);
      setContent(sampleCode[lang] || '// No preview available');
    } else {
      setContent(sampleCode.javascript);
    }
  }, [file]);

  return (
    <div className="flex-1 flex flex-col bg-[#161616] overflow-hidden">
      {/* Tab Bar */}
      {file && (
        <div className="flex items-center gap-2 px-2 py-1 border-b border-[#FF79C6]/20">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0D0D0D] rounded-t text-sm">
            <span className="text-[#EDEDED]">{file.name}</span>
            <button className="hover:bg-[#FF5555]/20 rounded p-0.5">
              <X size={14} color="#FF5555" />
            </button>
          </div>
        </div>
      )}

      {/* Editor Content */}
      <div className="flex-1 overflow-auto">
        <pre
          className="p-4 text-sm font-mono leading-relaxed"
          style={{ backgroundColor: '#161616', color: '#EDEDED' }}
        >
          <code
            dangerouslySetInnerHTML={{
              __html: syntaxHighlight(content, language)
            }}
          />
        </pre>
      </div>
    </div>
  );
}