'use client'

import Link from 'next/link'
import { clsx } from 'clsx'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  className,
  type = 'button',
  disabled,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-sans font-semibold leading-none transition-colors duration-150 ease-pd-out focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pd-oxblood disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-pd-brick text-white hover:bg-pd-brick-700 hover:text-white',
    secondary: 'bg-pd-oxblood text-pd-cream hover:bg-pd-ink hover:text-pd-cream',
    outline: 'bg-transparent border-[1.5px] border-pd-oxblood text-pd-oxblood hover:bg-pd-oxblood hover:text-pd-cream',
  }

  const sizes = {
    sm: 'text-sm px-4 py-2.5',
    md: 'text-[15px] px-[22px] py-[14px]',
    lg: 'text-base px-7 py-4',
  }

  const classes = clsx(base, variants[variant], sizes[size], className)

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  )
}
