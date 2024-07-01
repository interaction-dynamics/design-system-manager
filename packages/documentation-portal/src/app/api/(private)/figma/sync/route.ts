import { fetchDesignSystem } from '@/adapters/providers/figma/actions/fetch-design-system'
import {
  createComponent,
  findComponentByName,
  updateComponent,
} from '@/adapters/data-access/components'
import {
  createComponentVariant,
  deleteComponentVariants,
} from '@/adapters/data-access/component-variants'
import { NextRequest } from 'next/server'
import { getUser } from '../../../_utils/get-user'
import { fetchStyles } from '@/adapters/providers/figma/actions/styles'
import { deleteStyles, insertStyles } from '@/adapters/data-access/styles'

export async function POST(request: NextRequest) {
  const user = await getUser(request)

  if (!user) {
    return Response.json({ error: 'Forbidden' }, { status: 401 })
  }

  const fileIds = process.env.FIGMA_FILE_IDS?.split(',') ?? []

  const designSystem = await fetchDesignSystem(fileIds)

  const designSystemId = '665701b6735feee3ac27825d'

  designSystem.components.forEach(async (component) => {
    const foundComponent = await findComponentByName(
      designSystemId,
      component.name
    )

    if (foundComponent) {
      await updateComponent(designSystemId, component.name, {
        providers: {
          ...foundComponent.providers,
          ...component.providers,
        },
      })

      await deleteComponentVariants(foundComponent.id)
      if (component.variants) {
        component.variants.forEach(async (variant) => {
          await createComponentVariant(foundComponent.id, variant)
        })
      }
    } else {
      const newComponent = await createComponent(designSystemId, {
        name: component.name,
        providers: {
          ...component.providers,
        },
        properties: [],
      })

      await deleteComponentVariants(newComponent.id)

      if (component.variants) {
        component.variants.forEach(async (variant) => {
          await createComponentVariant(newComponent.id, variant)
        })
      }
    }
  })

  const styles = await fetchStyles(fileIds, process.env.FIGMA_TOKEN ?? '')

  await deleteStyles(designSystemId)

  await insertStyles(designSystemId, styles)

  return Response.json({ status: 'ok' })
}
