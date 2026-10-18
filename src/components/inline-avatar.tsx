export function InlineAvatar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`group relative z-10 block rounded-full transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-110 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 ${className ?? ''}`}
    >
      <span className="-m-[2px] block size-[calc(1.375rem+4px)] rounded-full bg-(--logo-ring) p-[2px] drop-shadow-[0_1px_1px_var(--logo-shadow)] transition-[filter] duration-200 ease-out group-hover:drop-shadow-[0_1.5px_2px_var(--logo-shadow)] motion-reduce:transition-none">
        <span className="relative block size-[1.375rem] overflow-hidden rounded-full bg-[linear-gradient(160deg,var(--avatar-from)_0%,var(--avatar-to)_100%)]">
          <img
            src="/images/favicon.png"
            alt=""
            width={22}
            height={22}
            draggable={false}
            className="pointer-events-none absolute top-[3.409%] left-[5.114%] block size-[89.773%] max-w-none"
          />
        </span>
      </span>
    </span>
  )
}
