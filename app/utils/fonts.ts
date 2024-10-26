// app/utils/fonts.ts
import { GlobalFonts } from '@napi-rs/canvas'
import path from 'path'

export function registerFonts(): void {
  try {
    GlobalFonts.registerFromPath(
      path.join(process.cwd(), 'public', 'fonts', 'SourceHanSansCN-Regular.ttf'),
      'SourceHanSans'
    )
    GlobalFonts.registerFromPath(
      path.join(process.cwd(), 'public', 'fonts', 'SourceHanSansCN-Bold.ttf'),
      'SourceHanSans Bold'
    )
    console.log('Fonts registered successfully')
  } catch (error) {
    console.error('Error registering fonts:', error)
  }
}