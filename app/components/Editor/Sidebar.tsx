// app/components/Editor/Sidebar.tsx
'use client';

import React from 'react';
import { Layers, Type, Image as ImageIcon, Ticket } from 'lucide-react';

interface SidebarProps {
  selectedTool: string;
  onToolSelect: (tool: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedTool,
  onToolSelect,
}) => {
  const tools = [
    { id: 'text', icon: Type, label: '文本' },
    { id: 'image', icon: ImageIcon, label: '图片' },
    { id: 'ticket', icon: Ticket, label: '易撕线' },
    { id: 'layers', icon: Layers, label: '图层' },
  ];

  return (
    <div className="w-16 bg-white border-r flex flex-col items-center py-4 gap-4">
      {tools.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          className={`p-3 rounded hover:bg-gray-100 relative group ${
            selectedTool === id ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
          }`}
          onClick={() => onToolSelect(id)}
          title={label}
        >
          <Icon size={20} />
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded 
                        opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
            {label}
          </div>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;