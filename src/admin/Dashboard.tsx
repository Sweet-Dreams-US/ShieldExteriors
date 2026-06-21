import { Link } from 'react-router-dom'
import {
  Inbox, DollarSign, Trophy, Wallet, Flame, PhoneCall, HardHat, ShieldCheck, Star, UserPlus,
  Map, FileText, Workflow, CalendarDays, BarChart3, Megaphone, Zap, Plug, ArrowRight,
} from 'lucide-react'
import { useDB, STAGES } from '../lib/store'
import { PageTitle, Panel, StatTile, StageBadge, Avatar } from './ui'
import { money, timeAgo } from '../lib/utils'

const MODULES = [
  { to: '/admin/canvassing', label: 'Canvassing', Icon: Map },
  { to: '/admin/pipeline', label: 'Pipeline', Icon: Workflow },
  { to: '/admin/estimates', label: 'Estimates', Icon: FileText },
  { to: '/admin/production', label: 'Production', Icon: HardHat },
  { to: '/admin/schedule', label: 'Schedule', Icon: CalendarDays },
  { to: '/admin/invoicing', label: 'Money', Icon: DollarSign },
  { to: '/admin/warranty', label: 'Warranty', Icon: ShieldCheck },
  { to: '/admin/marketing', label: 'Marketing', Icon: Megaphone },
  { to: '/admin/recruiting', label: 'Recruiting', Icon: UserPlus },
  { to: '/admin/automations', label: 'Automations', Icon: Zap },
  { to: '/admin/operations', label: 'Reports', Icon: BarChart3 },
  { to: '/admin/integrations', label: 'Integrations', Icon: Plug },
]

