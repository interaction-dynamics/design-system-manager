import { Component } from '@/domain/entities/component'
import { ComponentVariant } from '@/domain/entities/component-variant'
import Provider from '@/domain/entities/provider'
import { validateCodeComponent } from './types/code-component'
import { DesignSystem } from '@/domain/entities/design-system'
import { getLinks } from './utils/get-links'
import { getComponentFlags } from './utils/get-component-flags'
import { FigmaSettings } from '../figma/components/figma-settings'
import { CodeSettings } from './components/code-settings'

export const code: Provider = {
  name: 'Repository',
  description: 'Import the grand truth of your design system from the codebase',

  type: 'development',
  getDescription(component: Component | ComponentVariant) {
    return validateCodeComponent(component)
      ? component.providers.code.description
      : ''
  },
  getViewers(component: Component | ComponentVariant) {
    return []
  },
  getViewerTitles(component: Component | ComponentVariant) {
    return []
  },
  getLinks(
    component: Component | ComponentVariant,
    designSystem: DesignSystem
  ) {
    return validateCodeComponent(component)
      ? getLinks(component, designSystem)
      : []
  },
  getComponentFlags(component: Component | ComponentVariant) {
    return validateCodeComponent(component) ? getComponentFlags(component) : []
  },

  getStyleViewers() {
    return []
  },

  getSettings() {
    return CodeSettings
  },
}
