import { ArrowUpRight } from 'lucide-react'

import type { LinkPreview } from './lib/previews'

export function ExternalCard({ preview }: { preview: LinkPreview }) {
  return (
    <span className="flex min-w-0 items-start gap-2 text-left">
      {preview.icon && <Favicon src={preview.icon} />}
      <span className="flex min-w-0 flex-col">
        <span className="truncate leading-[1.0625rem]">{preview.title}</span>
        <span className="flex items-start gap-0.5 text-xs leading-[0.875rem] font-normal text-gray-1000">
          <span className="truncate">{preview.host}</span>
          <ArrowUpRight
            aria-hidden="true"
            className="mt-px size-2.5 shrink-0"
          />
        </span>
      </span>
    </span>
  )
}

function Favicon({ src }: { src: string }) {
  return (
    <span className="mt-px block size-4 shrink-0 overflow-hidden rounded-full bg-white">
      <img
        src={src}
        alt=""
        width={16}
        height={16}
        className="block size-full object-cover"
      />
    </span>
  )
}
