import { Link } from 'react-router-dom'
import { Inbox, DollarSign, Trophy, CalendarDays, ArrowUpRight, Flame, PhoneCall } from 'lucide-react'
import { useDB, STAGES } from '../lib/store'
import { PageTitle, Panel, StatTile, StageBadge, PriorityDot, Avatar } from './ui'
import { money, timeAgo } from '../lib/utils'

export default function Dashboard() {
  const { leads, jobs, crews } = useDB()

  const open = leads.filter((l) => l.stage !== 'won' && l.stage !== 'lost')
  const newLeads = leads.filter((l) => l.stage === 'new')
  const pipelineValue = open.reduce((s, l) => s + l.value, 0)
  const wonValue = leads.filter((l) => l.stage === 'won').reduce((s, l) => s + l.value, 0)
  const closeable = leads.filter((l) => l.stage === 'won' || l.stage === 'lost')
  const winRate = closeable.length ? Math.round((leads.filter((l) => l.stage === 'won').length / closeable.length) * 100) : 0

  const recent = [...leads].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 6)
  const todayJobs = jobs.filter((j) => j.status !== 'done').slice(0, 5)

  const counts = STAGES.map((s) => ({ ...s, n: leads.filter((l) => l.stage === s.id).length }))
  const maxCount = Math.max(1, ...counts.map((c) => c.n))

  return (
    <>
      <PageTitle title="Dashboard" sub="Tuesday morning at Shield — here’s where the business stands." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="New leads" value={newLeads.length} sub={`${leads.length} total in pipeline`} Icon={Inbox} tone="#1b6fa8" />
        <StatTile label="Pipeline value" value={money(pipelineValue)} sub={`${open.length} open opportunities`} Icon={DollarSign} tone="#f5a623" />
        <StatTile label="Won (MTD)" value={money(wonValue)} sub={`${leads.filter((l) => l.stage === 'won').length} jobs closed`} Icon={Trophy} tone="#1f9d6b" />
        <StatTile label="Win rate" value={`${winRate}%`} sub="closed-won vs. lost" Icon={ArrowUpRight} tone="#6b54c6" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Recent leads */}
        <Panel className="lg:col-span-2">
          <div className="flex items-center justify-between border-b border-ink-line p-5">
            <h2 className="font-bold text-bone">Incoming job requests</h2>
            <Link to="/admin/leads" className="text-sm font-semibold text-amber hover:underline">Open inbox →</Link>
          </div>
          <div className="divide-y divide-ink-line">
            {recent.map((l) => (
              <div key={l.id} className="flex items-center gap-3 p-4">
                <Avatar name={l.name} tone="#11486d" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-semibold text-bone">{l.name}</span>
                    {l.priority === 'hot' && <Flame size={14} className="text-[#e0533d]" />}
                  </div>
                  <div className="truncate text-[13px] text-bone/50">{l.service} · {l.city} · {l.source}</div>
                </div>
                <div className="hidden text-right text-[12px] text-bone/40 sm:block">{timeAgo(l.createdAt)}</div>
                <StageBadge stage={l.stage} />
              </div>
            ))}
          </div>
        </Panel>

        {/* Pipeline snapshot + schedule */}
        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="font-bold text-bone">Pipeline by stage</h2>
            <div className="mt-4 space-y-3">
              {counts.map((c) => (
                <div key={c.id}>
                  <div className="flex justify-between text-[13px]"><span className="text-bone/70">{c.label}</span><span className="font-bold text-bone">{c.n}</span></div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-ink">
                    <div className="h-full rounded-full" style={{ width: `${(c.n / maxCount) * 100}%`, background: c.tone }} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-bone">Up next</h2>
              <Link to="/admin/schedule" className="text-sm font-semibold text-amber hover:underline">Schedule →</Link>
            </div>
            <div className="mt-3 space-y-2.5">
              {todayJobs.map((j) => {
                const crew = crews.find((c) => c.id === j.crewId)
                return (
                  <div key={j.id} className="flex items-center gap-3 rounded-xl bg-ink p-3">
                    <CalendarDays size={16} className="text-amber" />
                    <div className="min-w-0 flex-1"><div className="truncate text-[13.5px] font-semibold text-bone">{j.title}</div><div className="text-[12px] text-bone/45">{j.date} · {j.start} · {crew?.name}</div></div>
                  </div>
                )
              })}
            </div>
          </Panel>
        </div>
      </div>

      <Panel className="mt-6 flex flex-col items-center justify-between gap-3 p-5 sm:flex-row">
        <div className="flex items-center gap-3 text-sm text-bone/70"><PhoneCall size={18} className="text-guard" /> Speed-to-lead: new website requests trigger an instant alert to the on-call rep.</div>
        <Link to="/admin/leads" className="btn-amber px-5 py-2.5 text-sm">Work the new leads</Link>
      </Panel>
    </>
  )
}
