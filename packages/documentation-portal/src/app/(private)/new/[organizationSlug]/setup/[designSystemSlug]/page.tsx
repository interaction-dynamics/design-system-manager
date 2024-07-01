import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Props {
  params: { designSystemSlug: string }
}

export default function NewDesignSystemSetupPage({ params }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Last setup</CardTitle>
        <CardDescription>Last information before finalization.</CardDescription>
      </CardHeader>
      <CardContent>fdsfds</CardContent>
    </Card>
  )
}
