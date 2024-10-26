// app/utils/fonts.ts
import Jimp from 'jimp'
import path from 'path'

export async function loadCustomFont(size: number) {
  const fontPath = path.join(process.cwd(), 'public', 'fonts', 'SourceHanSansCN-Regular.ttf')
  return await Jimp.loadFont(fontPath)
}