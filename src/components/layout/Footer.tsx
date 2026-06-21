import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react'
import { ShieldMark, Marquee } from '../ui'
import { CtaButton } from '../LeadModal'
import { BRAND, FOOTER_NAV, BADGES } from '../../data/site'
import { PHONE, PHONE_HREF } from '../../lib/utils'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-bone grain">
      {/* Badge marquee */}
      <div className="border-b border-ink-line/60 py-4 text-amber/90">
        <Marquee items={BADGES} />
      </div>

      <div className="wrap grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <ShieldMark size={40} />
            <span className="leading-none">
              <span className="block h-display text-xl text-bone">SHIELD</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.34em] text-amber">Exteriors</span>
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-bone/60">
            Northeast Indiana’s metal & asphalt roofing experts. 5,000+ roofs and the only TRUE accident-free lifetime
            warranty in the Midwest.
          </p>
          <div className="mt-6 space-y-2.5 text-sm">
            <a href={PHONE_HREF} className="flex items-center gap-2.5 font-semibold text-bone hover:text-amber">
              <Phone size={16} className="text-amber" /> {PHONE}
            </a>
            <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2.5 text-bone/70 hover:text-bone">
              <Mail size={16} className="text-amber" /> {BRAND.email}
            </a>
            <span className="flex items-center gap-2.5 text-bone/70">
              <MapPin size={16} className="text-amber" /> {BRAND.hq} · serving IN · OH · MI
            </span>
          </div>
        </div>

        {Object.entries(FOOTER_NAV).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-[12px] font-bold uppercase tracking-[0.2em] text-amber">{title}</h4>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-bone/65 transition-colors hover:text-bone">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA strip */}
      <div className="border-t border-ink-line/60">
        <div className="wrap flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <ShieldCheck size={18} className="text-amber" /> Ready for the last roof you’ll ever buy?
          </p>
          <CtaButton>Get My Free Inspection</CtaButton>
        </div>
      </div>

      <div className="border-t border-ink-line/60">
        <div className="wrap flex flex-col items-center justify-between gap-2 py-5 text-[12.5px] text-bone/45 sm:flex-row">
          <span>© {new Date().getFullYear()} Shield Exteriors. Protected for Life.™ All rights reserved.</span>
          <span className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-bone/80">Privacy</Link>
            <Link to="/faq" className="hover:text-bone/80">FAQ</Link>
            <Link to="/admin" className="hover:text-bone/80">Crew Portal</Link>
            <span>Site demo by SweetDreams Studios</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
