import { findDesignSystemBySlug } from '@/adapters/data-access/design-systems'
import { findFigmaDesignSystemCredentials } from '@/adapters/data-access/figma-design-system-credentials'
import { findFigmaFilesByDesignSystemId } from '@/adapters/data-access/figma-file'
import { findFigmaComponents } from '@/adapters/providers/figma/actions/design-system'
import { FetchIndicator } from './fetch-indicator'
import { fetchStyles } from '@/adapters/providers/figma/actions/styles'

interface Props {
  designSystemSlug: string
}

export async function FetchStyles({ designSystemSlug }: Props) {
  const designSystem = await findDesignSystemBySlug(designSystemSlug)

  if (!designSystem) throw new Error('Design system not found')

  const { accessToken } = await findFigmaDesignSystemCredentials(
    designSystem.id
  )

  const files = await findFigmaFilesByDesignSystemId(designSystem.id)

  const fileKeys = files.map((file) => file.fileKey)

  const styles = await fetchStyles(fileKeys, accessToken)

  return (
    <FetchIndicator
      title={`${styles.length} styles found`}
      details={styles.map((c) => c.name)}
    />
  )
}
