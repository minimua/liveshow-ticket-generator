// app/page.tsx
import TicketGenerator from './components/TicketGenerator'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">我是一张纸质票</h1>
        <TicketGenerator />
      </div>
    </main>
  )
}