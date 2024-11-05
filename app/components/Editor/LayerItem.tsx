// app/components/Editor/LayerItem.tsx
'use client'

import { Eye, EyeOff, Lock, Unlock } from 'lucide-react'

interface LayerItemProps {
  layer: {
    id: string;
    type: 'text' | 'image' | 'shape';
    name: string;
    visible?: boolean;
    locked?: boolean;
  };
  index: number;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onVisibilityToggle?: (id: string) => void;
  onLockToggle?: (id: string) => void;
}

export function LayerItem({
  layer,
  index,
  isSelected,
  onSelect,
  onVisibilityToggle,
  onLockToggle
}: LayerItemProps) {
  return (
    <div
      className={`
        flex items-center gap-2 p-2 rounded cursor-pointer
        ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}
      `}
      onClick={() => onSelect?.(layer.id)}
    >
      <div className="w-4 h-4 flex-shrink-0">
        {layer.type === 'text' && <span className="text-xs">T</span>}
        {layer.type === 'image' && <span className="text-xs">I</span>}
        {layer.type === 'shape' && <span className="text-xs">S</span>}
      </div>
      <span className="flex-1 text-sm truncate">{layer.name}</span>
      <button
        className="p-1 hover:bg-gray-100 rounded"
        onClick={(e) => {
          e.stopPropagation();
          onVisibilityToggle?.(layer.id);
        }}
      >
        {layer.visible === false ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
      <button
        className="p-1 hover:bg-gray-100 rounded"
        onClick={(e) => {
          e.stopPropagation();
          onLockToggle?.(layer.id);
        }}
      >
        {layer.locked ? (
          <Lock className="w-4 h-4" />
        ) : (
          <Unlock className="w-4 h-4" />
        )}
      </button>
    </div>
  )
}