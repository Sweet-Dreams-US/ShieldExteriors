import { Link, useParams, Navigate } from 'react-router-dom'
import { ArrowRight, Eye, Clock, Home, ShieldCheck } from 'lucide-react'
import { PageHero, FinancingBand, ReviewsStrip, CtaBand } from '../components/sections'
import { Reveal, SectionHead, Eyebrow } from '../components/ui'
import { CtaButton } from '../components/LeadModal'
import { METAL_TYPES } from '../data/site'
import { useSEO } from '../lib/seo'
import { asset } from '../lib/utils'

export default function MetalType() {
  const { type } = useParams()
  const m = METAL_TYPES.find((t) => t.slug === type)
  if (!m) return <Navigate to="/metal-roofing" replace />

  useSEO({
    title: `${m.name} Metal Roofing | Shield Exteriors — Northeast Indiana`,
    description: `${m.name}: ${m.blurb} ${m.durability} lifespan, backed by Shield’s accident-free lifetime warranty.`,
  })

  return (
    <>
      <PageHero
        eyebrow={`Metal Roofing · ${m.tier}`}
        title={<>{m.name} Metal Roofing</>}
        sub={m.blurb}
        image={m.image}
      >
        <CtaButton size="lg" source={`Metal — ${m.name}`}>Get My Free Inspection</CtaButton>
        <Link to="/metal-roofing" className="btn-ghost text-bone">All metal options <ArrowRight size={16} /></Link>
      </PageHero>

      <section className="bg-bone py-20">
        <div className="wrap grid gap-10 lg:grid-cols-3">
          {[
            { Icon: Eye, label: 'The look', body: m.look },
            { Icon: Clock, label: 'Durability', body: `${m.durability} of protection — engineered for Midwest freeze-thaw, hail, and wind.` },
            { Icon: Home, label: 'Ideal for', body: m.ideal },
          ].map((b, i) => (
            <Reveal key={b.label} delay={i * 0.08}>
              <div className="h-full rounded-2xl border bg-paper p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-steel/10 text-steel"><b.Icon size={24} /></div>
                <h3 className="mt-4 h-display text-xl text-ink">{b.label}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/65">{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Real job */}
      <section className="bg-bone-dim py-20">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border shadow-xl">
              <img src={asset('assets/home-hero-golden.webp')} alt={`${m.name} installed`} className="aspect-[4/3] w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>A real Shield job</Eyebrow>
            <h2 className="mt-4 h-display text-[2rem] leading-[1.04] text-ink">{m.name} on a Northeast Indiana home.</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink/65">
              A complete tear-off and {m.name.toLowerCase()} installation, finished with color-matched trim and the same
              accident-free coverage that protects every Shield roof. The homeowner’s words: “We’ll never re-roof again.”
            </p>
            <div className="mt-6 flex items-center gap-2.5 rounded-xl border bg-paper p-4 text-[14px] font-semibold text-ink">
              <ShieldCheck size={20} className="text-amber-deep" /> Covered by Free Repairs for Life — transferable to the next owner.
            </div>
            <CtaButton className="mt-7" source={`Metal Job — ${m.name}`}>Start with a free inspection</CtaButton>
          </Reveal>
        </div>
      </section>

      <FinancingBand />
      <ReviewsStrip count={3} />
      <CtaBand title={`Want ${m.name.toLowerCase()} on your home?`} />
    </>
  )
}
