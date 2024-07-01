import { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {}

export default function NewDesignSystemLayout({ children }: Props) {
  return (
    <div className="max-w-2xl m-auto px-10 my-10">
      <h2 className="text-2xl sm:text-3xl font-bold relative z-20">
        Let&apos;s build a new design system
      </h2>
      <p></p>
      <div className="mt-10">{children}</div>
    </div>
  )
}
