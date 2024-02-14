import clsx from 'clsx'
import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  forwardRef,
  MouseEventHandler,
  ReactElement,
} from 'react'

export type ButtonIntent = 'primary' | 'secondary'

export interface IButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactElement[] | ReactElement | string
  className?: string
  disabled?: boolean
  icon?: boolean
  intent?: ButtonIntent
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
}

export const regularClasses =
  'px-5 h-12 space-x-3 rounded-lg border-2 font-semibold'
export const iconClasses = 'p-2 ease-in-out rounded-full border-dashed'

export const colorClasses = (
  disabled: boolean,
  icon: boolean,
  intent: ButtonIntent
) =>
  ({
    primary: clsx(
      '!text-brand-400',
      !disabled &&
        'active:!bg-brand-400 hover:!bg-brand-400 focus-visible:!bg-brand-400 active:!bg-opacity-10 hover:!bg-opacity-10 focus-visible:!bg-opacity-10 focus-visible:!border-brand-500',
      icon ? 'border-transparent' : 'border-brand-400'
    ),
    secondary: clsx(
      '!text-gray-600',
      !disabled &&
        'active:!bg-gray-500 hover:!bg-gray-500 focus-visible:!bg-gray-500 active:!bg-opacity-10 hover:!bg-opacity-10 focus-visible:!bg-opacity-10 focus-visible:!border-gray-500 hover:!text-gray-400 focus-visible:!text-gray-400',
      icon ? 'border-transparent' : 'border-gray-500'
    ),
  }[intent])

export const buttonClasses = (
  className: string,
  disabled: boolean,
  icon: boolean,
  intent: ButtonIntent
) =>
  clsx(
    'inline-flex items-center justify-center transition duration-200 ease-in-out origin-bottom transform border-2',
    !disabled &&
      'hover:scale-105 active:scale-100 focus-visible:outline-none focus-visible:border-dashed',
    colorClasses(disabled, icon, intent),
    icon ? iconClasses : regularClasses,
    className
  )

const Button = forwardRef(
  (
    {
      children,
      className,
      disabled,
      icon,
      intent = 'primary',
      onClick,
      ...props
    }: IButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        className={buttonClasses(className, disabled, icon, intent)}
        disabled={disabled}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

export default Button
