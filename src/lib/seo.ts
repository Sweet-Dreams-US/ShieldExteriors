import { useEffect } from 'react'

interface SEO {
  title: string
  description?: string
  /** JSON-LD structured data object(s). */
  schema?: Record<string, unknown> | Record<string, unknown>[]
}

const SCHEMA_ID = 'shield-jsonld-page'

/**
 * Lightweight per-page SEO: sets <title>, meta description, and injects
 * JSON-LD structured data. Since this is a client-rendered demo, this keeps
 * the title/description discipline the rebuild plan calls for.
 */
export function useSEO({ title, description, schema }: SEO) {
  useEffect(() => {
    document.title = title

    if (description) {
      let m = document.querySelector('meta[name="description"]')
      if (!m) {
        m = document.createElement('meta')
        m.setAttribute('name', 'description')
        document.head.appendChild(m)
      }
      m.setAttribute('content', description)
    }

    const prev = document.getElementById(SCHEMA_ID)
    if (prev) prev.remove()
    if (schema) {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.id = SCHEMA_ID
      s.textContent = JSON.stringify(schema)
      document.head.appendChild(s)
    }

    return () => {
      const s = document.getElementById(SCHEMA_ID)
      if (s) s.remove()
    }
  }, [title, description, JSON.stringify(schema)])
}

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'RoofingContractor',
  name: 'Shield Exteriors',
  description:
    "Northeast Indiana's metal & asphalt roofing experts. The only TRUE accident-free lifetime warranty in the Midwest.",
  telephone: '+1-260-818-6072',
  areaServed: 'Northeast Indiana, Northwest Ohio, South-Central Michigan',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '1000',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Garrett',
    addressRegion: 'IN',
    addressCountry: 'US',
  },
}
