import generateSlug from '@/lib/generate-slug'
import { FigmaComponent } from '../../../types/figma-component'
import { GetComponentResult } from 'figma-api/lib/api-types'

export function parseFigmaComponent(
  componentResult: GetComponentResult,
  size: { width: number; height: number }
): FigmaComponent {
  if (!componentResult.meta) throw new Error('Figma component meta is missing')

  const figmaComponent = componentResult.meta

  return {
    id: '',
    name: figmaComponent.name,
    slug: generateSlug(figmaComponent.name),
    variants: [],
    properties: [],
    providers: {
      figma: {
        description: figmaComponent.description,
        thumbnailUrl: figmaComponent.thumbnail_url,
        key: figmaComponent.key,
        nodeId: figmaComponent.node_id,
        fileKey: figmaComponent.file_key,
        width: size.width,
        height: size.height,
      },
    },
  }
}
