// app/components/Editor/Canvas.tsx

import React, { useRef, useEffect, useState } from 'react';
import { EditorElement, Position } from '@/app/types/editor';

interface CanvasProps {
  elements: EditorElement[];
  background: string;
  onElementUpdate: (elementId: string, updates: Partial<EditorElement>) => void;
  onElementSelect: (elementId: string) => void;
  selectedElements: string[];
}

const Canvas: React.FC<CanvasProps> = ({
  elements,
  background,
  onElementUpdate,
  onElementSelect,
  selectedElements,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragStart, setDragStart] = useState<Position | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStart || selectedElements.length === 0) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dx = x - dragStart.x;
      const dy = y - dragStart.y;

      selectedElements.forEach(id => {
        const element = elements.find(el => el.id === id);
        if (element) {
          onElementUpdate(id, {
            position: {
              x: element.position.x + dx,
              y: element.position.y + dy,
            },
          });
        }
      });

      setDragStart({ x, y });
    };

    const handleMouseUp = () => {
      setDragStart(null);
    };

    if (dragStart) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragStart, selectedElements, elements, onElementUpdate]);

  const renderElement = (element: EditorElement) => {
    const isSelected = selectedElements.includes(element.id);
    const baseStyle = {
      position: 'absolute' as const,
      left: `${element.position.x}px`,
      top: `${element.position.y}px`,
      width: `${element.size.width}px`,
      height: `${element.size.height}px`,
      transform: `rotate(${element.rotation}deg)`,
      cursor: element.locked ? 'default' : 'move',
      border: isSelected ? '2px solid #2196f3' : 'none',
    };

    switch (element.type) {
      case 'text':
        return (
          <div
            key={element.id}
            style={{
              ...baseStyle,
              color: element.color,
              fontFamily: element.fontFamily,
              fontSize: element.fontSize,
              fontWeight: element.fontWeight,
              textAlign: element.alignment,
            }}
            onMouseDown={(e) => {
              if (!element.locked) {
                const rect = canvasRef.current?.getBoundingClientRect();
                if (rect) {
                  setDragStart({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                  });
                }
                onElementSelect(element.id);
              }
            }}
          >
            {element.content}
          </div>
        );

      case 'image':
        return (
          <img
            key={element.id}
            src={element.src}
            style={{
              ...baseStyle,
              objectFit: element.objectFit,
            }}
            onMouseDown={() => !element.locked && onElementSelect(element.id)}
          />
        );

      case 'ticket-line':
        return (
          <div
            key={element.id}
            style={{
              ...baseStyle,
              borderBottom: `2px ${element.style} ${element.color}`,
            }}
            onMouseDown={() => !element.locked && onElementSelect(element.id)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-full"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {elements.map(renderElement)}
    </div>
  );
};

export default Canvas;