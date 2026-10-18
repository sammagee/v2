import type { LinkPreview } from './lib/previews'

export function ExternalCard({ preview }: { preview: LinkPreview }) {
  return (
    <span className="flex min-w-0 items-start gap-2 text-left">
      {preview.icon && <Favicon src={preview.icon} />}
      <span className="flex min-w-0 flex-col">
        <span className="truncate">{preview.title}</span>
        <span className="truncate text-xs leading-4 font-normal text-gray-1000">
          {preview.host}
        </span>
      </span>
    </span>
  )
}

function Favicon({ src }: { src: string }) {
  return (
    <span
      data-favicon=""
      className="mt-0.5 block size-4 shrink-0 overflow-hidden rounded-full bg-white"
    >
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
