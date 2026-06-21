import { Link } from 'react-router-dom'
import { MapPin, ArrowRight } from 'lucide-react'
import { PageHero, CtaBand } from '../components/sections'
import { Reveal, SectionHead } from '../components/ui'
import { CITIES } from '../data/site'
import { useSEO } from '../lib/seo'

const STATE_NAMES: Record<string, string> = { IN: 'Indiana', OH: 'Ohio', MI: 'Michigan' }

export default function ServiceArea() {
  useSEO({
    title: 'Service Area | Metal Roofing Across NE Indiana, NW Ohio & S Michigan',
    description:
      'Shield Exteriors serves 45+ counties — Fort Wayne, Auburn, Garrett, Angola, Warsaw, Huntington and more. Find your city and book a free inspection.',
  })

  const byState = CITIES.reduce<Record<string, typeof CITIES>>((acc, c) => {
    ;(acc[c.state] ||= []).push(c)
    return acc
  }, {})

  return (
    <>
      <PageHero
        eyebrow="Service Area"
        title={<>Roofing across <span className="text-amber">45+ counties.</span></>}
        sub="From Fort Wayne to the lakes and across the Ohio and Michigan lines — find your town below for local jobs, local reviews, and a free inspection."
      />

      {Object.entries(byState).map(([state, cities]) => (
        <section key={state} className="bg-bone py-14 odd:bg-bone even:bg-bone-dim">
          <div className="wrap">
            <Reveal><SectionHead eyebrow={STATE_NAMES[state]} title={`${cities.length} cities in ${STATE_NAMES[state]}`} /></Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map((c, i) => (
                <Reveal key={c.slug} delay={i * 0.05}>
                  <Link to={`/service-area/${c.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-paper card transition-all hover:-translate-y-1">
                    <div className="relative h-36 overflow-hidden">
                      <img src={c.job.image} alt={c.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                      <div className="absolute bottom-3 left-4 text-bone">
                        <div className="h-display text-xl">{c.name}, {c.state}</div>
                        <div className="text-xs text-bone/80">{c.county} · {c.population}</div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="flex-1 text-[14px] leading-relaxed text-ink/65 line-clamp-3">{c.intro}</p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-steel group-hover:gap-2.5 transition-all">
                        <MapPin size={15} /> Metal roofing in {c.name} <ArrowRight size={15} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <CtaBand title="Don’t see your town? We probably cover it." sub="Shield serves 45+ counties across IN, OH, and MI. Call or request a free inspection and we’ll confirm." />
    </>
  )
}
