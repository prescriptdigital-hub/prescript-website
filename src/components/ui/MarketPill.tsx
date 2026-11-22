interface MarketPillProps {
  flag: string
  label: string
}

export default function MarketPill({ flag, label }: MarketPillProps) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-pd-line px-3 py-1 text-sm font-sans text-pd-muted">
      <span>{flag}</span>
      <span>{label}</span>
    </span>
  )
}
