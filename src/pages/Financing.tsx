import { useState } from 'react'
import { Check, BadgeDollarSign } from 'lucide-react'
import { PageHero, ReviewsStrip, CtaBand } from '../components/sections'
import { Reveal, SectionHead, Eyebrow } from '../components/ui'
import { CtaButton } from '../components/LeadModal'
import { FINANCING } from '../data/site'
import { useSEO } from '../lib/seo'
import { money } from '../lib/utils'

const APR = 0.0499
const TERMS = [
  { label: '10 yr', months: 120 },
  { label: '15 yr', months: 180 },
  { label: '20 yr', months: 240 },
]

function monthly(principal: number, months: number) {
  const r = APR / 12
  return Math.round((principal * r) / (1 - Math.pow(1 + r, -months)))
}

export default function Financing() {
  const [amount, setAmount] = useState(24000)
  const [months, setMonths] = useState(180)
  const pay = monthly(amount, months)

  useSEO({
    title: 'Roof Financing | A 50-Year Roof for About $69/Month | Shield Exteriors',
    description:
      '$0 down, rates under 5% (OAC), 100% financing, payments as low as ~$69/month. See what a forever roof would cost you.',
  })

  return (
    <>
      <PageHero
        eyebrow="Financing"
        title={<>A 50-year roof for <span className="text-amber">about $69 a month.</span></>}
        sub="A forever roof shouldn’t require a forever savings account. $0 down, rates under 5% on approved credit, and 100% financing available."
      >
        <CtaButton size="lg" source="Financing Hero">Get pre-qualified — no obligation</CtaButton>
      </PageHero>

      {/* Calculator */}
      <section className="bg-bone py-20">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <Eyebrow><BadgeDollarSign size={15} /> What you’d pay</Eyebrow>
            <h2 className="mt-4 h-display text-[2rem] leading-[1.04] text-ink">Slide to estimate your payment.</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-ink/65">
              A simple illustration of how affordable a Shield roof can be. Real terms come with your free, no-pressure
              quote.
            </p>
            <ul className="mt-6 space-y-3">
              {FINANCING.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-[15px] text-ink/80">
                  <Check size={18} className="shrink-0 text-guard" /> {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-3xl border-2 border-amber/30 bg-ink p-8 text-bone grain">
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-amber">Estimated payment</div>
                <div className="mt-2 h-display text-6xl text-bone tnum">{money(pay)}<span className="text-2xl text-bone/50">/mo</span></div>
                <div className="mt-1 text-sm text-bone/55">{TERMS.find((t) => t.months === months)?.label} · {(APR * 100).toFixed(2)}% APR (OAC) · $0 down</div>
              </div>

              <div className="mt-8">
                <div className="flex justify-between text-sm font-semibold text-bone/70">
                  <span>Project amount</span>
                  <span className="text-bone">{money(amount)}</span>
                </div>
                <input
                  type="range" min={8000} max={60000} step={500} value={amount}
                  onChange={(e) => setAmount(+e.target.value)}
                  className="mt-2 w-full accent-amber"
                />
                <div className="flex justify-between text-[11px] text-bone/40"><span>$8k</span><span>$60k</span></div>
              </div>

              <div className="mt-6">
                <div className="text-sm font-semibold text-bone/70">Term</div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {TERMS.map((t) => (
                    <button
                      key={t.months}
                      onClick={() => setMonths(t.months)}
                      className={`rounded-xl border-2 py-2.5 text-sm font-bold transition ${months === t.months ? 'border-amber bg-amber text-ink' : 'border-white/15 text-bone/70 hover:border-white/40'}`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <CtaButton className="mt-7 w-full justify-center" source="Financing Calculator">Apply — quick & no obligation</CtaButton>
              <p className="mt-3 text-center text-[11px] text-bone/40">{FINANCING.disclaimer}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <ReviewsStrip count={3} />
      <CtaBand title="A forever roof, on a budget that works." />
    </>
  )
}
