// app/components/FastEditor/index.tsx
'use client';

import React, { useState, useRef } from 'react';  // 添加 useRef
import { Move, Download } from 'lucide-react';  // 正确导入 Download 图标
import html2canvas from 'html2canvas';

// 定义票据尺寸常量（单位：像素）
const TICKET_WIDTH = 5000;  // 原始canvas宽度
const TICKET_HEIGHT = 3000; // 原始canvas高度
const SCALE_FACTOR = 0.1;   // 缩放因子

interface EditableText {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  isEditing: boolean;
  isBold?: boolean;
}

export default function FastEditor() {
  const canvasRef = useRef<HTMLDivElement>(null);

  // 状态定义
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  

  const [editableTexts, setEditableTexts] = useState<EditableText[]>([
    // 主券
    {
      id: 'entryType',
      text: '内场',
      x: 500 * SCALE_FACTOR,
      y: 896 * SCALE_FACTOR,
      fontSize: 26,
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'title',
      text: '演唱会标题',
      x: 1360 * 0.1,
      y: 400 * 0.1,
      fontSize: 21.2, // 212px * 0.1
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'datetime',
      text: '2024-01-08 20:00',
      x: 2100 * 0.1,
      y: 896 * 0.1,
      fontSize: 16.4,  // 164px * 0.1
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'venue',
      text: '某某体育馆',
      x: 2100 * 0.1,
      y: 1190 * 0.1,
      fontSize: 16.4,
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'area',
      text: 'A区',
      x: 2100 * 0.1,
      y: 1480 * 0.1,
      fontSize: 16.4,
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'seatInfo',
      text: '12排34号',
      x: 2600 * 0.1,
      y: 1480 * 0.1,
      fontSize: 16.4,
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'price',
      text: '580元',
      x: 2100 * 0.1,
      y: 1740 * 0.1,
      fontSize: 16.4,
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'ticketNo1',
      text: 'A123456',
      x: 1712 * 0.1,
      y: 2656 * 0.1,
      fontSize: 12,  // 120px * 0.1
      fontFamily: 'SourceHanSansCN-Regular',
      color: '#000000',
      isEditing: false
    },
    {
      id: 'ticketNo2',
      text: 'B123456',
      x: 3720 * 0.1,
      y: 2656 * 0.1,
      fontSize: 12,
      fontFamily: 'SourceHanSansCN-Regular',
      color: '#000000',
      isEditing: false
    },
     // 副券部分使用 TICKET_WIDTH
     {
      id: 'stub_datetime',
      text: '2024-01-08 20:00',
      x: (TICKET_WIDTH - 1900) * SCALE_FACTOR,
      y: 1100 * SCALE_FACTOR,
      fontSize: 16,
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'stub_area',
      text: 'A区',
      x: (TICKET_WIDTH - 1900) * SCALE_FACTOR,
      y: 1480 * SCALE_FACTOR,
      fontSize: 16,
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'stub_seat',
      text: '12排34号',
      x: (TICKET_WIDTH - 1900) * SCALE_FACTOR,
      y: 1800 * SCALE_FACTOR,
      fontSize: 16,
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'stub_price',
      text: '票价：580元',
      x: (TICKET_WIDTH - 1900) * SCALE_FACTOR,
      y: 2100 * SCALE_FACTOR,
      fontSize: 16,
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'stub_ticketNo',
      text: 'Ticket No: B123456',
      x: (TICKET_WIDTH - 1900) * SCALE_FACTOR,
      y: 2400 * SCALE_FACTOR,
      fontSize: 16,
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    }
  ]);

 // 处理文本点击事件
 const handleTextClick = (id: string) => {
  setEditableTexts(texts => texts.map(text => ({
    ...text,
    isEditing: text.id === id
  })));
};

// 处理文本变化事件
const handleTextChange = (id: string, newText: string) => {
  setEditableTexts(texts => texts.map(text => 
    text.id === id ? { ...text, text: newText } : text
  ));
};

// 处理拖拽开始
const handleDragStart = (e: React.MouseEvent, id: string, x: number, y: number) => {
  setDraggedItem(id);
  setDragStart({ x: e.clientX - x, y: e.clientY - y });
  e.preventDefault();
};

// 处理拖拽移动
const handleDragMove = (e: React.MouseEvent) => {
  if (!draggedItem || !dragStart) return;

  const newX = e.clientX - dragStart.x;
  const newY = e.clientY - dragStart.y;

  setEditableTexts(texts => texts.map(text => 
    text.id === draggedItem 
      ? { ...text, x: newX, y: newY }
      : text
  ));
};

// 处理拖拽结束
const handleDragEnd = () => {
  setDraggedItem(null);
  setDragStart(null);
};

// 添加导出功能
const handleExport = async () => {
  if (!canvasRef.current) return;

  try {
    // 临时移除拖动手柄
    const dragHandles = canvasRef.current.querySelectorAll('.drag-handle');
    dragHandles.forEach(handle => {
      (handle as HTMLElement).style.display = 'none';
    });

     // 修改这里的配置
     const canvas = await html2canvas(canvasRef.current, {
      scale: 2,  // 调整缩放比例
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      width: 4035,  // 设置为模板原始宽度
      height: 1673, // 设置为模板原始高度
      // 可选：设置具体的 DPI
      imageTimeout: 0,
      logging: true, // 开启日志以便调试
    });

    // 恢复拖动手柄显示
    dragHandles.forEach(handle => {
      (handle as HTMLElement).style.display = '';
    });

    // 创建下载链接
    const link = document.createElement('a');
    link.download = `ticket-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  } catch (error) {
    console.error('Export failed:', error);
    alert('导出失败，请重试');
  }
};

return (
  <div className="flex flex-col h-screen">
    {/* 顶部工具栏 */}
    <div className="h-14 bg-white border-b flex items-center px-4 justify-between">
      <div className="flex items-center gap-4">
        <button className="p-2 rounded bg-blue-50 text-blue-600">
          编辑模式
        </button>
      </div>
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
        onClick={handleExport}
      >
        <Download size={16} />
        导出图片
      </button>
    </div>

    {/* 编辑区域 */}
    <div className="flex-1 flex justify-center items-center p-8 bg-gray-100"
         onMouseMove={handleDragMove}
         onMouseUp={handleDragEnd}
         onMouseLeave={handleDragEnd}>
      <div 
        ref={canvasRef}
        className="relative bg-white shadow-lg rounded-lg overflow-hidden"
        style={{
          width: '206mm',
          height: '86mm',
          transform: 'scale(0.8)',
          transformOrigin: 'center center',
        }}
      >
        {/* 背景图片 */}
        <img 
          src="/templates/template1.png"
          alt="票据模板背景"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* 可编辑文本元素 */}
        {editableTexts.map(text => (
          <div
            key={text.id}
            className="absolute group cursor-move"
            style={{
              left: `${text.x}px`,
              top: `${text.y}px`,
              fontSize: `${text.fontSize}px`,
              fontFamily: text.fontFamily,
              color: text.color,
              fontWeight: text.isBold ? 'bold' : 'normal',
            }}
          >
            {text.isEditing ? (
              <input
                type="text"
                value={text.text}
                onChange={(e) => handleTextChange(text.id, e.target.value)}
                onBlur={() => handleTextClick('')}
                autoFocus
                className="bg-transparent border-none outline-none w-full"
                style={{
                  fontSize: `${text.fontSize}px`,
                  fontFamily: text.fontFamily,
                  color: text.color,
                  fontWeight: text.isBold ? 'bold' : 'normal',
                }}
              />
            ) : (
              <>
                <span 
                  onClick={() => handleTextClick(text.id)}
                  className="select-none"
                >
                  {text.text}
                </span>
                <button
                  className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 bg-white rounded shadow drag-handle"
                  onMouseDown={(e) => handleDragStart(e, text.id, text.x, text.y)}
                >
                  <Move size={14} />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);
}