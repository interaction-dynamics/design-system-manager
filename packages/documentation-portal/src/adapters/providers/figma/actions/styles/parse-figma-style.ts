import * as Figma from 'figma-api'
import { StyleType } from '@/domain/entities/style'
import { FigmaStyle } from '../../types/figma-style'
import { StyleMetadata } from 'figma-api/lib/api-types'

const typeMap: Record<string, StyleType> = {
  FILL: 'color',
  TEXT: 'typography',
  EFFECT: 'elevation',
  GRID: 'spacing',
}

interface HttpFigmaNode {
  document: {
    id: string
    name: string
    type: string
    scrollBehavior: string
    blendMode: string
    absoluteBoundingBox: {
      x: number
      y: number
      width: number
      height: number
    }
    absoluteRenderBounds: {
      x: number
      y: number
      width: number
      height: number
    }
    constraints: any
    fills: Array<{
      blendMode: string
      type: string
      color: {
        r: number
        g: number
        b: number
        a: number
      }
    }>
    style?: {
      fontFamily: string
      fontPostScriptName: string
      fontWeight: number
      textAutoResize: string
      fontSize: number
      textAlignHorizontal: string
      textAlignVertical: string
      letterSpacing: number
      lineHeightPx: number
      lineHeightPercent: number
      lineHeightUnit: string
    }
    effects: Array<{
      type: string
      visible: boolean
      color: {
        r: number
        g: number
        b: number
        a: number
      }
      blendMode: string
      offset: {
        x: number
        y: number
      }
      radius: number
      showShadowBehindNode: boolean
    }>
    layoutGrids?: Array<{
      pattern: string
      sectionSize: number
      visible: boolean
      alignment: string
      gutterSize: number
      offset: number
      count: number
    }>
    strokes: any
    strokeWeight: any
    strokeAlign: any
    exportSettings: any
  }
  components: {
    [nodeId: string]: Figma.Component
  }
  schemaVersion: number
  styles: {
    [styleName: string]: Figma.Style
  }
}

function convertFigmaColor(
  red: number,
  green: number,
  blue: number,
  alpha: number
) {
  return `rgba(${Math.round(red * 255)}, ${Math.round(
    green * 255
  )}, ${Math.round(blue * 255)}, ${alpha})`
}

export async function parseFigmaStyle(
  style: StyleMetadata,
  nodes: {
    [nodeId: string]: HttpFigmaNode | null
  }
): Promise<FigmaStyle> {
  if (!(style.style_type in typeMap)) {
    throw new Error(`Unknown style type: ${style.style_type}`)
  }

  const node = nodes[style.node_id]

  if (!node) {
    throw new Error(`Impossible to find node: ${style.node_id}`)
  }

  if (typeMap[style.style_type] === 'color') {
    const color = node.document.fills.find((f) => f.type === 'SOLID')?.color

    return {
      id: '',
      name: style.name,
      type: 'color',
      metadata: {
        color: convertFigmaColor(
          color?.r ?? 0,
          color?.g ?? 0,
          color?.b ?? 0,
          color?.a ?? 0
        ),
      },
      providers: {
        figma: {
          key: style.key,
          fileKey: style.file_key,
          nodeId: style.node_id,
          thumbnailUrl: style.thumbnail_url,
          description: style.description,
          width: node.document.absoluteBoundingBox.width,
          height: node.document.absoluteBoundingBox.height,
        },
      },
    }
  }

  if (typeMap[style.style_type] === 'typography') {
    return {
      id: '',
      name: style.name,
      type: 'typography',
      metadata: {
        fontFamily: node.document.style?.fontFamily ?? '',
        fontSize: node.document.style?.fontSize ?? 0,
        fontWeight: node.document.style?.fontWeight ?? 0,
        lineHeight: (node.document.style?.lineHeightPercent ?? 0) / 100,
        letterSpacing: node.document.style?.letterSpacing ?? 0,
      },
      providers: {
        figma: {
          key: style.key,
          fileKey: style.file_key,
          nodeId: style.node_id,
          thumbnailUrl: style.thumbnail_url,
          description: style.description,
          width: node.document.absoluteBoundingBox.width,
          height: node.document.absoluteBoundingBox.height,
        },
      },
    }
  }

  if (typeMap[style.style_type] === 'elevation') {
    const effect = node.document.effects.find((e) => e.type === 'DROP_SHADOW')

    return {
      id: '',
      name: style.name,
      type: 'elevation',
      metadata: {
        type: 'drop-shadow',
        color: convertFigmaColor(
          effect?.color.r ?? 0,
          effect?.color.g ?? 0,
          effect?.color.b ?? 0,
          effect?.color.a ?? 0
        ),
        offsetX: effect?.offset.x ?? 0,
        offsetY: effect?.offset.y ?? 0,
        blurRadius: effect?.radius ?? 0,
        spreadRadius: 0,
      },
      providers: {
        figma: {
          key: style.key,
          fileKey: style.file_key,
          nodeId: style.node_id,
          thumbnailUrl: style.thumbnail_url,
          description: style.description,
          width: node.document.absoluteBoundingBox.width,
          height: node.document.absoluteBoundingBox.height,
        },
      },
    }
  }

  if (typeMap[style.style_type] === 'spacing') {
    const layout = node.document.layoutGrids?.find((l) => l.pattern === 'GRID')

    return {
      id: '',
      name: style.name,
      type: 'spacing',
      metadata: {
        spacing: layout?.sectionSize ?? 0,
      },
      providers: {
        figma: {
          key: style.key,
          fileKey: style.file_key,
          nodeId: style.node_id,
          thumbnailUrl: style.thumbnail_url,
          description: style.description,
          width: node.document.absoluteBoundingBox.width,
          height: node.document.absoluteBoundingBox.height,
        },
      },
    }
  }

  throw new Error(`Unknown style type: ${style.style_type}`)
}
