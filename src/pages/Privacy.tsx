import { PageHero } from '../components/sections'
import { useSEO } from '../lib/seo'

const SECTIONS = [
  { h: 'Overview', p: 'Shield Exteriors respects your privacy. This policy explains what we collect when you use our website or request a free inspection, and how we use it. (Demo content for SweetDreams Studios — replace with finalized legal copy before launch.)' },
  { h: 'Information we collect', p: 'When you submit a form, we collect the details you provide: name, phone, email, address/ZIP, and the service you’re interested in. We also collect standard analytics data (pages visited, device type) to improve the site.' },
  { h: 'How we use it', p: 'To contact you about your inspection or quote, to schedule and complete work, and to improve our services. We do not sell your personal information.' },
  { h: 'Call & form tracking', p: 'We use call tracking and form analytics to understand which marketing channels work, so we can serve homeowners better. Calls may be recorded for quality and training.' },
  { h: 'Your choices', p: 'You can opt out of marketing messages at any time, and request that we delete your information by contacting hello@shieldexteriors.com.' },
  { h: 'Contact', p: 'Questions about this policy? Call (260) 818-6072 or email hello@shieldexteriors.com.' },
]

export default function Privacy() {
  useSEO({ title: 'Privacy Policy | Shield Exteriors', description: 'How Shield Exteriors collects and uses your information.' })
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" sub="Last updated June 2026." />
      <section className="bg-bone py-16">
        <div className="wrap-tight space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.h}>
              <h2 className="h-display text-xl text-ink">{s.h}</h2>
              <p className="mt-2 text-[16px] leading-relaxed text-ink/70">{s.p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
