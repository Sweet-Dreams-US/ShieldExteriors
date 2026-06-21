import { useState } from 'react'
import { TrendingUp, Users, Trophy, Check, ShieldCheck } from 'lucide-react'
import { PageHero, CtaBand } from '../components/sections'
import { Reveal, SectionHead, Eyebrow } from '../components/ui'
import { ROLES } from '../data/site'
import { addLead } from '../lib/store'
import { useSEO } from '../lib/seo'
import { asset } from '../lib/utils'

const PERKS = [
  'Uncapped earning potential',
  'Warm, pre-set appointments (no cold calls)',
  'The best warranty in the Midwest to sell',
  'Real training & a clear path to grow',
  'Local team, family culture',
  'Sell a product you can be proud of',
]

function ApplyForm() {
  const [data, setData] = useState({ name: '', phone: '', email: '', role: ROLES[0].title })
  const [done, setDone] = useState(false)
  const set = (k: string, v: string) => setData((d) => ({ ...d, [k]: v }))
  const submit = () => {
    addLead({ name: data.name, phone: data.phone, email: data.email, service: `Career: ${data.role}`, source: 'Careers Application' })
    setDone(true)
  }
  if (done)
    return (
      <div className="rounded-2xl border bg-paper p-8 text-center">
        <ShieldCheck size={36} className="mx-auto text-guard" />
        <h3 className="mt-3 h-display text-2xl text-ink">Application received!</h3>
        <p className="mt-2 text-ink/65">Our team will reach out within 1–2 business days. Welcome to the Shield family.</p>
      </div>
    )
  return (
    <div className="rounded-2xl border bg-paper p-6 card">
      <h3 className="h-display text-xl text-ink">Apply in 30 seconds</h3>
      <div className="mt-4 space-y-3">
        <input className="field" placeholder="Full name" value={data.name} onChange={(e) => set('name', e.target.value)} />
        <input className="field" placeholder="Phone" value={data.phone} onChange={(e) => set('phone', e.target.value)} />
        <input className="field" placeholder="Email" value={data.email} onChange={(e) => set('email', e.target.value)} />
        <select className="field" value={data.role} onChange={(e) => set('role', e.target.value)}>
          {ROLES.map((r) => <option key={r.title}>{r.title}</option>)}
        </select>
        <button onClick={submit} disabled={!data.name || !data.phone} className="btn-amber w-full justify-center">Submit application</button>
      </div>
    </div>
  )
}

export default function Careers() {
  useSEO({
    title: 'Careers at Shield Exteriors | Unlimited Income, Build Something That Lasts',
    description:
      'Canvasser, Event Coordinator, and Sales Rep roles at Shield Exteriors. Warm appointments, uncapped income, and the best warranty in the Midwest to sell.',
  })
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={<>Unlimited income. <span className="text-amber">Build something that lasts.</span></>}
        sub="Shield’s growth runs on great people in the field. If you’re hungry, honest, and great with people, there’s a seat for you."
        image={asset('assets/crew-install.webp')}
      />

      <section className="bg-bone py-20">
        <div className="wrap grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Reveal><SectionHead eyebrow="Open roles" title="Three ways to grow with us." /></Reveal>
            <div className="mt-8 space-y-5">
              {ROLES.map((r, i) => (
                <Reveal key={r.title} delay={i * 0.08}>
                  <div className="flex flex-col gap-2 rounded-2xl border bg-paper p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="h-display text-xl text-ink">{r.title}</h3>
                      <p className="mt-1 text-[14.5px] text-ink/65">{r.blurb}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-amber/15 px-4 py-2 text-sm font-bold text-amber-deep">{r.pay}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {PERKS.map((p) => (
                  <div key={p} className="flex items-center gap-2.5 text-[14.5px] text-ink/80">
                    <Check size={18} className="shrink-0 text-guard" /> {p}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:pt-16">
            <Reveal delay={0.1}><ApplyForm /></Reveal>
          </div>
        </div>
      </section>

      {/* Culture stats */}
      <section className="bg-ink py-16 text-bone grain">
        <div className="wrap grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
          {[
            { Icon: TrendingUp, big: '$150k+', small: 'Top rep earnings' },
            { Icon: Users, big: '100+', small: 'Years combined experience' },
            { Icon: Trophy, big: '2022', small: 'BBB Torch Award' },
          ].map((s) => (
            <Reveal key={s.small}>
              <s.Icon size={28} className="mx-auto text-amber" />
              <div className="mt-2 h-display text-4xl text-bone">{s.big}</div>
              <div className="text-sm text-bone/60">{s.small}</div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand title="Behind the Shield, there’s a team." sub="Apply today and find out why our people stay." />
    </>
  )
}
