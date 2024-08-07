import {
  ColorStyle,
  ElevationStyle,
  Style,
  TypographyStyle,
} from '../entities/style'

function aggregateTokenRecursive(
  acc: Record<string, any>,
  path: string[],
  value: string | number
): Record<string, any> {
  if (path.length === 1) {
    return {
      ...acc,
      [path[0]]: {
        $value: value,
      },
    }
  }

  const [current, ...rest] = path

  return {
    ...acc,
    [current]: {
      ...acc[current],
      ...aggregateTokenRecursive(acc[current], rest, value),
    },
  }
}

function buildToken<IStyle extends Style>(func: (style: IStyle) => any) {
  return (acc: Record<string, any>, style: IStyle) => {
    const path = style.name.split(/[-/]/)

    return aggregateTokenRecursive(acc, path, func(style))
  }
}

export function generateDesignTokens({ styles }: { styles: Style[] }) {
  const colors = styles
    .filter((style) => style.type === 'color')
    .map((s) => s as ColorStyle)
    .reduce(
      buildToken((style) => style.metadata.color),
      { $type: 'color' }
    )

  const shadows = styles
    .filter((style) => style.type === 'elevation')
    .map((s) => s as ElevationStyle)
    .reduce(
      buildToken((style) => ({
        color: style.metadata.color,
        offsetX: style.metadata.offsetX,
        offsetY: style.metadata.offsetY,
        blur: style.metadata.blurRadius,
      })),
      { $type: 'shadow' }
    )

  const typography = styles
    .filter((style) => style.type === 'typography')
    .map((s) => s as TypographyStyle)
    .reduce(
      buildToken((style) => ({
        fontFamily: style.metadata.fontFamily,
        fontSize: style.metadata.fontSize,
        fontWeight: style.metadata.fontWeight,
        lineHeight: style.metadata.lineHeight,
      })),
      { $type: 'typography' }
    )

  return {
    colors,
    dimensions: {},
    text: {
      typography,
    },
    'object-values': {
      shadows,
    },
  }
}
