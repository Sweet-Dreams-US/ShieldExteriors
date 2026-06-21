import { DollarSign, TriangleAlert, Percent, Wallet, CreditCard } from 'lucide-react'
import { useDB, payInvoice, type Invoice } from '../lib/store'
import { PageTitle, Panel, StatTile, Bar, SyncBadge } from './ui'
import { money, cn } from '../lib/utils'

const STATUS_TONE: Record<Invoice['status'], string> = { draft: '#6b7785', sent: '#1b6fa8', partial: '#c98a1b', paid: '#1f9d6b', overdue: '#e0533d' }

export default function Invoicing() {
  const { invoices } = useDB()
  const collected = invoices.reduce((s, i) => s + i.paid, 0)
  const outstanding = invoices.reduce((s, i) => s + (i.amount - i.paid), 0)
  const overdue = invoices.filter((i) => i.status === 'overdue').reduce((s, i) => s + (i.amount - i.paid), 0)
  const withCost = invoices.filter((i) => i.cost > 0)
  const margin = withCost.length ? Math.round((withCost.reduce((s, i) => s + (i.amount - i.cost) / i.amount, 0) / withCost.length) * 100) : 0

  const aging = [
    { label: 'Current', tone: '#1f9d6b', v: invoices.filter((i) => i.status !== 'overdue').reduce((s, i) => s + (i.amount - i.paid), 0) },
    { label: 'Overdue', tone: '#e0533d', v: overdue },
  ]
  const maxAge = Math.max(1, ...aging.map((a) => a.v))

  return (
    <>
      <PageTitle title="Invoicing & Payments" sub="Invoices auto-generate from won jobs. Take card/ACH via Stripe, sync the books to QuickBooks." action={
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-[12px] text-bone/55"><CreditCard size={14} /> Stripe</span><SyncBadge connected />
          <span className="ml-2 flex items-center gap-1.5 text-[12px] text-bone/55">QuickBooks</span><SyncBadge connected />
        </div>
      } />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Collected" value={money(collected)} sub="paid to date" Icon={Wallet} tone="#1f9d6b" />
        <StatTile label="Outstanding AR" value={money(outstanding)} sub="awaiting payment" Icon={DollarSign} tone="#c98a1b" />
        <StatTile label="Overdue" value={money(overdue)} sub="needs a nudge" Icon={TriangleAlert} tone="#e0533d" />
        <StatTile label="Avg margin" value={`${margin}%`} sub="job costing" Icon={Percent} tone="#6b54c6" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Panel>
          <div className="border-b border-ink-line p-5"><h2 className="font-bold text-bone">Invoices</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink-line text-[12px] uppercase tracking-wide text-bone/45">
                <tr><th className="p-4 font-semibold">#</th><th className="p-4 font-semibold">Customer</th><th className="hidden p-4 font-semibold md:table-cell">Type</th><th className="p-4 font-semibold">Amount</th><th className="hidden p-4 font-semibold sm:table-cell">Balance</th><th className="p-4 font-semibold">Status</th><th className="p-4"></th></tr>
              </thead>
              <tbody className="divide-y divide-ink-line">
                {invoices.map((i) => (
                  <tr key={i.id} className="hover:bg-white/[0.02]">
                    <td className="p-4 font-mono text-[12.5px] text-bone/55">{i.number}</td>
                    <td className="p-4"><div className="font-semibold text-bone">{i.customer}</div><div className="text-[12px] text-bone/45">{i.jobTitle}</div></td>
                    <td className="hidden p-4 capitalize text-bone/70 md:table-cell">{i.type}</td>
                    <td className="p-4 font-semibold text-bone">{money(i.amount)}</td>
                    <td className="hidden p-4 sm:table-cell"><span className={cn('font-semibold', i.amount - i.paid > 0 ? 'text-bone' : 'text-bone/35')}>{money(i.amount - i.paid)}</span></td>
                    <td className="p-4"><span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-bold capitalize" style={{ background: `${STATUS_TONE[i.status]}22`, color: STATUS_TONE[i.status] }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS_TONE[i.status] }} />{i.status}</span></td>
                    <td className="p-4 text-right">{i.status !== 'paid' && <button onClick={() => payInvoice(i.id)} className="rounded-lg bg-amber px-3 py-1.5 text-[12px] font-bold text-ink">Record payment</button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="font-bold text-bone">AR aging</h2>
            <div className="mt-4 space-y-3.5">{aging.map((a) => <Bar key={a.label} label={a.label} value={a.v} max={maxAge} display={money(a.v)} tone={a.tone} />)}</div>
          </Panel>
          <Panel className="p-5">
            <h2 className="font-bold text-bone">Job costing (margin per roof)</h2>
            <div className="mt-4 space-y-3">
              {withCost.map((i) => (
                <div key={i.id} className="flex items-center justify-between text-[13.5px]">
                  <span className="text-bone/70">{i.customer}</span>
                  <span className="font-bold text-guard">{Math.round(((i.amount - i.cost) / i.amount) * 100)}% · {money(i.amount - i.cost)}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11.5px] text-bone/40">QuickBooks stays the system of record; we sync — we don't replace your CPA.</p>
          </Panel>
        </div>
      </div>
    </>
  )
}
