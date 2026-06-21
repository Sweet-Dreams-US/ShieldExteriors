import { useState } from 'react'
import { Flame, GripVertical } from 'lucide-react'
import { useDB, STAGES, moveLead, type Stage } from '../lib/store'
import { PageTitle } from './ui'
import { money, cn } from '../lib/utils'

export default function Pipeline() {
  const { leads } = useDB()
  const [drag, setDrag] = useState<string | null>(null)
  const [over, setOver] = useState<Stage | null>(null)

  const drop = (stage: Stage) => {
    if (drag) moveLead(drag, stage)
    setDrag(null)
    setOver(null)
  }

  return (
    <>
      <PageTitle title="CRM Pipeline" sub="Drag a card between columns to move the deal. Everything saves automatically." />

      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGES.map((s) => {
          const items = leads.filter((l) => l.stage === s.id)
          const sum = items.reduce((a, l) => a + l.value, 0)
          return (
            <div
              key={s.id}
              onDragOver={(e) => { e.preventDefault(); setOver(s.id) }}
              onDragLeave={() => setOver((o) => (o === s.id ? null : o))}
              onDrop={() => drop(s.id)}
              className={cn(
                'flex w-[280px] shrink-0 flex-col rounded-2xl border bg-ink-soft transition-colors',
                over === s.id ? 'border-amber bg-amber/5' : 'border-ink-line',
              )}
            >
              <div className="flex items-center justify-between border-b border-ink-line p-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.tone }} />
                  <span className="font-bold text-bone">{s.label}</span>
                  <span className="rounded-full bg-ink px-2 py-0.5 text-[11px] font-bold text-bone/50">{items.length}</span>
                </div>
                <span className="text-[12px] font-semibold text-bone/45">{money(sum)}</span>
              </div>

              <div className="flex flex-1 flex-col gap-2.5 p-3">
                {items.map((l) => (
                  <div
                    key={l.id}
                    draggable
                    onDragStart={() => setDrag(l.id)}
                    onDragEnd={() => setDrag(null)}
                    className={cn(
                      'group cursor-grab rounded-xl border border-ink-line bg-ink p-3 active:cursor-grabbing',
                      drag === l.id && 'opacity-40',
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-bone">{l.name}</span>
                      {l.priority === 'hot' ? <Flame size={14} className="mt-0.5 text-[#e0533d]" /> : <GripVertical size={14} className="mt-0.5 text-bone/25 group-hover:text-bone/50" />}
                    </div>
                    <div className="mt-1 text-[12.5px] text-bone/55">{l.service}</div>
                    <div className="mt-2 flex items-center justify-between text-[12px]">
                      <span className="text-bone/40">{l.city}</span>
                      <span className="font-bold text-amber">{l.value ? money(l.value) : '—'}</span>
                    </div>
                  </div>
                ))}
                {!items.length && <div className="rounded-xl border border-dashed border-ink-line py-8 text-center text-[12px] text-bone/30">Drop here</div>}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
