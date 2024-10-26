// app/components/TicketGenerator/ImagePreview.tsx
'use client'

interface ImagePreviewProps {
  previewUrl: string | null
}

export function ImagePreview({ previewUrl }: ImagePreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">预览</h2>
      <div className="border rounded-lg overflow-hidden">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="门票预览"
            className="w-full h-auto"
          />
        ) : (
          <div className="h-64 flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">等待上传模板</span>
          </div>
        )}
      </div>
    </div>
  )
}