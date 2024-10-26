// app/components/TicketGenerator/types.ts
export interface TicketData {
    entryType: 'stand' | 'field'  // 看台/内场
    title: string                 // 歌手+演唱会主题+地点
    datetime: string             // 演出时间
    venue: string                // 场馆
    area: string                 // 区域
    row: string                  // 排
    seat: string                 // 号
    price: string                // 票价
    no: string                   // 主券No
    ticketNo: string             // 主券Ticket No
    ticketNumber: string
  }


export interface Template {
  id: string
  name: string
  description: string
  src: string
}