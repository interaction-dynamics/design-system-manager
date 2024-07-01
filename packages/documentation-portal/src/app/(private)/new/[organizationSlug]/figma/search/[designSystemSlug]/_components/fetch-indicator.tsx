import { Spinner } from '@/components/atoms/spinner'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface Props {
  title: string
  loading?: boolean
  details?: string[]
}

export function FetchIndicator({ title, loading, details }: Props) {
  return (
    <AccordionItem value={title}>
      <AccordionTrigger>
        <div className="flex items-center">
          {loading && <Spinner className="w-4 mr-2" />} {title}
        </div>
      </AccordionTrigger>
      {details && (
        <AccordionContent>
          <div className="text-muted-foreground">
            {details
              .slice()
              .sort()
              .map((detail, index) => (
                <div key={index}>{detail}</div>
              ))}
          </div>
        </AccordionContent>
      )}
    </AccordionItem>
  )
}
