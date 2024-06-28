export function generateOauthUrl(state: any) {
  const url = new URL('https://www.figma.com/oauth?')

  console.log(
    ' process.env.NEXT_PUBLIC_FIGMA_APP_CLIENT_ID',
    process.env.NEXT_PUBLIC_FIGMA_APP_CLIENT_ID
  )

  url.searchParams.append(
    'client_id',
    process.env.NEXT_PUBLIC_FIGMA_APP_CLIENT_ID ?? ''
  )
  url.searchParams.append(
    'redirect_uri',
    'https://design-system-hub.vercel.app/api/figma/callback'
  )

  url.searchParams.append('scope', 'file_read,file_variables:read')
  url.searchParams.append('state', state)
  url.searchParams.append('response_type', 'code')

  return url.toString()
}
