interface SectionLabelProps {
  children: React.ReactNode
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="uppercase tracking-widest text-xs text-pd-brick-700 font-medium mb-2">
      {children}
    </p>
  )
}
