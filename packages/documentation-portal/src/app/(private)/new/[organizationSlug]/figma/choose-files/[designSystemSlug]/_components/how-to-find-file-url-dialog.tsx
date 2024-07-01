import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Image from 'next/image'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HowToFindFileUrlDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How to find file url?</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-muted-foreground flex flex-col gap-10">
          <p>1. Open your file on figma.</p>
          <p>
            2. Click on the button &quot;Share&quot; in the top right corner of
            the Figma:
            <Image
              src="/images/screenshots/how-to-find-figma-file-url-1.png"
              alt="Figma file url"
              className="w-full"
              width={1000}
              height={1000}
            />
          </p>

          <p>
            3. Click on the button &quot;Copy link&quot; and paste it into the
            input field.
            <Image
              src="/images/screenshots/how-to-find-figma-file-url-2.png"
              alt="Figma file url"
              width={1000}
              height={1000}
            />
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
