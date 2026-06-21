import { Link } from 'react-router-dom'
import { Award, Heart, Hammer, MapPin, ArrowRight } from 'lucide-react'
import { PageHero, StatsBand, CtaBand, ReviewsStrip } from '../components/sections'
import { Reveal, SectionHead, Eyebrow } from '../components/ui'
import { CtaButton } from '../components/LeadModal'
import { useSEO } from '../lib/seo'
import { asset } from '../lib/utils'

const VALUES = [
  { Icon: Heart, title: 'Protect what matters most', body: 'A roof isn’t shingles. It’s the thing standing between your family and the storm. We treat it that way.' },
  { Icon: Hammer, title: 'Built in the Midwest', body: 'Founded in Garrett with 100+ years of combined experience. We roof the way our neighbors expect — honestly.' },
  { Icon: Award, title: 'Earn it every time', body: 'A+ BBB, a 2022 Torch Award, and zero complaints. We’d rather lose a sale than earn a bad review.' },
]

const TEAM = [
  { name: 'Brad Ledgerwood', role: 'Owner & Founder', img: asset('assets/founder-brad.webp') },
  { name: 'The Field Crews', role: 'Certified installers', img: asset('assets/crew-install.webp') },
  { name: 'Happy Homeowners', role: '5,000+ and counting', img: asset('assets/family-home.webp') },
]

export default function About() {
  useSEO({
    title: 'About Shield Exteriors | Garrett, Indiana Roofing Company',
    description:
      "Brad Ledgerwood founded Shield Exteriors to protect what matters most. Garrett roots, 100+ years combined experience, BBB Torch Award, and a mission that out-locals the national chains.",
  })
  return (
    <>
      <PageHero
        eyebrow="About Shield"
        title={<>A Garrett company on a mission to <span className="text-amber">protect what matters most.</span></>}
        sub="Shield Exteriors was built on a simple idea: roofing done with the honesty, craftsmanship, and accountability the Midwest is known for — and a warranty no national chain will match."
        image={asset('assets/crew-install.webp')}
      />

      {/* Founder story */}
      <section className="bg-bone py-20">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border shadow-xl">
              <img src={asset('assets/founder-brad.webp')} alt="Brad Ledgerwood, founder" className="aspect-[4/5] w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>Brad’s story</Eyebrow>
            <h2 className="mt-4 h-display text-[2rem] leading-[1.04] text-ink">Why Brad started Shield.</h2>
            <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-ink/70">
              <p>Brad Ledgerwood grew up around the trades in Garrett, Indiana — and grew tired of watching homeowners get burned by high-pressure sales, fine-print warranties, and roofs that failed early.</p>
              <p>So he built the opposite. Shield Exteriors pairs premium metal and asphalt systems with the only TRUE accident-free lifetime warranty in the Midwest, sold the way Brad would want it sold: honestly, with no pressure, by people who live here.</p>
              <p>Five thousand roofs and a thousand five-star reviews later, the mission hasn’t changed — protect what matters most, and stand behind it for life.</p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold text-ink/70">
              <span className="pill border-bone-line bg-bone"><MapPin size={15} className="text-amber-deep" /> Garrett, Indiana</span>
              <span className="pill border-bone-line bg-bone"><Award size={15} className="text-amber-deep" /> 2022 BBB Torch Award</span>
              <span className="pill border-bone-line bg-bone">100+ yrs combined experience</span>
            </div>
          </Reveal>
        </div>
      </section>

      <StatsBand />

      {/* Values */}
      <section className="bg-bone-dim py-20">
        <div className="wrap">
          <Reveal><SectionHead center eyebrow="What we stand for" title="The standard behind the shield." /></Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border bg-paper p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber/15 text-amber-deep"><v.Icon size={24} /></div>
                  <h3 className="mt-4 h-display text-lg text-ink">{v.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink/65">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-bone py-20">
        <div className="wrap">
          <Reveal><SectionHead eyebrow="The people" title="Local faces, real accountability." /></Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TEAM.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <div className="overflow-hidden rounded-2xl border bg-paper card">
                  <img src={t.img} alt={t.name} className="aspect-[4/3] w-full object-cover" />
                  <div className="p-5">
                    <div className="h-display text-lg text-ink">{t.name}</div>
                    <div className="text-sm text-ink/55">{t.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border-2 border-amber/30 bg-ink p-7 text-bone sm:flex-row grain">
              <p className="text-[15px] text-bone/80">We’re hiring across Northeast Indiana — canvassers, coordinators, and sales reps.</p>
              <Link to="/careers" className="btn-amber">Join the team <ArrowRight size={16} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <ReviewsStrip count={3} />
      <CtaBand />
    </>
  )
}
