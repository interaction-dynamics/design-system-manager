import { generateAccessToken } from '@/adapters/providers/figma/actions/credentials'
import { createEmptyDesignSystem } from '@/adapters/data-access/design-systems'
import { createFigmaDesignSystemCredentials } from '@/adapters/data-access/figma-design-system-credentials'
import { redirect } from 'next/navigation'
import { getFigmaCallbackUrl } from '../_utils/url'

export default async function Page({
  searchParams,
}: {
  searchParams: { code: string; state: string }
}) {
  const newSearchParams = new URLSearchParams(searchParams)

  const credentials = await generateAccessToken(
    getFigmaCallbackUrl(),
    searchParams.code
  )

  const designSystemDao = await createEmptyDesignSystem()

  const response = await createFigmaDesignSystemCredentials(
    credentials,
    designSystemDao.id
  )

  if (response) {
    redirect(
      `/new/${searchParams.state}/figma/choose-files/${designSystemDao.slug}`
    )
  }

  return (
    <div className="fixed inset-0 bg-backgroun z-50 flex text-foreground items-center justify-center" />
  )
}
