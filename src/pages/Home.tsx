import ScrollHero from '../components/hero/ScrollHero'
import TrustBar from '../components/TrustBar'
import {
  ShieldPromise, ServicesGrid, WhyShield, BrandVideo, BeforeAfterSection,
  ReviewsStrip, FinancingBand, ServiceAreaBand, StatsBand, CtaBand,
} from '../components/sections'
import { useSEO, localBusinessSchema } from '../lib/seo'

export default function Home() {
  useSEO({
    title: "Shield Exteriors | Metal & Asphalt Roofing — Protected for Life | NE Indiana",
    description:
      "Northeast Indiana's metal & asphalt roofing experts. 5,000+ roofs, 1,000+ five-star reviews, and the only TRUE accident-free lifetime warranty in the Midwest. Get your free inspection.",
    schema: localBusinessSchema,
  })
  return (
    <>
      <ScrollHero />
      <TrustBar />
      <StatsBand />
      <ShieldPromise />
      <ServicesGrid />
      <WhyShield />
      <BrandVideo />
      <BeforeAfterSection />
      <ReviewsStrip />
      <FinancingBand />
      <ServiceAreaBand />
      <CtaBand />
    </>
  )
}
