import { ArrowUpRight } from 'lucide-react'

import { BRAND_ICONS } from '@/lib/brand-icons'

import type { LinkPreview } from './lib/previews'

export function ExternalCard({ preview }: { preview: LinkPreview }) {
  return (
    <span className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-start text-left">
      <SiteIcon preview={preview} />
      <span className="col-start-2 truncate leading-[1.0625rem]">
        {preview.title}
      </span>
      <span className="col-start-2 flex items-start gap-0.5 text-xs leading-[0.875rem] font-normal text-gray-1000">
        <span className="truncate">{preview.host}</span>
        <ArrowUpRight aria-hidden="true" className="mt-px size-2.5 shrink-0" />
      </span>
    </span>
  )
}

function SiteIcon({ preview }: { preview: LinkPreview }) {
  const icon = iconFor(preview)
  if (!icon) return null
  return <span className="row-start-1 mr-2 leading-[1.0625rem]">{icon}</span>
}

function iconFor(preview: LinkPreview) {
  const brand = BRAND_ICONS[preview.host]
  if (brand) return <BrandIcon path={brand} />
  return preview.icon ? <Favicon src={preview.icon} /> : null
}

function BrandIcon({ path }: { path: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="inline-block size-[1em] align-[-0.12em]"
    >
      <path d={path} />
    </svg>
  )
}

function Favicon({ src }: { src: string }) {
  return (
    <span className="inline-block size-[1em] overflow-hidden rounded-full bg-white align-[-0.12em]">
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
