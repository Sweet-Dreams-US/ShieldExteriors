import { Check, X, ShieldCheck, Play } from 'lucide-react'
import { useRef, useState } from 'react'
import { PageHero, ReviewsStrip, CtaBand, FaqAccordion, StatsBand } from '../components/sections'
import { Reveal, SectionHead, Eyebrow } from '../components/ui'
import { CtaButton } from '../components/LeadModal'
import { FAQS } from '../data/site'
import { useSEO } from '../lib/seo'
import { asset } from '../lib/utils'

const COMPARE = [
  { feature: 'Covers storm & hail damage', shield: true, others: false },
  { feature: 'Covers accidents ("acts of nature")', shield: true, others: false },
  { feature: 'Transferable to the next owner', shield: true, others: false },
  { feature: 'We handle the insurance claim', shield: true, others: false },
  { feature: 'Workmanship covered for life', shield: true, others: false },
  { feature: 'Material defects covered', shield: true, others: true },
  { feature: 'Pages of fine-print exclusions', shield: false, others: true },
]

export default function Warranty() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) } else { v.pause(); setPlaying(false) }
  }

  useSEO({
    title: 'The Shield Warranty — Free Repairs for Life | Accident-Free Lifetime Warranty',
    description:
      'The only TRUE Double Lifetime Accident-Free Warranty in the Midwest. Covers storms and accidents, transfers to the next owner, and we handle the insurance.',
  })

  return (
    <>
      <PageHero
        eyebrow="The Shield Warranty · The brand"
        title={<>Free Repairs for Life. <span className="text-amber">Even acts of nature.</span></>}
        sub="Everyone says “lifetime.” We mean something the industry doesn’t: a TRUE Double Lifetime Accident-Free Warranty that actually covers the things that damage roofs."
        image={asset('assets/home-hero-golden.webp')}
      >
        <CtaButton size="lg" source="Warranty">Get protected — free inspection</CtaButton>
      </PageHero>

      {/* The explanation */}
      <section className="bg-bone py-20">
        <div className="wrap grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>What it actually covers</Eyebrow>
            <h2 className="mt-4 h-display text-[2rem] leading-[1.04] text-ink">A promise, not a marketing word.</h2>
            <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-ink/70">
              <p>Most “lifetime” warranties quietly exclude storms, hail, and accidents — the exact things most likely to damage your roof. Read the fine print and “lifetime” often means “material defects only, prorated, non-transferable.”</p>
              <p>Shield’s warranty is different on purpose. If something happens to your roof — a storm, a fallen branch, an accident — <strong className="text-ink">we repair it free, for life.</strong> The coverage transfers to the next owner, and if insurance is involved, <strong className="text-ink">we handle the claim for you.</strong></p>
              <p>How can we offer that? Because we believe in the product and we install it right the first time. The warranty isn’t a gimmick — it’s a statement of confidence.</p>
            </div>
          </Reveal>

          {/* "Covered." video */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border-2 border-ink/10 shadow-xl">
              <video ref={videoRef} className="aspect-video w-full object-cover" src={asset('assets/hero-roof.mp4')} poster={asset('assets/storm-damage.webp')} playsInline loop onClick={toggle} />
              {!playing && (
                <button onClick={toggle} className="absolute inset-0 grid place-items-center bg-ink/40" aria-label="Play">
                  <span className="text-center text-bone">
                    <span className="anim-pulse-ring mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber text-ink"><Play size={26} className="ml-1 fill-ink" /></span>
                    <span className="mt-3 block h-display text-xl">“Covered.”</span>
                    <span className="text-xs uppercase tracking-[0.25em] text-amber">Watch the film</span>
                  </span>
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-ink py-20 text-bone grain">
        <div className="wrap">
          <Reveal><SectionHead light center eyebrow="The honest comparison" title={<>Shield vs. “lifetime” <span className="text-amber">fine print.</span></>} /></Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-white/10">
              <div className="grid grid-cols-[1fr_auto_auto] bg-white/5 text-[13px] font-bold uppercase tracking-wide">
                <div className="p-4">Coverage</div>
                <div className="w-28 p-4 text-center text-amber">Shield</div>
                <div className="w-28 p-4 text-center text-bone/50">Typical</div>
              </div>
              {COMPARE.map((row, i) => (
                <div key={row.feature} className={`grid grid-cols-[1fr_auto_auto] items-center text-[14.5px] ${i % 2 ? 'bg-white/[0.02]' : ''}`}>
                  <div className="p-4 text-bone/85">{row.feature}</div>
                  <div className="w-28 p-4 text-center">{row.shield ? <Check className="mx-auto text-guard" size={20} /> : <X className="mx-auto text-bone/30" size={20} />}</div>
                  <div className="w-28 p-4 text-center">{row.others ? <Check className="mx-auto text-bone/40" size={20} /> : <X className="mx-auto text-bone/30" size={20} />}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <StatsBand dark={false} />

      <section className="bg-bone-dim py-20">
        <div className="wrap">
          <Reveal><SectionHead center eyebrow="Warranty questions" title="Yes, it’s really that good." /></Reveal>
          <div className="mt-10"><FaqAccordion items={FAQS.filter((f) => f.group === 'Warranty').map(({ q, a }) => ({ q, a }))} /></div>
        </div>
      </section>

      <ReviewsStrip count={3} />
      <CtaBand title="Get the only warranty that has your back." />
    </>
  )
}
