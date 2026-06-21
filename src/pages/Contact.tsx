import { useNavigate } from 'react-router-dom'
import { Phone, MapPin, Clock, Mail, Check, ShieldCheck } from 'lucide-react'
import MultiStepForm from '../components/forms/MultiStepForm'
import { Reveal, Eyebrow } from '../components/ui'
import { BRAND } from '../data/site'
import { useSEO, localBusinessSchema } from '../lib/seo'
import { PHONE, PHONE_HREF } from '../lib/utils'

const EXPECT = [
  'A real person calls you within 2 business hours',
  'A free, no-pressure on-site inspection',
  'Honest options — metal, asphalt, or repair',
  'A clear written estimate & financing math',
]

export default function Contact() {
  const navigate = useNavigate()
  useSEO({
    title: 'Free Inspection & Contact | Shield Exteriors — Call (260) 818-6072',
    description:
      'Book your free, no-pressure roof inspection. A real person calls within 2 business hours. Serving Northeast Indiana, NW Ohio, and S Michigan.',
    schema: localBusinessSchema,
  })
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-28 text-bone lg:pt-36 grain">
      <div className="absolute -right-24 top-20 h-96 w-96 rounded-full bg-amber/10 blur-3xl" />
      <div className="wrap relative grid items-start gap-12 lg:grid-cols-2">
        {/* Left: pitch + info */}
        <Reveal>
          <Eyebrow className="text-amber"><ShieldCheck size={15} /> Free Inspection</Eyebrow>
          <h1 className="mt-4 h-display text-[2.4rem] leading-[1.0] sm:text-[3.1rem]">
            Let’s get your roof <span className="text-amber">protected for life.</span>
          </h1>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-bone/75">
            Tell us a little about your project and a real Shield expert will reach out — no robots, no pressure, no
            obligation.
          </p>

          <ul className="mt-8 space-y-3">
            {EXPECT.map((e) => (
              <li key={e} className="flex items-center gap-3 text-[15px] text-bone/85">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber/20 text-amber"><Check size={15} /></span>
                {e}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <a href={PHONE_HREF} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <Phone size={22} className="text-amber" />
              <span><span className="block text-xs uppercase tracking-wide text-bone/50">Call or text</span><span className="font-bold">{PHONE}</span></span>
            </a>
            <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <Mail size={22} className="text-amber" />
              <span><span className="block text-xs uppercase tracking-wide text-bone/50">Email</span><span className="font-bold">{BRAND.email}</span></span>
            </a>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <MapPin size={22} className="text-amber" />
              <span><span className="block text-xs uppercase tracking-wide text-bone/50">Based in</span><span className="font-bold">{BRAND.hq}</span></span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <Clock size={22} className="text-amber" />
              <span><span className="block text-xs uppercase tracking-wide text-bone/50">Hours</span><span className="font-bold">{BRAND.hours}</span></span>
            </div>
          </div>
        </Reveal>

        {/* Right: form */}
        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-ink/40 p-2 ring-1 ring-white/10 backdrop-blur">
            <MultiStepForm source="Contact Page" onSubmitted={() => navigate('/thank-you')} className="border-0" />
          </div>
          <p className="mt-4 text-center text-[13px] text-bone/50">★ 1,000+ 5-star reviews · A+ BBB · Free Repairs for Life</p>
        </Reveal>
      </div>
    </section>
  )
}
