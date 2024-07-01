'use client'
import { useState } from 'react'
import { QuestionMarkCircledIcon, TrashIcon } from '@radix-ui/react-icons'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { Input } from '@/components/ui/input'
import { HowToFindFileUrlDialog } from './how-to-find-file-url-dialog'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface FigmaFile {
  url: string
  key: string
  name?: string
  loading: boolean
}

interface Props {
  designSystemSlug: string
  designSystemId: string
}

export function FileList({ designSystemSlug, designSystemId }: Props) {
  const [files, setFiles] = useState<FigmaFile[]>([])

  const [open, setOpen] = useState(false)

  const [newUrl, setNewUrl] = useState('')

  const isValidUrl = (url: string) => {
    if (files.some((file) => file.url === newUrl)) return false

    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const addFile = async (url: string) => {
    const fileKey = url
      .replace('https://www.figma.com/design/', '')
      .split('/')[0]

    setFiles((prev) => [
      ...prev,
      {
        url,
        key: fileKey,
        loading: true,
      },
    ])

    const response = await fetch(
      `/api/figma/files/${designSystemId}/${fileKey}`
    )

    const figmaFile = await response.json()

    setFiles((prev) =>
      prev.map((file) =>
        file.key === fileKey
          ? {
              ...file,
              name: figmaFile.name,
              loading: false,
            }
          : file
      )
    )
  }

  const onPaste = (event: React.ClipboardEvent) => {
    const url = (event.clipboardData || window.clipboardData).getData('text')

    if (isValidUrl(url)) {
      addFile(url)
      setTimeout(() => {
        setNewUrl('')
      }, 10)
    }
  }

  const onAdd = () => {
    addFile(newUrl)
    setNewUrl('')
  }

  const onDelete = (index: number) => () => {
    setFiles((prev) => {
      const copy = [...prev]
      copy.splice(index, 1)
      return copy
    })
  }

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const onAddFiles = async () => {
    setLoading(true)
    const response = await fetch(`/api/figma/files/${designSystemId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileKeys: files.map((file) => file.key) }),
    })

    const { success } = await response.json()

    setLoading(false)

    if (success) {
      router.push(`/design-system/new/figma/search/${designSystemSlug}`)
    }
  }

  return (
    <div>
      <div className="flex gap-4 items-center">
        <Input
          placeholder="Enter file url"
          className="flex-1"
          onPaste={onPaste}
          value={newUrl}
          onChange={(event) => setNewUrl(event.target.value)}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <QuestionMarkCircledIcon
                className="h-6 w-6"
                onClick={() => setOpen(true)}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>How to find file url?</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button
          onClick={onAdd}
          disabled={Boolean(newUrl && !isValidUrl(newUrl))}
        >
          Find file
        </Button>
      </div>
      <ScrollArea className="h-[200px] rounded-md border mt-4 [&>div>div[style]]:!block">
        <div className="p-4 flex flex-col items-stretch">
          {files.map((file, index) => (
            <div key={file.url} className="flex items-center gap-2">
              <div
                className={cn(
                  'truncate w-full overflow-hidden text-sm',
                  file.loading ? 'text-muted-foreground' : 'text-foreground'
                )}
              >
                {file.loading ? file.url : file.name}
              </div>
              {file.loading ? (
                <svg
                  className="animate-spin w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <button
                  className="text-muted-foreground hover:text-foreground"
                  onClick={onDelete(index)}
                >
                  <TrashIcon />
                </button>
              )}
            </div>
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      <div className="mt-4 flex justify-end">
        <Button disabled={files.length === 0} onClick={onAddFiles}>
          {loading && (
            <svg
              className="animate-spin h-5 w-5 -ml-1 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          Add files to design systems
        </Button>
      </div>
      <HowToFindFileUrlDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}
