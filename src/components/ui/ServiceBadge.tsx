import { clsx } from 'clsx'

interface ServiceBadgeProps {
  name: string
  size?: 'sm' | 'md'
}

export default function ServiceBadge({ name, size = 'md' }: ServiceBadgeProps) {
  return (
    <span
      className={clsx(
        'font-display font-light text-pd-brick-700',
        size === 'sm' ? 'text-sm' : 'text-base'
      )}
    >
      {name}
    </span>
  )
}
