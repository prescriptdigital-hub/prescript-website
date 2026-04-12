import { clsx } from 'clsx'

interface ServiceBadgeProps {
  name: string
  size?: 'sm' | 'md'
}

export default function ServiceBadge({ name, size = 'md' }: ServiceBadgeProps) {
  return (
    <span
      className={clsx(
        'font-syne font-extrabold text-prescript-green',
        size === 'sm' ? 'text-sm' : 'text-base'
      )}
    >
      {name}
    </span>
  )
}
