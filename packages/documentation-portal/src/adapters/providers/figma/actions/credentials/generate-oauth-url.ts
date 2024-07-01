export function generateOauthUrl(state: string, callbackUrl: string) {
  const url = new URL('https://www.figma.com/oauth?')

  url.searchParams.append(
    'client_id',
    process.env.NEXT_PUBLIC_FIGMA_APP_CLIENT_ID ?? ''
  )
  url.searchParams.append('redirect_uri', callbackUrl)

  url.searchParams.append('scope', 'file_read,file_variables:read')
  url.searchParams.append('state', state)
  url.searchParams.append('response_type', 'code')

  return url.toString()
}
