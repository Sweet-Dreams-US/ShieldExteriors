import type { ReactNode } from 'react'
import { STAGES, type Stage, type Priority } from '../lib/store'
import { cn } from '../lib/utils'

export function PageTitle({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="h-display text-2xl text-bone sm:text-3xl">{title}</h1>
        {sub && <p className="mt-1 text-sm text-bone/55">{sub}</p>}
      </div>
      {action}
    </div>
  )
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('rounded-2xl border border-ink-line bg-ink-soft', className)}>{children}</div>
}

export function StatTile({ label, value, sub, Icon, tone = 'amber' }: { label: string; value: ReactNode; sub?: string; Icon: any; tone?: string }) {
  return (
    <Panel className="p-5">
      <div className="flex items-start justify-between">
        <span className="text-[12.5px] font-semibold uppercase tracking-wide text-bone/50">{label}</span>
        <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: `${tone}22`, color: tone }}><Icon size={18} /></span>
      </div>
      <div className="mt-3 h-display text-3xl text-bone tnum">{value}</div>
      {sub && <div className="mt-1 text-[13px] text-bone/45">{sub}</div>}
    </Panel>
  )
}

export function StageBadge({ stage }: { stage: Stage }) {
  const s = STAGES.find((x) => x.id === stage)!
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-bold" style={{ background: `${s.tone}22`, color: s.tone }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.tone }} /> {s.label}
    </span>
  )
}

const PRIO: Record<Priority, { c: string; l: string }> = {
  hot: { c: '#e0533d', l: 'Hot' },
  warm: { c: '#f5a623', l: 'Warm' },
  cold: { c: '#6b7785', l: 'Cold' },
}
export function PriorityDot({ p, label }: { p: Priority; label?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: PRIO[p].c }}>
      <span className="h-2 w-2 rounded-full" style={{ background: PRIO[p].c }} /> {label && PRIO[p].l}
    </span>
  )
}

export function Avatar({ name, tone = '#11486d', size = 36 }: { name: string; tone?: string; size?: number }) {
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  return (
    <span className="grid shrink-0 place-items-center rounded-full font-bold text-bone" style={{ width: size, height: size, background: tone, fontSize: size * 0.36 }}>
      {initials}
    </span>
  )
}

export function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} aria-pressed={on} className={cn('relative h-6 w-11 shrink-0 rounded-full transition-colors', on ? 'bg-guard' : 'bg-ink-line')}>
      <span className={cn('absolute top-0.5 h-5 w-5 rounded-full bg-bone shadow transition-transform', on ? 'translate-x-[22px]' : 'translate-x-0.5')} />
    </button>
  )
}

export function Tabs({ tabs, active, onChange }: { tabs: { id: string; label: string }[]; active: string; onChange: (id: string) => void }) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-xl border border-ink-line bg-ink p-1">
      {tabs.map((t) => (
        <button key={t.id} onClick={() => onChange(t.id)} className={cn('rounded-lg px-3.5 py-1.5 text-[13px] font-semibold transition', active === t.id ? 'bg-amber text-ink' : 'text-bone/60 hover:text-bone')}>
          {t.label}
        </button>
      ))}
    </div>
  )
}

export function Bar({ label, value, max, display, tone = '#f5a623' }: { label: string; value: number; max: number; display: string; tone?: string }) {
  return (
    <div>
      <div className="flex justify-between text-[13px]"><span className="text-bone/70">{label}</span><span className="font-bold text-bone">{display}</span></div>
      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-ink"><div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, (value / max) * 100)}%`, background: tone }} /></div>
    </div>
  )
}

export function Progress({ done, total, tone = '#1f9d6b' }: { done: number; total: number; tone?: string }) {
  const pct = total ? Math.round((done / total) * 100) : 0
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink"><div className="h-full rounded-full" style={{ width: `${pct}%`, background: tone }} /></div>
      <span className="tnum text-[11px] font-semibold text-bone/50">{done}/{total}</span>
    </div>
  )
}

export function SyncBadge({ connected }: { connected: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold', connected ? 'bg-guard/15 text-guard' : 'bg-ink text-bone/45')}>
      <span className={cn('h-1.5 w-1.5 rounded-full', connected ? 'bg-guard' : 'bg-bone/30')} /> {connected ? 'Connected' : 'Connect'}
    </span>
  )
}
