// app/components/TicketGenerator/index.tsx
'use client'

import { useState } from 'react'
import { TicketForm } from './TicketForm'
import { TicketData } from './types'  // 添加这行
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


// 更新默认值
const defaultTicketData: TicketData = {
  entryType: 'stand',
  title: '',
  datetime: '',
  venue: '',
  price: '',
  area: '',
  row: '',      // 添加
  seat: '',
  no: '',       // 添加
  ticketNo: '', // 添加
  ticketNumber: ''
}

// 定义模板数据
const TICKET_TEMPLATES = [
  {
    id: 'template1',
    name: '模板一',
    description: '通用模板正面-大麦蓝色',
    src: '/templates/template1.png'
  },
  {
    id: 'template2',
    name: '模板二',
    description: '通用模板正面-大麦绿色',
    src: '/templates/template2.png'
  },
  {
    id: 'template3',
    name: '模板三',
    description: '通用模板正面-大麦紫色',
    src: '/templates/template3.png'
  }
] as const

export default function TicketGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [ticketData, setTicketData] = useState<TicketData>(defaultTicketData)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!selectedTemplate) {
      alert('请先选择门票模板')
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/liveshow-generate-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: selectedTemplate,
          ...ticketData
        }),
      })

      if (!response.ok) {
        let errorMessage = '生成失败'
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch {
          // 使用默认错误信息
        }
        throw new Error(errorMessage)
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ticket-${ticketData.ticketNumber || 'generated'}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('生成门票失败:', error)
      alert(error instanceof Error ? error.message : '生成门票失败，请重试')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        {/* 模板选择部分 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">选择模板</h2>
            
            {/* 轮播图展示模板 */}
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              afterChange={(index) => setSelectedTemplate(TICKET_TEMPLATES[index].id)}
              className="mb-4"
            >
              {TICKET_TEMPLATES.map((template) => (
                <div key={template.id} className="px-2">
                  <div className={`border rounded-lg p-4 ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-200'
                  }`}>
                    <img
                      src={template.src}
                      alt={template.name}
                      className="w-full h-48 object-contain rounded mb-3"
                    />
                    <div className="text-center">
                      <h3 className="font-medium text-gray-800 text-lg">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>

        {/* 票面信息表单 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">票面信息</h2>
          <TicketForm 
            ticketData={ticketData} 
            setTicketData={setTicketData}
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !selectedTemplate}
          className={`w-full py-3 rounded-lg transition-colors text-white
            ${isGenerating || !selectedTemplate
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {isGenerating ? '生成中...' : '生成门票'}
        </button>
      </div>

      {/* 预览部分 */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">预览</h2>
        <div className="border rounded-lg overflow-hidden">
          {selectedTemplate ? (
            <img
              src={TICKET_TEMPLATES.find(t => t.id === selectedTemplate)?.src}
              alt="门票预览"
              className="w-full h-auto"
            />
          ) : (
            <div className="h-64 flex items-center justify-center bg-gray-100">
              <span className="text-gray-600">请选择模板</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}