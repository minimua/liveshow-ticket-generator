// app/components/FastEditor/index.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Move, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

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
  const [scale, setScale] = useState(0.8);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  
  // 基础常量
  const TEMPLATE_WIDTH = 4035;
  const DISPLAY_WIDTH = 1040;
  const SCALE_RATIO = DISPLAY_WIDTH / TEMPLATE_WIDTH;
  const PT_TO_PX_RATIO = 500 / 72; // DPI(500) / 72

  // PS点值转像素值
  const ptToPx = (pt: number) => pt * PT_TO_PX_RATIO * SCALE_RATIO;

  // 计算示例
  // 如果PS中字体大小为16pt：
  // 1. 16pt * 6.944444 ≈ 111.11px (在500 DPI下)
  // 2. 111.11px * 0.258 ≈ 28.67px (缩放到显示尺寸)

  const [editableTexts, setEditableTexts] = useState<EditableText[]>([
    // 主券
    {
      id: 'entryType',
      text: '内场',
      x: 65,
      y: 100,
      fontSize: ptToPx(16),
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'title',
      text: '五月天5525回到那一天世界巡回演唱会 上海站',
      x: 170,
      y: 28,
      fontSize: ptToPx(16),
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'datetime',
      text: '2024年11月24日 18:10',
      x: 260,
      y: 92,
      fontSize: ptToPx(12),
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'venue',
      text: '某某体育馆',
      x: 260,
      y: 128,
      fontSize: ptToPx(12),
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'area',
      text: 'A区',
      x: 260,
      y: 165,
      fontSize: ptToPx(12),
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'seatInfo',
      text: '12排34号',
      x: 320,
      y: 165,
      fontSize: ptToPx(12),
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'price',
      text: '580元',
      x: 260,
      y: 202,
      fontSize: ptToPx(12),
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'ticketNo1',
      text: 'A123456',
      x: 230,
      y: 327,
      fontSize: ptToPx(8),
      fontFamily: 'SourceHanSansCN-Regular',
      color: '#000000',
      isEditing: false
    },
    {
      id: 'ticketNo2',
      text: 'B123456',
      x: 495,
      y: 327,
      fontSize: ptToPx(8),
      fontFamily: 'SourceHanSansCN-Regular',
      color: '#000000',
      isEditing: false
    },
    {
      id: 'stub_datetime',
      text: '2024年11月24日 18:10',
      x: 790,
      y: 120,
      fontSize: ptToPx(11),
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'stub_area',
      text: 'A区',
      x: 790,
      y: 160,
      fontSize: ptToPx(11),
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'stub_seat',
      text: '12排34号',
      x: 790,
      y: 190,
      fontSize: ptToPx(11),
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'stub_price',
      text: '票价：580元',
      x: 790,
      y: 230,
      fontSize: ptToPx(11),
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
    {
      id: 'stub_ticketNo',
      text: 'Ticket No: B123456',
      x: 790,
      y: 280,
      fontSize: ptToPx(11),
      fontFamily: 'SourceHanSansCN-Bold',
      color: '#000000',
      isEditing: false,
      isBold: true
    },
  ]);

  // 响应式缩放
  useEffect(() => {
    const calculateScale = () => {
      const { innerWidth: width, innerHeight: height } = window;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        const availableHeight = height - 88;
        const availableWidth = width - 32;
        const scaleX = availableWidth / 1040;
        const scaleY = availableHeight / 432;
        setScale(Math.min(scaleX, scaleY));
      } else {
        setScale(Math.min((width - 32) / 1040, (height - 120) / 432, 0.8));
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  // 文本编辑处理
  const handleTextInteraction = (id: string, e: React.MouseEvent | React.TouchEvent | null) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setEditableTexts(texts => texts.map(text => ({
      ...text,
      isEditing: text.id === id
    })));
  };

  const handleTextChange = (id: string, newText: string) => {
    setEditableTexts(texts => texts.map(text =>
      text.id === id ? { ...text, text: newText } : text
    ));
  };

  // 拖拽处理
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, id: string, x: number, y: number) => {
    e.preventDefault();
    setDraggedItem(id);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX - x, y: clientY - y });
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!draggedItem || !dragStart) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    setEditableTexts(texts => texts.map(text =>
      text.id === draggedItem
        ? { 
            ...text, 
            x: (clientX - dragStart.x) / scale,
            y: (clientY - dragStart.y) / scale
          }
        : text
    ));
  };


  // 导出处理
  const handleExport = async () => {
    if (!canvasRef.current) return;

    try {
      // 加载提示
      const loadingToast = document.createElement('div');
      loadingToast.textContent = '正在生成图片...';
      loadingToast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        z-index: 9999;
      `;
      document.body.appendChild(loadingToast);

      const container = canvasRef.current;
      
      // 保存原始状态
      const dragHandles = container.querySelectorAll('.drag-handle');
      const originalTransform = container.style.transform;
      const originalPositions = editableTexts.map(text => ({ id: text.id, y: text.y }));

      // 准备导出
      dragHandles.forEach(handle => (handle as HTMLElement).style.display = 'none');
      container.style.transform = 'none';

      // 临时调整文字位置
      setEditableTexts(texts => texts.map(text => ({
        ...text,
        y: text.y - 10
      })));

      await new Promise(resolve => setTimeout(resolve, 0));

      // 生成图片
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: 'white',
        width: 1040,
        height: 432,
        logging: false,
        onclone: (clonedDoc) => {
          const element = clonedDoc.querySelector('[data-html2canvas-clone]');
          if (element instanceof HTMLElement) {
            element.style.cssText = `
              transform: none;
              width: 1040px;
              height: 432px;
              position: relative;
              transform-origin: top left;
            `;
          }
        }
      });

      // 恢复状态
      setEditableTexts(texts => texts.map(text => ({
        ...text,
        y: originalPositions.find(p => p.id === text.id)?.y || text.y
      })));

      container.style.transform = originalTransform;
      dragHandles.forEach(handle => (handle as HTMLElement).style.display = '');
      document.body.removeChild(loadingToast);

      // 下载图片
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        window.open(dataUrl);
      } else {
        const link = document.createElement('a');
        link.download = `ticket-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('导出失败，请重试');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* 工具栏 */}
      <div className="h-14 bg-white border-b flex items-center px-2 sm:px-4 justify-between">
        <button className="p-1.5 sm:p-2 rounded bg-blue-50 text-blue-600 text-sm">
          编辑模式
        </button>
        <button 
          onClick={handleExport}
          className="px-2 sm:px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-1 text-sm"
        >
          <Download size={14} />
          <span>导出</span>
        </button>
      </div>

      {/* 编辑区域 */}
      <div
        className="flex-1 flex justify-center items-center bg-gray-100 overflow-hidden touch-none"
        onMouseMove={handleDragMove as (e: React.MouseEvent) => void}
        onTouchMove={handleDragMove as (e: React.TouchEvent) => void}
        onMouseUp={() => setDraggedItem(null)}
        onMouseLeave={() => setDraggedItem(null)}
        onTouchEnd={() => setDraggedItem(null)}
      >
        <div
          ref={canvasRef}
          className="relative bg-white shadow-lg"
          style={{
            width: '1040px',
            height: '432px',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            maxWidth: '100vw',
            maxHeight: '100vh',
          }}
        >
          <img
            src="/templates/template1.png"
            alt="票据模板背景"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ touchAction: 'none' }}
          />
          
          {/* 文本元素 */}
          <div className="absolute inset-0" style={{ touchAction: 'none' }}>
            {editableTexts.map(text => (
              <div
                key={text.id}
                className="absolute group"
                style={{
                  left: `${text.x}px`,
                  top: `${text.y}px`,
                  fontSize: `${text.fontSize}px`,
                  fontFamily: text.fontFamily,
                  color: text.color,
                  fontWeight: text.isBold ? 'bold' : 'normal',
                  touchAction: 'none',
                }}
              >
                {text.isEditing ? (
                  <input
                    type="text"
                    value={text.text}
                    onChange={(e) => handleTextChange(text.id, e.target.value)}
                    onBlur={() => handleTextInteraction('', null)}
                    autoFocus
                    className="bg-transparent border-none outline-none w-full"
                    style={{
                      fontSize: `${text.fontSize}px`,
                      fontFamily: text.fontFamily,
                      color: text.color,
                      fontWeight: text.isBold ? 'bold' : 'normal',
                      minWidth: '60px',
                    }}
                  />
                ) : (
                  <>
                    <span
                      onClick={(e) => handleTextInteraction(text.id, e)}
                      onTouchStart={(e) => handleTextInteraction(text.id, e)}
                      className="select-none block min-w-[30px] min-h-[20px]"
                    >
                      {text.text}
                    </span>
                    <button
                      className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 p-2 bg-white rounded shadow drag-handle"
                      onMouseDown={(e) => handleDragStart(e, text.id, text.x, text.y)}
                      onTouchStart={(e) => handleDragStart(e, text.id, text.x, text.y)}
                    >
                      <Move size={16} />
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}