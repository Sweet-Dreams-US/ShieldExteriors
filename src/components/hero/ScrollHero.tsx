import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { Star, ShieldCheck, ChevronDown, Phone } from 'lucide-react'
import MultiStepForm from '../forms/MultiStepForm'
import { CtaButton } from '../LeadModal'
import { asset, PHONE, PHONE_HREF } from '../../lib/utils'
import { useNavigate } from 'react-router-dom'

export default function ScrollHero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const target = useRef(0)
  const [phase, setPhase] = useState('The roof you have now')
  const navigate = useNavigate()

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  // dark overlay lightens as the roof renews; payoff word brightens
  const overlay = useTransform(scrollYProgress, [0, 1], [0.62, 0.34])
  const protectedOpacity = useTransform(scrollYProgress, [0.22, 0.65], [0.25, 1])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%'])

  // map scroll → video time
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const v = videoRef.current
    if (v && v.duration) target.current = p * (v.duration - 0.05)
    setPhase(p < 0.33 ? 'The roof you have now' : p < 0.72 ? 'Watch it transform…' : 'Protected for Life')
  })

  // smooth scrub loop + iOS decode kick
  useEffect(() => {
    const v = videoRef.current
    if (v) {
      v.pause()
      const kick = () => {
        v.play().then(() => v.pause()).catch(() => {})
      }
      v.addEventListener('loadedmetadata', kick, { once: true })
    }
    let raf = 0
    const loop = () => {
      const vid = videoRef.current
      if (vid && vid.duration) {
        const cur = vid.currentTime
        const next = cur + (target.current - cur) * 0.18
        if (Math.abs(next - cur) > 0.004) {
          try {
            vid.currentTime = next
          } catch {
            /* seek not ready */
          }
        }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[220vh] bg-ink">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* video stage */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={asset('assets/hero-roof.mp4')}
          poster={asset('assets/roof-old-drone.webp')}
          muted
          playsInline
          preload="auto"
          aria-hidden
        />
        {/* legibility overlays */}
        <motion.div className="absolute inset-0 bg-ink" style={{ opacity: overlay }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/10 to-transparent" />

        {/* content */}
        <div className="relative z-10 flex h-full items-center pt-20">
          <div className="wrap grid w-full items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            {/* copy */}
            <div className="max-w-2xl">
              <motion.span
                key={phase}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="eyebrow text-amber"
              >
                <ShieldCheck size={15} /> {phase}
              </motion.span>

              <h1 className="mt-4 h-display text-[2.7rem] leading-[0.95] text-bone sm:text-[3.6rem] lg:text-[4.3rem]">
                The Last Roof
                <br />
                You’ll Ever Buy.
              </h1>

              <div className="relative mt-2 inline-block">
                <motion.span className="h-display text-[2rem] text-amber sm:text-[2.7rem]" style={{ opacity: protectedOpacity }}>
                  Protected for Life.
                </motion.span>
                <motion.span className="absolute -bottom-1 left-0 h-[3px] bg-amber" style={{ width: lineWidth }} />
              </div>

              <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-bone/80 sm:text-[17px]">
                Northeast Indiana’s metal & asphalt roofing experts. 5,000+ roofs. 1,000+ five-star reviews. The only{' '}
                <strong className="text-bone">TRUE accident-free lifetime warranty</strong> in the Midwest.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <CtaButton size="lg" source="Homepage Hero">
                  Get My Free Inspection
                </CtaButton>
                <a href={PHONE_HREF} className="btn-ghost text-bone">
                  <Phone size={18} /> {PHONE}
                </a>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-semibold text-bone/75">
                <span className="flex items-center gap-1.5">
                  <Star size={15} className="fill-amber text-amber" /> 1,000+ 5-star reviews
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-amber" /> Free Repairs for Life
                </span>
                <span className="hidden sm:flex items-center gap-1.5">💵 As low as $69/mo · $0 down</span>
              </div>
            </div>

            {/* form rail (desktop) */}
            <div className="hidden lg:block">
              <div className="rounded-3xl bg-ink/40 p-2 ring-1 ring-white/10 backdrop-blur">
                <MultiStepForm source="Homepage Hero Form" onSubmitted={() => navigate('/thank-you')} className="border-0" />
              </div>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <motion.div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center text-bone/70" style={{ opacity: hintOpacity }}>
          <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Scroll to transform</span>
          <div className="mt-1 flex justify-center">
            <ChevronDown size={20} className="anim-scroll-hint text-amber" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
