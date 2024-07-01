import { redirect } from 'next/navigation'

interface Props {
  params: { organizationSlug: string }
}

export default function NewDesignSystemPage({ params }: Props) {
  redirect(`/new/${params.organizationSlug}/figma/connect`)
}
