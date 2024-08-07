'use client'
import { cn } from '@/lib/utils'
import { Suspense } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface LeftSideBarProps<T> {
  links: {
    label: string
    href: string
    active?: boolean
    metadata?: T
  }[]
  title?: string
  flags?: React.ReactNode[]
}

export default function LeftSideBar<T extends { [prop: string]: any }>({
  title,
  links,
  flags,
}: LeftSideBarProps<T>) {
  const pathname = usePathname()

  return (
    <aside className="fixed top-14 pt-8 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
      {title && <div className="px-2 pb-5 text-lg font-semibold">{title}</div>}
      <div className="grid grid-flow-row auto-rows-max text-sm">
        {links.map((link, index) => (
          <Link
            key={link.href}
            className={cn(
              'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline ',
              link.active || pathname.includes(link.href)
                ? 'text-foreground'
                : 'text-muted-foreground'
            )}
            href={link.href}
          >
            {link.label}
            {flags?.[index] && <div className="ml-2">{flags?.[index]}</div>}
          </Link>
        ))}
      </div>
    </aside>
  )
}
