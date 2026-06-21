import { useState } from 'react'
import { MapPin, DoorOpen, CalendarCheck, Target, Plus } from 'lucide-react'
import { useDB } from '../lib/store'
import { PageTitle, Panel, StatTile, Bar, Avatar } from './ui'
import { cn } from '../lib/utils'

const DOOR_STATES = [
  { id: 'unknocked', label: 'Not knocked', color: '#2a3340' },
  { id: 'not-home', label: 'Not home', color: '#6b7785' },
  { id: 'not-interested', label: 'Not interested', color: '#b5651d' },
  { id: 'callback', label: 'Callback', color: '#c98a1b' },
  { id: 'appointment', label: 'Appointment set', color: '#1f9d6b' },
] as const

type DoorState = (typeof DOOR_STATES)[number]['id']

function makeGrid(): DoorState[] {
  const weights: DoorState[] = ['unknocked', 'unknocked', 'not-home', 'not-home', 'not-interested', 'callback', 'appointment']
  return Array.from({ length: 130 }, () => weights[Math.floor(Math.random() * weights.length)])
}

export default function Canvassing() {
  const { territories } = useDB()
  const [grid, setGrid] = useState<DoorState[]>(makeGrid)

  const cycle = (i: number) => {
    setGrid((g) => {
      const order = DOOR_STATES.map((d) => d.id)
      const next = order[(order.indexOf(g[i]) + 1) % order.length]
      const copy = [...g]; copy[i] = next; return copy
    })
  }

  const counts = DOOR_STATES.map((d) => ({ ...d, n: grid.filter((g) => g === d).length }))
  const knocked = grid.filter((g) => g !== 'unknocked').length
  const appts = grid.filter((g) => g === 'appointment').length
  const contacts = grid.filter((g) => g === 'not-interested' || g === 'callback' || g === 'appointment').length
  const setRate = knocked ? Math.round((appts / knocked) * 100) : 0
  const maxTerr = Math.max(1, ...territories.map((t) => t.knocked))

  return (
    <>
      <PageTitle title="Canvassing & Territory" sub="Door-to-door is how Shield grows — map it, log it, measure set rates." action={
        <button className="btn-amber px-4 py-2.5 text-sm"><Plus size={16} /> Assign territory</button>
      } />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Doors knocked" value={knocked} sub="this map" Icon={DoorOpen} tone="#1b6fa8" />
        <StatTile label="Contacts made" value={contacts} sub="conversations" Icon={MapPin} tone="#6b54c6" />
        <StatTile label="Appointments" value={appts} sub="inspections set" Icon={CalendarCheck} tone="#1f9d6b" />
        <StatTile label="Set rate" value={`${setRate}%`} sub="appts ÷ knocks" Icon={Target} tone="#f5a623" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        {/* Map */}
        <Panel className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-bone">Aboite / SW Fort Wayne — live grid</h2>
            <span className="text-[12px] text-bone/40">tap a door to log</span>
          </div>
          <div className="relative mt-4 overflow-hidden rounded-xl border border-ink-line bg-ink p-3">
            <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            <div className="relative grid grid-cols-[repeat(13,minmax(0,1fr))] gap-1.5">
              {grid.map((s, i) => (
                <button key={i} onClick={() => cycle(i)} title={DOOR_STATES.find((d) => d.id === s)?.label}
                  className="aspect-square rounded-[4px] transition-transform hover:scale-125"
                  style={{ background: DOOR_STATES.find((d) => d.id === s)!.color }} />
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {counts.map((c) => (
              <span key={c.id} className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-bone/65">
                <span className="h-2.5 w-2.5 rounded" style={{ background: c.color }} /> {c.label} <span className="text-bone/40">({c.n})</span>
              </span>
            ))}
          </div>
        </Panel>

        {/* Leaderboard */}
        <Panel className="p-5">
          <h2 className="font-bold text-bone">Territory leaderboard</h2>
          <div className="mt-4 space-y-4">
            {territories.map((t) => (
              <div key={t.id}>
                <div className="flex items-center gap-2.5">
                  <Avatar name={t.rep} tone={t.color} size={30} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13.5px] font-semibold text-bone">{t.name}</div>
                    <div className="text-[11.5px] text-bone/45">{t.rep} · {t.appointments} appts · {Math.round((t.appointments / t.knocked) * 100)}% set</div>
                  </div>
                </div>
                <div className="mt-2"><Bar label="" value={t.knocked} max={maxTerr} display={`${t.knocked} knocks`} tone={t.color} /></div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  )
}
