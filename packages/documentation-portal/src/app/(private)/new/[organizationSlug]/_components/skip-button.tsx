import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Props {
  href: string
}

export function SkipButton({ href }: Props) {
  return (
    <Button
      variant="link"
      className="p-0 text-muted-foreground hover:text-foreground"
      asChild
    >
      <Link href={href}>
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
      </Link>
    </Button>
  )
}
