interface MarketPillProps {
  flag: string
  label: string
}

export default function MarketPill({ flag, label }: MarketPillProps) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-gray-200 rounded-full px-3 py-1 text-sm font-sans text-gray-600">
      <span>{flag}</span>
      <span>{label}</span>
    </span>
  )
}
