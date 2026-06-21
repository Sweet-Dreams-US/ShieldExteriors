import { Check, ShieldCheck } from 'lucide-react'
import { PageHero, ReviewsStrip, CtaBand, FinancingBand } from '../components/sections'
import { Reveal, SectionHead, Eyebrow } from '../components/ui'
import { CtaButton } from '../components/LeadModal'
import { useSEO } from '../lib/seo'
import { asset } from '../lib/utils'

const ITEMS = [
  { title: 'Seamless gutters', body: 'Custom-formed on site and color-matched to your new roof — no leaky seams.' },
  { title: 'Micro-mesh gutter guards', body: 'Fine stainless mesh keeps leaves and debris out so water flows and you never climb a ladder.' },
  { title: 'Soffit & fascia', body: 'Clean, ventilated edges that protect your attic and finish the look.' },
  { title: 'Same lifetime coverage', body: 'Accessories carry the same accident-free protection as your roof.' },
]

export default function Gutters() {
  useSEO({
    title: 'Seamless Gutters & Gutter Guards | Shield Exteriors — NE Indiana',
    description:
      'Seamless gutters, micro-mesh guards, soffit and fascia — installed with your metal roof and covered by the same accident-free lifetime warranty.',
  })
  return (
    <>
      <PageHero
        eyebrow="Gutters & Guards"
        title={<>Finish the system. <span className="text-amber">Never clean a gutter again.</span></>}
        sub="Offered with every metal roof install: seamless gutters, micro-mesh guards, soffit and fascia — all backed by the same lifetime accident-free coverage."
        image={asset('assets/gutters.webp')}
      >
        <CtaButton size="lg" source="Gutters">Get My Free Inspection</CtaButton>
      </PageHero>

      <section className="bg-bone py-20">
        <div className="wrap grid gap-6 sm:grid-cols-2">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.07}>
              <div className="flex h-full gap-4 rounded-2xl border bg-paper p-6">
                <Check size={22} className="mt-1 shrink-0 text-guard" />
                <div>
                  <h3 className="h-display text-lg text-ink">{it.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink/65">{it.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="wrap mt-10">
          <Reveal>
            <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-amber/30 bg-ink p-8 text-center text-bone grain sm:flex-row sm:text-left">
              <ShieldCheck size={36} className="text-amber" />
              <p className="flex-1 text-[15px] text-bone/80">
                Adding gutters and guards to your roof project is the easiest way to protect your foundation, siding, and
                landscaping — and it’s all covered for life.
              </p>
              <CtaButton source="Gutters CTA">Add it to my estimate</CtaButton>
            </div>
          </Reveal>
        </div>
      </section>

      <FinancingBand />
      <ReviewsStrip count={3} />
      <CtaBand />
    </>
  )
}
