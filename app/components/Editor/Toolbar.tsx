// app/components/Editor/Toolbar.tsx
'use client';

import { Download } from 'lucide-react';

interface ToolbarProps {
  activePage: 'front' | 'back';
  onPageChange: (page: 'front' | 'back') => void;
  onExport: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  activePage,
  onPageChange,
  onExport,
}) => (
  <div className="h-14 bg-white border-b flex items-center px-4 justify-between">
    <div className="flex items-center gap-4">
      <button className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
        选择模板
      </button>
      <div className="h-6 w-px bg-gray-200" />
      <div className="flex items-center gap-2">
        <button 
          className={`p-2 rounded ${activePage === 'front' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          onClick={() => onPageChange('front')}
        >
          正面
        </button>
        <button 
          className={`p-2 rounded ${activePage === 'back' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          onClick={() => onPageChange('back')}
        >
          背面
        </button>
      </div>
    </div>
    
    <button 
      onClick={onExport}
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
    >
      <Download size={16} />
      导出
    </button>
  </div>
);

export default Toolbar;