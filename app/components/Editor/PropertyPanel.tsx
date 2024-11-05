// app/components/Editor/PropertyPanel.tsx
'use client';

import React from 'react';
import { EditorElement } from '@/app/types/editor';

interface PropertyPanelProps {
  selectedElements: EditorElement[];
  onElementUpdate: (elementId: string, updates: Partial<EditorElement>) => void;
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({
  selectedElements,
  onElementUpdate,
}) => {
  if (selectedElements.length === 0) {
    return (
      <div className="w-72 bg-white border-l p-4">
        <div className="text-sm text-gray-500 text-center">
          请选择一个元素进行编辑
        </div>
      </div>
    );
  }

  const element = selectedElements[0]; // 暂时只处理单选

  const renderProperties = () => {
    switch (element.type) {
      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                文字内容
              </label>
              <input
                type="text"
                value={element.content}
                onChange={(e) =>
                  onElementUpdate(element.id, { content: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                字体
              </label>
              <select
                value={element.fontFamily}
                onChange={(e) =>
                  onElementUpdate(element.id, { fontFamily: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="sans-serif">默认字体</option>
                <option value="SourceHanSansCN-Regular">思源黑体常规</option>
                <option value="SourceHanSansCN-Bold">思源黑体粗体</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                字号
              </label>
              <input
                type="number"
                value={element.fontSize}
                onChange={(e) =>
                  onElementUpdate(element.id, { fontSize: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                颜色
              </label>
              <input
                type="color"
                value={element.color}
                onChange={(e) =>
                  onElementUpdate(element.id, { color: e.target.value })
                }
                className="w-full"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                对齐方式
              </label>
              <div className="flex gap-2">
                {['left', 'center', 'right'].map((align) => (
                  <button
                    key={align}
                    className={`flex-1 py-1 px-2 border rounded ${
                      element.alignment === align
                        ? 'bg-blue-50 border-blue-200'
                        : ''
                    }`}
                    onClick={() =>
                      onElementUpdate(element.id, { alignment: align as any })
                    }
                  >
                    {align === 'left' ? '左' : align === 'center' ? '中' : '右'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                图片填充
              </label>
              <select
                value={element.objectFit}
                onChange={(e) =>
                  onElementUpdate(element.id, { objectFit: e.target.value as 'contain' | 'cover' })
                }
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="contain">适应</option>
                <option value="cover">填充</option>
              </select>
            </div>
          </div>
        );

      case 'ticket-line':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                线条样式
              </label>
              <select
                value={element.style}
                onChange={(e) =>
                  onElementUpdate(element.id, { style: e.target.value as 'solid' | 'dashed' })
                }
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="solid">实线</option>
                <option value="dashed">虚线</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                颜色
              </label>
              <input
                type="color"
                value={element.color}
                onChange={(e) =>
                  onElementUpdate(element.id, { color: e.target.value })
                }
                className="w-full"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-72 bg-white border-l p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-4">属性设置</h3>
      {renderProperties()}
      
      <div className="mt-6 pt-6 border-t">
        <h4 className="text-sm font-medium text-gray-900 mb-4">通用属性</h4>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              旋转角度
            </label>
            <input
              type="number"
              value={element.rotation}
              onChange={(e) =>
                onElementUpdate(element.id, { rotation: Number(e.target.value) })
              }
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div className="flex items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={element.locked}
                onChange={(e) =>
                  onElementUpdate(element.id, { locked: e.target.checked })
                }
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">锁定位置</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPanel;