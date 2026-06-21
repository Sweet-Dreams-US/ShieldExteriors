import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Inbox, Map, Workflow, FileText, HardHat, CalendarDays, Users,
  DollarSign, ShieldCheck, Megaphone, UserPlus, Zap, Plug, BarChart3,
  LogOut, RotateCcw, ExternalLink, Lock, Menu, X, Smartphone, UserRound,
} from 'lucide-react'
import { ShieldMark } from '../components/ui'
import { resetDemo } from '../lib/store'
import { cn } from '../lib/utils'
import { useSEO } from '../lib/seo'

const AUTH_KEY = 'shield_admin_authed'

const NAV_GROUPS: { label: string | null; items: { to: string; label: string; Icon: any; end?: boolean }[] }[] = [
  { label: null, items: [{ to: '/admin', label: 'Command Center', Icon: LayoutDashboard, end: true }] },
  { label: 'Sales', items: [
    { to: '/admin/leads', label: 'Lead Inbox', Icon: Inbox },
    { to: '/admin/canvassing', label: 'Canvassing', Icon: Map },
    { to: '/admin/pipeline', label: 'CRM Pipeline', Icon: Workflow },
    { to: '/admin/estimates', label: 'Estimates', Icon: FileText },
  ] },
  { label: 'Operations', items: [
    { to: '/admin/production', label: 'Production', Icon: HardHat },
    { to: '/admin/schedule', label: 'Schedule', Icon: CalendarDays },
    { to: '/admin/crew', label: 'Crew', Icon: Users },
  ] },
  { label: 'Finance', items: [{ to: '/admin/invoicing', label: 'Invoicing & Pay', Icon: DollarSign }] },
  { label: 'Customer', items: [
    { to: '/admin/warranty', label: 'Warranty Registry', Icon: ShieldCheck },
    { to: '/admin/marketing', label: 'Marketing', Icon: Megaphone },
  ] },
  { label: 'Team', items: [{ to: '/admin/recruiting', label: 'Recruiting & HR', Icon: UserPlus }] },
  { label: 'System', items: [
    { to: '/admin/automations', label: 'Automations', Icon: Zap },
    { to: '/admin/integrations', label: 'Integrations', Icon: Plug },
    { to: '/admin/operations', label: 'Reports', Icon: BarChart3 },
  ] },
]

function Login({ onAuth }: { onAuth: () => void }) {
  const [email, setEmail] = useState('brad@shieldexteriors.com')
  const [pw, setPw] = useState('shield')
  return (
    <div className="grid min-h-screen place-items-center bg-ink p-6 text-bone grain">
      <div className="w-full max-w-sm rounded-3xl border border-ink-line bg-ink-soft p-8 shadow-2xl">
        <div className="flex items-center gap-2.5"><ShieldMark size={36} /><span className="h-display text-xl">Shield OS</span></div>
        <h1 className="mt-6 h-display text-2xl">One login, the whole company.</h1>
        <p className="mt-1 text-sm text-bone/55">Sign in to the Shield Operating System.</p>
        <div className="mt-6 space-y-3">
          <input className="field bg-ink text-bone" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input className="field bg-ink text-bone" type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Password" />
          <button onClick={onAuth} className="btn-amber w-full justify-center"><Lock size={16} /> Sign in</button>
        </div>
        <p className="mt-4 rounded-lg bg-amber/10 p-3 text-center text-[12px] text-amber">Demo — any credentials work. Click Sign in.</p>
        <Link to="/" className="mt-4 block text-center text-[13px] text-bone/50 hover:text-bone">← Back to website</Link>
      </div>
    </div>
  )
}

export default function AdminLayout() {
  useSEO({ title: 'Shield OS — Operating System', description: 'Internal operating system.' })
  const [authed, setAuthed] = useState(() => { try { return localStorage.getItem(AUTH_KEY) === '1' } catch { return false } })
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const auth = () => { try { localStorage.setItem(AUTH_KEY, '1') } catch { /* */ } setAuthed(true) }
  const signOut = () => { try { localStorage.removeItem(AUTH_KEY) } catch { /* */ } setAuthed(false); navigate('/admin') }

  if (!authed) return <Login onAuth={auth} />

  return (
    <div className="min-h-screen bg-ink text-bone">
      <aside className={cn('fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-ink-line bg-ink-soft transition-transform lg:translate-x-0', open ? 'translate-x-0' : '-translate-x-full')}>
        <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-ink-line px-5">
          <ShieldMark size={30} />
          <span className="leading-none"><span className="block h-display text-[17px]">Shield OS</span><span className="text-[9px] font-bold uppercase tracking-[0.3em] text-amber">Operating System</span></span>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {NAV_GROUPS.map((g, gi) => (
            <div key={gi} className={gi > 0 ? 'mt-4' : ''}>
              {g.label && <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-bone/30">{g.label}</div>}
              <div className="flex flex-col gap-0.5">
                {g.items.map(({ to, label, Icon, end }) => (
                  <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)}
                    className={({ isActive }) => cn('flex items-center gap-3 rounded-xl px-3.5 py-2 text-[14px] font-semibold transition-colors', isActive ? 'bg-amber text-ink' : 'text-bone/70 hover:bg-white/5 hover:text-bone')}>
                    <Icon size={17} /> {label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="shrink-0 space-y-0.5 border-t border-ink-line p-3">
          <button onClick={() => resetDemo()} className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2 text-[13px] font-semibold text-bone/60 hover:bg-white/5 hover:text-bone"><RotateCcw size={15} /> Reset demo data</button>
          <a href={import.meta.env.BASE_URL} className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2 text-[13px] font-semibold text-bone/60 hover:bg-white/5 hover:text-bone"><ExternalLink size={15} /> View website</a>
          <button onClick={signOut} className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2 text-[13px] font-semibold text-bone/60 hover:bg-white/5 hover:text-bone"><LogOut size={15} /> Sign out</button>
        </div>
      </aside>

      {open && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-ink-line bg-ink/90 px-5 backdrop-blur">
          <button onClick={() => setOpen((v) => !v)} className="lg:hidden">{open ? <X size={22} /> : <Menu size={22} />}</button>
          <div className="hidden items-center gap-1 rounded-lg border border-ink-line p-0.5 sm:flex">
            <span className="rounded-md bg-amber px-2.5 py-1 text-[12px] font-bold text-ink">Admin</span>
            <Link to="/portal" className="flex items-center gap-1 rounded-md px-2.5 py-1 text-[12px] font-semibold text-bone/60 hover:text-bone"><UserRound size={13} /> Portal</Link>
            <Link to="/field" className="flex items-center gap-1 rounded-md px-2.5 py-1 text-[12px] font-semibold text-bone/60 hover:text-bone"><Smartphone size={13} /> Field</Link>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-sm text-bone/60 sm:block">Brad Ledgerwood</span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-steel font-bold text-bone">BL</span>
          </div>
        </header>
        <div className="p-5 lg:p-8"><Outlet /></div>
      </div>
    </div>
  )
}
