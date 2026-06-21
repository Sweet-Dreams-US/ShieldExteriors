import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Check, Camera, CreditCard, Wrench, Gift, Phone, ArrowRight } from 'lucide-react'
import { useDB, PROD_STAGES, payInvoice } from '../lib/store'
import { ShieldMark } from '../components/ui'
import { useSEO } from '../lib/seo'
import { asset, money, cn, PHONE, PHONE_HREF } from '../lib/utils'

const PHOTOS = ['assets/crew-install.webp', 'assets/metal-standing-seam.webp', 'assets/roof-new-drone.webp', 'assets/home-hero-golden.webp']

export default function CustomerPortal() {
  useSEO({ title: 'My Roof — Shield Exteriors Customer Portal', description: 'Homeowner portal demo.' })
  const { jobs, warranties, invoices } = useDB()
  const [serviceSent, setServiceSent] = useState(false)

  const job = jobs.find((j) => j.customer.includes('Cho')) || jobs[1]
  const warranty = warranties.find((w) => w.homeowner.includes('Cho')) || warranties[0]
  const invoice = invoices.find((i) => i.customer.includes('Cho') && i.status !== 'paid')
  const currentStageIdx = PROD_STAGES.findIndex((s) => s.id === job.prodStage)

  return (
    <div className="min-h-screen bg-bone text-ink">
      {/* header */}
      <header className="sticky top-0 z-10 border-b border-bone-line bg-paper/90 backdrop-blur">
        <div className="wrap flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5"><ShieldMark size={32} /><span className="leading-none"><span className="block h-display text-lg">SHIELD</span><span className="text-[9px] font-bold uppercase tracking-[0.3em] text-amber-deep">My Roof</span></span></div>
          <div className="flex items-center gap-3">
            <a href={PHONE_HREF} className="hidden items-center gap-1.5 text-sm font-bold text-steel sm:flex"><Phone size={15} /> {PHONE}</a>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-steel font-bold text-bone">HC</span>
          </div>
        </div>
      </header>

      <main className="wrap py-8">
        <div className="flex items-center gap-2 text-amber-deep"><ShieldCheck size={18} /><span className="text-[12px] font-bold uppercase tracking-[0.2em]">Welcome back</span></div>
        <h1 className="mt-2 h-display text-3xl text-ink sm:text-4xl">Hi Helen — your roof is in production.</h1>
        <p className="mt-2 text-ink/60">{warranty.products} · {warranty.address}, {warranty.city}</p>

        {/* status timeline */}
        <div className="mt-8 rounded-2xl border bg-paper p-6 card">
          <h2 className="h-display text-xl text-ink">Project status</h2>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0">
            {PROD_STAGES.map((s, i) => (
              <div key={s.id} className="flex flex-1 items-center gap-3 sm:flex-col sm:gap-2 sm:text-center">
                <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-full text-bone', i <= currentStageIdx ? 'bg-guard' : 'bg-bone-line text-ink/40')}>
                  {i < currentStageIdx ? <Check size={16} /> : i === currentStageIdx ? <span className="h-2.5 w-2.5 rounded-full bg-bone anim-pulse-ring" /> : i + 1}
                </span>
                <span className={cn('text-[13px] font-semibold', i <= currentStageIdx ? 'text-ink' : 'text-ink/40')}>{s.label}</span>
                {i < PROD_STAGES.length - 1 && <span className="hidden h-0.5 flex-1 sm:block" style={{ background: i < currentStageIdx ? '#1f9d6b' : '#dcd6c8' }} />}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* photos */}
          <div className="rounded-2xl border bg-paper p-6 card">
            <h2 className="flex items-center gap-2 h-display text-xl text-ink"><Camera size={18} className="text-amber-deep" /> Install photos ({job.photos})</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {PHOTOS.map((p) => <img key={p} src={asset(p)} alt="" className="aspect-square w-full rounded-xl object-cover" />)}
            </div>
          </div>

          {/* warranty card */}
          <div className="rounded-2xl border-2 border-amber/40 p-6 text-bone shadow-xl metal grain">
            <div className="flex items-center justify-between"><div className="flex items-center gap-2"><ShieldMark size={28} /><span className="h-display">SHIELD</span></div><span className="rounded-full border border-amber/50 bg-amber/10 px-2 py-0.5 text-[10px] font-bold uppercase text-amber">Transferable</span></div>
            <div className="mt-4 text-[11px] font-bold uppercase tracking-[0.25em] text-amber">Free Repairs for Life</div>
            <div className="h-display text-lg">{warranty.coverage}</div>
            <div className="mt-4 font-mono text-sm tracking-widest text-amber">{warranty.cardNo}</div>
            <div className="mt-1 text-[12px] text-bone/55">Installed {warranty.installDate}</div>
          </div>
        </div>

        {/* actions */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border bg-paper p-5 card">
            <CreditCard size={22} className="text-amber-deep" />
            <h3 className="mt-2 h-display text-lg text-ink">Balance due</h3>
            {invoice ? (
              <>
                <div className="mt-1 text-2xl font-bold text-ink tnum">{money(invoice.amount - invoice.paid)}</div>
                <button onClick={() => payInvoice(invoice.id)} className="btn-amber mt-3 w-full justify-center py-2.5 text-sm">Pay now</button>
              </>
            ) : <div className="mt-2 text-guard font-semibold">Paid in full — thank you!</div>}
          </div>
          <div className="rounded-2xl border bg-paper p-5 card">
            <Wrench size={22} className="text-amber-deep" />
            <h3 className="mt-2 h-display text-lg text-ink">Request service</h3>
            <p className="mt-1 text-[13px] text-ink/55">Covered for life — even accidents.</p>
            <button onClick={() => setServiceSent(true)} className="btn-outline-ink mt-3 w-full justify-center py-2.5 text-sm">{serviceSent ? 'Request sent ✓' : 'File a request'}</button>
          </div>
          <div className="rounded-2xl border bg-paper p-5 card">
            <Gift size={22} className="text-amber-deep" />
            <h3 className="mt-2 h-display text-lg text-ink">Refer a friend</h3>
            <p className="mt-1 text-[13px] text-ink/55">Earn $250 for every roof.</p>
            <button className="btn-outline-ink mt-3 w-full justify-center py-2.5 text-sm">Share your link</button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-ink/45">
          <Link to="/admin" className="inline-flex items-center gap-1.5 font-semibold text-steel hover:underline">This is the homeowner view · see the admin OS <ArrowRight size={15} /></Link>
        </div>
      </main>
    </div>
  )
}
