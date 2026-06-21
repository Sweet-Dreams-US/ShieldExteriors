import { PageHero, FaqAccordion, CtaBand } from '../components/sections'
import { Reveal } from '../components/ui'
import { CtaButton } from '../components/LeadModal'
import { FAQS } from '../data/site'
import { useSEO } from '../lib/seo'

const GROUPS = ['Warranty', 'Metal', 'Cost', 'Process'] as const

export default function FAQ() {
  useSEO({
    title: 'Roofing FAQ | Shield Exteriors — Warranty, Metal, Cost & Process',
    description:
      'Answers to the most common roofing questions: the accident-free warranty, why metal is worth it, cost & financing, and what a free inspection involves.',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  })
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={<>Questions, <span className="text-amber">answered straight.</span></>}
        sub="No fine print, no runaround. If you don’t see your question, just ask us on a free inspection."
      />

      <section className="bg-bone py-16">
        <div className="wrap space-y-12">
          {GROUPS.map((g) => (
            <Reveal key={g}>
              <h2 className="mb-4 h-display text-2xl text-ink">{g}</h2>
              <FaqAccordion items={FAQS.filter((f) => f.group === g).map(({ q, a }) => ({ q, a }))} />
            </Reveal>
          ))}
          <Reveal>
            <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-amber/30 bg-ink p-8 text-center text-bone grain">
              <h3 className="h-display text-2xl">Still have a question?</h3>
              <p className="max-w-md text-bone/75">Get a real answer from a real expert — on the house.</p>
              <CtaButton source="FAQ">Get My Free Inspection</CtaButton>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
