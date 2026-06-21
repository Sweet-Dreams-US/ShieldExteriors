import { Link, useParams, Navigate } from 'react-router-dom'
import { CloudSnow, ShieldCheck, BadgeDollarSign, Quote, ArrowRight, MapPin } from 'lucide-react'
import { PageHero, CtaBand } from '../components/sections'
import { Reveal, SectionHead, Stars, Eyebrow } from '../components/ui'
import { CtaButton } from '../components/LeadModal'
import { CITIES } from '../data/site'
import { useSEO } from '../lib/seo'

export default function CityPage() {
  const { city } = useParams()
  const c = CITIES.find((x) => x.slug === city)
  if (!c) return <Navigate to="/service-area" replace />

  useSEO({
    title: `Metal Roofing in ${c.name}, ${c.state} | Shield Exteriors`,
    description: `${c.intro} Free inspections, financing from ~$69/mo, and the only accident-free lifetime warranty in the Midwest.`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'RoofingContractor',
      name: `Shield Exteriors — ${c.name}`,
      areaServed: { '@type': 'City', name: `${c.name}, ${c.state}` },
      telephone: '+1-260-818-6072',
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '1000' },
    },
  })

  return (
    <>
      <PageHero
        eyebrow={`Service Area · ${c.county}`}
        title={<>Metal Roofing in <span className="text-amber">{c.name}, {c.state}.</span></>}
        sub={c.intro}
        image={c.job.image}
      >
        <CtaButton size="lg" source={`City — ${c.name}`}>Get My Free {c.name} Inspection</CtaButton>
      </PageHero>

      {/* Why metal here */}
      <section className="bg-bone py-16">
        <div className="wrap grid items-start gap-10 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <Eyebrow><CloudSnow size={15} /> Why metal in {c.name}</Eyebrow>
            <h2 className="mt-4 h-display text-[1.9rem] leading-[1.05] text-ink">Built for {c.county} weather.</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink/70">{c.weather}</p>
            <p className="mt-3 text-[16px] leading-relaxed text-ink/70">
              That’s why so many {c.name} homeowners are choosing metal — and why every Shield roof here is backed by Free
              Repairs for Life. We’re local, we know the building stock, and we roof for the conditions you actually live in.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/metal-roofing" className="btn-outline-ink">Explore metal options <ArrowRight size={16} /></Link>
              <Link to="/financing" className="btn-outline-ink">Financing from ~$69/mo</Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border bg-paper p-6 card">
              <div className="flex items-center gap-2 text-amber-deep"><ShieldCheck size={20} /><span className="font-bold">Local Shield facts</span></div>
              <dl className="mt-4 space-y-3 text-[14.5px]">
                <div className="flex justify-between border-b pb-2"><dt className="text-ink/55">County</dt><dd className="font-semibold text-ink">{c.county}</dd></div>
                <div className="flex justify-between border-b pb-2"><dt className="text-ink/55">Population</dt><dd className="font-semibold text-ink">{c.population}</dd></div>
                <div className="flex justify-between border-b pb-2"><dt className="text-ink/55">Warranty</dt><dd className="font-semibold text-ink">Free Repairs for Life</dd></div>
                <div className="flex justify-between"><dt className="text-ink/55">Inspections</dt><dd className="font-semibold text-ink">Free, no pressure</dd></div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Real job */}
      <section className="bg-bone-dim py-16">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border shadow-xl">
              <img src={c.job.image} alt={c.job.title} className="aspect-[4/3] w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow><MapPin size={15} /> A real {c.name} job</Eyebrow>
            <h2 className="mt-4 h-display text-[1.8rem] leading-[1.05] text-ink">{c.job.title}</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink/70">{c.job.detail}</p>
            <figure className="mt-6 rounded-2xl border bg-paper p-6">
              <Quote size={24} className="text-amber" />
              <blockquote className="mt-2 text-[15px] leading-relaxed text-ink/80">“{c.review.text}”</blockquote>
              <figcaption className="mt-3 flex items-center gap-2 text-[13px] font-semibold text-ink/60">
                <Stars size={13} /> {c.review.name}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Warranty + financing teasers */}
      <section className="bg-bone py-16">
        <div className="wrap grid gap-6 sm:grid-cols-2">
          <Reveal>
            <Link to="/warranty" className="group flex h-full flex-col rounded-2xl border-2 border-amber/30 bg-ink p-7 text-bone grain">
              <ShieldCheck size={28} className="text-amber" />
              <h3 className="mt-3 h-display text-xl">Free Repairs for Life</h3>
              <p className="mt-2 flex-1 text-bone/75">{c.name}’s only true accident-free lifetime warranty — covers storms, transfers to the next owner.</p>
              <span className="mt-3 inline-flex items-center gap-1.5 font-bold text-amber group-hover:gap-2.5 transition-all">How it works <ArrowRight size={16} /></span>
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <Link to="/financing" className="group flex h-full flex-col rounded-2xl border bg-paper p-7 card">
              <BadgeDollarSign size={28} className="text-amber-deep" />
              <h3 className="mt-3 h-display text-xl text-ink">About $69 a month</h3>
              <p className="mt-2 flex-1 text-ink/65">$0 down, under 5% APR (OAC). A forever roof in {c.name} that fits a normal budget.</p>
              <span className="mt-3 inline-flex items-center gap-1.5 font-bold text-steel group-hover:gap-2.5 transition-all">See what you’d pay <ArrowRight size={16} /></span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand title={`${c.name}, ready for the last roof you’ll ever buy?`} />
    </>
  )
}
