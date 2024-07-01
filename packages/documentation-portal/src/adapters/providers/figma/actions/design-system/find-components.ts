import * as Figma from 'figma-api'

import { Component } from '@/domain/entities/component'
import { fetchFile } from '../files'
import { findComponent } from './utils/find-component'
import { findComponentSet } from './utils/find-component-set'

const byName = (a: Component, b: Component) => a.name.localeCompare(b.name)

export interface DocumentNode {
  id: string
  name: string
  type: string
  children?: DocumentNode[]
  characters?: string
  absoluteBoundingBox?: {
    width: number
    height: number
  }
}

const findNode = (
  node: DocumentNode,
  nodeId: string
): DocumentNode | undefined => {
  if (node.id === nodeId) {
    return node
  }

  for (const child of node.children ?? []) {
    const foundNode = findNode(child, nodeId)
    if (foundNode) {
      return foundNode
    }
  }

  return undefined
}

function findSize(
  rootNode: DocumentNode,
  nodeId: string
): { width: number; height: number } {
  const foundNode = findNode(rootNode, nodeId)

  return {
    width: foundNode?.absoluteBoundingBox?.width ?? 0,
    height: foundNode?.absoluteBoundingBox?.height ?? 0,
  }
}

async function findComponentsInFile(fileKey: string, oAuthToken: string) {
  const file = await fetchFile(fileKey, oAuthToken)

  const componentsNotInSet = Object.entries(file.components ?? {})
    .filter(([nodeId, c]) => !c.componentSetId)
    ?.map(([nodeId, c]) => ({
      key: c.key,
      size: findSize(file.document, nodeId),
    }))

  const componentsWithoutVariants = await Promise.all(
    componentsNotInSet.map((c) => findComponent(c.key, c.size, oAuthToken))
  )

  const componentSetsAndVariants = Object.entries(
    (file as any).componentSets ?? {}
  )?.map(([nodeId, componentSet]: any[]) => ({
    variants: Object.entries(file.components ?? {})
      .filter(([variantNodeId, c]) => c.componentSetId === nodeId)
      .map(([variantNodeId, c]) => ({
        key: c.key,
        size: findSize(file.document, variantNodeId),
      })),
    key: componentSet.key,
    size: findSize(file.document, nodeId),
  }))

  const componentsWithVariants = await Promise.all(
    componentSetsAndVariants.map((c) =>
      findComponentSet(c.key, c.size, c.variants, oAuthToken)
    )
  )

  const components = [...componentsWithoutVariants, ...componentsWithVariants]
    .slice()
    .sort(byName)

  return components
}

export async function findFigmaComponents(
  fileKeys: string[],
  oAuthToken: string
) {
  const api = new Figma.Api({ oAuthToken })

  const components = await Promise.all(
    fileKeys.map((fileKey) => findComponentsInFile(fileKey, oAuthToken))
  )

  return components.flatMap((c) => c)
}
