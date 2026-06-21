import { useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ShieldCheck, ArrowRight, Star, BadgeDollarSign, MapPin, Play, Plus, Minus,
  CloudLightning, Wrench, Recycle, Sun, Quote, Clapperboard,
} from 'lucide-react'
import { Reveal, SectionHead, StatCounter, Stars, Eyebrow } from './ui'
import { CtaButton } from './LeadModal'
import { STATS, SERVICES, WHY_SHIELD, REVIEWS, FINANCING, CITIES, FINANCING as FIN } from '../data/site'
import { asset, cn, PHONE, PHONE_HREF } from '../lib/utils'

/* ----------------------------- Page hero (inner pages) ----------------------------- */
export function PageHero({
  eyebrow, title, sub, image, children,
}: {
  eyebrow?: string
  title: ReactNode
  sub?: ReactNode
  image?: string
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-ink pb-16 pt-28 text-bone lg:pt-36 grain">
      {image && (
        <>
          <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/60" />
        </>
      )}
      <div className="wrap relative">
        <Reveal>
          {eyebrow && <Eyebrow className="text-amber">{eyebrow}</Eyebrow>}
          <h1 className="mt-4 max-w-3xl h-display text-[2.4rem] leading-[0.98] sm:text-[3.3rem]">{title}</h1>
          {sub && <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-bone/75">{sub}</p>}
          {children && <div className="mt-7 flex flex-wrap items-center gap-3">{children}</div>}
        </Reveal>
      </div>
    </section>
  )
}

/* ----------------------------- Stats band ----------------------------- */
export function StatsBand({ dark = true }: { dark?: boolean }) {
  return (
    <section className={cn(dark ? 'bg-ink-soft text-bone' : 'bg-bone-dim text-ink')}>
      <div className="wrap grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
        {STATS.map((s) => (
          <Reveal key={s.label} className="text-center">
            <StatCounter value={s.value} suffix={s.suffix} label={s.label} tone={dark ? 'amber' : 'ink'} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ----------------------------- Shield promise ----------------------------- */
export function ShieldPromise() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-bone grain">
      <div className="absolute -right-20 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-amber/10 blur-3xl" />
      <div className="wrap relative grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <Eyebrow className="text-amber">The Shield Promise</Eyebrow>
          <h2 className="mt-4 h-display text-[2.2rem] leading-[1.02] sm:text-[2.9rem]">
            Free Repairs for Life.
            <br />
            <span className="text-amber">Even acts of nature.</span>
          </h2>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-bone/75">
            Everyone says “lifetime warranty.” We mean it differently. Our TRUE Double Lifetime Accident-Free Warranty
            covers accidents <em>and</em> storm damage, transfers to the next owner, and we handle the insurance. We can
            offer it because we believe in the product.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {['Covers storms & accidents', 'Transferable to next owner', 'We handle the insurance', 'Workmanship for life'].map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-[15px] font-medium">
                <ShieldCheck size={18} className="shrink-0 text-amber" /> {t}
              </li>
            ))}
          </ul>
          <Link to="/warranty" className="btn-amber mt-8 inline-flex">
            See how the warranty works <ArrowRight size={18} />
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto max-w-sm">
            <div className="metal grain relative overflow-hidden rounded-3xl border border-amber/30 p-8 text-center">
              <div className="anim-pulse-ring mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-amber text-ink">
                <ShieldCheck size={48} />
              </div>
              <div className="mt-6 h-display text-2xl text-bone">TRUE Double Lifetime</div>
              <div className="text-amber font-bold uppercase tracking-[0.2em] text-xs mt-1">Accident-Free Warranty</div>
              <p className="mt-4 text-sm text-bone/70">
                The only warranty of its kind in the Midwest — and the reason most homeowners choose Shield.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ----------------------------- Services grid ----------------------------- */
export function ServicesGrid() {
  return (
    <section className="bg-bone py-20">
      <div className="wrap">
        <Reveal>
          <SectionHead
            center
            eyebrow="What we install"
            title={<>Three ways to protect <span className="text-amber-deep">what matters most.</span></>}
            intro="Metal leads the lineup — but every Shield roof, in any material, carries the same accident-free promise."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <Link to={`/${s.slug}`} className="group block overflow-hidden rounded-2xl border bg-paper card transition-all hover:-translate-y-1">
                <div className="relative h-52 overflow-hidden">
                  <img src={s.image} alt={s.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                  <span className="absolute left-4 top-4 pill border-amber/40 bg-ink/70 text-amber backdrop-blur">{s.priceTier}</span>
                  <div className="absolute bottom-4 left-4 text-bone">
                    <div className="h-display text-2xl">{s.name}</div>
                    <div className="text-sm text-bone/80">{s.short} · {s.lifespan}</div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[15px] leading-relaxed text-ink/70">{s.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-bold text-steel group-hover:gap-2.5 transition-all">
                    Explore {s.name} <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- Why Shield ----------------------------- */
const WHY_ICONS = [ShieldCheck, Star, BadgeDollarSign, Sun]
export function WhyShield() {
  return (
    <section className="bg-bone-dim py-20">
      <div className="wrap">
        <Reveal>
          <SectionHead eyebrow="Why Shield" title={<>Four reasons homeowners <span className="text-amber-deep">pick us first.</span></>} />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_SHIELD.map((w, i) => {
            const Icon = WHY_ICONS[i]
            return (
              <Reveal key={w.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border bg-paper p-6 transition-shadow hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-steel/10 text-steel">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-4 h-display text-lg leading-tight text-ink">{w.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink/65">{w.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- Before / After slider ----------------------------- */
export function BeforeAfterSlider({
  before = asset('assets/roof-old-drone.webp'),
  after = asset('assets/roof-after-matched.webp'),
}: {
  before?: string
  after?: string
}) {
  const [pos, setPos] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const move = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)))
  }
  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl border-2 border-ink/10 shadow-xl"
      onPointerDown={(e) => move(e.clientX)}
      onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
    >
      <img src={after} alt="New metal roof" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <img
        src={before}
        alt="Old worn roof"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        draggable={false}
      />
      <span className="absolute left-4 top-4 pill border-white/20 bg-ink/70 text-bone backdrop-blur">Before</span>
      <span className="absolute right-4 top-4 pill border-amber/40 bg-amber text-ink">After</span>
      <div className="absolute inset-y-0 w-0.5 bg-amber" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-amber text-ink shadow-lg">
          <ArrowRight size={16} className="-mr-1" /><ArrowRight size={16} className="-ml-1 rotate-180" />
        </div>
      </div>
    </div>
  )
}

export function BeforeAfterSection() {
  return (
    <section className="bg-bone py-20">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <Eyebrow>Real results</Eyebrow>
          <h2 className="mt-4 h-display text-[2.1rem] leading-[1.02] sm:text-[2.7rem] text-ink">
            Drag to watch a tired roof become <span className="text-amber-deep">the last one they’ll ever buy.</span>
          </h2>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink/65">
            From curling, moss-streaked shingles to a gleaming charcoal standing-seam system — this is the Shield
            difference, captured by our drone team on real Northeast Indiana homes.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <CtaButton source="Before/After">Get My Free Inspection</CtaButton>
            <Link to="/reviews" className="btn-outline-ink">See the full gallery</Link>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <BeforeAfterSlider />
        </Reveal>
      </div>
    </section>
  )
}

/* ----------------------------- Brand film (placeholder for the real shoot) ----------------------------- */
export function BrandVideo() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-bone grain">
      <div className="wrap relative">
        <Reveal>
          <SectionHead
            light
            center
            eyebrow="Protected for Life"
            title="The film behind the promise"
            intro="Shield’s flagship brand film — produced and shot with the SweetDreams team — will live right here."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <img src={asset('assets/home-hero-golden.webp')} alt="Shield brand film placeholder" className="aspect-video w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/40" />

            <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-amber/40 bg-ink/70 px-3 py-1.5 text-[11.5px] font-bold uppercase tracking-wide text-amber backdrop-blur">
              <Clapperboard size={14} /> Brand film · in production
            </span>

            <div className="absolute inset-0 grid place-items-center px-6 text-center">
              <div>
                <span className="anim-pulse-ring mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber text-ink">
                  <Play size={32} className="ml-1 fill-ink" />
                </span>
                <div className="mt-5 h-display text-2xl sm:text-3xl">Your “Protected for Life” brand film</div>
                <div className="mt-2 text-sm text-bone/70">We’re filming Shield’s flagship video next — it drops into this spot when it’s ready.</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ----------------------------- Reviews ----------------------------- */
export function ReviewsStrip({ count = 3 }: { count?: number }) {
  return (
    <section className="bg-bone-dim py-20">
      <div className="wrap">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <Stars size={22} />
            <SectionHead center className="mt-3" eyebrow="1,000+ five-star reviews" title={<>Neighbors don’t lie. <span className="text-amber-deep">Read the proof.</span></>} />
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {REVIEWS.slice(0, count).map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-2xl border bg-paper p-6 card">
                <Quote size={28} className="text-amber" />
                <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-ink/80">“{r.text}”</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t pt-4">
                  {r.avatar ? (
                    <img src={r.avatar} alt={r.name} className="h-11 w-11 rounded-full object-cover" />
                  ) : (
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-steel/15 text-steel font-bold">{r.name[0]}</span>
                  )}
                  <span>
                    <span className="block text-[14px] font-bold text-ink">{r.name}</span>
                    <span className="block text-[12.5px] text-ink/55">{r.city} · {r.service}</span>
                  </span>
                  <Stars size={13} className="ml-auto" />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/reviews" className="btn-outline-ink">Read all 1,000+ reviews <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- Financing band ----------------------------- */
export function FinancingBand() {
  return (
    <section className="bg-bone py-20">
      <div className="wrap">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border-2 border-amber/30 bg-gradient-to-br from-ink to-steel-deep p-8 text-bone sm:p-12 grain">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-amber/20 blur-2xl" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_1fr]">
              <div>
                <Eyebrow className="text-amber"><BadgeDollarSign size={15} /> Financing</Eyebrow>
                <h2 className="mt-4 h-display text-[2rem] leading-[1.04] sm:text-[2.6rem]">{FINANCING.headline}</h2>
                <p className="mt-4 max-w-md text-bone/75">
                  A forever roof shouldn’t require a forever savings account. {FINANCING.apr}, 100% financing, and payments
                  that fit a normal budget.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <CtaButton source="Financing Band">See what you’d pay</CtaButton>
                  <Link to="/financing" className="btn-ghost text-bone">How financing works <ArrowRight size={16} /></Link>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { big: '$0', small: 'Down' },
                  { big: `$${FIN.monthly}`, small: '/mo*' },
                  { big: '<5%', small: 'APR (OAC)' },
                ].map((b) => (
                  <div key={b.small} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="h-display text-3xl text-amber">{b.big}</div>
                    <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-bone/60">{b.small}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ----------------------------- Service area band ----------------------------- */
export function ServiceAreaBand() {
  return (
    <section className="bg-ink py-20 text-bone grain">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <Eyebrow className="text-amber"><MapPin size={15} /> Service area</Eyebrow>
          <h2 className="mt-4 h-display text-[2.1rem] leading-[1.02] sm:text-[2.7rem]">
            Proudly local across <span className="text-amber">45+ counties.</span>
          </h2>
          <p className="mt-5 max-w-md text-bone/75">
            From Fort Wayne to the lakes, across the Ohio and Michigan lines — if it’s Northeast Indiana weather, Shield
            knows how to roof for it.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {CITIES.slice(0, 8).map((c) => (
              <Link key={c.slug} to={`/service-area/${c.slug}`} className="pill border-white/15 bg-white/5 text-bone hover:border-amber hover:text-amber">
                {c.name}
              </Link>
            ))}
            <Link to="/service-area" className="pill border-amber/40 bg-amber text-ink">All cities →</Link>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 metal grain">
            {/* stylized coverage map */}
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(245,166,35,0.5), transparent 12%), radial-gradient(circle at 55% 55%, rgba(245,166,35,0.4), transparent 9%), radial-gradient(circle at 48% 30%, rgba(245,166,35,0.4), transparent 8%), radial-gradient(circle at 65% 70%, rgba(27,111,168,0.5), transparent 11%)' }} />
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="anim-float flex h-16 w-16 items-center justify-center rounded-full bg-amber text-ink shadow-2xl"><ShieldCheck size={30} /></div>
              <div className="mt-3 h-display text-xl text-bone">Northeast Indiana</div>
              <div className="text-xs uppercase tracking-[0.25em] text-amber">IN · OH · MI</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ----------------------------- FAQ accordion ----------------------------- */
export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="mx-auto max-w-3xl divide-y rounded-2xl border bg-paper">
      {items.map((f, i) => (
        <div key={i}>
          <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left">
            <span className="text-[16px] font-bold text-ink">{f.q}</span>
            <span className="shrink-0 text-amber-deep">{open === i ? <Minus size={20} /> : <Plus size={20} />}</span>
          </button>
          <motion.div initial={false} animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }} className="overflow-hidden">
            <p className="px-5 pb-5 text-[15px] leading-relaxed text-ink/70">{f.a}</p>
          </motion.div>
        </div>
      ))}
    </div>
  )
}

/* ----------------------------- Final CTA band ----------------------------- */
export function CtaBand({
  title = 'Get the roof of your dreams.',
  sub = 'Free estimate. Zero pressure. A real person calls you back within 2 business hours.',
}: {
  title?: ReactNode
  sub?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-amber py-16">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #000 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
      <div className="wrap relative text-center text-ink">
        <Reveal>
          <ShieldCheck size={40} className="mx-auto" />
          <h2 className="mt-4 h-display text-[2.1rem] leading-[1.02] sm:text-[3rem]">{title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-[16px] font-medium text-ink/80">{sub}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <CtaButton variant="steel" size="lg" source="CTA Band">Get My Free Inspection</CtaButton>
            <a href={PHONE_HREF} className="btn-outline-ink"><span className="font-bold">Call {PHONE}</span></a>
          </div>
          <p className="mt-5 text-sm font-semibold text-ink/70">★ 1,000+ 5-star reviews · A+ BBB · Free Repairs for Life · As low as $69/mo</p>
        </Reveal>
      </div>
    </section>
  )
}
