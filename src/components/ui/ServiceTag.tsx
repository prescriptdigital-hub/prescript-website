type ServiceSlug = 'imprint' | 'forge' | 'surge' | 'flow' | 'cortex'

interface ServiceTagProps {
  service: ServiceSlug
}

const SERVICE_LABELS: Record<ServiceSlug, { n: string; label: string }> = {
  imprint: { n: '01', label: 'Imprint' },
  forge: { n: '02', label: 'Forge' },
  surge: { n: '03', label: 'Surge' },
  flow: { n: '04', label: 'Flow' },
  cortex: { n: '05', label: 'Cortex' },
}

export default function ServiceTag({ service }: ServiceTagProps) {
  const s = SERVICE_LABELS[service]
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-pd-line bg-pd-surface text-xs font-medium font-sans text-pd-ink">
      <span className="font-mono text-[10px] text-pd-brick-700">{s.n}</span>
      {s.label}
    </span>
  )
}
