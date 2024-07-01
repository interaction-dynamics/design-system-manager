import generateSlug from '@/lib/generate-slug'
import {
  GetComponentResult,
  GetComponentSetResult,
} from 'figma-api/lib/api-types'
import { FigmaComponent } from '../../../types/figma-component'
import { parseFigmaComponent } from './parse-figma-component'

const cleanVariantName = (name: string) => name.replace(/.*=/, '')

interface Size {
  width: number
  height: number
}

export function parseFigmaComponentSet(
  componentResult: GetComponentSetResult,
  size: Size,
  variantComponents: GetComponentResult[],
  variants: { key: string; size: Size }[]
): FigmaComponent {
  return {
    ...parseFigmaComponent(componentResult, size),
    variants: variantComponents
      .map((v, index) => parseFigmaComponent(v, variants[index].size))
      .map((variant) => ({
        ...variant,
        name: cleanVariantName(variant.name),
        slug: generateSlug(cleanVariantName(variant.name)),
      })),
  }
}
