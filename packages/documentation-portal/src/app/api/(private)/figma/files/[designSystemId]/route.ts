import { createFigmaFile } from '@/adapters/data-access/figma-file'
import { NextRequest } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { designSystemId: string } }
) {
  const { fileKeys } = await request.json()

  try {
    await Promise.all(
      fileKeys.map(async (fileKey: string) => {
        await createFigmaFile(fileKey, params.designSystemId)
      })
    )

    return Response.json({ success: true })
  } catch {
    return Response.json({ success: false })
  }
}
