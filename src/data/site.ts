import { asset } from '../lib/utils'

/* ----------------------------- Brand ----------------------------- */
export const BRAND = {
  name: 'Shield Exteriors',
  tagline: 'Protected for Life',
  promise: 'The Last Roof You’ll Ever Buy',
  phone: '(260) 818-6072',
  phoneHref: 'tel:+12608186072',
  email: 'hello@shieldexteriors.com',
  cta: 'Get My Free Inspection',
  ctaShort: 'Free Inspection',
  hq: 'Garrett, Indiana',
  hours: 'Mon–Sat · 7:00 AM – 7:00 PM',
}

/* ----------------------------- Proof stack ----------------------------- */
export const STATS = [
  { value: 5000, suffix: '+', label: 'Roofs installed' },
  { value: 1000, suffix: '+', label: '5-star reviews' },
  { value: 0, suffix: '', label: 'Complaints, ever' },
  { value: 100, suffix: '+', label: 'Years combined experience' },
]

export const TRUST = [
  '1,000+ 5-Star Reviews',
  'A+ BBB Accredited',
  '0 Complaints',
  'Free Repairs for Life',
]

export const BADGES = [
  'A+ BBB Accredited',
  '2022 BBB Torch Award',
  '1,000+ 5-Star Reviews',
  'MRA Member',
  'Made in the Midwest',
  '0 Complaints Ever',
]

/* ----------------------------- Financing ----------------------------- */
export const FINANCING = {
  headline: 'A 50-Year Roof for About $69 a Month.',
  monthly: 69,
  down: 0,
  apr: 'Under 5% APR (OAC)',
  bullets: [
    '$0 down to get started',
    'Rates under 5% APR (on approved credit)',
    '100% financing available',
    'Payments as low as ~$69/mo',
    'Quick approval, no obligation',
  ],
  disclaimer:
    'Estimated payment for illustration only; final terms on approved credit. Confirm current rates with Shield.',
}

/* ----------------------------- Navigation ----------------------------- */
export interface NavItem {
  label: string
  to: string
  children?: { label: string; to: string; desc?: string }[]
}

export const PRIMARY_NAV: NavItem[] = [
  {
    label: 'Metal Roofing',
    to: '/metal-roofing',
    children: [
      { label: 'Standing Seam', to: '/metal-roofing/standing-seam', desc: 'The flagship — sleek, sealed, fastener-free' },
      { label: 'Ribbed (Imperial)', to: '/metal-roofing/ribbed-imperial', desc: 'Rugged value, proven panel' },
      { label: 'Metal Shingle', to: '/metal-roofing/metal-shingle', desc: 'Classic look, metal toughness' },
    ],
  },
  { label: 'Asphalt', to: '/asphalt-roofing' },
  { label: 'Warranty', to: '/warranty' },
  { label: 'Financing', to: '/financing' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'About', to: '/about' },
]

