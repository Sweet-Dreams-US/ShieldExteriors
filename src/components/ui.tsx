import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { cn } from '../lib/utils'

/* ----------------------------- Reveal ----------------------------- */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* ----------------------------- Stars ----------------------------- */
export function Stars({ n = 5, size = 16, className }: { n?: number; size?: number; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)} aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={size} className="fill-amber text-amber" />
      ))}
    </span>
  )
}

/* ----------------------------- Animated stat ----------------------------- */
const easeOutExpo = (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x))

export function StatCounter({
  value,
  suffix = '',
  label,
  duration = 1.7,
  tone = 'amber',
}: {
  value: number
  suffix?: string
  label: string
  duration?: number
  tone?: 'amber' | 'ink' | 'bone'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000))
      setN(Math.round(easeOutExpo(p) * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  const toneClass = tone === 'amber' ? 'text-amber' : tone === 'bone' ? 'text-bone' : 'text-ink'

  return (
    <div ref={ref}>
      <div className={cn('h-display text-4xl sm:text-5xl tnum', toneClass)}>
        {n.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-1 text-sm font-medium opacity-70">{label}</div>
    </div>
  )
}

/* ----------------------------- Eyebrow ----------------------------- */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('eyebrow text-amber-deep', className)}>
      <span className="inline-block h-px w-6 bg-current opacity-60" />
      {children}
    </span>
  )
}

/* ----------------------------- Section head ----------------------------- */
export function SectionHead({
  eyebrow,
  title,
  intro,
  center,
  light,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  center?: boolean
  light?: boolean
  className?: string
}) {
  return (
    <div className={cn(center && 'mx-auto text-center', center ? 'max-w-2xl' : 'max-w-3xl', className)}>
      {eyebrow && <Eyebrow className={center ? 'justify-center' : ''}>{eyebrow}</Eyebrow>}
      <h2 className={cn('mt-4 h-display text-[2rem] leading-[1.02] sm:text-[2.8rem]', light ? 'text-bone' : 'text-ink')}>
        {title}
      </h2>
      {intro && <p className={cn('mt-4 text-[17px] leading-relaxed', light ? 'text-bone/70' : 'text-ink/65')}>{intro}</p>}
    </div>
  )
}

/* ----------------------------- Brand mark ----------------------------- */
export function ShieldMark({ className, size = 34 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <path d="M32 5 L55 13 V32 C55 46 45 55 32 60 C19 55 9 46 9 32 V13 Z" fill="#0F3D5C" />
      <path d="M32 5 L55 13 V32 C55 46 45 55 32 60 C19 55 9 46 9 32 V13 Z" stroke="#F5A623" strokeWidth="2.5" />
      <path d="M21 31 l8 8 14 -17" stroke="#F5A623" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <Link to="/" className={cn('inline-flex items-center gap-2.5 group', className)} aria-label="Shield Exteriors home">
      <ShieldMark size={36} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="leading-none">
        <span className={cn('block h-display text-[20px] tracking-tight', light ? 'text-bone' : 'text-ink')}>SHIELD</span>
        <span className="block text-[10px] font-bold uppercase tracking-[0.34em] text-amber-deep">Exteriors</span>
      </span>
    </Link>
  )
}

/* ----------------------------- Marquee strip ----------------------------- */
export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items]
  return (
    <div className="relative overflow-hidden">
      <div className="anim-marquee flex w-max gap-10 whitespace-nowrap">
        {doubled.map((it, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-sm font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            {it}
          </span>
        ))}
      </div>
    </div>
  )
}
