import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from 'lucide-react';

const mockFileStructure = {
  name: 'my-project',
  type: 'folder',
  children: [
    {
      name: 'src',
      type: 'folder',
      children: [
        { name: 'App.jsx', type: 'file', language: 'javascript' },
        { name: 'index.js', type: 'file', language: 'javascript' },
        { name: 'styles.css', type: 'file', language: 'css' }
      ]
    },
    {
      name: 'backend',
      type: 'folder',
      children: [
        { name: 'server.py', type: 'file', language: 'python' },
        { name: 'models.py', type: 'file', language: 'python' },
        { name: 'requirements.txt', type: 'file', language: 'text' }
      ]
    },
    { name: 'README.md', type: 'file', language: 'markdown' },
    { name: 'package.json', type: 'file', language: 'json' }
  ]
};

function FileTreeItem({ item, level, onFileSelect }) {
  const [isOpen, setIsOpen] = useState(level === 0);

  const handleClick = () => {
    if (item.type === 'folder') {
      setIsOpen(!isOpen);
    } else {
      onFileSelect(item);
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-[#0D0D0D]/50 transition-colors"
        style={{ paddingLeft: `${level * 12 + 12}px` }}
      >
        {item.type === 'folder' ? (
          <>
            {isOpen ? <ChevronDown size={14} color="#8BE9FD" /> : <ChevronRight size={14} color="#8BE9FD" />}
            {isOpen ? <FolderOpen size={16} color="#FFB86C" /> : <Folder size={16} color="#FFB86C" />}
          </>
        ) : (
          <>
            <span style={{ width: '14px' }} />
            <File size={16} color="#6272A4" />
          </>
        )}
        <span className="text-sm text-[#EDEDED]">{item.name}</span>
      </div>
      {item.type === 'folder' && isOpen && item.children && (
        <div>
          {item.children.map((child, idx) => (
            <FileTreeItem
              key={idx}
              item={child}
              level={level + 1}
              onFileSelect={onFileSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileExplorer({ onFileSelect }) {
  return (
    <div className="h-full overflow-y-auto relative z-10">
      <div className="p-3 border-b border-[#8BE9FD]/20">
        <span className="text-xs font-semibold text-[#8BE9FD] uppercase tracking-wide">Explorer</span>
      </div>
      <FileTreeItem item={mockFileStructure} level={0} onFileSelect={onFileSelect} />
    </div>
  );
}