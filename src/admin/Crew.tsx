import { Phone, HardHat, Wrench } from 'lucide-react'
import { useDB } from '../lib/store'
import { PageTitle, Panel, Avatar } from './ui'
import { money } from '../lib/utils'

const STATUS: Record<string, { c: string; l: string }> = {
  active: { c: '#1f9d6b', l: 'Active' },
  pto: { c: '#f5a623', l: 'PTO' },
  off: { c: '#6b7785', l: 'Off' },
}

export default function Crew() {
  const { crews, staff, jobs, leads } = useDB()

  return (
    <>
      <PageTitle title="Crew Management" sub="Who’s on the roof, what they’re best at, and how loaded they are." />

      {/* Crews */}
      <div className="grid gap-5 lg:grid-cols-3">
        {crews.map((c) => {
          const crewJobs = jobs.filter((j) => j.crewId === c.id)
          const booked = crewJobs.reduce((a, j) => a + j.value, 0)
          const assigned = leads.filter((l) => l.assignedCrewId === c.id).length
          return (
            <Panel key={c.id} className="overflow-hidden">
              <div className="flex items-center gap-3 p-5" style={{ background: `linear-gradient(180deg, ${c.color}22, transparent)` }}>
                <span className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: c.color }}><HardHat size={22} className="text-bone" /></span>
                <div>
                  <h2 className="font-bold text-bone">{c.name}</h2>
                  <div className="flex items-center gap-1.5 text-[12.5px] text-bone/55"><Wrench size={12} /> {c.specialty}</div>
                </div>
              </div>
              <div className="space-y-3 p-5 pt-0">
                <div className="flex items-center gap-2">
                  {[c.leadName, ...c.members].map((m, i) => <Avatar key={i} name={m.startsWith('+') ? m : m} tone={i === 0 ? c.color : '#2a3340'} size={32} />)}
                </div>
                <div className="text-[13px] text-bone/55">Lead: <span className="font-semibold text-bone">{c.leadName}</span></div>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <Mini label="Jobs" value={crewJobs.length} />
                  <Mini label="Booked" value={money(booked)} />
                  <Mini label="Leads" value={assigned} />
                </div>
              </div>
            </Panel>
          )
        })}
      </div>

      {/* Staff roster */}
      <Panel className="mt-6">
        <div className="border-b border-ink-line p-5"><h2 className="font-bold text-bone">Staff roster</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-line text-[12px] uppercase tracking-wide text-bone/45">
              <tr><th className="p-4 font-semibold">Name</th><th className="p-4 font-semibold">Role</th><th className="hidden p-4 font-semibold sm:table-cell">Phone</th><th className="p-4 font-semibold">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-ink-line">
              {staff.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.02]">
                  <td className="p-4"><div className="flex items-center gap-3"><Avatar name={s.name} tone={s.avatarTone} size={34} /><span className="font-semibold text-bone">{s.name}</span></div></td>
                  <td className="p-4 text-bone/70">{s.role}</td>
                  <td className="hidden p-4 sm:table-cell"><a href={`tel:${s.phone}`} className="flex items-center gap-1.5 text-bone/60 hover:text-amber"><Phone size={13} /> {s.phone}</a></td>
                  <td className="p-4"><span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-bold" style={{ background: `${STATUS[s.status].c}22`, color: STATUS[s.status].c }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: STATUS[s.status].c }} /> {STATUS[s.status].l}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}

function Mini({ label, value }: { label: string; value: React.ReactNode }) {
  return <div className="rounded-lg bg-ink p-2.5 text-center"><div className="h-display text-lg text-bone tnum">{value}</div><div className="text-[10.5px] uppercase tracking-wide text-bone/40">{label}</div></div>
}
