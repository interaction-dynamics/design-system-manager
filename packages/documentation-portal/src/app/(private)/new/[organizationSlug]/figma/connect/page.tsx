import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { productName } from '@/config/names'
import { ConnectFigmaButton } from './_components/connect-figma-button'
import { SkipButton } from '../../_components/skip-button'

interface Props {
  params: { organizationSlug: string }
}

export default function NewDesignSystemFigmaPage({ params }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Connect Figma</CardTitle>
        <CardDescription>
          In order to maintain your design system, {productName} needs to access
          some of your figma files. The first step is to connect your Figma
          account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="p-10 flex items-center justify-center">
          <ConnectFigmaButton organizationSlug={params.organizationSlug} />
        </p>
      </CardContent>
      <CardFooter>
        <SkipButton
          href={`/new/${params.organizationSlug}/repository/connect`}
        />
      </CardFooter>
    </Card>
  )
}
