import { Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import { CheckCircle2, PhoneCall, Clock, Play, ArrowRight } from 'lucide-react'
import { Reveal, Stars } from '../components/ui'
import { useSEO } from '../lib/seo'
import { asset, PHONE, PHONE_HREF } from '../lib/utils'

export default function ThankYou() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  useSEO({ title: 'Thank You | Shield Exteriors', description: 'Your free inspection request was received. A real person will call you within 2 business hours.' })
  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) } else { v.pause(); setPlaying(false) }
  }
  return (
    <section className="relative overflow-hidden bg-ink pb-20 pt-28 text-bone lg:pt-36 grain">
      <div className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-guard/15 blur-3xl" />
      <div className="wrap relative grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-guard/20 text-guard"><CheckCircle2 size={36} /></div>
          <h1 className="mt-6 h-display text-[2.5rem] leading-[1.0] sm:text-[3.2rem]">You’re all set!</h1>
          <p className="mt-4 max-w-md text-[17px] leading-relaxed text-bone/75">
            Your request is in. Here’s exactly what happens next — no surprises.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <Clock size={22} className="mt-0.5 shrink-0 text-amber" />
              <div><div className="font-bold">A real person calls within 2 business hours</div><div className="text-sm text-bone/65">Not a robot. Not a week from now. A local Shield expert.</div></div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
              <CheckCircle2 size={22} className="mt-0.5 shrink-0 text-amber" />
              <div><div className="font-bold">We schedule your free inspection</div><div className="text-sm text-bone/65">At a time that works for you. Zero pressure, zero obligation.</div></div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={PHONE_HREF} className="btn-amber"><PhoneCall size={18} /> Can’t wait? Call {PHONE}</a>
            <Link to="/" className="btn-ghost text-bone">Back home <ArrowRight size={16} /></Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
            <video ref={videoRef} className="aspect-video w-full object-cover" src={asset('assets/hero-roof.mp4')} poster={asset('assets/family-home.webp')} playsInline loop onClick={toggle} />
            {!playing && (
              <button onClick={toggle} className="absolute inset-0 grid place-items-center bg-ink/40" aria-label="Play">
                <span className="text-center">
                  <span className="anim-pulse-ring mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber text-ink"><Play size={26} className="ml-1 fill-ink" /></span>
                  <span className="mt-3 block text-sm font-semibold text-bone">While you wait — meet a Shield family</span>
                  <Stars size={14} className="mt-1 justify-center" />
                </span>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
