// app/utils/fonts.ts
import { registerFont } from 'canvas'
import path from 'path'

export function registerFonts(): void {
  try {
    registerFont(
      path.join(process.cwd(), 'public', 'fonts', 'SourceHanSansCN-Regular.ttf'),
      { family: 'SourceHanSans' }
    )
    registerFont(
      path.join(process.cwd(), 'public', 'fonts', 'SourceHanSansCN-Bold.ttf'),
      { family: 'SourceHanSans', weight: 'bold' }
    )
    console.log('Fonts registered successfully')
  } catch (error) {
    console.error('Error registering fonts:', error)
  }
}