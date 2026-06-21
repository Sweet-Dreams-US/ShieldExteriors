import { useState } from 'react'
import { Camera, Package, ClipboardCheck, HardHat } from 'lucide-react'
import { useDB, PROD_STAGES, moveJobStage, type ProdStage } from '../lib/store'
import { PageTitle, Progress } from './ui'
import { money, cn } from '../lib/utils'

const PO_TONE: Record<string, string> = { pending: '#b5651d', ordered: '#c98a1b', delivered: '#1f9d6b' }

export default function Production() {
  const { jobs, crews } = useDB()
  const installs = jobs.filter((j) => j.type === 'install')
  const [drag, setDrag] = useState<string | null>(null)
  const [over, setOver] = useState<ProdStage | null>(null)

  const drop = (s: ProdStage) => { if (drag) moveJobStage(drag, s); setDrag(null); setOver(null) }

  return (
    <>
      <PageTitle title="Production Board" sub="Won deals become jobs. Drag through the build — material → complete. Customers see the same stages in their portal." />

      <div className="flex gap-4 overflow-x-auto pb-4">
        {PROD_STAGES.map((s) => {
          const items = installs.filter((j) => j.prodStage === s.id)
          const sum = items.reduce((a, j) => a + j.value, 0)
          return (
            <div key={s.id}
              onDragOver={(e) => { e.preventDefault(); setOver(s.id) }}
              onDragLeave={() => setOver((o) => (o === s.id ? null : o))}
              onDrop={() => drop(s.id)}
              className={cn('flex w-[300px] shrink-0 flex-col rounded-2xl border bg-ink-soft transition-colors', over === s.id ? 'border-amber bg-amber/5' : 'border-ink-line')}>
              <div className="flex items-center justify-between border-b border-ink-line p-4">
                <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: s.tone }} /><span className="font-bold text-bone">{s.label}</span><span className="rounded-full bg-ink px-2 py-0.5 text-[11px] font-bold text-bone/50">{items.length}</span></div>
                <span className="text-[12px] font-semibold text-bone/45">{money(sum)}</span>
              </div>
              <div className="flex flex-1 flex-col gap-2.5 p-3">
                {items.map((j) => {
                  const crew = crews.find((c) => c.id === j.crewId)
                  return (
                    <div key={j.id} draggable onDragStart={() => setDrag(j.id)} onDragEnd={() => setDrag(null)}
                      className={cn('cursor-grab rounded-xl border border-ink-line bg-ink p-3 active:cursor-grabbing', drag === j.id && 'opacity-40')}>
                      <div className="font-semibold text-bone">{j.customer}</div>
                      <div className="mt-0.5 text-[12.5px] text-bone/55">{j.product} · {j.city}</div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10.5px] font-bold" style={{ background: `${PO_TONE[j.poStatus]}22`, color: PO_TONE[j.poStatus] }}><Package size={11} /> {j.poStatus}</span>
                        {j.crewId && <span className="inline-flex items-center gap-1 text-[11px] text-bone/50"><HardHat size={12} style={{ color: crew?.color }} /> {crew?.name.replace('Crew ', '')}</span>}
                      </div>
                      <div className="mt-2.5"><Progress done={j.checklistDone} total={j.checklistTotal} tone={s.tone} /></div>
                      <div className="mt-2 flex items-center justify-between text-[11.5px] text-bone/45">
                        <span className="inline-flex items-center gap-1"><Camera size={12} /> {j.photos} photos</span>
                        <span className="font-bold text-amber">{money(j.value)}</span>
                      </div>
                    </div>
                  )
                })}
                {!items.length && <div className="rounded-xl border border-dashed border-ink-line py-8 text-center text-[12px] text-bone/30">Drop here</div>}
              </div>
            </div>
          )
        })}
      </div>

      <p className="mt-2 flex items-center gap-2 text-[13px] text-bone/45"><ClipboardCheck size={15} /> Moving a job to <span className="font-semibold text-guard">Complete</span> auto-registers the warranty and fires the review request (see Automations).</p>
    </>
  )
}
