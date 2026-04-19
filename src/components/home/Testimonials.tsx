const TESTIMONIALS = [
  {
    quote: "Prescript completely transformed how our brand shows up in the market. We went from looking like just another fabric vendor to a brand that boutiques actually want to stock. The ROI has been unreal.",
    name: "Lola Adefusika",
    role: "Founder",
    company: "Aso Luxe",
    service: "Imprint",
  },
  {
    quote: "We tried to build this platform internally for two years. Prescript shipped it in 11 weeks and it has handled 40,000 borrowers without breaking a sweat. Best technology decision we ever made.",
    name: "Emeka Nwosu",
    role: "CTO",
    company: "PocketLend",
    service: "Forge",
  },
  {
    quote: "The automation Prescript built for us was like hiring three extra operations staff - without the salaries. Our ops manager finally has time to think instead of just reacting all day.",
    name: "Sophie van der Berg",
    role: "Operations Director",
    company: "SwiftHaul Logistics",
    service: "Flow",
  },
  {
    quote: "I was sceptical about AI handling our customer support. Now I am a convert. 83% resolution without humans, and our customers are actually more satisfied than before. Prescript knew exactly what they were doing.",
    name: "Tunde Adeleke",
    role: "CEO",
    company: "Kora Commerce",
    service: "Cortex",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-sans font-medium tracking-widest uppercase text-prescript-green mb-3 block">Client Stories</span>
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-gray-900 tracking-tight">What clients say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-7 flex flex-col gap-4">
              <p className="font-sans text-base text-gray-700 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-prescript-green-light flex items-center justify-center flex-shrink-0">
                  <span className="font-syne font-extrabold text-sm text-prescript-green-dark">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-syne font-bold text-sm text-gray-900">{t.name}</p>
                  <p className="font-sans text-xs text-gray-400">{t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
