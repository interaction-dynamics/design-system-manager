import * as Figma from 'figma-api'

export async function fetchFile(fileKey: string, oAuthToken: string) {
  const api = new Figma.Api({ oAuthToken })

  return await api.getFile(fileKey)
}
