import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { X, ShieldCheck, Star, BadgeDollarSign, PhoneCall } from 'lucide-react'
import MultiStepForm from './forms/MultiStepForm'
import { cn, PHONE, PHONE_HREF } from '../lib/utils'

interface Ctx {
  open: (source?: string) => void
  close: () => void
}
const LeadCtx = createContext<Ctx>({ open: () => {}, close: () => {} })
export const useLeadModal = () => useContext(LeadCtx)

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const [source, setSource] = useState('Website — Free Inspection')
  const navigate = useNavigate()

  const open = (s?: string) => {
    if (s) setSource(s)
    setOpen(true)
  }
  const close = () => setOpen(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <LeadCtx.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={close} />
            <motion.div
              className="relative grid w-full max-w-3xl overflow-hidden rounded-3xl bg-paper shadow-2xl md:grid-cols-[0.85fr_1fr]"
              initial={{ scale: 0.94, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 10, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Trust rail */}
              <div className="relative hidden flex-col justify-between bg-ink p-7 text-bone md:flex grain">
                <div>
                  <div className="flex items-center gap-2 text-amber">
                    <ShieldCheck size={22} />
                    <span className="h-display text-lg">Protected for Life</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-bone/70">
                    Join 5,000+ Northeast Indiana homeowners who never have to worry about their roof again.
                  </p>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2.5">
                    <Star size={16} className="fill-amber text-amber" /> 1,000+ five-star reviews
                  </li>
                  <li className="flex items-center gap-2.5">
                    <ShieldCheck size={16} className="text-amber" /> Free Repairs for Life warranty
                  </li>
                  <li className="flex items-center gap-2.5">
                    <BadgeDollarSign size={16} className="text-amber" /> As low as $69/mo · $0 down
                  </li>
                </ul>
                <a href={PHONE_HREF} className="inline-flex items-center gap-2 text-sm font-bold text-amber hover:underline">
                  <PhoneCall size={16} /> {PHONE}
                </a>
              </div>

              {/* Form */}
              <div className="relative p-5 sm:p-6">
                <button
                  onClick={close}
                  className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-bone-dim text-ink/60 transition hover:bg-ink hover:text-bone"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
                <MultiStepForm
                  source={source}
                  className="border-0 shadow-none"
                  onSubmitted={() => {
                    close()
                    navigate('/thank-you')
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LeadCtx.Provider>
  )
}

/* Reusable CTA that opens the funnel modal. */
export function CtaButton({
  children = 'Get My Free Inspection',
  variant = 'amber',
  source,
  className,
  size,
}: {
  children?: ReactNode
  variant?: 'amber' | 'steel' | 'ghost' | 'outline'
  source?: string
  className?: string
  size?: 'lg'
}) {
  const { open } = useLeadModal()
  const cls =
    variant === 'amber'
      ? 'btn-amber'
      : variant === 'steel'
        ? 'btn-steel'
        : variant === 'outline'
          ? 'btn-outline-ink'
          : 'btn-ghost'
  return (
    <button onClick={() => open(source)} className={cn(cls, size === 'lg' && 'px-9 py-5 text-base', className)}>
      {children}
    </button>
  )
}
