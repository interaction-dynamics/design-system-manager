import { PartialComponent } from '@/domain/entities/partial-component'
import fetchFigmaComponent from './fetchFigmaComponent'
import parseFigmaComponent from './parseFigmaComponent'
import fetchFigmaComponentSet from './fetchFigmaComponentSet'
import parseFigmaComponentSet from './parseFigmaComponentSet'

export default async function getComponent(partialComponent: PartialComponent) {
  if (partialComponent.variants.length > 0) {
    const figmaComponentSet = await fetchFigmaComponentSet(
      process.env.FIGMA_TOKEN ?? '',
      partialComponent.providers.figma?.key ?? ''
    )

    const figmaVariants = await Promise.all(
      partialComponent.variants.map((v) =>
        fetchFigmaComponent(
          process.env.FIGMA_TOKEN ?? '',
          v.providers.figma?.key ?? ''
        )
      )
    )

    const component = parseFigmaComponentSet(
      figmaComponentSet,
      figmaVariants,
      partialComponent
    )

    return component
  }

  const figmaComponent = await fetchFigmaComponent(
    process.env.FIGMA_TOKEN ?? '',
    partialComponent.providers.figma?.key ?? ''
  )

  return parseFigmaComponent(figmaComponent, partialComponent)
}