// app/fast/page.tsx
import FastEditor from '../components/FastEditor'  // 使用 @ 别名导入

export default function FastEditPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <FastEditor />
    </div>
  )
}