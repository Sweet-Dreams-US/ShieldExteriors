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
