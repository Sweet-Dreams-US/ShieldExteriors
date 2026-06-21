import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Camera, PenLine, Check, DoorClosed, CalendarClock, ArrowRight, Navigation } from 'lucide-react'
import { ShieldMark } from '../components/ui'
import { useSEO } from '../lib/seo'
import { cn } from '../lib/utils'

const KNOCKS = [
  { id: 'na', label: 'Not home', tone: '#6b7785' },
  { id: 'ni', label: 'Not interested', tone: '#b5651d' },
  { id: 'cb', label: 'Callback', tone: '#c98a1b' },
  { id: 'appt', label: 'Appt set', tone: '#1f9d6b' },
]
const CHECKLIST = ['Tear-off complete', 'Underlayment installed', 'Panels loaded', 'Drip edge set', 'Standing seam panels', 'Ridge cap', 'Cleanup & magnet sweep', 'Final photos', 'Customer walkthrough']

export default function FieldApp() {
  useSEO({ title: 'Shield Field App', description: 'Field app demo.' })
  const [tally, setTally] = useState<Record<string, number>>({ na: 7, ni: 4, cb: 3, appt: 2 })
  const [done, setDone] = useState<boolean[]>(CHECKLIST.map((_, i) => i < 5))
  const [signed, setSigned] = useState(false)
  const log = (id: string) => setTally((t) => ({ ...t, [id]: (t[id] || 0) + 1 }))
  const knocked = Object.values(tally).reduce((a, b) => a + b, 0)

  return (
    <div className="min-h-screen bg-ink py-8 text-bone grain">
      <div className="mx-auto max-w-[400px] px-4">
        <div className="mb-4 text-center">
          <h1 className="h-display text-2xl">Shield Field App</h1>
          <p className="text-sm text-bone/50">PWA for canvassers & crews — one tap from the truck.</p>
        </div>

        {/* phone frame */}
        <div className="mx-auto w-full overflow-hidden rounded-[2.2rem] border-[10px] border-black bg-ink-soft shadow-2xl">
          {/* status bar */}
          <div className="flex items-center justify-between bg-black px-6 py-2 text-[11px] text-bone/60"><span>9:41</span><span className="h-3 w-16 rounded-full bg-bone/10" /><span>100%</span></div>

          {/* app header */}
          <div className="flex items-center gap-2.5 border-b border-ink-line bg-ink px-4 py-3">
            <ShieldMark size={26} />
            <div className="leading-none"><div className="text-[13px] font-bold">Owen Reyes</div><div className="text-[10px] uppercase tracking-wide text-amber">Canvasser · Aboite</div></div>
            <span className="ml-auto grid h-8 w-8 place-items-center rounded-full bg-steel text-[12px] font-bold">OR</span>
          </div>

          <div className="space-y-4 p-4">
            {/* next appt */}
            <div className="rounded-2xl border border-amber/30 bg-amber/10 p-4">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-amber"><CalendarClock size={13} /> Next appointment</div>
              <div className="mt-1 font-bold text-bone">Hartman Family · 10:00 AM</div>
              <div className="text-[12.5px] text-bone/55">112 Lake James Dr, Angola</div>
              <button className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-amber py-2.5 text-[13px] font-bold text-ink"><Navigation size={14} /> Navigate</button>
            </div>

            {/* knock logger */}
            <div className="rounded-2xl border border-ink-line bg-ink p-4">
              <div className="flex items-center justify-between"><span className="flex items-center gap-1.5 text-[13px] font-bold text-bone"><DoorClosed size={15} className="text-amber" /> Log a door</span><span className="text-[12px] text-bone/45">{knocked} today</span></div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {KNOCKS.map((k) => (
                  <button key={k.id} onClick={() => log(k.id)} className="flex items-center justify-between rounded-xl border border-ink-line px-3 py-2.5 text-[13px] font-semibold text-bone active:scale-95">
                    <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ background: k.tone }} /> {k.label}</span>
                    <span className="tnum text-bone/45">{tally[k.id] || 0}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* active job checklist */}
            <div className="rounded-2xl border border-ink-line bg-ink p-4">
              <div className="text-[13px] font-bold text-bone">Cho — Standing Seam</div>
              <div className="text-[11.5px] text-bone/45">Crew A · {done.filter(Boolean).length}/{CHECKLIST.length} steps</div>
              <div className="mt-3 space-y-1.5">
                {CHECKLIST.map((c, i) => (
                  <button key={c} onClick={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))} className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-[13px]">
                    <span className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-md border', done[i] ? 'border-guard bg-guard text-bone' : 'border-ink-line')}>{done[i] && <Check size={12} />}</span>
                    <span className={cn(done[i] ? 'text-bone/45 line-through' : 'text-bone/85')}>{c}</span>
                  </button>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-1.5 rounded-xl border border-ink-line py-2.5 text-[13px] font-bold text-bone"><Camera size={15} /> Photo</button>
                <button onClick={() => setSigned(true)} className={cn('flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[13px] font-bold', signed ? 'bg-guard text-bone' : 'bg-amber text-ink')}><PenLine size={15} /> {signed ? 'Signed ✓' : 'E-sign'}</button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 text-center">
          <Link to="/admin" className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber hover:underline">Everything here syncs to the admin OS <ArrowRight size={15} /></Link>
        </div>
      </div>
    </div>
  )
}
