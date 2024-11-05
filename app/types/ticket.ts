// app/types/ticket.ts
// 票据字段定义
export interface TicketField {
  id: string;
  type: 'text' | 'date' | 'number';  // 字段类型
  key: string;                  // 字段标识，用于存储值
  label: string;               // 显示给用户的名称
  defaultValue: string;        // 默认值
  x: number;                   // 在票面上的 X 坐标
  y: number;                   // 在票面上的 Y 坐标
  fontSize: number;            // 字体大小
  fontFamily: string;          // 字体
  color: string;               // 文字颜色
  required?: boolean;          // 是否必填
  maxLength?: number;          // 最大长度
  placeholder?: string;        // 占位文本
}

// 票据模板定义
export interface TicketTemplate {
  id: string;                  // 模板标识
  name: string;                // 模板名称
  description?: string;        // 模板描述
  thumbnail: string;           // 缩略图路径
  background: string;          // 高清背景图路径
  width: number;               // 宽度（毫米）
  height: number;              // 高度（毫米）
  fields: TicketField[];       // 可编辑字段
  dpi?: number;                // 分辨率（默认300）
}