export const FOOTER_NAV = {
  Roofing: [
    { label: 'Metal Roofing', to: '/metal-roofing' },
    { label: 'Standing Seam', to: '/metal-roofing/standing-seam' },
    { label: 'Ribbed / Imperial', to: '/metal-roofing/ribbed-imperial' },
    { label: 'Metal Shingle', to: '/metal-roofing/metal-shingle' },
    { label: 'Asphalt Shingles', to: '/asphalt-roofing' },
    { label: 'Gutters & Guards', to: '/gutters' },
  ],
  Company: [
    { label: 'The Shield Warranty', to: '/warranty' },
    { label: 'Financing', to: '/financing' },
    { label: 'Reviews & Results', to: '/reviews' },
    { label: 'About Us', to: '/about' },
    { label: 'Careers', to: '/careers' },
    { label: 'Blog / Learn', to: '/blog' },
  ],
  Resources: [
    { label: 'Service Area', to: '/service-area' },
    { label: 'Free Inspection', to: '/contact' },
    { label: 'Storm Damage', to: '/storm-damage' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Crew Portal', to: '/admin' },
  ],
}

/* ----------------------------- Services ----------------------------- */
export interface Service {
  slug: string
  name: string
  short: string
  blurb: string
  image: string
  lifespan?: string
  priceTier?: string
  bullets: string[]
  ideal?: string
}

export const SERVICES: Service[] = [
  {
    slug: 'metal-roofing',
    name: 'Metal Roofing',
    short: 'Built to outlast you',
    blurb:
      'Standing seam, ribbed, and metal shingle systems engineered for 50–80 years of Midwest weather. Worth 2–3× asphalt for a reason.',
    image: asset('assets/metal-standing-seam.webp'),
    lifespan: '50–80 yrs',
    priceTier: 'Premium',
    bullets: ['50–80 year lifespan', 'Energy savings & cooler attics', 'Resale value up to +6%', 'Virtually maintenance-free'],
    ideal: 'Homeowners who never want to think about their roof again.',
  },
  {
    slug: 'asphalt-roofing',
    name: 'Asphalt Shingles',
    short: 'Class-4 tough',
    blurb:
      'Premium polymer-modified, Class-4 impact-rated architectural shingles with a lifetime transferable warranty — the smart value lane.',
    image: asset('assets/asphalt-shingle.webp'),
    lifespan: '25–40 yrs',
    priceTier: 'Value',
    bullets: ['Class-4 impact rated', 'Polymer-modified durability', 'Lifetime transferable warranty', 'Dozens of colors'],
    ideal: 'Budget-minded homeowners who still want serious protection.',
  },
  {
    slug: 'gutters',
    name: 'Gutters & Guards',
    short: 'Finish the system',
    blurb:
      'Seamless gutters, micro-mesh guards, soffit and fascia — installed with your metal roof and covered by the same accident-free promise.',
    image: asset('assets/gutters.webp'),
    lifespan: 'Lifetime',
    priceTier: 'Add-on',
    bullets: ['Seamless, color-matched', 'Micro-mesh guards', 'Soffit & fascia', 'Same lifetime coverage'],
    ideal: 'Anyone tired of cleaning gutters twice a year.',
  },
]

export interface MetalType {
  slug: string
  name: string
  tier: string
  look: string
  durability: string
  ideal: string
  blurb: string
  image: string
}

export const METAL_TYPES: MetalType[] = [
  {
    slug: 'standing-seam',
    name: 'Standing Seam',
    tier: 'Flagship · $$$',
    look: 'Clean vertical lines, hidden fasteners, modern and architectural.',
    durability: '60–80 years',
    ideal: 'The forever home. The statement roof.',
    blurb:
      'Concealed-fastener panels with raised, sealed seams — nothing for water or wind to pry at. The most weather-tight, longest-living roof we install.',
    image: asset('assets/metal-standing-seam.webp'),
  },
  {
    slug: 'ribbed-imperial',
    name: 'Ribbed (Imperial)',
    tier: 'Rugged value · $$',
    look: 'Bold exposed-fastener ribs with a classic agricultural-meets-modern profile.',
    durability: '40–60 years',
    ideal: 'Maximum metal lifespan at a friendlier price.',
    blurb:
      'A proven, time-tested panel that brings most of the benefits of metal — longevity, energy savings, toughness — at a more accessible price point.',
    image: asset('assets/metal-shingle.webp'),
  },
  {
    slug: 'metal-shingle',
    name: 'Metal Shingle',
    tier: 'Best of both · $$$',
    look: 'The dimensional look of slate or shake — with the strength of steel.',
    durability: '50–70 years',
    ideal: 'Traditional curb appeal, modern performance.',
    blurb:
      'Stamped metal shingles give you the timeless look of premium asphalt, slate, or cedar shake while delivering the lifespan and impact resistance of metal.',
    image: asset('assets/metal-shingle.webp'),
  },
]

/* ----------------------------- Why Shield ----------------------------- */
export const WHY_SHIELD = [
  {
    title: 'The only TRUE accident-free lifetime warranty',
    body: 'Free Repairs for Life — even acts of nature. Transferable to the next owner. We handle the insurance.',
  },
  {
    title: '1,000+ five-star reviews',
    body: 'Five thousand roofs and a thousand happy neighbors across Northeast Indiana. The proof is public.',
  },
  {
    title: 'A+ BBB, zero complaints — ever',
    body: 'Accredited, Torch Award–winning, and not a single complaint on record. That’s not luck. It’s a standard.',
  },
  {
    title: 'Free, no-pressure inspections',
    body: 'A real expert, an honest assessment, and zero high-pressure sales theater. The anti-Erie.',
  },
]

/* ----------------------------- Service area ----------------------------- */
export interface City {
  slug: string
  name: string
  state: 'IN' | 'OH' | 'MI'
  county: string
  population: string
  intro: string
  weather: string
  job: { title: string; detail: string; image: string }
  review: { name: string; text: string }
}

export const CITIES: City[] = [
  {
    slug: 'fort-wayne',
    name: 'Fort Wayne',
    state: 'IN',
    county: 'Allen County',
    population: '~270,000',
    intro:
      'As Northeast Indiana’s largest city, Fort Wayne homes take a beating from lake-effect snow loads, summer hail, and wild temperature swings. Shield has re-roofed hundreds of homes from Aboite to St. Joe.',
    weather:
      'Heavy freeze-thaw cycles and summer hail make a sealed, impact-rated roof a genuine upgrade here — not a luxury.',
    job: {
      title: 'Full standing-seam replacement · Aboite',
      detail: 'Tore off two failing layers of asphalt and installed charcoal standing seam with new gutters and guards in three days.',
      image: asset('assets/city-fort-wayne.webp'),
    },
    review: { name: 'Karen M., Fort Wayne', text: 'From the inspection to cleanup, the most professional contractor we’ve ever hired. The metal roof is gorgeous.' },
  },
  {
    slug: 'auburn',
    name: 'Auburn',
    state: 'IN',
    county: 'DeKalb County',
    population: '~14,000',
    intro:
      'Home of the Auburn Cord Duesenberg legacy, Auburn’s historic and newer neighborhoods alike trust Shield for roofs that match the town’s pride in things built to last.',
    weather: 'Open DeKalb County wind and winter ice make standing seam and quality gutters a smart pairing.',
    job: {
      title: 'Metal shingle + gutter guards · Downtown Auburn',
      detail: 'Dimensional metal shingle that kept the historic look while adding 60+ years of life.',
      image: asset('assets/home-hero-golden.webp'),
    },
    review: { name: 'Doug R., Auburn', text: 'Local, honest, and the warranty sold us. No one else even comes close.' },
  },
  {
    slug: 'garrett',
    name: 'Garrett',
    state: 'IN',
    county: 'DeKalb County',
    population: '~6,300',
    intro:
      'Garrett is home. It’s where Shield was founded and where our roots run deepest — and we treat every Garrett roof like it’s on our own street, because it might be.',
    weather: 'Railroad-town homes of every era — we’ve seen (and fixed) it all right here.',
    job: {
      title: 'Founder’s neighborhood standing seam · Garrett',
      detail: 'A full charcoal standing-seam system on a classic two-story, finished with seamless gutters.',
      image: asset('assets/home-hero-golden.webp'),
    },
    review: { name: 'Patty H., Garrett', text: 'Brad and his crew are the real deal. Proud to have a Garrett company on my roof.' },
  },
  {
    slug: 'angola',
    name: 'Angola',
    state: 'IN',
    county: 'Steuben County',
    population: '~9,000',
    intro:
      'Lake country. From Lake James to Crooked Lake, Angola’s waterfront and year-round homes need roofs that shrug off wind, ice, and relentless sun off the water.',
    weather: 'Lakefront wind exposure makes a sealed standing-seam system especially valuable.',
    job: {
      title: 'Lakefront standing seam · Lake James',
      detail: 'Wind-rated standing seam for a waterfront home with a tricky multi-pitch design.',
      image: asset('assets/home-hero-golden.webp'),
    },
    review: { name: 'Mark T., Angola', text: 'Our lake house has never looked better — and we’ll never re-roof again.' },
  },
  {
    slug: 'kendallville',
    name: 'Kendallville',
    state: 'IN',
    county: 'Noble County',
    population: '~10,000',
    intro:
      'Kendallville homeowners value a fair deal and a job done right. Shield delivers both, with financing that makes a forever roof reachable.',
    weather: 'Noble County hail and snow load reward an impact-rated, sealed roof system.',
    job: {
      title: 'Asphalt-to-metal upgrade · Kendallville',
      detail: 'Switched a homeowner from a third asphalt roof to standing seam at ~$71/mo financed.',
      image: asset('assets/home-hero-golden.webp'),
    },
    review: { name: 'Sara L., Kendallville', text: 'The financing made it a no-brainer. Wish we’d done metal the first time.' },
  },
  {
    slug: 'columbia-city',
    name: 'Columbia City',
    state: 'IN',
    county: 'Whitley County',
    population: '~9,500',
    intro:
      'From historic downtown to newer subdivisions, Columbia City trusts Shield for honest inspections and roofs that hold up to Whitley County weather.',
    weather: 'Big seasonal swings make ventilation and a sealed roof deck a real performance upgrade.',
    job: {
      title: 'Storm-damage metal replacement · Columbia City',
      detail: 'Handled the full insurance claim and installed a charcoal metal roof the homeowner loves.',
      image: asset('assets/home-hero-golden.webp'),
    },
    review: { name: 'Greg P., Columbia City', text: 'They handled the insurance company so I didn’t have to. Incredible service.' },
  },
  {
    slug: 'decatur',
    name: 'Decatur',
    state: 'IN',
    county: 'Adams County',
    population: '~9,500',
    intro:
      'Decatur’s tight-knit community appreciates a contractor who shows up, tells the truth, and stands behind the work for life.',
    weather: 'Adams County wind and rain make seamless gutters a worthwhile pairing with any roof.',
    job: {
      title: 'Metal shingle + gutters · Decatur',
      detail: 'A complete exterior refresh: metal shingle roof, seamless gutters, and guards.',
      image: asset('assets/home-hero-golden.webp'),
    },
    review: { name: 'Lisa W., Decatur', text: 'Crew was respectful, fast, and cleaned up perfectly. Five stars isn’t enough.' },
  },
  {
    slug: 'huntington',
    name: 'Huntington',
    state: 'IN',
    county: 'Huntington County',
    population: '~17,000',
    intro:
      'Lime City homeowners are choosing metal in record numbers — and Shield’s accident-free warranty is the reason most of them call us first.',
    weather: 'Reservoir-area wind and storms make a sealed, wind-rated roof a smart investment.',
    job: {
      title: 'Standing seam over living space · Huntington',
      detail: 'Quiet, sealed, and beautiful — engineered for a home with vaulted ceilings below.',
      image: asset('assets/home-hero-golden.webp'),
    },
    review: { name: 'Tom B., Huntington', text: 'No pressure, no gimmicks, just a great roof and a great price.' },
  },
  {
    slug: 'warsaw',
    name: 'Warsaw',
    state: 'IN',
    county: 'Kosciusko County',
    population: '~16,000',
    intro:
      'In the heart of Indiana’s lake country and orthopedic capital, Warsaw homes deserve a roof as well-engineered as the city itself.',
    weather: 'Lake-effect snow and wind reward a roof system built to shed both.',
    job: {
      title: 'Whole-home standing seam · Warsaw',
      detail: 'A statement charcoal roof for a lakeside home, finished in four days.',
      image: asset('assets/home-hero-golden.webp'),
    },
    review: { name: 'Nicole F., Warsaw', text: 'Worth every penny. The crew treated our home like their own.' },
  },
  {
    slug: 'defiance',
    name: 'Defiance',
    state: 'OH',
    county: 'Defiance County',
    population: '~16,000',
    intro:
      'Shield proudly crosses the state line to Defiance, bringing the same Midwest warranty and craftsmanship to Northwest Ohio homeowners.',
    weather: 'Where three rivers meet, water management and sealed roofing matter more than most.',
    job: {
      title: 'Asphalt-to-metal upgrade · Defiance, OH',
      detail: 'A Class-4 asphalt tear-off replaced with a lifetime standing-seam system.',
      image: asset('assets/home-hero-golden.webp'),
    },
    review: { name: 'Ed K., Defiance OH', text: 'Drove right across the line for us and did better work than the locals.' },
  },
  {
    slug: 'bryan',
    name: 'Bryan',
    state: 'OH',
    county: 'Williams County',
    population: '~8,500',
    intro:
      'Bryan homeowners get the full Shield treatment — honest inspections, premium metal, and a warranty no Ohio competitor can match.',
    weather: 'Flat, open Williams County terrain means wind-driven rain and snow are the real test.',
    job: {
      title: 'Ribbed metal + guards · Bryan, OH',
      detail: 'Rugged ribbed panel with micro-mesh gutter guards for a working family home.',
      image: asset('assets/home-hero-golden.webp'),
    },
    review: { name: 'Janet S., Bryan OH', text: 'The warranty is unreal. Free repairs for life — and they mean it.' },
  },
  {
    slug: 'coldwater',
    name: 'Coldwater',
    state: 'MI',
    county: 'Branch County',
    population: '~13,000',
    intro:
      'Shield serves South-Central Michigan from Coldwater’s lakes to its historic downtown with the Midwest’s strongest roofing warranty.',
    weather: 'Michigan winters are no joke — ice-dam-resistant detailing and metal go hand in hand.',
    job: {
      title: 'Ice-dam-proof standing seam · Coldwater, MI',
      detail: 'Sealed standing seam with upgraded ventilation to end years of ice-dam headaches.',
      image: asset('assets/home-hero-golden.webp'),
    },
    review: { name: 'Bill D., Coldwater MI', text: 'No more ice dams, no more leaks. Should have called Shield years ago.' },
  },
  {
    slug: 'hillsdale',
    name: 'Hillsdale',
    state: 'MI',
    county: 'Hillsdale County',
    population: '~8,000',
    intro:
      'Hillsdale’s historic homes and rural properties trust Shield for roofs that respect the architecture and outlast the mortgage.',
    weather: 'Rural exposure and hard winters make a sealed, low-maintenance metal roof a clear win.',
    job: {
      title: 'Historic-home metal shingle · Hillsdale, MI',
      detail: 'Dimensional metal shingle that preserved a century-old home’s character.',
      image: asset('assets/home-hero-golden.webp'),
    },
    review: { name: 'Carol N., Hillsdale MI', text: 'They understood our old house and gave it a roof to match. Beautiful work.' },
  },
]

/* ----------------------------- Reviews ----------------------------- */
export interface Review {
  name: string
  city: string
  rating: number
  text: string
  service: string
  avatar?: string
}

export const REVIEWS: Review[] = [
  {
    name: 'Karen M.',
    city: 'Fort Wayne, IN',
    rating: 5,
    service: 'Standing Seam Metal',
    avatar: asset('assets/review-woman.webp'),
    text: 'From the free inspection to the final cleanup, the most professional contractor we have ever hired. No pressure, no surprises — just a gorgeous metal roof and a warranty that actually means something.',
  },
  {
    name: 'Doug R.',
    city: 'Auburn, IN',
    rating: 5,
    service: 'Metal Shingle',
    avatar: asset('assets/review-man.webp'),
    text: 'We got three quotes. Shield was the only one that explained the accident-free warranty and didn’t play games on price. Crew was respectful and the roof looks incredible.',
  },
  {
    name: 'Sara L.',
    city: 'Kendallville, IN',
    rating: 5,
    service: 'Financing · Standing Seam',
    text: 'The financing made it a no-brainer — about $71 a month for a roof that outlives the house. Wish we’d gone metal the first time instead of replacing asphalt twice.',
  },
  {
    name: 'Greg P.',
    city: 'Columbia City, IN',
    rating: 5,
    service: 'Storm Damage',
    text: 'They handled the entire insurance claim so I didn’t have to lift a finger. Charcoal metal roof, zero out-of-pocket drama. Unbelievable service.',
  },
  {
    name: 'Tom B.',
    city: 'Huntington, IN',
    rating: 5,
    service: 'Standing Seam Metal',
    text: 'No pressure, no gimmicks. Brad’s team gave me a fair price and a roof I’ll never have to think about again. That’s exactly what I wanted.',
  },
  {
    name: 'Nicole F.',
    city: 'Warsaw, IN',
    rating: 5,
    service: 'Whole-home Metal',
    text: 'Worth every penny. They treated our lake home like their own and finished in four days. The free-repairs-for-life promise sealed the deal.',
  },
  {
    name: 'Ed K.',
    city: 'Defiance, OH',
    rating: 5,
    service: 'Asphalt-to-Metal Upgrade',
    text: 'Crossed the state line for us and did better work than any local crew. The standing seam looks like it belongs on a magazine cover.',
  },
  {
    name: 'Bill D.',
    city: 'Coldwater, MI',
    rating: 5,
    service: 'Standing Seam Metal',
    text: 'No more ice dams. No more leaks. Should have called Shield years ago. Best home decision we’ve made.',
  },
]

/* ----------------------------- FAQ ----------------------------- */
export interface FAQ {
  q: string
  a: string
  group: 'Warranty' | 'Metal' | 'Cost' | 'Process'
}

export const FAQS: FAQ[] = [
  {
    group: 'Warranty',
    q: 'What makes the Shield warranty different from every other “lifetime” warranty?',
    a: 'Most “lifetime” warranties are full of fine print that excludes the very things that damage roofs — storms, accidents, “acts of nature.” Our TRUE Double Lifetime Accident-Free Warranty covers accidents and storm damage, is transferable to the next owner, and we handle the insurance. We can offer it because we believe in the product.',
  },
  {
    group: 'Warranty',
    q: 'Is the warranty really transferable?',
    a: 'Yes. If you sell your home, the warranty transfers to the new owner — which makes your home easier to sell and worth more. The protection follows the roof, not just the buyer.',
  },
  {
    group: 'Metal',
    q: 'Why is a metal roof worth 2–3× the price of asphalt?',
    a: 'Lifespan (50–80 years vs. 15–25), energy savings from a cooler attic, resale value up to +6%, near-zero maintenance, and Class-4 impact resistance. Over the life of one metal roof you’d typically buy two or three asphalt roofs — metal is usually the cheaper choice in the long run.',
  },
  {
    group: 'Metal',
    q: 'Will a metal roof be loud when it rains?',
    a: 'No. Installed over a solid deck with proper underlayment, a modern metal roof is no louder than asphalt — many homeowners say it’s actually quieter.',
  },
  {
    group: 'Metal',
    q: 'What metal options do you install?',
    a: 'Three: standing seam (concealed-fastener, our flagship), ribbed/Imperial (rugged exposed-fastener value), and metal shingle (the dimensional look of slate or shake with the strength of steel).',
  },
  {
    group: 'Cost',
    q: 'How much does a new roof cost — and can I finance it?',
    a: 'Every roof is different, so we give honest, no-pressure quotes after a free inspection. Financing starts at $0 down with rates under 5% (OAC) and payments as low as about $69/month, so a forever roof fits a normal budget.',
  },
  {
    group: 'Process',
    q: 'What actually happens during a free inspection?',
    a: 'A real Shield expert evaluates your roof, attic ventilation, and trouble spots, takes photos, and walks you through honest options — metal, asphalt, or repair. No high-pressure pitch, no obligation. You get a clear written estimate.',
  },
  {
    group: 'Process',
    q: 'Do you handle storm and insurance claims?',
    a: 'Yes. If you’ve had storm or hail damage, we inspect for free, document everything, and work directly with your insurance company so the process is painless.',
  },
]

/* ----------------------------- Blog ----------------------------- */
export interface Post {
  slug: string
  title: string
  excerpt: string
  category: string
  read: string
  date: string
  image: string
  body: string[]
}

export const POSTS: Post[] = [
  {
    slug: 'metal-vs-shingle-honestly',
    title: 'Metal vs. Shingle, Honestly',
    excerpt:
      'No spin. Here’s exactly when a metal roof is worth 2–3× asphalt — and the handful of times it isn’t.',
    category: 'Buyer Education',
    read: '6 min',
    date: 'June 2026',
    image: asset('assets/metal-standing-seam.webp'),
    body: [
      'Every roofing company sells what makes them the most money. We’d rather sell you the truth, because honest advice is how we’ve earned 1,000+ five-star reviews.',
      'Asphalt wins on up-front price. A premium Class-4 asphalt roof is a genuinely good product — polymer-modified, impact-rated, and backed by a lifetime transferable warranty. If you plan to move in a few years, it can be the smart call.',
      'Metal wins on everything else over time: a 50–80 year lifespan, lower energy bills from a cooler attic, resale value up to +6%, and near-zero maintenance. Buy one metal roof instead of two or three asphalt roofs and metal is usually the cheaper choice in the long run.',
      'The tiebreaker for most homeowners is the warranty. Our accident-free coverage means free repairs for life — even storm and accident damage — so the “what if something happens” risk that makes people hesitate simply goes away.',
    ],
  },
  {
    slug: 'what-a-free-inspection-actually-involves',
    title: 'What a Free Inspection Actually Involves',
    excerpt:
      'Spoiler: it’s not a sales ambush. Here’s the exact 5-step process and what you’ll walk away with.',
    category: 'Process',
    read: '4 min',
    date: 'June 2026',
    image: asset('assets/crew-install.webp'),
    body: [
      'A free inspection should leave you more informed, not more pressured. Here’s how ours works.',
      'First, a real Shield expert (never a commission-only closer reading a script) walks your roof and attic. We check shingles, flashing, ventilation, and the trouble spots that cause leaks before they start.',
      'Second, we photograph everything and show you — so you see what we see. Third, we walk through honest options: repair, asphalt, or metal, with real numbers. Fourth, we explain financing if you want it. Fifth, you get a clear written estimate and we leave. No “sign tonight for this price” theater.',
    ],
  },
  {
    slug: 'is-your-lifetime-warranty-real',
    title: 'Is Your “Lifetime” Warranty Actually Real?',
    excerpt:
      'Four questions that expose whether a roofing warranty will be there when you need it.',
    category: 'Warranty',
    read: '5 min',
    date: 'May 2026',
    image: asset('assets/home-hero-golden.webp'),
    body: [
      'The word “lifetime” does a lot of heavy lifting in roofing marketing — and most of it is fine print.',
      'Ask these four questions of any warranty: (1) Does it cover storm and accident damage, or are “acts of nature” excluded? (2) Is it transferable to the next owner? (3) Who handles the insurance claim — you or them? (4) Is it the manufacturer’s material-only warranty, or does it include workmanship for life?',
      'Shield’s TRUE Double Lifetime Accident-Free Warranty answers all four the way you’d hope: yes, yes, we do, and both. That’s the difference between a marketing word and a real promise.',
    ],
  },
]

/* ----------------------------- Careers ----------------------------- */
export const ROLES = [
  {
    title: 'Canvasser',
    pay: '$18–25/hr + bonuses',
    blurb: 'Be the friendly face of Shield in the neighborhood. Set inspections, earn per appointment, grow into sales.',
  },
  {
    title: 'Event Coordinator',
    pay: '$45k–65k + bonuses',
    blurb: 'Run home shows, fairs, and community events that fill our inspection calendar. Outgoing, organized, unstoppable.',
  },
  {
    title: 'Sales Representative',
    pay: '$80k–150k+ (uncapped)',
    blurb: 'No cold calls — we hand you warm, pre-set inspections. Sell the best warranty in the Midwest with zero pressure.',
  },
]
