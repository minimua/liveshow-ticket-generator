import { NextRequest, NextResponse } from 'next/server';
import { createCanvas, loadImage, registerFont } from 'canvas';
import fs from 'fs/promises';
import path from 'path';
import { TICKET_TEMPLATES } from '../../components/TicketGenerator/config';
import { format, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';


function mapEntryType(entryType: string): string {
  const entryTypeMap: { [key: string]: string } = {
    'stand': '看台',
    'field': '内场'
  };
  return entryTypeMap[entryType] || entryType;
}


export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { templateId, ...ticketData } = data;

    const template = TICKET_TEMPLATES.find(t => t.id === templateId);
    if (!template) {
      return NextResponse.json({ error: '无效的模板ID' }, { status: 400 });
    }

    // 注册多个字体
    const fontPaths = [
      { path: path.join(process.cwd(), 'public', 'fonts', 'SourceHanSansCN-Regular.ttf'), family: 'SourceHanSansCN-Regular' },
      { path: path.join(process.cwd(), 'public', 'fonts', 'SourceHanSansCN-Bold.ttf'), family: 'SourceHanSansCN-Bold' },
      // 添加更多字体...
    ];

    for (const font of fontPaths) {
      try {
        await fs.access(font.path);
        registerFont(font.path, { family: font.family });
        console.log(`字体注册成功: ${font.family}`);
      } catch (error) {
        console.warn(`未找到字体文件 ${font.family}，将使用系统字体:`, error);
      }
    }

    // 读取模板图片
    const templatePath = path.join(process.cwd(), 'public', template.src);
    console.log('Loading template from:', templatePath);

    try {
      // 加载背景图片
      const image = await loadImage(templatePath);
      const width = image.width;
      const height = image.height;

      // 创建画布
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext('2d');

      // 绘制背景图
      ctx.drawImage(image, 0, 0, width, height);

      const formattedDateTime = format(parseISO(ticketData.datetime), 'yyyy年MM月dd日 HH:mm', { locale: zhCN });


      // 设置字体
      ctx.font = 'bold 130px SourceHanSansCN-Bold, Arial, sans-serif';
      ctx.fillStyle = 'black';

      // 内场/看台
      const entryTypeText = mapEntryType(ticketData.entryType);
      ctx.fillText(entryTypeText, 250, 448);
      
      ctx.font = 'bold 106px SourceHanSansCN-Bold, Arial, sans-serif';
      // 绘制主要信息
      // 标题
      ctx.fillText(ticketData.title, 680, 200);
  
      ctx.font = '82px SourceHanSansCN-Bold, Arial, sans-serif';
      // 日期
      ctx.fillText(formattedDateTime, 1050, 448);
      // 场馆
      ctx.fillText(`${ticketData.venue}`, 1050, 595);
      // 座位 xx区
      ctx.fillText(`${ticketData.area}区`, 1050, 740);
      // xx排 xx号
      ctx.fillText(`${ticketData.row}排${ticketData.seat}号`, 1300, 740);
      // 票价 
      ctx.fillText(`${ticketData.price}元`, 1050, 870);
      ctx.font = '60px SourceHanSansCN-Regular, Arial, sans-serif';
      ctx.fillText(`${ticketData.no}`, 856, 1328);
      ctx.fillText(` ${ticketData.ticketNo}`, 1860, 1328);

      // 绘制副券信息
      ctx.font = '80px SourceHanSansCN-Bold, Arial, sans-serif';
      ctx.fillText(formattedDateTime, width - 950, 550);
      ctx.fillText(`${ticketData.area} 区`, width - 950, 740);
      ctx.fillText(`${ticketData.row} 排${ticketData.seat} 号`, width - 950, 900);
      ctx.fillText(`票价：${ticketData.price}元`, width - 950, 1050);
      ctx.fillText(`Ticket No: ${ticketData.ticketNo}`, width - 950, 1200);

      // 在创建 context 后添加：
      ctx.globalCompositeOperation = 'source-over';

      // 修改 toBuffer 的调用：
      const buffer = canvas.toBuffer('image/jpeg', { quality: 1, chromaSubsampling: false });

      console.log('Image processed successfully');

      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Content-Disposition': `attachment; filename="ticket-${ticketData.ticketNo || 'generated'}.png"`
        }
      });

    } catch (error) {
      console.error('Error processing image:', error);
      return NextResponse.json({ 
        error: '处理图片失败',
        details: error instanceof Error ? error.message : String(error),
        path: templatePath
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error generating ticket:', error);
    return NextResponse.json({
      error: '生成门票失败',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}