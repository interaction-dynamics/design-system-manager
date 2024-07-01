import * as Figma from 'figma-api'

import { FigmaStyle } from '../../types/figma-style'
import { parseFigmaStyle } from './parse-figma-style'

async function fetchStyleFromOneFile(
  fileKey: string,
  oAuthToken: string
): Promise<FigmaStyle[]> {
  const api = new Figma.Api({ oAuthToken })

  const figmaStyles = (await api.getFileStyles(fileKey)).meta?.styles ?? []

  const nodeIds = figmaStyles.map((style) => style.node_id)

  const nodesById = (await api.getFileNodes(fileKey, nodeIds)).nodes

  return await Promise.all(
    figmaStyles.map((s) => parseFigmaStyle(s, nodesById as any))
  )
}

export async function fetchStyles(
  fileKeys: string[],
  oAuthToken: string
): Promise<FigmaStyle[]> {
  const promises = fileKeys.map((fileKey) =>
    fetchStyleFromOneFile(fileKey, oAuthToken)
  )

  return (await Promise.all(promises)).flatMap((p) => p)
}
