import { DollarSign, TrendingUp, Target, Layers } from 'lucide-react'
import { useDB, STAGES } from '../lib/store'
import { PageTitle, Panel, StatTile } from './ui'
import { money } from '../lib/utils'

function BarRow({ label, value, max, display, tone = '#f5a623' }: { label: string; value: number; max: number; display: string; tone?: string }) {
  return (
    <div>
      <div className="flex justify-between text-[13px]"><span className="text-bone/70">{label}</span><span className="font-bold text-bone">{display}</span></div>
      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-ink">
        <div className="h-full rounded-full transition-all" style={{ width: `${(value / max) * 100}%`, background: tone }} />
      </div>
    </div>
  )
}

export default function Operations() {
  const { leads, jobs, crews } = useDB()

  const won = leads.filter((l) => l.stage === 'won')
  const lost = leads.filter((l) => l.stage === 'lost')
  const open = leads.filter((l) => l.stage !== 'won' && l.stage !== 'lost')
  const wonValue = won.reduce((a, l) => a + l.value, 0)
  const pipelineValue = open.reduce((a, l) => a + l.value, 0)
  const avgDeal = won.length ? Math.round(wonValue / won.length) : 0
  const winRate = won.length + lost.length ? Math.round((won.length / (won.length + lost.length)) * 100) : 0

  // pipeline value by stage
  const byStage = STAGES.map((s) => ({ label: s.label, tone: s.tone, value: leads.filter((l) => l.stage === s.id).reduce((a, l) => a + l.value, 0) }))
  const maxStage = Math.max(1, ...byStage.map((s) => s.value))

  // lead sources
  const sources = Object.entries(
    leads.reduce<Record<string, number>>((acc, l) => { acc[l.source] = (acc[l.source] || 0) + 1; return acc }, {}),
  ).sort((a, b) => b[1] - a[1])
  const maxSrc = Math.max(1, ...sources.map(([, n]) => n))

  // crew workload (booked value)
  const crewLoad = crews.map((c) => ({ label: c.name, tone: c.color, value: jobs.filter((j) => j.crewId === c.id).reduce((a, j) => a + j.value, 0) }))
  const maxCrew = Math.max(1, ...crewLoad.map((c) => c.value))

  return (
    <>
      <PageTitle title="Business Operations" sub="Revenue, conversion, and where the work is coming from." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Revenue won" value={money(wonValue)} sub={`${won.length} jobs`} Icon={DollarSign} tone="#1f9d6b" />
        <StatTile label="Pipeline value" value={money(pipelineValue)} sub={`${open.length} open`} Icon={Layers} tone="#f5a623" />
        <StatTile label="Avg deal size" value={money(avgDeal)} sub="closed-won average" Icon={TrendingUp} tone="#1b6fa8" />
        <StatTile label="Win rate" value={`${winRate}%`} sub={`${won.length}W · ${lost.length}L`} Icon={Target} tone="#6b54c6" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel className="p-5">
          <h2 className="font-bold text-bone">Pipeline value by stage</h2>
          <div className="mt-4 space-y-3.5">
            {byStage.map((s) => <BarRow key={s.label} label={s.label} value={s.value} max={maxStage} display={money(s.value)} tone={s.tone} />)}
          </div>
        </Panel>

        <Panel className="p-5">
          <h2 className="font-bold text-bone">Lead sources</h2>
          <div className="mt-4 space-y-3.5">
            {sources.map(([src, n]) => <BarRow key={src} label={src} value={n} max={maxSrc} display={`${n} lead${n > 1 ? 's' : ''}`} tone="#1b6fa8" />)}
          </div>
        </Panel>

        <Panel className="p-5 lg:col-span-2">
          <h2 className="font-bold text-bone">Crew workload (booked value)</h2>
          <div className="mt-4 space-y-3.5">
            {crewLoad.map((c) => <BarRow key={c.label} label={c.label} value={c.value} max={maxCrew} display={money(c.value)} tone={c.tone} />)}
          </div>
        </Panel>
      </div>

      <Panel className="mt-6 p-5">
        <h2 className="font-bold text-bone">Why this matters</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-bone/60">
          Every website visitor who books a free inspection flows straight into this system — captured, prioritized,
          routed to a crew, and tracked from “New Lead” to “Won.” That’s the point of the rebuild: content gets attention,
          the funnel captures intent, and operations turns it into booked, profitable jobs.
        </p>
      </Panel>
    </>
  )
}
