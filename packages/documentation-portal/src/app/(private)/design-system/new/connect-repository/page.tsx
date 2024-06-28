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

export default function NewDesignSystemFigmaPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Connect Repository</CardTitle>
        <CardDescription>
          In order to maintain your design system, {productName} needs to access
          some of your figma files. The first step is to connect your Figma
          account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="p-10 flex items-center justify-center">
          <Button>Code</Button>
        </p>
      </CardContent>
      <CardFooter className="justify-end">
        <p>
          <Button
            variant="link"
            className="p-0 text-muted-foreground hover:text-foreground"
          >
            I will do it later
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </Button>
        </p>
      </CardFooter>
    </Card>
  )
}
