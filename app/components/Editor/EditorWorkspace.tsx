// app/components/Editor/EditorWorkspace.tsx
'use client';

import React, { useState } from 'react';
import { Toolbar } from './Toolbar';
import { Sidebar } from './Sidebar';
import Canvas from './Canvas';
import { PropertyPanel } from './PropertyPanel';
import { EditorElement } from '@/app/types/editor';

export default function EditorWorkspace() {
  const [activePage, setActivePage] = useState<'front' | 'back'>('front');
  const [selectedTool, setSelectedTool] = useState('text');
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [selectedElements, setSelectedElements] = useState<string[]>([]);

  const handleExport = () => {
    // TODO: 实现导出功能
  };

  const handleElementUpdate = (elementId: string, updates: Partial<EditorElement>) => {
    setElements(elements.map(el => 
      el.id === elementId ? { ...el, ...updates } : el
    ));
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Toolbar 
        activePage={activePage}
        onPageChange={setActivePage}
        onExport={handleExport}
      />
      
      <div className="flex-1 flex">
        <Sidebar 
          selectedTool={selectedTool}
          onToolSelect={setSelectedTool}
        />
        
        <div className="flex-1 flex justify-center items-center p-8">
          <Canvas 
            elements={elements}
            background="/templates/template1.png"
            onElementUpdate={handleElementUpdate}
            onElementSelect={(id) => setSelectedElements([id])}
            selectedElements={selectedElements}
          />
        </div>
        
        <PropertyPanel 
          selectedElements={elements.filter(el => 
            selectedElements.includes(el.id)
          )}
          onElementUpdate={handleElementUpdate}
        />
      </div>
    </div>
  );
}