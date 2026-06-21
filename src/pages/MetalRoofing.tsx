import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Zap, TrendingUp, Wrench, ShieldCheck } from 'lucide-react'
import { PageHero, BeforeAfterSection, FinancingBand, ReviewsStrip, CtaBand, FaqAccordion, StatsBand } from '../components/sections'
import { Reveal, SectionHead, Eyebrow } from '../components/ui'
import { CtaButton } from '../components/LeadModal'
import { METAL_TYPES, FAQS } from '../data/site'
import { useSEO, localBusinessSchema } from '../lib/seo'
import { asset } from '../lib/utils'

const VALUE = [
  { Icon: Clock, title: '50–80 year lifespan', body: 'Outlives two or three asphalt roofs. Buy once, never again.' },
  { Icon: Zap, title: 'Lower energy bills', body: 'Reflective finishes keep attics cooler and HVAC working less.' },
  { Icon: TrendingUp, title: 'Resale value up to +6%', body: 'Buyers pay more for a roof they’ll never have to replace.' },
  { Icon: Wrench, title: 'Near-zero maintenance', body: 'No granule loss, no curling, no annual patch jobs.' },
]

const COLORS = [
  { name: 'Charcoal', hex: '#3a3f44' },
  { name: 'Matte Black', hex: '#17191c' },
  { name: 'Graphite', hex: '#54595f' },
  { name: 'Slate Blue', hex: '#3f5468' },
  { name: 'Forest Green', hex: '#2f4636' },
  { name: 'Barn Red', hex: '#6e2b27' },
  { name: 'Copper Penny', hex: '#8a4b2c' },
  { name: 'Galvalume', hex: '#9aa1a6' },
]

export default function MetalRoofing() {
  useSEO({
    title: 'Metal Roofing in Northeast Indiana | Standing Seam, Ribbed & Shingle | Shield',
    description:
      'Standing seam, ribbed/Imperial, and metal shingle roofing built to outlast you — 50–80 year lifespan, energy savings, and the only accident-free lifetime warranty in the Midwest.',
    schema: localBusinessSchema,
  })
  return (
    <>
      <PageHero
        eyebrow="Metal Roofing · The pillar product"
        title={<>Metal Roofing in Northeast Indiana, <span className="text-amber">built to outlast you.</span></>}
        sub="Three systems — standing seam, ribbed/Imperial, and metal shingle — engineered for Midwest weather and backed by Free Repairs for Life. Worth 2–3× asphalt for reasons that pay you back."
        image={asset('assets/metal-standing-seam.webp')}
      >
        <CtaButton size="lg" source="Metal Pillar">Get My Free Inspection</CtaButton>
        <Link to="/financing" className="btn-ghost text-bone">See it for ~$69/mo <ArrowRight size={16} /></Link>
      </PageHero>

      {/* Why metal */}
      <section className="bg-bone py-20">
        <div className="wrap">
          <Reveal>
            <SectionHead center eyebrow="Why metal wins" title={<>Why a metal roof is worth <span className="text-amber-deep">2–3× asphalt.</span></>} intro="Over the life of one metal roof, you’d typically buy two or three asphalt roofs. Metal is usually the cheaper choice in the long run." />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <div className="h-full rounded-2xl border bg-paper p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber/15 text-amber-deep"><v.Icon size={24} /></div>
                  <h3 className="mt-4 h-display text-lg text-ink">{v.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink/65">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The three types */}
      <section className="bg-bone-dim py-20">
        <div className="wrap">
          <Reveal><SectionHead eyebrow="Choose your system" title="Three metal options, plain English." /></Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {METAL_TYPES.map((m, i) => (
              <Reveal key={m.slug} delay={i * 0.08}>
                <Link to={`/metal-roofing/${m.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-paper card transition-all hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden">
                    <img src={m.image} alt={m.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute left-3 top-3 pill border-amber/40 bg-ink/70 text-amber backdrop-blur">{m.tier}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="h-display text-xl text-ink">{m.name}</h3>
                    <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink/65">{m.blurb}</p>
                    <dl className="mt-4 space-y-1 text-[13px] text-ink/60">
                      <div className="flex justify-between"><dt className="font-semibold text-ink/70">Lifespan</dt><dd>{m.durability}</dd></div>
                      <div className="flex justify-between"><dt className="font-semibold text-ink/70">Best for</dt><dd className="text-right">{m.ideal}</dd></div>
                    </dl>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-bold text-steel group-hover:gap-2.5 transition-all">Details <ArrowRight size={16} /></span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Colors */}
      <section className="bg-bone py-20">
        <div className="wrap">
          <Reveal><SectionHead center eyebrow="Make it yours" title="Colors that fit your home." intro="Premium powder-coated finishes that hold their color for decades. A few favorites:" /></Reveal>
          <div className="mt-10 grid grid-cols-4 gap-4 sm:grid-cols-8">
            {COLORS.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.04} className="text-center">
                <div className="mx-auto h-16 w-16 rounded-2xl border-2 border-ink/10 shadow-inner" style={{ background: c.hex }} />
                <div className="mt-2 text-[12px] font-semibold text-ink/70">{c.name}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BeforeAfterSection />
      <StatsBand />

      {/* FAQ */}
      <section className="bg-bone-dim py-20">
        <div className="wrap">
          <Reveal><SectionHead center eyebrow="Metal questions" title="The questions we hear most." /></Reveal>
          <div className="mt-10"><FaqAccordion items={FAQS.filter((f) => f.group === 'Metal' || f.group === 'Warranty').map(({ q, a }) => ({ q, a }))} /></div>
          <div className="mt-8 text-center">
            <CtaButton source="Metal FAQ"><ShieldCheck size={18} /> Get answers on a free inspection</CtaButton>
          </div>
        </div>
      </section>

      <FinancingBand />
      <ReviewsStrip />
      <CtaBand title="Ready for a roof that outlasts you?" />
    </>
  )
}
