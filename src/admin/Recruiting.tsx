import { useState } from 'react'
import { UserPlus, DollarSign, FileCheck2, GraduationCap } from 'lucide-react'
import { useDB, APP_STAGES, moveApplicant, type AppStage } from '../lib/store'
import { PageTitle, Panel, Avatar } from './ui'
import { money, cn, timeAgo } from '../lib/utils'

const ONBOARDING = ['W-4 & I-9', 'Direct deposit', 'Safety / OSHA training', 'Brand & warranty 101', 'CRM + field app login', 'Ride-along checklist']

export default function Recruiting() {
  const { applicants, staff } = useDB()
  const [drag, setDrag] = useState<string | null>(null)
  const [over, setOver] = useState<AppStage | null>(null)
  const drop = (s: AppStage) => { if (drag) moveApplicant(drag, s); setDrag(null); setOver(null) }

  const reps = staff.filter((s) => (s.commissionMtd || 0) > 0).sort((a, b) => (b.commissionMtd || 0) - (a.commissionMtd || 0))
  const totalComm = reps.reduce((s, r) => s + (r.commissionMtd || 0), 0)

  return (
    <>
      <PageTitle title="Recruiting & HR" sub="Applicants flow in from the careers page. Track hiring, commissions, and onboarding in one place." />

      {/* ATS pipeline */}
      <div className="mb-2 flex items-center gap-2 text-bone"><UserPlus size={18} className="text-amber" /><h2 className="font-bold">Hiring pipeline</h2><span className="text-[12px] text-bone/45">— canvasser · event coordinator · sales rep</span></div>
      <div className="flex gap-3 overflow-x-auto pb-4">
        {APP_STAGES.map((s) => {
          const items = applicants.filter((a) => a.stage === s.id)
          return (
            <div key={s.id}
              onDragOver={(e) => { e.preventDefault(); setOver(s.id) }}
              onDragLeave={() => setOver((o) => (o === s.id ? null : o))}
              onDrop={() => drop(s.id)}
              className={cn('flex w-[230px] shrink-0 flex-col rounded-2xl border bg-ink-soft transition-colors', over === s.id ? 'border-amber bg-amber/5' : 'border-ink-line')}>
              <div className="flex items-center justify-between border-b border-ink-line p-3.5">
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: s.tone }} /><span className="text-[13.5px] font-bold text-bone">{s.label}</span></div>
                <span className="rounded-full bg-ink px-2 py-0.5 text-[11px] font-bold text-bone/50">{items.length}</span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-2.5">
                {items.map((a) => (
                  <div key={a.id} draggable onDragStart={() => setDrag(a.id)} onDragEnd={() => setDrag(null)}
                    className={cn('cursor-grab rounded-xl border border-ink-line bg-ink p-3 active:cursor-grabbing', drag === a.id && 'opacity-40')}>
                    <div className="flex items-center gap-2"><Avatar name={a.name} size={28} /><span className="text-[13.5px] font-semibold text-bone">{a.name}</span></div>
                    <div className="mt-1.5 text-[12px] text-bone/55">{a.role}</div>
                    <div className="mt-1 text-[11px] text-bone/35">{a.source} · {timeAgo(a.createdAt)}</div>
                  </div>
                ))}
                {!items.length && <div className="rounded-xl border border-dashed border-ink-line py-6 text-center text-[11px] text-bone/30">—</div>}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Commissions */}
        <Panel className="p-5">
          <div className="flex items-center justify-between"><h2 className="flex items-center gap-2 font-bold text-bone"><DollarSign size={18} className="text-amber" /> Commissions (MTD)</h2><span className="text-sm font-bold text-guard">{money(totalComm)}</span></div>
          <div className="mt-4 space-y-3">
            {reps.map((r) => (
              <div key={r.id} className="flex items-center gap-3">
                <Avatar name={r.name} tone={r.avatarTone} size={34} />
                <div className="min-w-0 flex-1"><div className="truncate text-[14px] font-semibold text-bone">{r.name}</div><div className="text-[12px] text-bone/45">{r.role} · {r.dealsMtd} deals</div></div>
                <span className="font-bold text-bone">{money(r.commissionMtd || 0)}</span>
              </div>
            ))}
          </div>
        </Panel>

        {/* Onboarding */}
        <Panel className="p-5">
          <h2 className="flex items-center gap-2 font-bold text-bone"><GraduationCap size={18} className="text-amber" /> New-hire onboarding</h2>
          <p className="mt-1 text-[13px] text-bone/50">Renee Park — Event Coordinator · Day 2 of 5</p>
          <div className="mt-4 space-y-2">
            {ONBOARDING.map((o, i) => (
              <div key={o} className={cn('flex items-center gap-2.5 rounded-lg border border-ink-line p-2.5 text-[13.5px]', i < 3 ? 'text-bone/50' : 'text-bone')}>
                <FileCheck2 size={16} className={i < 3 ? 'text-guard' : 'text-bone/30'} /> {o}
                {i < 3 && <span className="ml-auto text-[11px] font-bold text-guard">Done</span>}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  )
}
