import path from 'node:path'
import fs, { readFile, access } from 'node:fs/promises'

async function findPackageConfigPath(targetPath: string): Promise<string> {
  let currentTargetPath = targetPath

  while (currentTargetPath !== '/') {
    const packageJsonPath = path.join(targetPath, 'package.json')
    try {
      await access(packageJsonPath, fs.constants.F_OK)

      return packageJsonPath
    } catch (error) {
      targetPath = path.dirname(targetPath)
    }
  }

  throw new Error('Impossible to find package.json')
}

export async function findPackageConfig(
  targetPath: string,
): Promise<{ name: string }> {
  const packageConfigPath = await findPackageConfigPath(targetPath)

  const content = await readFile(packageConfigPath, 'utf8')

  return JSON.parse(content)
}