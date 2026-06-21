/** Base-path-aware asset URL (works on GitHub Pages under /ShieldExteriors/). */
export const asset = (p: string) => import.meta.env.BASE_URL + p.replace(/^\/+/, '')

/** Tiny classNames helper. */
export const cn = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(' ')

export const PHONE = '(260) 818-6072'
export const PHONE_HREF = 'tel:+12608186072'

export const money = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const initials = (name: string) =>
  name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()

/** Relative "x ago" for the admin feed. */
export const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.round(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.round(m / 60)
  if (h < 24) return `${h}h ago`
  const d = Math.round(h / 24)
  return `${d}d ago`
}
