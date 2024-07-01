import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SkipButton } from '../../../_components/skip-button'
import { FileListServer } from './_components/file-list-server'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  params: { designSystemSlug: string; organizationSlug: string }
}

export default async function Page({ params }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Provide Figma files</CardTitle>
        <CardDescription>
          Provide the files containing the design system. We will extract only
          the published styles and components from these files.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="w-full h-[300px] rounded" />}>
          <FileListServer designSystemSlug={params.designSystemSlug} />
        </Suspense>
      </CardContent>
      <CardFooter>
        <SkipButton
          href={`/new/${params.organizationSlug}/repository/connect`}
        />
      </CardFooter>
    </Card>
  )
}
