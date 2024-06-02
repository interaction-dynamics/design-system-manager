import { relative } from 'node:path'
import { DesignSystem } from './entities/DesignSystem'

import { findRemoteUrl, findRootPath } from './adapters/git'
import { findPackageConfig } from './adapters/package'
import { detectComponents } from './adapters/react'

export async function extractDesignSystem(
  targetPath: string,
): Promise<DesignSystem> {
  const url = await findRemoteUrl(targetPath)

  const { name } = await findPackageConfig(targetPath)

  const rootPath = await findRootPath(targetPath)

  const relativePath = relative(rootPath, targetPath)

  const components = await detectComponents(targetPath)

  return {
    components,
    relativePath,
    repository: {
      name,
      url,
    },
  }
}