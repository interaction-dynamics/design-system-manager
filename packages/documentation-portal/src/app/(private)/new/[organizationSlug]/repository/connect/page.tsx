import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { productName } from '@/config/names'
import { SkipButton } from '../../_components/skip-button'

export default function NewDesignSystemFigmaPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Connect Repository</CardTitle>
        <CardDescription>
          In order to maintain your design system, {productName} needs to access
          your React code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="p-10 flex items-center justify-center">
          <Button>Code</Button>
        </p>
      </CardContent>
    </Card>
  )
}
