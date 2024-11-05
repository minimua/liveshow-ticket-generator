// app/page.tsx
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          我是一张纸质票
        </h1>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* 模板生成入口 */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">表单生成</h2>
            <p className="text-gray-600 mb-6 h-20">
              选择模板，填写表单生成。
            </p>
            <Link 
              href="/generate"
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              开始
            </Link>
          </div>

          {/* 快速编辑入口 */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">编辑模板</h2>
            <p className="text-gray-600 mb-6 h-20">
              直接编辑模板文字内容即可生成。
            </p>
            <Link 
              href="/fast"
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              开始
            </Link>
          </div>

          {/* 在线编辑入口 */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-xl font-semibold text-gray-900">在线编辑器</h2>
              <span className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">building</span>
            </div>
            <p className="text-gray-600 mb-6 h-20">
              使用强大的在线编辑器，自由设计您的票据样式。
              支持拖拽编辑、实时预览等高级功能。
            </p>
            <Link
              // to'do
              href="/"
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed" // 修改为灰色并禁用
              aria-disabled="true" // 添加无障碍属性
            >
              开始
            </Link>
          </div>


        </div>
      </div>
    </main>
  )
}