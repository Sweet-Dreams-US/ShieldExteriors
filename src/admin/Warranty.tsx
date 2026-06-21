import { ShieldCheck, ArrowLeftRight, Wrench, BadgeCheck, Repeat, Camera } from 'lucide-react'
import { useDB, transferWarranty, updateTicket, type ServiceTicket } from '../lib/store'
import { PageTitle, Panel, StatTile, Avatar } from './ui'
import { ShieldMark } from '../components/ui'
import { cn, timeAgo } from '../lib/utils'

const TKT_TONE: Record<ServiceTicket['status'], string> = { new: '#1b6fa8', scheduled: '#c98a1b', in_progress: '#b5651d', resolved: '#1f9d6b' }
const NEXT: Record<ServiceTicket['status'], ServiceTicket['status'] | null> = { new: 'scheduled', scheduled: 'in_progress', in_progress: 'resolved', resolved: null }

export default function Warranty() {
  const { warranties, tickets } = useDB()
  const active = warranties.filter((w) => w.status === 'active').length
  const transferred = warranties.filter((w) => w.status === 'transferred').length
  const openTickets = tickets.filter((t) => t.status !== 'resolved').length
  const featured = warranties[0]

  return (
    <>
      <PageTitle title="Warranty Registry" sub="The crown jewel — every roof's Free-Repairs-for-Life coverage, tracked and transferable. No off-the-shelf tool does this." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Active warranties" value={active} sub="roofs protected" Icon={ShieldCheck} tone="#1f9d6b" />
        <StatTile label="Transferred" value={transferred} sub="survived a home sale" Icon={Repeat} tone="#1b6fa8" />
        <StatTile label="Open service" value={openTickets} sub="claims in queue" Icon={Wrench} tone="#c98a1b" />
        <StatTile label="Coverage" value="Lifetime" sub="accident-free, transferable" Icon={BadgeCheck} tone="#f5a623" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* Featured digital warranty card */}
        <div>
          <h2 className="mb-3 font-bold text-bone">Digital warranty card</h2>
          <div className="relative overflow-hidden rounded-3xl border-2 border-amber/40 p-6 text-bone shadow-2xl metal grain">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber/20 blur-2xl" />
            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-2"><ShieldMark size={34} /><span className="leading-none"><span className="block h-display text-lg">SHIELD</span><span className="text-[9px] font-bold uppercase tracking-[0.3em] text-amber">Exteriors</span></span></div>
              <span className="rounded-full border border-amber/50 bg-amber/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber">Transferable</span>
            </div>
            <div className="relative mt-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-amber">Free Repairs for Life</div>
              <div className="mt-1 h-display text-2xl">{featured.coverage}</div>
            </div>
            <div className="relative mt-6 grid grid-cols-2 gap-y-3 text-sm">
              <div><div className="text-[11px] uppercase tracking-wide text-bone/45">Homeowner</div><div className="font-semibold">{featured.homeowner}</div></div>
              <div><div className="text-[11px] uppercase tracking-wide text-bone/45">Installed</div><div className="font-semibold">{featured.installDate}</div></div>
              <div className="col-span-2"><div className="text-[11px] uppercase tracking-wide text-bone/45">Address</div><div className="font-semibold">{featured.address}, {featured.city}</div></div>
              <div className="col-span-2"><div className="text-[11px] uppercase tracking-wide text-bone/45">Products</div><div className="font-semibold">{featured.products}</div></div>
            </div>
            <div className="relative mt-6 flex items-center justify-between border-t border-white/15 pt-4">
              <span className="font-mono text-sm tracking-widest text-amber">{featured.cardNo}</span>
              <span className="flex items-center gap-1 text-[12px] text-bone/55"><Camera size={13} /> {featured.photos} install photos</span>
            </div>
          </div>
          <p className="mt-3 text-[12.5px] text-bone/45">Auto-generated the moment a job is marked Complete. Emailed to the homeowner and visible in their portal.</p>
        </div>

        {/* Registry */}
        <Panel>
          <div className="border-b border-ink-line p-5"><h2 className="font-bold text-bone">Registry — {warranties.length} roofs</h2></div>
          <div className="divide-y divide-ink-line">
            {warranties.map((w) => (
              <div key={w.id} className="flex items-center gap-3 p-4">
                <Avatar name={w.homeowner} size={38} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2"><span className="truncate font-semibold text-bone">{w.homeowner}</span><span className="font-mono text-[11px] text-amber">{w.cardNo}</span></div>
                  <div className="truncate text-[12.5px] text-bone/50">{w.products} · {w.city}</div>
                </div>
                {w.status === 'transferred'
                  ? <span className="rounded-full bg-steel/20 px-2.5 py-1 text-[11px] font-bold text-steel-bright">Transferred</span>
                  : <button onClick={() => transferWarranty(w.id)} className="inline-flex items-center gap-1 rounded-lg border border-ink-line px-2.5 py-1.5 text-[12px] font-bold text-bone hover:border-amber"><ArrowLeftRight size={13} /> Transfer</button>}
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Service queue */}
      <Panel className="mt-6">
        <div className="flex items-center justify-between border-b border-ink-line p-5"><h2 className="font-bold text-bone">Service & claims queue</h2><span className="text-[12px] text-bone/45">filed from the customer portal</span></div>
        <div className="divide-y divide-ink-line">
          {tickets.map((t) => (
            <div key={t.id} className="flex flex-wrap items-center gap-3 p-4">
              <Wrench size={16} className="text-amber" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2"><span className="font-semibold text-bone">{t.homeowner}</span><span className="font-mono text-[11px] text-bone/40">{t.warrantyCardNo}</span></div>
                <div className="text-[13px] text-bone/60">{t.issue}</div>
              </div>
              <span className="text-[12px] text-bone/35">{timeAgo(t.createdAt)}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-bold capitalize" style={{ background: `${TKT_TONE[t.status]}22`, color: TKT_TONE[t.status] }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: TKT_TONE[t.status] }} />{t.status.replace('_', ' ')}</span>
              {NEXT[t.status] && <button onClick={() => updateTicket(t.id, NEXT[t.status]!)} className="rounded-lg bg-amber px-3 py-1.5 text-[12px] font-bold text-ink">→ {NEXT[t.status]!.replace('_', ' ')}</button>}
            </div>
          ))}
        </div>
      </Panel>
    </>
  )
}
