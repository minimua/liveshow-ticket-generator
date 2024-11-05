// app/types/template.ts
export interface TicketField {
    id: string;
    type: 'text' | 'date' | 'number';
    key: string;
    label: string;
    defaultValue: string;
    x: number;
    y: number;
    fontSize: number;
    fontFamily: string;
    color: string;
    required?: boolean;
    maxLength?: number;
    placeholder?: string;
  }
  
  export interface TicketTemplate {
    id: string;
    name: string;
    description?: string;
    thumbnail: string;
    background: string;
    width: number;
    height: number;
    fields: TicketField[];
    dpi?: number;
  }