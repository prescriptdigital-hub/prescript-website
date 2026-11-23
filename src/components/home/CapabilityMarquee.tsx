const ITEMS = [
  'Brand identity',
  'Websites & apps',
  'eCommerce',
  'Meta & Google Ads',
  'CRM setup',
  'WhatsApp automation',
  'Business process automation',
  'AI agents',
]

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap font-display font-light text-2xl sm:text-3xl text-pd-cream px-6 sm:px-8">
          {item}
          <span aria-hidden="true" className="ml-12 sm:ml-16 inline-block w-2.5 h-2.5 bg-pd-brick" />
        </li>
      ))}
    </ul>
  )
}

export default function CapabilityMarquee() {
  return (
    <section aria-label="What we do" className="bg-pd-oxblood py-6 sm:py-8 overflow-hidden border-y border-pd-ink">
      <div className="flex w-max motion-safe:animate-[pd-marquee_38s_linear_infinite] hover:[animation-play-state:paused]">
        <Row />
        <Row hidden />
      </div>
    </section>
  )
}
