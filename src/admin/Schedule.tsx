import { useDB } from '../lib/store'
import { PageTitle, Panel } from './ui'
import { money, cn } from '../lib/utils'

const TYPE_TONE: Record<string, string> = {
  install: '#1f9d6b',
  inspection: '#1b6fa8',
  estimate: '#f5a623',
  repair: '#b5651d',
}

export default function Schedule() {
  const { jobs, crews } = useDB()

  // next 7 days from today
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() + i)
    return d
  })
  const key = (d: Date) => d.toISOString().slice(0, 10)
  const fmt = (d: Date) => ({ wd: d.toLocaleDateString('en-US', { weekday: 'short' }), dm: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) })
  const todayKey = key(new Date())

  return (
    <>
      <PageTitle title="Staff Schedule" sub="Next 7 days · jobs by crew" action={
        <div className="flex flex-wrap gap-2">
          {Object.entries(TYPE_TONE).map(([t, c]) => (
            <span key={t} className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-bone/60"><span className="h-2.5 w-2.5 rounded" style={{ background: c }} /> {t}</span>
          ))}
        </div>
      } />

      <Panel className="overflow-x-auto">
        <div className="min-w-[860px]">
          {/* header */}
          <div className="grid border-b border-ink-line" style={{ gridTemplateColumns: '150px repeat(7, 1fr)' }}>
            <div className="p-3 text-[12px] font-semibold uppercase tracking-wide text-bone/40">Crew</div>
            {days.map((d) => {
              const f = fmt(d)
              const isToday = key(d) === todayKey
              return (
                <div key={key(d)} className={cn('border-l border-ink-line p-3 text-center', isToday && 'bg-amber/10')}>
                  <div className="text-[12px] font-bold uppercase text-bone/50">{f.wd}</div>
                  <div className={cn('text-sm font-semibold', isToday ? 'text-amber' : 'text-bone/80')}>{f.dm}</div>
                </div>
              )
            })}
          </div>

          {/* rows */}
          {crews.map((c) => (
            <div key={c.id} className="grid border-b border-ink-line last:border-0" style={{ gridTemplateColumns: '150px repeat(7, 1fr)' }}>
              <div className="flex items-center gap-2 p-3">
                <span className="h-3 w-3 rounded" style={{ background: c.color }} />
                <span className="text-[13px] font-semibold text-bone">{c.name}</span>
              </div>
              {days.map((d) => {
                const cell = jobs.filter((j) => j.crewId === c.id && j.date === key(d))
                return (
                  <div key={key(d)} className="min-h-[72px] space-y-1.5 border-l border-ink-line p-1.5">
                    {cell.map((j) => (
                      <div key={j.id} className="rounded-lg p-2 text-bone" style={{ background: `${TYPE_TONE[j.type]}26`, borderLeft: `3px solid ${TYPE_TONE[j.type]}` }}>
                        <div className="text-[11.5px] font-bold leading-tight">{j.title}</div>
                        <div className="text-[10.5px] text-bone/55">{j.start}{j.durationDays > 1 ? ` · ${j.durationDays}d` : ''}{j.value ? ` · ${money(j.value)}` : ''}</div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </Panel>
    </>
  )
}
