import { Quote, Play, BadgeCheck, Award, ShieldCheck, Star } from 'lucide-react'
import { PageHero, CtaBand, StatsBand, BeforeAfterSlider } from '../components/sections'
import { Reveal, SectionHead, Stars, Eyebrow } from '../components/ui'
import { REVIEWS, BADGES } from '../data/site'
import { useSEO } from '../lib/seo'
import { asset } from '../lib/utils'

const VIDEOS = [
  { img: asset('assets/family-home.webp'), name: 'The Hartman Family', city: 'Angola, IN' },
  { img: asset('assets/crew-install.webp'), name: 'Behind the Shield', city: 'Install day' },
  { img: asset('assets/home-hero-golden.webp'), name: 'Karen’s Standing Seam', city: 'Fort Wayne, IN' },
]

export default function Reviews() {
  useSEO({
    title: 'Reviews & Results | 1,000+ Five-Star Reviews | Shield Exteriors',
    description:
      'Real reviews, real before/afters, and testimonial videos from 1,000+ five-star Shield Exteriors customers across Northeast Indiana.',
  })
  return (
    <>
      <PageHero
        eyebrow="Reviews & Results"
        title={<>The proof is <span className="text-amber">public.</span></>}
        sub="1,000+ five-star reviews, an A+ BBB rating, a 2022 Torch Award, and not a single complaint. This is the page our reps send the skeptics."
        image={asset('assets/home-hero-golden.webp')}
      />

      {/* Rating summary */}
      <section className="bg-bone py-14">
        <div className="wrap grid items-center gap-8 rounded-3xl border bg-paper p-8 text-center sm:grid-cols-3 sm:text-left card">
          <div>
            <div className="h-display text-6xl text-ink">4.9</div>
            <Stars size={20} className="mt-1" />
            <div className="mt-1 text-sm text-ink/55">across 1,000+ reviews</div>
          </div>
          <div className="sm:col-span-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[['1,000+', 'Reviews'], ['5,000+', 'Roofs'], ['A+', 'BBB'], ['0', 'Complaints']].map(([b, s]) => (
              <div key={s}>
                <div className="h-display text-3xl text-amber-deep">{b}</div>
                <div className="text-xs font-semibold uppercase tracking-wide text-ink/55">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video library */}
      <section className="bg-bone pb-4">
        <div className="wrap">
          <Reveal><SectionHead eyebrow="Testimonial films" title="Hear it from the homeowners." /></Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {VIDEOS.map((v, i) => (
              <Reveal key={v.name} delay={i * 0.08}>
                <div className="group relative aspect-video overflow-hidden rounded-2xl border shadow-md">
                  <img src={v.img} alt={v.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-amber text-ink"><Play size={22} className="ml-0.5 fill-ink" /></span>
                  <div className="absolute bottom-3 left-4 text-bone">
                    <div className="font-bold">{v.name}</div>
                    <div className="text-xs text-bone/75">{v.city}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Before / after */}
      <section className="bg-bone py-16">
        <div className="wrap">
          <Reveal><SectionHead eyebrow="Before & after" title="Drone-captured transformations." /></Reveal>
          <div className="mt-8"><BeforeAfterSlider /></div>
        </div>
      </section>

      {/* All reviews */}
      <section className="bg-bone-dim py-16">
        <div className="wrap">
          <Reveal><SectionHead center eyebrow="In their words" title="Every one of these is a neighbor." /></Reveal>
          <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="break-inside-avoid rounded-2xl border bg-paper p-6 card">
                <div className="flex items-center justify-between">
                  <Quote size={26} className="text-amber" />
                  <Stars size={14} />
                </div>
                <blockquote className="mt-3 text-[15px] leading-relaxed text-ink/80">“{r.text}”</blockquote>
                <figcaption className="mt-4 flex items-center gap-3 border-t pt-4">
                  {r.avatar ? <img src={r.avatar} alt={r.name} className="h-10 w-10 rounded-full object-cover" /> : <span className="grid h-10 w-10 place-items-center rounded-full bg-steel/15 text-steel font-bold">{r.name[0]}</span>}
                  <span>
                    <span className="block text-[14px] font-bold text-ink">{r.name}</span>
                    <span className="block text-[12px] text-ink/55">{r.city} · {r.service}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="bg-ink py-14 text-bone grain">
        <div className="wrap flex flex-wrap items-center justify-center gap-4">
          {BADGES.map((b) => (
            <span key={b} className="pill border-amber/30 bg-white/5 text-bone">
              <BadgeCheck size={16} className="text-amber" /> {b}
            </span>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
