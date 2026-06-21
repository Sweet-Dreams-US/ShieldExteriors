import { Link } from 'react-router-dom'
import { ShieldCheck, ArrowRight, Check } from 'lucide-react'
import { PageHero, FinancingBand, ReviewsStrip, CtaBand, FaqAccordion } from '../components/sections'
import { Reveal, SectionHead, Eyebrow } from '../components/ui'
import { CtaButton } from '../components/LeadModal'
import { FAQS } from '../data/site'
import { useSEO } from '../lib/seo'
import { asset } from '../lib/utils'

const FEATURES = [
  'Class-4 impact rated (the highest there is)',
  'Polymer-modified for flexibility & longevity',
  'Lifetime transferable manufacturer warranty',
  'Dozens of architectural colors',
  'Backed by Shield’s workmanship guarantee',
  'Often qualifies for insurance discounts',
]

export default function Asphalt() {
  useSEO({
    title: 'Premium Asphalt Shingle Roofing | Class-4 Lifetime Warranty | Shield Exteriors',
    description:
      'Premium polymer-modified, Class-4 impact-rated architectural asphalt shingles with a lifetime transferable warranty — the smart value lane from Shield Exteriors.',
  })
  return (
    <>
      <PageHero
        eyebrow="Asphalt Shingles · The value lane"
        title={<>Premium Asphalt Shingles — <span className="text-amber">Class-4 tough, lifetime warranty.</span></>}
        sub="Not all shingles are equal. We install premium, polymer-modified, impact-rated architectural shingles — the smart choice when metal isn’t the plan (yet)."
        image={asset('assets/asphalt-shingle.webp')}
      >
        <CtaButton size="lg" source="Asphalt">Get My Free Inspection</CtaButton>
      </PageHero>

      <section className="bg-bone py-20">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Serious protection, smart price</Eyebrow>
            <h2 className="mt-4 h-display text-[2rem] leading-[1.04] text-ink">The honest value option.</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink/65">
              A premium asphalt roof from Shield is a genuinely great product — and the right call for plenty of homeowners.
              We position it honestly, install it to the same standard as our metal, and back it with our workmanship
              guarantee.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[14.5px] text-ink/80">
                  <Check size={18} className="mt-0.5 shrink-0 text-guard" /> {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-3xl border-2 border-amber/30 bg-ink p-8 text-bone grain">
              <div className="text-amber"><ShieldCheck size={32} /></div>
              <h3 className="mt-4 h-display text-2xl">Curious what metal would cost per month?</h3>
              <p className="mt-3 text-bone/75">
                You may be surprised. With financing, a forever metal roof can land within a few dollars a month of premium
                asphalt — and you’d only ever buy it once. Ask us to run both numbers, no pressure.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <CtaButton source="Asphalt → Metal Upsell">Compare metal vs. asphalt</CtaButton>
                <Link to="/metal-roofing" className="btn-ghost text-bone">See metal options <ArrowRight size={16} /></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-bone-dim py-20">
        <div className="wrap">
          <Reveal><SectionHead center eyebrow="Good to know" title="Asphalt questions, answered." /></Reveal>
          <div className="mt-10"><FaqAccordion items={FAQS.filter((f) => f.group === 'Cost' || f.group === 'Process').map(({ q, a }) => ({ q, a }))} /></div>
        </div>
      </section>

      <FinancingBand />
      <ReviewsStrip count={3} />
      <CtaBand />
    </>
  )
}
