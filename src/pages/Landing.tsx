import { useNavigate } from 'react-router-dom'
import { Phone, Check, Star, ShieldCheck, BadgeCheck } from 'lucide-react'
import MultiStepForm from '../components/forms/MultiStepForm'
import { ShieldMark, Stars } from '../components/ui'
import { useSEO } from '../lib/seo'
import { asset, PHONE, PHONE_HREF } from '../lib/utils'

type Variant = 'free' | 'storm'

const CONFIG: Record<Variant, {
  title: string
  eyebrow: string
  headline: React.ReactNode
  sub: string
  bullets: string[]
  image: string
  source: string
}> = {
  free: {
    title: 'Free Roof Inspection | Shield Exteriors — Protected for Life',
    eyebrow: 'Free Roof Inspection',
    headline: <>Your free roof inspection — <span className="text-amber">no pressure, no obligation.</span></>,
    sub: 'A real local expert evaluates your roof and gives you honest options and a clear estimate. That’s it.',
    bullets: ['100% free, no-obligation inspection', 'Honest options: metal, asphalt, or repair', 'Free Repairs for Life warranty', 'Financing as low as $69/mo · $0 down'],
    image: asset('assets/home-hero-golden.webp'),
    source: 'Landing — Free Inspection',
  },
  storm: {
    title: 'Storm Damage Roof Repair | We Handle the Insurance | Shield Exteriors',
    eyebrow: 'Storm Damage',
    headline: <>Storm damage? <span className="text-amber">We handle the insurance.</span></>,
    sub: 'Hail or wind hit your roof? Get a free damage inspection and let Shield deal with the insurance company for you.',
    bullets: ['Free storm-damage inspection & documentation', 'We work directly with your insurer', 'Fast, local response across IN · OH · MI', 'Repair or full replacement — your call'],
    image: asset('assets/storm-damage.webp'),
    source: 'Landing — Storm Damage',
  },
}

export default function Landing({ variant }: { variant: Variant }) {
  const cfg = CONFIG[variant]
  const navigate = useNavigate()
  useSEO({ title: cfg.title, description: cfg.sub })

  return (
    <div className="min-h-screen bg-ink text-bone">
      {/* minimal bar — no nav distractions */}
      <header className="border-b border-white/10">
        <div className="wrap flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldMark size={34} />
            <span className="leading-none">
              <span className="block h-display text-lg text-bone">SHIELD</span>
              <span className="block text-[9px] font-bold uppercase tracking-[0.34em] text-amber">Exteriors</span>
            </span>
          </div>
          <a href={PHONE_HREF} className="btn-amber px-4 py-2.5 text-sm"><Phone size={16} /> {PHONE}</a>
        </div>
      </header>

      <section className="relative overflow-hidden grain">
        <img src={cfg.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/50" />
        <div className="wrap relative grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="eyebrow text-amber"><ShieldCheck size={15} /> {cfg.eyebrow}</span>
            <h1 className="mt-4 h-display text-[2.5rem] leading-[0.98] sm:text-[3.4rem]">{cfg.headline}</h1>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-bone/80">{cfg.sub}</p>
            <ul className="mt-7 space-y-3">
              {cfg.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-[15px] text-bone/90">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber/20 text-amber"><Check size={15} /></span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-[13px] font-semibold text-bone/75">
              <span className="flex items-center gap-1.5"><Stars size={14} /> 1,000+ reviews</span>
              <span className="flex items-center gap-1.5"><BadgeCheck size={15} className="text-amber" /> A+ BBB</span>
              <span className="flex items-center gap-1.5"><ShieldCheck size={15} className="text-amber" /> 0 complaints</span>
            </div>
          </div>

          <div>
            <div className="rounded-3xl bg-ink/40 p-2 ring-1 ring-white/10 backdrop-blur">
              <MultiStepForm source={cfg.source} onSubmitted={() => navigate('/thank-you')} className="border-0" />
            </div>
          </div>
        </div>
      </section>

      {/* slim proof strip */}
      <section className="border-t border-white/10 bg-ink-soft py-8">
        <div className="wrap flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center text-sm font-semibold text-bone/70">
          <span className="flex items-center gap-2"><Star size={16} className="fill-amber text-amber" /> 1,000+ Five-Star Reviews</span>
          <span>·</span>
          <span>5,000+ Roofs Installed</span>
          <span>·</span>
          <span>Free Repairs for Life</span>
          <span>·</span>
          <span>As low as $69/mo</span>
        </div>
      </section>

      <footer className="py-6 text-center text-[12px] text-bone/40">
        © {new Date().getFullYear()} Shield Exteriors · Protected for Life™ · {PHONE}
      </footer>
    </div>
  )
}
