import { NextRequest } from 'next/server'
import { join } from 'path'
import { createReadStream } from 'fs'
import { stat } from 'fs/promises'

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const filePath = join(process.cwd(), 'content', 'images', ...params.path)
    
    // 检查文件是否存在
    try {
      await stat(filePath)
    } catch {
      return new Response('File not found', { status: 404 })
    }

    // 获取文件类型
    const fileType = filePath.split('.').pop()
    const mimeTypes: { [key: string]: string } = {
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'gif': 'image/gif',
      'webp': 'image/webp',
    }
    const contentType = mimeTypes[fileType?.toLowerCase() || ''] || 'application/octet-stream'

    // 创建文件流
    const stream = createReadStream(filePath)
    
    return new Response(stream as any, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    console.error('Error serving image:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
} 