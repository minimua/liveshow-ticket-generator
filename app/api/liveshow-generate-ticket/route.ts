import { NextRequest, NextResponse } from 'next/server';
import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas'
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
    ];

    for (const font of fontPaths) {
      try {
        await fs.access(font.path);
        GlobalFonts.registerFromPath(font.path, font.family);
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
      const width = image.width * 2;  // 增加画布尺寸
      const height = image.height * 2;

      // 创建画布
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext('2d');

      // 启用抗锯齿
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // 绘制背景图并放大
      ctx.drawImage(image, 0, 0, width, height);

      const formattedDateTime = format(parseISO(ticketData.datetime), 'yyyy年MM月dd日 HH:mm', { locale: zhCN });

      // 设置字体和颜色
      ctx.fillStyle = 'black';

      // 内场/看台
      ctx.font = 'bold 260px SourceHanSansCN-Bold, Arial, sans-serif';
      const entryTypeText = mapEntryType(ticketData.entryType);
      ctx.fillText(entryTypeText, 500, 896);
      
      // 标题
      ctx.font = 'bold 212px SourceHanSansCN-Bold, Arial, sans-serif';
      ctx.fillText(ticketData.title, 1360, 400);
  
      ctx.font = '164px SourceHanSansCN-Bold, Arial, sans-serif';
      // 日期
      ctx.fillText(formattedDateTime, 2100, 896);
      // 场馆
      ctx.fillText(`${ticketData.venue}`, 2100, 1190);
      // 座位 xx区
      ctx.fillText(`${ticketData.area}区`, 2100, 1480);
      // xx排 xx号
      ctx.fillText(`${ticketData.row}排${ticketData.seat}号`, 2600, 1480);
      // 票价 
      ctx.fillText(`${ticketData.price}元`, 2100, 1740);

      ctx.font = '120px SourceHanSansCN-Regular, Arial, sans-serif';
      ctx.fillText(`${ticketData.no}`, 1712, 2656);
      ctx.fillText(` ${ticketData.ticketNo}`, 3720, 2656);

      // 绘制副券信息
      ctx.font = '160px SourceHanSansCN-Bold, Arial, sans-serif';
      ctx.fillText(formattedDateTime, width - 1900, 1100);
      ctx.fillText(`${ticketData.area} 区`, width - 1900, 1480);
      ctx.fillText(`${ticketData.row} 排${ticketData.seat} 号`, width - 1900, 1800);
      ctx.fillText(`票价：${ticketData.price}元`, width - 1900, 2100);
      ctx.fillText(`Ticket No: ${ticketData.ticketNo}`, width - 1900, 2400);

      // 使用PNG格式，保持最高质量
      const buffer = canvas.toBuffer('image/png');

      console.log('Image processed successfully');

      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'image/png',
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