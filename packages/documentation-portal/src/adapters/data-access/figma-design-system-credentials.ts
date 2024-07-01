import { db } from '@/lib/db'

import { FigmaDesignSystemCredentials } from '../providers/figma/types/figma-design-system-credentials'

export async function createFigmaDesignSystemCredentials(
  credentials: FigmaDesignSystemCredentials,
  designSystemId: string
) {
  return await db.figmaDesignSystemCredentials.create({
    data: {
      ...credentials,
      designSystemId,
    },
  })
}

export async function findFigmaDesignSystemCredentials(designSystemId: string) {
  return await db.figmaDesignSystemCredentials.findFirstOrThrow({
    where: {
      designSystemId,
    },
  })
}
