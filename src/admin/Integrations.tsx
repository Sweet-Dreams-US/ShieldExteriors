import { useState } from 'react'
import { Plug, Check } from 'lucide-react'
import { PageTitle, Panel, SyncBadge } from './ui'
import { cn } from '../lib/utils'

interface Integ { name: string; cat: string; does: string; tone: string; connected: boolean }
const INTEGRATIONS: Integ[] = [
  { name: 'QuickBooks', cat: 'Accounting', does: 'Two-way sync — books stay the system of record.', tone: '#2ca01c', connected: true },
  { name: 'Stripe', cat: 'Payments', does: 'Card & ACH, deposits and final payments.', tone: '#635bff', connected: true },
  { name: 'EagleView / Hover', cat: 'Measurements', does: 'Pull exact roof measurements into estimates.', tone: '#1b6fa8', connected: true },
  { name: 'Twilio', cat: 'SMS / Voice', does: 'Texts, reminders, and review requests.', tone: '#f22f46', connected: true },
  { name: 'CallRail', cat: 'Call tracking', does: 'Attribute calls to marketing sources.', tone: '#00b3a4', connected: true },
  { name: 'Google LSA & Reviews', cat: 'Lead source', does: 'Local Services Ads leads + review sync.', tone: '#ea4335', connected: true },
  { name: 'Service Finance / Sunlight', cat: 'Lending', does: 'One-click consumer financing applications.', tone: '#c98a1b', connected: true },
  { name: 'Gusto', cat: 'Payroll', does: 'Payroll tax handled by the specialist.', tone: '#f45d48', connected: false },
  { name: 'DocuSign', cat: 'E-signature', does: 'Backup e-sign (native e-sign is built in).', tone: '#6b54c6', connected: false },
]

const BUILT_IN = ['CRM & pipeline', 'Canvassing', 'Estimating & proposals', 'Production', 'Scheduling', 'Warranty registry', 'Reviews & referrals', 'Customer portal', 'Field app', 'Owner dashboard']

export default function Integrations() {
  const [items, setItems] = useState(INTEGRATIONS)
  const toggle = (name: string) => setItems((arr) => arr.map((i) => (i.name === name ? { ...i, connected: !i.connected } : i)))

  return (
    <>
      <PageTitle title="Integrations" sub="Build the operational core; integrate the commodity & regulated stuff. One interface, no reinventing QuickBooks or becoming a lender." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <Panel key={i.name} className="flex flex-col p-5">
            <div className="flex items-start justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl font-bold text-bone" style={{ background: i.tone }}>{i.name[0]}</span>
              <SyncBadge connected={i.connected} />
            </div>
            <h3 className="mt-3 font-bold text-bone">{i.name}</h3>
            <div className="text-[12px] font-semibold uppercase tracking-wide text-bone/40">{i.cat}</div>
            <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-bone/60">{i.does}</p>
            <button onClick={() => toggle(i.name)} className={cn('mt-4 rounded-lg py-2 text-[13px] font-bold transition', i.connected ? 'border border-ink-line text-bone/70 hover:text-bone' : 'bg-amber text-ink')}>
              {i.connected ? 'Disconnect' : 'Connect'}
            </button>
          </Panel>
        ))}
      </div>

      <Panel className="mt-6 p-5">
        <h2 className="flex items-center gap-2 font-bold text-bone"><Plug size={18} className="text-amber" /> Built into Shield OS (not rented)</h2>
        <p className="mt-1 text-[13px] text-bone/50">The operational core is custom — it's the moat, and it's yours.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {BUILT_IN.map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5 rounded-full bg-guard/15 px-3 py-1.5 text-[13px] font-semibold text-guard"><Check size={14} /> {b}</span>
          ))}
        </div>
      </Panel>
    </>
  )
}
