export function PostCard({
  title,
  subtitle,
}: {
  title: string
  subtitle: string | null
}) {
  return (
    <span className="flex min-w-0 flex-col text-left">
      <span className="truncate leading-[1.0625rem]">{title}</span>
      {subtitle && (
        <span className="truncate leading-[1.0625rem] text-gray-1100">
          {subtitle}
        </span>
      )}
    </span>
  )
}
