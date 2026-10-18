export function PostCard({
  title,
  subtitle,
}: {
  title: string
  subtitle: string | null
}) {
  return (
    <span className="flex min-w-0 flex-col text-left">
      <span className="truncate">{title}</span>
      {subtitle && (
        <span className="truncate leading-tight text-gray-1100">
          {subtitle}
        </span>
      )}
    </span>
  )
}
