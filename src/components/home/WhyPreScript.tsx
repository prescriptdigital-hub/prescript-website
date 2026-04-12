const REASONS = [
  {
    num: '01',
    title: 'Five services, one partner',
    desc: 'No juggling five agencies. Prescript delivers every layer — brand, tech, marketing, automation, and AI — under one roof, in one coordinated system.',
  },
  {
    num: '02',
    title: 'Flow-first by default',
    desc: "Every engagement includes automation thinking. We don't just build things — we connect them so your business runs without manual effort.",
  },
  {
    num: '03',
    title: 'Cortex at our core',
    desc: "AI isn't an add-on for us. Cortex AI agent deployment is our deepest offering, and it informs how we build everything else.",
  },
  {
    num: '04',
    title: '3-continent experience',
    desc: "We've built for businesses in Nigeria, across Africa, in the US, and Europe. We understand what works in each market — and how to bridge them.",
  },
]

export default function WhyPreScript() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="font-syne font-extrabold text-3xl lg:text-4xl tracking-tighter text-gray-900 mb-10">
        Why Prescript?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {REASONS.map((r) => (
          <div key={r.num} className="bg-gray-50 rounded-xl p-5">
            <p className="font-syne font-extrabold text-3xl text-prescript-green leading-none mb-2">
              {r.num}
            </p>
            <p className="font-sans font-medium text-sm text-gray-800 my-1">{r.title}</p>
            <p className="font-sans font-light text-xs text-gray-400 leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
