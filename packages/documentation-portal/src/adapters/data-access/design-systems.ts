import { db } from '@/lib/db'
import { cache } from 'react'

import { DesignSystem } from '@/domain/entities/design-system'
import { Component } from '@/domain/entities/component'

export interface DesignSystemDao extends DesignSystem {
  id: string
}

export async function createEmptyDesignSystem(organizationId: string) {
  return await db.designSystem.create({
    data: {
      name: 'Empty Design System',
      slug: (Math.random() + 1).toString(36).substring(7),
      isPublic: true,
      providers: {},
      organizationId,
    },
  })
}

export async function createDesignSystem(
  designSystem: DesignSystem,
  components: Component[]
) {
  const designSystemDao = await db.designSystem.create({
    data: {
      name: designSystem.name,
      slug: designSystem.slug,
      isPublic: true,
      providers: {},
    },
  })

  const componentDaos = []

  for (const component of components) {
    const componentDao = await db.component.create({
      data: {
        name: component.name,
        slug: component.slug,
        properties: component.properties.map((property) => ({
          name: property.name,
          type: property.type,
          description: property.description,
          defaultValue: property.defaultValue.toString(),
        })),
        designSystemId: designSystemDao.id,
        providers: component.providers,
      },
    })

    componentDaos.push(componentDao)

    const variantsDao = []

    for (const variant of component.variants) {
      const variantDao = await db.componentVariant.create({
        data: {
          name: variant.name,
          slug: variant.slug,
          providers: variant.providers,
          componentId: componentDao.id,
        },
      })

      variantsDao.push(variantDao)
    }

    if (variantsDao.length > 0) {
      await db.component.update({
        where: { id: componentDao.id },
        data: {
          variants: {
            connect: variantsDao.map((variant) => ({ id: variant.id })),
          },
        },
      })
    }
  }

  await db.designSystem.update({
    where: { id: designSystemDao.id },
    data: {
      components: {
        connect: componentDaos.map((componentDao) => ({ id: componentDao.id })),
      },
    },
  })
}

export const findDesignSystemBySlug = cache(
  async (slug: string): Promise<DesignSystem | null> => {
    const designSystemDao = await db.designSystem.findUnique({
      where: { slug },
    })

    if (!designSystemDao) return null

    return {
      id: designSystemDao.id,
      name: designSystemDao.name,
      slug: designSystemDao.slug,
      providers: designSystemDao.providers,
      isPublic: designSystemDao.isPublic,
    }
  }
)

export const findDesignSystemAndOrganizationBySlug = cache(
  async (
    slug: string
  ): Promise<(DesignSystem & { organizationId: string | null }) | null> => {
    const designSystemDao = await db.designSystem.findUnique({
      where: { slug },
    })

    if (!designSystemDao) return null

    return {
      id: designSystemDao.id,
      name: designSystemDao.name,
      slug: designSystemDao.slug,
      providers: designSystemDao.providers,
      isPublic: designSystemDao.isPublic,
      organizationId: designSystemDao.organizationId,
    }
  }
)

export const findAllDesignSystemsByOrganizationId = cache(
  async (
    organizationId: string
  ): Promise<
    Array<
      Pick<DesignSystem, 'id' | 'name' | 'slug' | 'isPublic'> & {
        updatedAt: Date
      }
    >
  > => {
    const designSystemDaos = await db.designSystem.findMany({
      where: { organizationId },
      orderBy: { updatedAt: 'desc' },
    })

    return designSystemDaos.map((designSystemDao) => ({
      id: designSystemDao.id,
      name: designSystemDao.name,
      slug: designSystemDao.slug,
      isPublic: designSystemDao.isPublic,
      updatedAt: designSystemDao.updatedAt,
    }))
  }
)

export const findDesignSystemById = cache(
  async (
    designSystemId: string
  ): Promise<Pick<DesignSystem, 'id' | 'name' | 'providers'> | undefined> => {
    const designSystemDao = await db.designSystem.findFirst({
      where: { id: designSystemId },
    })

    if (!designSystemDao) return undefined

    return {
      id: designSystemDao.id,
      name: designSystemDao.name,
      providers: designSystemDao.providers,
    }
  }
)

export async function updateDesignSystem(
  designSystemId: string,
  value: Partial<DesignSystem>
) {
  await db.designSystem.update({
    data: value,
    where: { id: designSystemId },
  })
}

export async function deleteDesignSystem(designSystemId: string) {
  await db.style.deleteMany({
    where: { designSystemId },
  })

  const components = await db.component.findMany({
    where: { designSystemId },
  })

  for (const component of components) {
    await db.componentVariant.deleteMany({
      where: { componentId: component.id },
    })
  }

  await db.component.deleteMany({
    where: { designSystemId },
  })

  await db.figmaDesignSystemCredentials.deleteMany({
    where: { designSystemId },
  })

  await db.designSystemToken.deleteMany({
    where: { designSystemId },
  })

  await db.designSystem.deleteMany({
    where: { id: designSystemId },
  })
}