export default function Dashboard() {
  const { leads, jobs, crews, invoices, warranties, applicants } = useDB()

  const open = leads.filter((l) => l.stage !== 'won' && l.stage !== 'lost')
  const newLeads = leads.filter((l) => l.stage === 'new')
  const pipelineValue = open.reduce((s, l) => s + l.value, 0)
  const wonValue = leads.filter((l) => l.stage === 'won').reduce((s, l) => s + l.value, 0)
  const outstanding = invoices.reduce((s, i) => s + (i.amount - i.paid), 0)
  const inProduction = jobs.filter((j) => j.type === 'install' && j.prodStage !== 'complete').length
  const activeWarranties = warranties.filter((w) => w.status === 'active').length
  const openApplicants = applicants.filter((a) => a.stage !== 'hired').length

  const recent = [...leads].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)).slice(0, 6)
  const todayJobs = jobs.filter((j) => j.status !== 'done').slice(0, 5)
  const counts = STAGES.map((s) => ({ ...s, n: leads.filter((l) => l.stage === s.id).length }))
  const maxCount = Math.max(1, ...counts.map((c) => c.n))

  return (
    <>
      <PageTitle title="Command Center" sub="Tuesday morning at Shield — the whole company, one screen." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="New leads" value={newLeads.length} sub={`${leads.length} in pipeline`} Icon={Inbox} tone="#1b6fa8" />
        <StatTile label="Pipeline value" value={money(pipelineValue)} sub={`${open.length} open`} Icon={DollarSign} tone="#f5a623" />
        <StatTile label="Won (MTD)" value={money(wonValue)} sub={`${leads.filter((l) => l.stage === 'won').length} jobs`} Icon={Trophy} tone="#1f9d6b" />
        <StatTile label="Outstanding AR" value={money(outstanding)} sub="to collect" Icon={Wallet} tone="#b5651d" />
      </div>

      {/* secondary strip */}
      <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Mini Icon={HardHat} tone="#c98a1b" label="In production" value={inProduction} to="/admin/production" />
        <Mini Icon={ShieldCheck} tone="#1f9d6b" label="Active warranties" value={activeWarranties} to="/admin/warranty" />
        <Mini Icon={Star} tone="#f5a623" label="Avg rating" value="4.9★" to="/admin/marketing" />
        <Mini Icon={UserPlus} tone="#6b54c6" label="Open applicants" value={openApplicants} to="/admin/recruiting" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel className="lg:col-span-2">
          <div className="flex items-center justify-between border-b border-ink-line p-5">
            <h2 className="font-bold text-bone">Incoming job requests</h2>
            <Link to="/admin/leads" className="text-sm font-semibold text-amber hover:underline">Open inbox →</Link>
          </div>
          <div className="divide-y divide-ink-line">
            {recent.map((l) => (
              <div key={l.id} className="flex items-center gap-3 p-4">
                <Avatar name={l.name} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2"><span className="truncate font-semibold text-bone">{l.name}</span>{l.priority === 'hot' && <Flame size={14} className="text-[#e0533d]" />}</div>
                  <div className="truncate text-[13px] text-bone/50">{l.service} · {l.city} · {l.source}</div>
                </div>
                <div className="hidden text-right text-[12px] text-bone/40 sm:block">{timeAgo(l.createdAt)}</div>
                <StageBadge stage={l.stage} />
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="font-bold text-bone">Pipeline by stage</h2>
            <div className="mt-4 space-y-3">
              {counts.map((c) => (
                <div key={c.id}>
                  <div className="flex justify-between text-[13px]"><span className="text-bone/70">{c.label}</span><span className="font-bold text-bone">{c.n}</span></div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-ink"><div className="h-full rounded-full" style={{ width: `${(c.n / maxCount) * 100}%`, background: c.tone }} /></div>
                </div>
              ))}
            </div>
          </Panel>
          <Panel className="p-5">
            <div className="flex items-center justify-between"><h2 className="font-bold text-bone">Up next</h2><Link to="/admin/schedule" className="text-sm font-semibold text-amber hover:underline">Schedule →</Link></div>
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

      {/* module launcher */}
      <Panel className="mt-6 p-5">
        <div className="flex items-center justify-between"><h2 className="font-bold text-bone">Run the company</h2><span className="text-[12px] text-bone/40">one login · every department</span></div>
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          {MODULES.map((m) => (
            <Link key={m.to} to={m.to} className="group flex flex-col items-center gap-2 rounded-xl border border-ink-line bg-ink p-4 text-center transition hover:border-amber hover:bg-amber/5">
              <m.Icon size={22} className="text-amber" />
              <span className="text-[12.5px] font-semibold text-bone/80 group-hover:text-bone">{m.label}</span>
            </Link>
          ))}
        </div>
      </Panel>

      <Panel className="mt-6 flex flex-col items-center justify-between gap-3 p-5 sm:flex-row">
        <div className="flex items-center gap-3 text-sm text-bone/70"><PhoneCall size={18} className="text-guard" /> Speed-to-lead: website requests trigger an instant alert to the on-call rep.</div>
        <div className="flex gap-2">
          <Link to="/portal" className="rounded-lg border border-ink-line px-4 py-2.5 text-sm font-semibold text-bone hover:border-amber">Customer portal</Link>
          <Link to="/field" className="rounded-lg border border-ink-line px-4 py-2.5 text-sm font-semibold text-bone hover:border-amber">Field app</Link>
          <Link to="/admin/leads" className="btn-amber px-5 py-2.5 text-sm">Work new leads</Link>
        </div>
      </Panel>
    </>
  )
}

function Mini({ Icon, tone, label, value, to }: { Icon: any; tone: string; label: string; value: React.ReactNode; to: string }) {
  return (
    <Link to={to} className="group flex items-center gap-3 rounded-2xl border border-ink-line bg-ink-soft p-4 transition hover:border-amber/50">
      <span className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: `${tone}22`, color: tone }}><Icon size={20} /></span>
      <div><div className="h-display text-xl text-bone tnum">{value}</div><div className="text-[12px] text-bone/45">{label}</div></div>
      <ArrowRight size={15} className="ml-auto text-bone/20 transition group-hover:text-amber" />
    </Link>
  )
}
