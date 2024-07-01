import * as Figma from 'figma-api'
import { FigmaComponent } from '../../../types/figma-component'
import { parseFigmaComponent } from './parse-figma-component'

interface ComponentInfo {
  key: string
  size: { width: number; height: number }
}

export async function findComponent(
  key: string,
  size: { width: number; height: number },
  oAuthToken: string
): Promise<FigmaComponent> {
  const api = new Figma.Api({ oAuthToken })

  const component = await api.getComponent(key)

  return parseFigmaComponent(component, size)
}
