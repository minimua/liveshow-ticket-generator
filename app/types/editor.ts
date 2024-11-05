// app/types/editor.ts

export interface Position {
    x: number;
    y: number;
  }
  
  export interface Size {
    width: number;
    height: number;
  }
  
  export interface ElementBase {
    id: string;
    type: 'text' | 'image' | 'ticket-line';
    position: Position;
    size: Size;
    rotation: number;
    locked: boolean;
  }
  
  export interface TextElement extends ElementBase {
    type: 'text';
    content: string;
    fontFamily: string;
    fontSize: number;
    fontWeight: string;
    color: string;
    alignment: 'left' | 'center' | 'right';
  }
  
  export interface ImageElement extends ElementBase {
    type: 'image';
    src: string;
    objectFit: 'contain' | 'cover';
  }
  
  export interface TicketLineElement extends ElementBase {
    type: 'ticket-line';
    style: 'solid' | 'dashed';
    color: string;
  }
  
  export type EditorElement = TextElement | ImageElement | TicketLineElement;
  
  export interface Template {
    id: string;
    name: string;
    thumbnail: string;
    frontPage: {
      background: string;
      elements: EditorElement[];
    };
    backPage: {
      background: string;
      elements: EditorElement[];
    };
  }
  
  export interface EditorState {
    currentTemplate: Template | null;
    activePage: 'front' | 'back';
    selectedElements: string[];
    elements: EditorElement[];
    canvasSize: Size;
  }