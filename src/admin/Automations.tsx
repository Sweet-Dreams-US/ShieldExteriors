import { Zap, ArrowRight, Activity } from 'lucide-react'
import { useDB, toggleAutomation } from '../lib/store'
import { PageTitle, Panel, Toggle } from './ui'

const FEED = [
  { t: 'Speed-to-lead alert', d: 'Megan Albright (Fort Wayne) → texted Jordan Pruitt', ago: '18m ago', tone: '#1b6fa8' },
  { t: 'Estimate follow-up', d: 'Touch 2 of 3 sent to Marcus Webb', ago: '1h ago', tone: '#b5651d' },
  { t: 'Review request', d: 'Job complete → SMS to Ada Okafor', ago: '3h ago', tone: '#1f9d6b' },
  { t: 'Warranty registered', d: 'Card SHD-04412 created for Helen Cho', ago: '3h ago', tone: '#f5a623' },
  { t: 'Maintenance reminder', d: '1-yr check-in emailed to 12 warranty holders', ago: 'yesterday', tone: '#6b54c6' },
]

export default function Automations() {
  const { automations } = useDB()
  const on = automations.filter((a) => a.enabled).length
  const totalRuns = automations.reduce((s, a) => s + a.runs, 0)

  return (
    <>
      <PageTitle title="Automations" sub={`The connective tissue — ${on} active rules, ${totalRuns.toLocaleString()} runs. This is the Zapier/manual glue, built in.`} />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-3">
          {automations.map((a) => (
            <Panel key={a.id} className="flex items-center gap-4 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber/15 text-amber"><Zap size={20} /></span>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-bone">{a.name}</div>
                <div className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[12.5px] text-bone/55">
                  <span className="rounded bg-ink px-1.5 py-0.5 text-bone/70">{a.trigger}</span>
                  <ArrowRight size={12} className="text-amber" />
                  <span className="rounded bg-ink px-1.5 py-0.5 text-bone/70">{a.action}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="hidden text-[12px] text-bone/40 sm:block">{a.runs.toLocaleString()} runs</div>
              </div>
              <Toggle on={a.enabled} onChange={() => toggleAutomation(a.id)} />
            </Panel>
          ))}
        </div>

        <Panel className="p-5">
          <h2 className="flex items-center gap-2 font-bold text-bone"><Activity size={18} className="text-amber" /> Live activity</h2>
          <div className="mt-4 space-y-3">
            {FEED.map((f, i) => (
              <div key={i} className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: f.tone }} />
                <div><div className="text-[13.5px] font-semibold text-bone">{f.t}</div><div className="text-[12.5px] text-bone/55">{f.d}</div><div className="text-[11px] text-bone/35">{f.ago}</div></div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  )
}
