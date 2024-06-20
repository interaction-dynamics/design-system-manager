import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { BetaFlag } from './beta-flag'

export function CallToAction() {
  return (
    <div className="py-20 text-center p-5 flex justify-center items-center min-h-[70vh]">
      <div className="flex flex-col items-center gap-5">
        <h2 className="text-4xl font-semibold tracking-tight transition-colors first:mt-0">
          Discover a new way to
          <br /> maintain your design system
        </h2>
        <BetaFlag />
        <p className="max-w-md m-auto text-xl leading-7 text-muted-foreground">
          The setup takes less than 5 minutes.
          <br /> Request your beta access now and get your design system
          documentation today.
        </p>
        <Button size="lg">Request Access</Button>
      </div>
    </div>
  )
}