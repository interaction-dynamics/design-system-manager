import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { findFigmaDesignSystemCredentials } from '@/adapters/data-access/figma-design-system-credentials'
import { findFigmaFilesByDesignSystemId } from '@/adapters/data-access/figma-file'
import { findFigmaComponents } from '@/adapters/providers/figma/actions/design-system'
import { FetchIndicator } from './fetch-indicator'

interface Props {
  designSystemSlug: string
}

export async function FetchComponents({ designSystemSlug }: Props) {
  const designSystem = await findDesignSystemBySlug(designSystemSlug)

  if (!designSystem) throw new Error('Design system not found')

  const { accessToken } = await findFigmaDesignSystemCredentials(
    designSystem.id
  )

  const files = await findFigmaFilesByDesignSystemId(designSystem.id)

  const fileKeys = files.map((file) => file.fileKey)

  const components = await findFigmaComponents(fileKeys, accessToken)

  return (
    <FetchIndicator
      title={`${components.length} components found`}
      details={components.map((c) => c.name)}
    />
  )
}
