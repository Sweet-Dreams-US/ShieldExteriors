import { Link } from 'react-router-dom'
import { Home, ArrowRight } from 'lucide-react'
import { ShieldMark } from '../components/ui'
import { useSEO } from '../lib/seo'

export default function NotFound() {
  useSEO({ title: 'Page Not Found | Shield Exteriors', description: 'That page has moved or no longer exists.' })
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center text-bone grain">
      <ShieldMark size={64} />
      <div className="mt-6 h-display text-7xl text-amber">404</div>
      <h1 className="mt-2 h-display text-2xl">This page slipped off the roof.</h1>
      <p className="mt-2 max-w-sm text-bone/65">The page you’re after has moved or no longer exists — but your free inspection hasn’t.</p>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <Link to="/" className="btn-amber"><Home size={18} /> Back home</Link>
        <Link to="/contact" className="btn-ghost text-bone">Get a free inspection <ArrowRight size={16} /></Link>
      </div>
    </section>
  )
}
