import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ChevronDown, ShieldCheck, Star } from 'lucide-react'
import { Logo } from '../ui'
import { CtaButton } from '../LeadModal'
import { PRIMARY_NAV } from '../../data/site'
import { cn, PHONE, PHONE_HREF } from '../../lib/utils'

export default function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [pathname])

  const solid = scrolled || !isHome || mobileOpen
  const light = !solid // light text over dark hero

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar */}
      <div className={cn('hidden border-b transition-colors lg:block', solid ? 'border-ink-line/10 bg-ink text-bone' : 'border-white/10 bg-ink/30 text-bone backdrop-blur')}>
        <div className="wrap flex h-9 items-center justify-between text-[12.5px]">
          <span className="flex items-center gap-2 font-medium">
            <Star size={13} className="fill-amber text-amber" /> 1,000+ five-star reviews · A+ BBB · 0 complaints, ever
          </span>
          <span className="flex items-center gap-5 font-medium">
            <span className="text-bone/70">Mon–Sat · 7a–7p</span>
            <a href={PHONE_HREF} className="flex items-center gap-1.5 font-bold text-amber hover:underline">
              <Phone size={13} /> {PHONE}
            </a>
          </span>
        </div>
      </div>

      {/* Main bar */}
      <div className={cn('transition-all duration-300', solid ? 'bg-paper/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-paper/85' : 'bg-transparent')}>
        <div className="wrap flex h-[68px] items-center justify-between gap-4">
          <Logo light={light} />

          <nav className="hidden items-center gap-1 lg:flex">
            {PRIMARY_NAV.map((item) =>
              item.children ? (
                <div key={item.to} className="group relative">
                  <NavLink
                    to={item.to}
                    className={cn(
                      'flex items-center gap-1 rounded-full px-3.5 py-2 text-[15px] font-semibold transition-colors',
                      light ? 'text-bone/90 hover:bg-white/10' : 'text-ink/80 hover:bg-bone-dim',
                    )}
                  >
                    {item.label} <ChevronDown size={15} className="transition-transform group-hover:rotate-180" />
                  </NavLink>
                  <div className="invisible absolute left-0 top-full w-72 translate-y-1 pt-2 opacity-0 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="overflow-hidden rounded-2xl border bg-paper p-2 shadow-xl">
                      {item.children.map((c) => (
                        <Link key={c.to} to={c.to} className="block rounded-xl px-3 py-2.5 hover:bg-bone-dim">
                          <span className="block text-[14px] font-bold text-ink">{c.label}</span>
                          {c.desc && <span className="block text-[12.5px] text-ink/55">{c.desc}</span>}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'rounded-full px-3.5 py-2 text-[15px] font-semibold transition-colors',
                      light ? 'text-bone/90 hover:bg-white/10' : 'text-ink/80 hover:bg-bone-dim',
                      isActive && (light ? 'text-amber' : 'text-amber-deep'),
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a href={PHONE_HREF} className={cn('flex items-center gap-1.5 rounded-full px-3 py-2 text-[15px] font-bold transition-colors', light ? 'text-bone hover:bg-white/10' : 'text-steel hover:bg-bone-dim')}>
              <Phone size={16} /> Call
            </a>
            <CtaButton className="px-5 py-3 text-[14px]">Free Inspection</CtaButton>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={cn('grid h-11 w-11 place-items-center rounded-xl lg:hidden', light ? 'text-bone' : 'text-ink')}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t bg-paper px-5 pb-6 pt-2 shadow-xl lg:hidden">
          <nav className="flex flex-col">
            {PRIMARY_NAV.map((item) => (
              <div key={item.to}>
                <Link to={item.to} className="flex items-center justify-between border-b py-3 text-[17px] font-bold text-ink">
                  {item.label}
                </Link>
                {item.children && (
                  <div className="flex flex-col gap-1 py-2 pl-4">
                    {item.children.map((c) => (
                      <Link key={c.to} to={c.to} className="py-1.5 text-[15px] font-medium text-ink/70">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/service-area" className="border-b py-3 text-[17px] font-bold text-ink">
              Service Area
            </Link>
            <Link to="/careers" className="border-b py-3 text-[17px] font-bold text-ink">
              Careers
            </Link>
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <CtaButton className="w-full justify-center">Get My Free Inspection</CtaButton>
            <a href={PHONE_HREF} className="btn-outline-ink w-full justify-center">
              <ShieldCheck size={18} /> Call {PHONE}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
