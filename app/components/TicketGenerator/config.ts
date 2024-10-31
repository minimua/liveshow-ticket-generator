// app/components/TicketGenerator/config.ts
export const TICKET_TEMPLATES = [
  {
    id: 'template1',
    name: '演唱会门票模板',
    description: '标准票面设计',
    src: '/templates/template1.png',
    textConfig: {
      title: {
        x: 250,
        y: 50,
        fontSize: 32
      },
      datetime: {
        x: 350,
        y: 120,
        fontSize: 24
      },
      venue: {
        x: 350,
        y: 170,
        fontSize: 24
      },
      seatInfo: {
        x: 350,
        y: 220,
        fontSize: 24
      },
      price: {
        x: 350,
        y: 270,
        fontSize: 24
      },
      no: {
        x: 100,
        y: 450,
        fontSize: 24
      },
      ticketNo: {
        x: 450,
        y: 450,
        fontSize: 24
      },
      subTicket: {
        datetime: { x: 1100, y: 180, fontSize: 20 },
        area: { x: 1100, y: 220, fontSize: 20 },
        seat: { x: 1100, y: 260, fontSize: 20 },
        price: { x: 1100, y: 300, fontSize: 20 },
        ticketNo: { x: 1100, y: 340, fontSize: 20 }
      }
    }
  },
  {
    id: 'template2',
    name: '模板二',
    description: '通用模板正面-大麦紫色',
    src: '/templates/template2.png',
    textConfig: {
      // 复制 template1 的配置并根据需要调整
    }
  },
  {
    id: 'template3',
    name: '模板三',
    description: '通用模板正面-大麦紫色',
    src: '/templates/template3.png',
    textConfig: {
      // 复制 template1 的配置并根据需要调整
    }
  }
] as const