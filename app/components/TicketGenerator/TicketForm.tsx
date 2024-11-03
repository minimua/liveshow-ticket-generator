// app/components/TicketGenerator/TicketForm.tsx
'use client'

import { TicketData } from './types'
import { zhCN } from 'date-fns/locale'
import { TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'



interface TicketFormProps {
  ticketData: TicketData
  setTicketData: React.Dispatch<React.SetStateAction<TicketData>>
}


export function TicketForm({ ticketData, setTicketData }: TicketFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setTicketData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">入场方式</label>
        <select
          name="entryType"
          value={ticketData.entryType || 'stand'}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        >
          <option value="stand">看台</option>
          <option value="field">内场</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">演出标题</label>
        <input
          type="text"
          name="title"
          value={ticketData.title}
          onChange={handleChange}
          maxLength={32}
          placeholder="歌手+演唱会主题+地点"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
      </div>

    
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">演出时间</label>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={zhCN}>
          <DateTimePicker
            value={ticketData.datetime ? new Date(ticketData.datetime) : null}
            onChange={(date: Date | null) => {
              if (date) {
                setTicketData(prev => ({
                  ...prev,
                  datetime: date.toISOString()
                }))
              }
            }}
            ampm={false}
            format="yyyy年MM月dd日 HH:mm"
            slotProps={{
              textField: {
                fullWidth: true,
                size: "medium",
                className: "w-full bg-white",
                sx: {
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#E5E7EB',
                    },
                    '&:hover fieldset': {
                      borderColor: '#3B82F6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#3B82F6',
                      borderWidth: '2px',
                    }
                  },
                  '& .MuiInputBase-input': {
                    padding: '0.5rem 0.75rem',
                    fontSize: '1rem',
                    lineHeight: '1.5rem',
                    color: '#1F2937'
                  }
                }
              }
            }}
          />
        </LocalizationProvider>
      </div>


      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">场馆</label>
        <input
          type="text"
          name="venue"
          value={ticketData.venue}
          onChange={handleChange}
          maxLength={10}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
      </div>

   
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">区域</label>
          <div className="relative">
            <input
              type="text"
              name="area"
              value={ticketData.area}
              onChange={handleChange}
              placeholder="请输入"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">区</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">排</label>
          <div className="relative">
            <input
              type="text"
              name="row"
              value={ticketData.row}
              onChange={handleChange}
              placeholder="请输入"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">排</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">座号</label>
          <div className="relative">
            <input
              type="text"
              name="seat"
              value={ticketData.seat}
              onChange={handleChange}
              placeholder="请输入"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">号</span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">票价</label>
        <div className="relative">
          <input
            type="number"
            name="price"
            value={ticketData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">元</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">No.</label>
          <input
            type="text"
            name="no"
            value={ticketData.no}
            onChange={handleChange}
            maxLength={12}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Ticket No.</label>
          <input
            type="text"
            name="ticketNo"
            value={ticketData.ticketNo}
            onChange={handleChange}
            maxLength={12}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>
      </div>
    </div>
  )
}