import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { PageHero, CtaBand } from '../components/sections'
import { Reveal } from '../components/ui'
import { POSTS } from '../data/site'
import { useSEO } from '../lib/seo'

export default function Blog() {
  useSEO({
    title: 'Learn | Honest Roofing Education from Shield Exteriors',
    description:
      'A buyer-education library: metal vs. shingle honestly, what a free inspection involves, and whether your “lifetime” warranty is real.',
  })
  const [feature, ...rest] = POSTS
  return (
    <>
      <PageHero
        eyebrow="Blog / Learn"
        title={<>Honest roofing education. <span className="text-amber">No sales fluff.</span></>}
        sub="The questions homeowners actually ask, answered straight — so you can make a confident decision, whoever you hire."
      />

      <section className="bg-bone py-16">
        <div className="wrap">
          {/* Feature */}
          <Reveal>
            <Link to={`/blog/${feature.slug}`} className="group grid overflow-hidden rounded-3xl border bg-paper card lg:grid-cols-2">
              <div className="relative h-64 overflow-hidden lg:h-auto">
                <img src={feature.image} alt={feature.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center p-8">
                <span className="pill w-fit border-amber/40 bg-amber/10 text-amber-deep">{feature.category}</span>
                <h2 className="mt-4 h-display text-[2rem] leading-[1.04] text-ink">{feature.title}</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-ink/65">{feature.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-steel group-hover:gap-3 transition-all">
                  Read article <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Rest */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link to={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-paper card transition-all hover:-translate-y-1">
                  <div className="relative h-44 overflow-hidden">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute left-3 top-3 pill border-amber/40 bg-ink/70 text-amber backdrop-blur">{p.category}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="h-display text-xl text-ink">{p.title}</h3>
                    <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink/65">{p.excerpt}</p>
                    <span className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-ink/45"><Clock size={13} /> {p.read} · {p.date}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Done reading? Let’s look at your roof." />
    </>
  )
}
