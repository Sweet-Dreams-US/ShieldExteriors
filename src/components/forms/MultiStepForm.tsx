import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Layers, Home, Droplets, HelpCircle, ShieldCheck, PhoneCall } from 'lucide-react'
import { addLead, type Lead } from '../../lib/store'
import { cn, PHONE, PHONE_HREF } from '../../lib/utils'

const SERVICES = [
  { id: 'Standing Seam Metal', label: 'Metal Roof', sub: 'Standing seam, ribbed, shingle', Icon: Layers },
  { id: 'Asphalt Shingles', label: 'Asphalt Shingles', sub: 'Class-4, lifetime warranty', Icon: Home },
  { id: 'Gutters & Guards', label: 'Gutters & Guards', sub: 'Seamless + micro-mesh', Icon: Droplets },
  { id: 'Not sure yet', label: 'Not sure yet', sub: 'Help me figure it out', Icon: HelpCircle },
]

const variants = {
  enter: { opacity: 0, x: 28 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -28 },
}

export default function MultiStepForm({
  source = 'Website — Free Inspection',
  onSubmitted,
  className,
}: {
  source?: string
  onSubmitted?: (lead: Lead) => void
  className?: string
}) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const [data, setData] = useState({
    service: '',
    zip: '',
    address: '',
    city: '',
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  const set = (k: keyof typeof data, v: string) => setData((d) => ({ ...d, [k]: v }))
  const pct = ((step + 1) / 3) * 100

  const pickService = (id: string) => {
    set('service', id)
    setTimeout(() => setStep(1), 160)
  }

  const submit = () => {
    const lead = addLead({ ...data, source })
    setDone(true)
    onSubmitted?.(lead)
  }

  if (done && !onSubmitted) {
    return (
      <div className={cn('rounded-2xl border bg-paper p-8 text-center', className)}>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-guard/15 text-guard">
          <ShieldCheck size={32} />
        </div>
        <h3 className="mt-5 h-display text-2xl text-ink">You’re on the schedule list!</h3>
        <p className="mx-auto mt-2 max-w-sm text-ink/65">
          A real person from Shield will call you within <strong>2 business hours</strong> to lock in your free, no-pressure
          inspection. No robots, no runaround.
        </p>
        <a href={PHONE_HREF} className="btn-steel mt-6 inline-flex">
          <PhoneCall size={18} /> Or call now: {PHONE}
        </a>
      </div>
    )
  }

  return (
    <div className={cn('overflow-hidden rounded-2xl border bg-paper', className)}>
      {/* progress */}
      <div className="flex items-center gap-3 border-b bg-bone-dim/40 px-5 py-3">
        <div className="flex items-center gap-1.5 text-amber-deep">
          <ShieldCheck size={18} />
          <span className="text-[12px] font-bold uppercase tracking-[0.18em]">Free Inspection</span>
        </div>
        <div className="ml-auto h-1.5 w-32 overflow-hidden rounded-full bg-bone-line">
          <motion.div className="h-full rounded-full bg-amber" animate={{ width: `${pct}%` }} transition={{ ease: 'easeOut' }} />
        </div>
        <span className="text-[12px] font-bold tabular-nums text-ink/50">Step {step + 1}/3</span>
      </div>

      <div className="relative p-5 sm:p-6">
        <AnimatePresence mode="wait" initial={false}>
          {step === 0 && (
            <motion.div key="s0" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28 }}>
              <p className="text-[13px] font-bold uppercase tracking-wide text-ink/45">What do you need?</p>
              <h3 className="mt-1 h-display text-xl text-ink">Tell us about your project</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {SERVICES.map(({ id, label, sub, Icon }) => (
                  <button
                    key={id}
                    onClick={() => pickService(id)}
                    className={cn(
                      'group flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-all hover:-translate-y-0.5',
                      data.service === id ? 'border-amber bg-amber/10' : 'border-bone-line bg-bone/40 hover:border-steel',
                    )}
                  >
                    <Icon size={22} className="text-steel" />
                    <span className="text-[15px] font-bold leading-tight text-ink">{label}</span>
                    <span className="text-[12px] text-ink/55">{sub}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="s1" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28 }}>
              <p className="text-[13px] font-bold uppercase tracking-wide text-ink/45">Where’s the home?</p>
              <h3 className="mt-1 h-display text-xl text-ink">Your property</h3>
              <div className="mt-4 space-y-3">
                <input className="field" placeholder="ZIP code" inputMode="numeric" value={data.zip} onChange={(e) => set('zip', e.target.value)} />
                <input className="field" placeholder="City / town" value={data.city} onChange={(e) => set('city', e.target.value)} />
                <input className="field" placeholder="Street address (optional)" value={data.address} onChange={(e) => set('address', e.target.value)} />
              </div>
              <div className="mt-5 flex items-center justify-between">
                <button onClick={() => setStep(0)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/55 hover:text-ink">
                  <ArrowLeft size={16} /> Back
                </button>
                <button onClick={() => setStep(2)} className="btn-amber" disabled={!data.zip && !data.city}>
                  Continue <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28 }}>
              <p className="text-[13px] font-bold uppercase tracking-wide text-ink/45">Last step</p>
              <h3 className="mt-1 h-display text-xl text-ink">Where do we send your quote?</h3>
              <div className="mt-4 space-y-3">
                <input className="field" placeholder="Full name" value={data.name} onChange={(e) => set('name', e.target.value)} />
                <input className="field" placeholder="Phone" inputMode="tel" value={data.phone} onChange={(e) => set('phone', e.target.value)} />
                <input className="field" placeholder="Email" inputMode="email" value={data.email} onChange={(e) => set('email', e.target.value)} />
              </div>
              <div className="mt-5 flex items-center justify-between gap-3">
                <button onClick={() => setStep(1)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/55 hover:text-ink">
                  <ArrowLeft size={16} /> Back
                </button>
                <button onClick={submit} className="btn-amber" disabled={!data.name || !data.phone}>
                  <Check size={18} /> Get My Free Inspection
                </button>
              </div>
              <p className="mt-3 text-center text-[12px] text-ink/45">
                🔒 No spam, no pressure. As low as <strong className="text-ink/70">$69/mo · $0 down.</strong>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
