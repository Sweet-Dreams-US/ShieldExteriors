import { useState } from 'react'
import { Search, X, Phone, Mail, MapPin, Flame, ExternalLink } from 'lucide-react'
import { useDB, STAGES, moveLead, updateLead, type Stage, type Priority } from '../lib/store'
import { PageTitle, Panel, StageBadge, PriorityDot, Avatar } from './ui'
import { money, timeAgo, cn } from '../lib/utils'

export default function Leads() {
  const { leads, crews } = useDB()
  const [q, setQ] = useState('')
  const [stage, setStage] = useState<Stage | 'all'>('all')
  const [selId, setSelId] = useState<string | null>(null)

  const filtered = leads.filter((l) => {
    if (stage !== 'all' && l.stage !== stage) return false
    if (!q) return true
    const hay = `${l.name} ${l.city} ${l.service} ${l.source} ${l.phone}`.toLowerCase()
    return hay.includes(q.toLowerCase())
  })
  const sel = leads.find((l) => l.id === selId) || null

  return (
    <>
      <PageTitle title="Lead Inbox" sub={`${leads.length} job requests · website submissions land here instantly`} />

      <Panel className="mb-4 flex flex-wrap items-center gap-3 p-3">
        <div className="flex flex-1 items-center gap-2 rounded-xl bg-ink px-3">
          <Search size={16} className="text-bone/40" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, city, service…" className="w-full bg-transparent py-2.5 text-sm text-bone outline-none placeholder:text-bone/40" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <FilterBtn active={stage === 'all'} onClick={() => setStage('all')}>All</FilterBtn>
          {STAGES.map((s) => <FilterBtn key={s.id} active={stage === s.id} onClick={() => setStage(s.id)}>{s.label}</FilterBtn>)}
        </div>
      </Panel>

      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-line text-[12px] uppercase tracking-wide text-bone/45">
              <tr>
                <th className="p-4 font-semibold">Homeowner</th>
                <th className="p-4 font-semibold">Project</th>
                <th className="hidden p-4 font-semibold md:table-cell">Source</th>
                <th className="hidden p-4 font-semibold sm:table-cell">Value</th>
                <th className="p-4 font-semibold">Stage</th>
                <th className="hidden p-4 font-semibold lg:table-cell">Age</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-line">
              {filtered.map((l) => (
                <tr key={l.id} onClick={() => setSelId(l.id)} className="cursor-pointer transition-colors hover:bg-white/[0.03]">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={l.name} />
                      <div>
                        <div className="flex items-center gap-1.5 font-semibold text-bone">{l.name} {l.priority === 'hot' && <Flame size={13} className="text-[#e0533d]" />}</div>
                        <div className="text-[12px] text-bone/45">{l.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4"><div className="text-bone/85">{l.service}</div><div className="text-[12px] text-bone/45">{l.city}</div></td>
                  <td className="hidden p-4 text-bone/60 md:table-cell">{l.source}</td>
                  <td className="hidden p-4 font-semibold text-bone sm:table-cell">{l.value ? money(l.value) : '—'}</td>
                  <td className="p-4"><StageBadge stage={l.stage} /></td>
                  <td className="hidden p-4 text-bone/45 lg:table-cell">{timeAgo(l.createdAt)}</td>
                </tr>
              ))}
              {!filtered.length && <tr><td colSpan={6} className="p-10 text-center text-bone/40">No leads match.</td></tr>}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Detail drawer */}
      {sel && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelId(null)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-ink-line bg-ink-soft p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar name={sel.name} size={46} />
                <div>
                  <h2 className="h-display text-xl text-bone">{sel.name}</h2>
                  <div className="text-[13px] text-bone/50">{sel.source} · {timeAgo(sel.createdAt)}</div>
                </div>
              </div>
              <button onClick={() => setSelId(null)} className="grid h-9 w-9 place-items-center rounded-full bg-ink text-bone/60 hover:text-bone"><X size={18} /></button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <a href={`tel:${sel.phone}`} className="flex items-center justify-center gap-2 rounded-xl bg-amber py-2.5 text-sm font-bold text-ink"><Phone size={16} /> Call</a>
              <a href={`mailto:${sel.email}`} className="flex items-center justify-center gap-2 rounded-xl border border-ink-line py-2.5 text-sm font-bold text-bone"><Mail size={16} /> Email</a>
            </div>

            <div className="mt-5 space-y-1 rounded-xl bg-ink p-4 text-[14px]">
              <Row label="Phone" value={sel.phone} />
              <Row label="Email" value={sel.email} />
              <Row label="Location" value={`${sel.address ? sel.address + ', ' : ''}${sel.city}${sel.zip ? ' ' + sel.zip : ''}`} />
              <Row label="Service" value={sel.service} />
              {sel.message && <div className="pt-2 text-bone/70"><span className="text-bone/40">Message:</span> “{sel.message}”</div>}
            </div>

            <div className="mt-5 space-y-4">
              <Field label="Stage">
                <select value={sel.stage} onChange={(e) => moveLead(sel.id, e.target.value as Stage)} className="field bg-ink text-bone">
                  {STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </Field>
              <Field label="Priority">
                <select value={sel.priority} onChange={(e) => updateLead(sel.id, { priority: e.target.value as Priority })} className="field bg-ink text-bone">
                  {['hot', 'warm', 'cold'].map((p) => <option key={p} value={p}>{p[0].toUpperCase() + p.slice(1)}</option>)}
                </select>
              </Field>
              <Field label="Estimated value ($)">
                <input type="number" value={sel.value} onChange={(e) => updateLead(sel.id, { value: +e.target.value })} className="field bg-ink text-bone" />
              </Field>
              <Field label="Assign crew">
                <select value={sel.assignedCrewId || ''} onChange={(e) => updateLead(sel.id, { assignedCrewId: e.target.value || undefined })} className="field bg-ink text-bone">
                  <option value="">Unassigned</option>
                  {crews.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </Field>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function FilterBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button onClick={onClick} className={cn('rounded-lg px-3 py-1.5 text-[12.5px] font-semibold transition', active ? 'bg-amber text-ink' : 'bg-ink text-bone/60 hover:text-bone')}>{children}</button>
}
function Row({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-4"><span className="text-bone/40">{label}</span><span className="text-right font-medium text-bone/85">{value}</span></div>
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wide text-bone/45">{label}</span>{children}</label>
}
