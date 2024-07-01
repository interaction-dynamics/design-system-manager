import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { findFigmaDesignSystemCredentials } from '@/adapters/data-access/figma-design-system-credentials'
import { fetchFile } from '@/adapters/providers/figma/actions/files'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  {
    params: { designSystemId, fileKey },
  }: { params: { designSystemId: string; fileKey: string } }
) {
  const { accessToken } = await findFigmaDesignSystemCredentials(designSystemId)

  // https://www.figma.com/design/zTNDlw3P1z5pjm9mOFzB62/Example-Design-System---With-Variants?node-id=2132-7&t=Tnd8cgqHyHZsA8CY-1

  const figmaFile = await fetchFile(fileKey, accessToken)

  return Response.json({ name: figmaFile.name })
}
