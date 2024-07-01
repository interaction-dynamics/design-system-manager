import { FigmaDesignSystemCredentials } from '../../types/figma-design-system-credentials'

interface ResponseType {
  user_id: number
  access_token: string
  expires_in: number
  refresh_token: string
}

export async function generateAccessToken(
  callbackUrl: string,
  code: string
): Promise<FigmaDesignSystemCredentials> {
  const response = await fetch('https://www.figma.com/api/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_FIGMA_APP_CLIENT_ID!,
      client_secret: process.env.FIGMA_APP_CLIENT_SECRET!,
      redirect_uri: callbackUrl,
      code,
      grant_type: 'authorization_code',
    }),
  })

  const data: ResponseType = await response.json()

  const today = new Date()
  today.setSeconds(today.getSeconds() + (data.expires_in ?? 0))

  return {
    userId: data.user_id,
    accessToken: data.access_token,
    expirationDate: today.toISOString(),
    refreshToken: data.refresh_token,
  }
}
