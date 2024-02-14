import Link from 'next/link'
import { ForwardedRef, forwardRef } from 'react'
import { IButtonProps, buttonClasses } from './button'

interface IAnchorButtonProps {
  href: URL | string
  rel?: string
  target?: string
}

const AnchorButton = forwardRef(
  (
    {
      children,
      className,
      disabled,
      href,
      icon,
      intent = 'primary',
      onClick,
      rel,
      target,
    }: IButtonProps & IAnchorButtonProps,
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    return (
      <Link
        href={href}
        className={buttonClasses(className, disabled, icon, intent)}
        onClick={onClick}
        ref={ref}
        rel={rel}
        target={target}
      >
        {children}
      </Link>
    )
  }
)

export default AnchorButton
