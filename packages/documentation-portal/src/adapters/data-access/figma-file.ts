import { db } from '@/lib/db'

export async function createFigmaFile(key: string, designSystemId: string) {
  return db.figmaFile.create({
    data: {
      fileKey: key,
      designSystemId,
    },
  })
}

export async function findFigmaFilesByDesignSystemId(designSystemId: string) {
  return db.figmaFile.findMany({
    where: {
      designSystemId,
    },
  })
}
