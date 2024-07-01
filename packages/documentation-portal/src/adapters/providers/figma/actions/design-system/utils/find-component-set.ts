import * as Figma from 'figma-api'
import { FigmaComponent } from '../../../types/figma-component'
import { parseFigmaComponentSet } from './parse-figma-component-set'

interface ComponentInfo {
  key: string
  size: { width: number; height: number }
}

export async function findComponentSet(
  key: string,
  size: { width: number; height: number },
  variants: { key: string; size: { width: number; height: number } }[],
  oAuthToken: string
): Promise<FigmaComponent> {
  const api = new Figma.Api({ oAuthToken })

  const component = await api.getComponentSet(key)

  const variantComponents = await Promise.all(
    variants.map((v) => api.getComponent(v.key))
  )

  return parseFigmaComponentSet(component, size, variantComponents, variants)
}
