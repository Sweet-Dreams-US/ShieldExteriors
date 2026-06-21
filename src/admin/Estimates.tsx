import { useState } from 'react'
import { FileText, Plus, Check, Send, Ruler, Calculator } from 'lucide-react'
import { useDB, addEstimate, updateEstimate, type Estimate } from '../lib/store'
import { PageTitle, Panel, Avatar } from './ui'
import { money, cn } from '../lib/utils'

const PRICE_BOOK = [
  { id: 'standing-seam', name: 'Standing Seam Metal', perSq: 950 },
  { id: 'metal-shingle', name: 'Metal Shingle', perSq: 850 },
  { id: 'ribbed', name: 'Ribbed (Imperial) Metal', perSq: 720 },
  { id: 'asphalt', name: 'Asphalt (Class-4)', perSq: 525 },
]
const APR = 0.0499
const monthlyFor = (p: number) => Math.round((p * (APR / 12)) / (1 - Math.pow(1 + APR / 12, -180)))

const STATUS_TONE: Record<Estimate['status'], string> = { draft: '#6b7785', sent: '#1b6fa8', accepted: '#1f9d6b', declined: '#b5651d' }

export default function Estimates() {
  const { estimates } = useDB()
  const [product, setProduct] = useState(PRICE_BOOK[0].id)
  const [squares, setSquares] = useState(28)
  const [tearoff, setTearoff] = useState(true)
  const [gutters, setGutters] = useState(false)
  const [customer, setCustomer] = useState('')
  const [city, setCity] = useState('')

  const pb = PRICE_BOOK.find((p) => p.id === product)!
  const lines = [
    { item: pb.name + ' system', qty: squares, unit: 'sq', price: pb.perSq },
    ...(tearoff ? [{ item: 'Tear-off & disposal', qty: squares, unit: 'sq', price: 95 }] : []),
    { item: 'Synthetic underlayment', qty: squares, unit: 'sq', price: 45 },
    ...(gutters ? [{ item: 'Seamless gutters + guards', qty: 1, unit: 'home', price: 4200 }] : []),
  ]
  const total = lines.reduce((s, l) => s + l.qty * l.price, 0)
  const monthly = monthlyFor(total)

  const create = () => {
    addEstimate({ customer: customer || 'New Customer', city: city || '—', product: pb.name, lines, total, monthly })
    setCustomer(''); setCity('')
  }

  return (
    <>
      <PageTitle title="Estimates & Proposals" sub="Shield's price book + live financing math — build a kitchen-table proposal in seconds." />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* Builder */}
        <Panel className="p-5">
          <div className="flex items-center gap-2 text-amber"><Calculator size={18} /><h2 className="font-bold text-bone">Build an estimate</h2></div>

          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <input className="field bg-ink text-bone" placeholder="Customer name" value={customer} onChange={(e) => setCustomer(e.target.value)} />
              <input className="field bg-ink text-bone" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>

            <div>
              <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wide text-bone/45">Product</label>
              <select className="field bg-ink text-bone" value={product} onChange={(e) => setProduct(e.target.value)}>
                {PRICE_BOOK.map((p) => <option key={p.id} value={p.id}>{p.name} — {money(p.perSq)}/sq</option>)}
              </select>
            </div>

            <div>
              <div className="flex justify-between text-[13px] font-semibold text-bone/70"><span className="flex items-center gap-1.5"><Ruler size={14} /> Roof size</span><span className="text-bone">{squares} squares</span></div>
              <input type="range" min={10} max={60} value={squares} onChange={(e) => setSquares(+e.target.value)} className="mt-2 w-full accent-amber" />
              <p className="mt-1 text-[11px] text-bone/40">Tip: pull exact measurements via the EagleView / Hover integration.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Chip on={tearoff} onClick={() => setTearoff((v) => !v)}>Tear-off & disposal</Chip>
              <Chip on={gutters} onClick={() => setGutters((v) => !v)}>+ Gutters & guards</Chip>
            </div>
          </div>
        </Panel>

        {/* Live proposal */}
        <Panel className="p-5">
          <div className="flex items-center justify-between"><h2 className="font-bold text-bone">Proposal preview</h2><span className="rounded-full bg-amber/15 px-2.5 py-1 text-[11px] font-bold text-amber">Branded PDF</span></div>
          <div className="mt-4 space-y-2">
            {lines.map((l, i) => (
              <div key={i} className="flex justify-between text-[14px]">
                <span className="text-bone/75">{l.item} <span className="text-bone/40">· {l.qty} {l.unit}</span></span>
                <span className="font-semibold text-bone">{money(l.qty * l.price)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-end justify-between border-t border-ink-line pt-4">
            <div><div className="text-[12px] uppercase tracking-wide text-bone/45">Total</div><div className="h-display text-3xl text-bone">{money(total)}</div></div>
            <div className="text-right"><div className="text-[12px] uppercase tracking-wide text-bone/45">Financed</div><div className="h-display text-3xl text-amber">{money(monthly)}<span className="text-base text-bone/50">/mo</span></div></div>
          </div>
          <p className="mt-2 text-center text-[11px] text-bone/40">$0 down · {(APR * 100).toFixed(2)}% APR (OAC) · 180 mo · one-click lender application</p>
          <button onClick={create} className="btn-amber mt-4 w-full justify-center"><Plus size={16} /> Create estimate</button>
        </Panel>
      </div>

      {/* Estimate list */}
      <Panel className="mt-6">
        <div className="border-b border-ink-line p-5"><h2 className="font-bold text-bone">All estimates</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-line text-[12px] uppercase tracking-wide text-bone/45">
              <tr><th className="p-4 font-semibold">#</th><th className="p-4 font-semibold">Customer</th><th className="hidden p-4 font-semibold sm:table-cell">Product</th><th className="p-4 font-semibold">Total</th><th className="hidden p-4 font-semibold md:table-cell">/mo</th><th className="p-4 font-semibold">Status</th><th className="p-4"></th></tr>
            </thead>
            <tbody className="divide-y divide-ink-line">
              {estimates.map((e) => (
                <tr key={e.id} className="hover:bg-white/[0.02]">
                  <td className="p-4 font-mono text-[12.5px] text-bone/55">{e.number}</td>
                  <td className="p-4"><div className="flex items-center gap-2.5"><Avatar name={e.customer} size={30} /><div><div className="font-semibold text-bone">{e.customer}</div><div className="text-[12px] text-bone/45">{e.city}</div></div></div></td>
                  <td className="hidden p-4 text-bone/70 sm:table-cell">{e.product}</td>
                  <td className="p-4 font-semibold text-bone">{money(e.total)}</td>
                  <td className="hidden p-4 text-amber md:table-cell">{money(e.monthly)}</td>
                  <td className="p-4"><span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-bold" style={{ background: `${STATUS_TONE[e.status]}22`, color: STATUS_TONE[e.status] }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_TONE[e.status] }} />{e.status}</span></td>
                  <td className="p-4 text-right">
                    {e.status === 'draft' && <button onClick={() => updateEstimate(e.id, 'sent')} className="inline-flex items-center gap-1 rounded-lg bg-amber px-3 py-1.5 text-[12px] font-bold text-ink"><Send size={13} /> Send</button>}
                    {e.status === 'sent' && <button onClick={() => updateEstimate(e.id, 'accepted')} className="inline-flex items-center gap-1 rounded-lg border border-ink-line px-3 py-1.5 text-[12px] font-bold text-bone"><Check size={13} /> Mark won</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={cn('inline-flex items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 text-[13px] font-semibold transition', on ? 'border-amber bg-amber/10 text-bone' : 'border-ink-line text-bone/55 hover:text-bone')}>
      {on && <Check size={14} className="text-amber" />} {children}
    </button>
  )
}
