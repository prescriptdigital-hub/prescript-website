type ServiceSlug = 'imprint' | 'forge' | 'surge' | 'flow' | 'cortex'

interface ServiceTagProps {
  service: ServiceSlug
}

const SERVICE_STYLES: Record<ServiceSlug, { bg: string; text: string; label: string }> = {
  imprint: { bg: '#FAEEDA', text: '#633806', label: 'Imprint' },
  forge: { bg: '#E6F1FB', text: '#0C447C', label: 'Forge' },
  surge: { bg: '#E1F5EE', text: '#085041', label: 'Surge' },
  flow: { bg: '#EEEDFE', text: '#3C3489', label: 'Flow' },
  cortex: { bg: '#E1F5EE', text: '#085041', label: 'Cortex' },
}

export default function ServiceTag({ service }: ServiceTagProps) {
  const style = SERVICE_STYLES[service]
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium font-sans"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {style.label}
    </span>
  )
}
