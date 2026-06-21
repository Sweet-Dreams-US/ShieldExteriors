import { useSyncExternalStore } from 'react'

/* ============================================================
   THE SHIELD OS — single source of truth (client-side demo)
   One record flows: LEAD → CONTACT → ESTIMATE → CONTRACT → JOB
   → INVOICE → WARRANTY → SERVICE TICKET. The public funnel writes
   leads; every admin module + the customer portal + field app read
   and mutate this same store. Persisted to localStorage.
   ============================================================ */

/* ----------------------------- Pipeline ----------------------------- */
export type Stage = 'new' | 'contacted' | 'scheduled' | 'estimate' | 'won' | 'lost'

export const STAGES: { id: Stage; label: string; tone: string }[] = [
  { id: 'new', label: 'New Lead', tone: '#1b6fa8' },
  { id: 'contacted', label: 'Contacted', tone: '#6b54c6' },
  { id: 'scheduled', label: 'Inspection Set', tone: '#c98a1b' },
  { id: 'estimate', label: 'Estimate Sent', tone: '#b5651d' },
  { id: 'won', label: 'Won', tone: '#1f9d6b' },
  { id: 'lost', label: 'Lost', tone: '#9aa3ad' },
]

export type Priority = 'hot' | 'warm' | 'cold'

export interface Lead {
  id: string
  name: string
  phone: string
  email: string
  address?: string
  city: string
  zip?: string
  service: string
  message?: string
  source: string
  stage: Stage
  priority: Priority
  value: number
  assignedCrewId?: string
  repId?: string
  apptAt?: string
  createdAt: string
  updatedAt: string
}

/* ----------------------------- People ----------------------------- */
export interface Staff {
  id: string
  name: string
  role: string
  phone: string
  status: 'active' | 'pto' | 'off'
  avatarTone: string
  commissionMtd?: number
  dealsMtd?: number
}

export interface Crew {
  id: string
  name: string
  leadName: string
  members: string[]
  color: string
  specialty: string
}

/* ----------------------------- Production / Schedule ----------------------------- */
export type ProdStage = 'material' | 'scheduled' | 'production' | 'punch' | 'complete'
export const PROD_STAGES: { id: ProdStage; label: string; tone: string }[] = [
  { id: 'material', label: 'Material Ordered', tone: '#6b54c6' },
  { id: 'scheduled', label: 'Scheduled', tone: '#1b6fa8' },
  { id: 'production', label: 'In Production', tone: '#c98a1b' },
  { id: 'punch', label: 'Punch List', tone: '#b5651d' },
  { id: 'complete', label: 'Complete', tone: '#1f9d6b' },
]

export interface Job {
  id: string
  title: string
  customer: string
  city: string
  address?: string
  crewId: string
  type: 'install' | 'inspection' | 'repair' | 'estimate'
  product?: string
  date: string // yyyy-mm-dd
  start: string // HH:MM
  durationDays: number
  value: number
  status: 'scheduled' | 'in_progress' | 'done'
  prodStage: ProdStage
  poStatus: 'pending' | 'ordered' | 'delivered'
  checklistDone: number
  checklistTotal: number
  photos: number
}

/* ----------------------------- Estimates ----------------------------- */
export interface EstimateLine { item: string; qty: number; unit: string; price: number }
export interface Estimate {
  id: string
  number: string
  customer: string
  city: string
  product: string
  lines: EstimateLine[]
  total: number
  monthly: number
  status: 'draft' | 'sent' | 'accepted' | 'declined'
  createdAt: string
}

/* ----------------------------- Invoices ----------------------------- */
export interface Invoice {
  id: string
  number: string
  customer: string
  city: string
  jobTitle: string
  type: 'deposit' | 'progress' | 'final'
  amount: number
  paid: number
  status: 'draft' | 'sent' | 'partial' | 'paid' | 'overdue'
  cost: number // job cost for margin
  dueDate: string
  createdAt: string
}

/* ----------------------------- Warranty ----------------------------- */
export interface Warranty {
  id: string
  cardNo: string
  homeowner: string
  address: string
  city: string
  products: string
  installDate: string
  coverage: string
  status: 'active' | 'transferred'
  transferable: boolean
  photos: number
}

export interface ServiceTicket {
  id: string
  warrantyCardNo: string
  homeowner: string
  city: string
  issue: string
  priority: Priority
  status: 'new' | 'scheduled' | 'in_progress' | 'resolved'
  createdAt: string
}

/* ----------------------------- Recruiting (ATS) ----------------------------- */
export type AppStage = 'applied' | 'screening' | 'interview' | 'offer' | 'hired'
export const APP_STAGES: { id: AppStage; label: string; tone: string }[] = [
  { id: 'applied', label: 'Applied', tone: '#1b6fa8' },
  { id: 'screening', label: 'Phone Screen', tone: '#6b54c6' },
  { id: 'interview', label: 'Interview', tone: '#c98a1b' },
  { id: 'offer', label: 'Offer', tone: '#b5651d' },
  { id: 'hired', label: 'Hired', tone: '#1f9d6b' },
]
export interface Applicant {
  id: string
  name: string
  role: string
  source: string
  stage: AppStage
  createdAt: string
}

/* ----------------------------- Marketing ----------------------------- */
export interface Campaign {
  id: string
  name: string
  channel: 'email' | 'sms'
  audience: string
  recipients: number
  opens: number
  clicks: number
  status: 'sent' | 'scheduled' | 'draft'
  date: string
}

/* ----------------------------- Automations ----------------------------- */
export interface Automation {
  id: string
  name: string
  trigger: string
  action: string
  enabled: boolean
  runs: number
}

/* ----------------------------- Canvassing ----------------------------- */
export interface Territory {
  id: string
  name: string
  rep: string
  color: string
  knocked: number
  contacts: number
  appointments: number
}

interface DB {
  leads: Lead[]
  staff: Staff[]
  crews: Crew[]
  jobs: Job[]
  estimates: Estimate[]
  invoices: Invoice[]
  warranties: Warranty[]
  tickets: ServiceTicket[]
  applicants: Applicant[]
  campaigns: Campaign[]
  automations: Automation[]
  territories: Territory[]
  seededAt: string
}

const KEY = 'shield_os_v1'

/* ----------------------------- helpers ----------------------------- */
let counter = 0
const uid = (p = 'id') => `${p}_${Date.now().toString(36)}${(counter++).toString(36)}${Math.floor(Math.random() * 1e6).toString(36)}`
const iso = (offsetMin = 0) => new Date(Date.now() + offsetMin * 60000).toISOString()
const dayStr = (offsetDays: number) => { const d = new Date(); d.setDate(d.getDate() + offsetDays); return d.toISOString().slice(0, 10) }

/* ----------------------------- seed ----------------------------- */
function seed(): DB {
  const staff: Staff[] = [
    { id: 's1', name: 'Brad Ledgerwood', role: 'Owner / Founder', phone: '(260) 818-6072', status: 'active', avatarTone: '#11486d' },
    { id: 's2', name: 'Marcus Hale', role: 'Crew Lead — Metal', phone: '(260) 555-0142', status: 'active', avatarTone: '#1f9d6b' },
    { id: 's3', name: 'Tyler Boz', role: 'Crew Lead — Asphalt', phone: '(260) 555-0177', status: 'active', avatarTone: '#b5651d' },
    { id: 's4', name: 'Denise Carver', role: 'Office / Scheduling', phone: '(260) 555-0190', status: 'active', avatarTone: '#6b54c6' },
    { id: 's5', name: 'Jordan Pruitt', role: 'Sales Rep', phone: '(260) 555-0123', status: 'active', avatarTone: '#c98a1b', commissionMtd: 9400, dealsMtd: 4 },
    { id: 's6', name: 'Kayla Friend', role: 'Sales Rep', phone: '(260) 555-0144', status: 'pto', avatarTone: '#1b6fa8', commissionMtd: 6200, dealsMtd: 3 },
    { id: 's7', name: 'Owen Reyes', role: 'Canvasser', phone: '(260) 555-0166', status: 'active', avatarTone: '#9a4f2b', commissionMtd: 1850, dealsMtd: 0 },
    { id: 's8', name: 'Sam Whitfield', role: 'Installer', phone: '(260) 555-0188', status: 'off', avatarTone: '#2b6f9a' },
    { id: 's9', name: 'Renee Park', role: 'Event Coordinator', phone: '(260) 555-0151', status: 'active', avatarTone: '#1f9d6b', commissionMtd: 2100, dealsMtd: 0 },
  ]

  const crews: Crew[] = [
    { id: 'c1', name: 'Crew A — Hale', leadName: 'Marcus Hale', members: ['Owen Reyes', 'Sam Whitfield', '+2'], color: '#1f9d6b', specialty: 'Standing seam metal' },
    { id: 'c2', name: 'Crew B — Boz', leadName: 'Tyler Boz', members: ['Diego R.', 'Cole H.', '+1'], color: '#b5651d', specialty: 'Asphalt & metal shingle' },
    { id: 'c3', name: 'Crew C — Gutters', leadName: 'Hank Mills', members: ['Pat V.', 'Lon S.'], color: '#1b6fa8', specialty: 'Gutters & guards' },
  ]

  const reps = ['s5', 's6']
  const L = (p: Partial<Lead> & Pick<Lead, 'name' | 'city' | 'service' | 'stage' | 'value'>): Lead => ({
    id: uid('lead'), phone: '(260) 555-0100', email: 'homeowner@example.com', source: 'Website — Free Inspection',
    priority: 'warm', repId: reps[Math.floor(Math.random() * reps.length)],
    createdAt: iso(-Math.floor(Math.random() * 4000)), updatedAt: iso(-Math.floor(Math.random() * 1000)), ...p,
  })

  const leads: Lead[] = [
    L({ name: 'Megan Albright', city: 'Fort Wayne', service: 'Standing Seam Metal', stage: 'new', value: 28500, priority: 'hot', source: 'Google LSA', address: '4821 Aboite Center Rd', zip: '46804', message: 'Roof is 22 years old, missing shingles after last storm.', createdAt: iso(-18) }),
    L({ name: 'Reuben Stoltzfus', city: 'Auburn', service: 'Metal Shingle', stage: 'new', value: 24100, priority: 'hot', source: 'Website — Free Inspection', createdAt: iso(-46) }),
    L({ name: 'Priya Nair', city: 'Huntington', service: 'Not sure yet', stage: 'new', value: 16000, priority: 'warm', source: 'Facebook Ad', createdAt: iso(-95) }),
    L({ name: 'Dale Krueger', city: 'Warsaw', service: 'Asphalt Shingles', stage: 'contacted', value: 14200, priority: 'warm', assignedCrewId: 'c2' }),
    L({ name: 'Olivia Tran', city: 'Columbia City', service: 'Storm Damage', stage: 'contacted', value: 0, priority: 'hot', source: 'Storm Campaign', message: 'Hail two weeks ago, want insurance help.' }),
    L({ name: 'The Hartman Family', city: 'Angola', service: 'Standing Seam Metal', stage: 'scheduled', value: 41000, priority: 'hot', apptAt: dayStr(1) + 'T10:00', assignedCrewId: 'c1' }),
    L({ name: 'George Mwangi', city: 'Kendallville', service: 'Gutters & Guards', stage: 'scheduled', value: 6400, priority: 'warm', apptAt: dayStr(2) + 'T13:30', assignedCrewId: 'c3' }),
    L({ name: 'Sandra Beck', city: 'Decatur', service: 'Metal Shingle', stage: 'estimate', value: 26750, priority: 'warm', assignedCrewId: 'c2' }),
    L({ name: 'Marcus Webb', city: 'Defiance, OH', service: 'Standing Seam Metal', stage: 'estimate', value: 33900, priority: 'hot' }),
    L({ name: 'Helen Cho', city: 'Garrett', service: 'Standing Seam Metal', stage: 'won', value: 38500, priority: 'hot', assignedCrewId: 'c1' }),
    L({ name: 'Frank DiMaggio', city: 'Coldwater, MI', service: 'Asphalt Shingles', stage: 'won', value: 15900, priority: 'warm', assignedCrewId: 'c2' }),
    L({ name: 'Lottie Pearson', city: 'Bryan, OH', service: 'Ribbed Metal', stage: 'won', value: 21200, priority: 'warm', assignedCrewId: 'c1' }),
    L({ name: 'Curtis Vogel', city: 'Fort Wayne', service: 'Asphalt Shingles', stage: 'lost', value: 0, priority: 'cold', message: 'Went with a cheaper bid.' }),
  ]

  const J = (p: Partial<Job> & Pick<Job, 'title' | 'customer' | 'city' | 'crewId' | 'date' | 'value' | 'prodStage'>): Job => ({
    id: uid('job'), type: 'install', start: '07:30', durationDays: 2, status: 'scheduled', poStatus: 'ordered',
    checklistDone: 4, checklistTotal: 9, photos: 12, ...p,
  })
  const jobs: Job[] = [
    J({ title: 'Hartman — Standing Seam', customer: 'The Hartman Family', city: 'Angola', address: '112 Lake James Dr', crewId: 'c1', product: 'Standing Seam', date: dayStr(1), durationDays: 3, value: 41000, prodStage: 'material', poStatus: 'pending', checklistDone: 1, checklistTotal: 9, photos: 0 }),
    J({ title: 'Cho — Standing Seam', customer: 'Helen Cho', city: 'Garrett', address: '88 Randolph St', crewId: 'c1', product: 'Standing Seam', date: dayStr(0), durationDays: 2, value: 38500, status: 'in_progress', prodStage: 'production', poStatus: 'delivered', checklistDone: 6, checklistTotal: 9, photos: 34 }),
    J({ title: 'DiMaggio — Asphalt Tear-off', customer: 'Frank DiMaggio', city: 'Coldwater, MI', crewId: 'c2', product: 'Asphalt', date: dayStr(0), durationDays: 1, value: 15900, status: 'in_progress', prodStage: 'punch', poStatus: 'delivered', checklistDone: 8, checklistTotal: 9, photos: 41 }),
    J({ title: 'Pearson — Ribbed Metal', customer: 'Lottie Pearson', city: 'Bryan, OH', crewId: 'c1', product: 'Ribbed Metal', date: dayStr(4), durationDays: 2, value: 21200, prodStage: 'scheduled', poStatus: 'ordered', checklistDone: 2, checklistTotal: 9, photos: 3 }),
    J({ title: 'Beck — Estimate Walkthrough', customer: 'Sandra Beck', city: 'Decatur', crewId: 'c2', type: 'estimate', date: dayStr(1), start: '15:00', durationDays: 1, value: 26750, prodStage: 'scheduled', checklistDone: 0, checklistTotal: 3, photos: 0 }),
    J({ title: 'Mwangi — Gutter Install', customer: 'George Mwangi', city: 'Kendallville', crewId: 'c3', product: 'Gutters', date: dayStr(2), start: '09:00', durationDays: 1, value: 6400, prodStage: 'scheduled', poStatus: 'ordered', checklistDone: 1, checklistTotal: 5, photos: 0 }),
    J({ title: 'Hartman — Free Inspection', customer: 'The Hartman Family', city: 'Angola', crewId: 'c3', type: 'inspection', date: dayStr(1), start: '10:00', durationDays: 1, value: 0, prodStage: 'scheduled', checklistDone: 0, checklistTotal: 3, photos: 0 }),
    J({ title: 'Webb — Insurance Re-inspect', customer: 'Marcus Webb', city: 'Defiance, OH', crewId: 'c2', type: 'inspection', date: dayStr(3), start: '11:00', durationDays: 1, value: 0, prodStage: 'scheduled', checklistDone: 0, checklistTotal: 3, photos: 0 }),
    J({ title: 'Okafor — Metal Shingle', customer: 'Ada Okafor', city: 'Fort Wayne', crewId: 'c2', product: 'Metal Shingle', date: dayStr(-3), durationDays: 2, value: 29500, status: 'done', prodStage: 'complete', poStatus: 'delivered', checklistDone: 9, checklistTotal: 9, photos: 58 }),
  ]

  const estimates: Estimate[] = [
    { id: uid('est'), number: 'EST-2041', customer: 'Sandra Beck', city: 'Decatur', product: 'Metal Shingle', total: 26750, monthly: 188, status: 'sent', createdAt: iso(-2600), lines: [{ item: 'Metal shingle system', qty: 27, unit: 'sq', price: 850 }, { item: 'Tear-off & disposal', qty: 27, unit: 'sq', price: 95 }, { item: 'Synthetic underlayment', qty: 27, unit: 'sq', price: 45 }] },
    { id: uid('est'), number: 'EST-2042', customer: 'Marcus Webb', city: 'Defiance, OH', product: 'Standing Seam', total: 33900, monthly: 238, status: 'sent', createdAt: iso(-1400), lines: [{ item: 'Standing seam panels', qty: 31, unit: 'sq', price: 950 }, { item: 'Tear-off & disposal', qty: 31, unit: 'sq', price: 95 }] },
    { id: uid('est'), number: 'EST-2043', customer: 'Priya Nair', city: 'Huntington', product: 'Asphalt', total: 15800, monthly: 111, status: 'draft', createdAt: iso(-300), lines: [{ item: 'Class-4 architectural shingle', qty: 24, unit: 'sq', price: 525 }] },
    { id: uid('est'), number: 'EST-2038', customer: 'Helen Cho', city: 'Garrett', product: 'Standing Seam', total: 38500, monthly: 270, status: 'accepted', createdAt: iso(-8000), lines: [{ item: 'Standing seam panels', qty: 34, unit: 'sq', price: 950 }] },
    { id: uid('est'), number: 'EST-2031', customer: 'Curtis Vogel', city: 'Fort Wayne', product: 'Asphalt', total: 13400, monthly: 94, status: 'declined', createdAt: iso(-12000), lines: [{ item: 'Architectural shingle', qty: 22, unit: 'sq', price: 480 }] },
  ]

  const invoices: Invoice[] = [
    { id: uid('inv'), number: 'INV-1190', customer: 'Helen Cho', city: 'Garrett', jobTitle: 'Standing Seam Install', type: 'deposit', amount: 11550, paid: 11550, status: 'paid', cost: 0, dueDate: dayStr(-6), createdAt: iso(-9000) },
    { id: uid('inv'), number: 'INV-1191', customer: 'Helen Cho', city: 'Garrett', jobTitle: 'Standing Seam Install', type: 'final', amount: 26950, paid: 0, status: 'sent', cost: 24100, dueDate: dayStr(5), createdAt: iso(-1200) },
    { id: uid('inv'), number: 'INV-1187', customer: 'Frank DiMaggio', city: 'Coldwater, MI', jobTitle: 'Asphalt Tear-off', type: 'final', amount: 15900, paid: 8000, status: 'partial', cost: 11200, dueDate: dayStr(2), createdAt: iso(-3000) },
    { id: uid('inv'), number: 'INV-1175', customer: 'Ada Okafor', city: 'Fort Wayne', jobTitle: 'Metal Shingle Install', type: 'final', amount: 29500, paid: 29500, status: 'paid', cost: 20900, dueDate: dayStr(-8), createdAt: iso(-14000) },
    { id: uid('inv'), number: 'INV-1168', customer: 'Lottie Pearson', city: 'Bryan, OH', jobTitle: 'Ribbed Metal Install', type: 'deposit', amount: 6360, paid: 6360, status: 'paid', cost: 0, dueDate: dayStr(-12), createdAt: iso(-16000) },
    { id: uid('inv'), number: 'INV-1160', customer: 'R. Halverson', city: 'Auburn', jobTitle: 'Gutter Guards', type: 'final', amount: 4200, paid: 0, status: 'overdue', cost: 2600, dueDate: dayStr(-9), createdAt: iso(-20000) },
  ]

  const warranties: Warranty[] = [
    { id: uid('war'), cardNo: 'SHD-04412', homeowner: 'Helen Cho', address: '88 Randolph St', city: 'Garrett, IN', products: 'Standing Seam Metal + Gutters', installDate: dayStr(-2), coverage: 'Double Lifetime Accident-Free', status: 'active', transferable: true, photos: 34 },
    { id: uid('war'), cardNo: 'SHD-04388', homeowner: 'Ada Okafor', address: '2207 Maple Grove', city: 'Fort Wayne, IN', products: 'Metal Shingle', installDate: dayStr(-3), coverage: 'Double Lifetime Accident-Free', status: 'active', transferable: true, photos: 58 },
    { id: uid('war'), cardNo: 'SHD-04201', homeowner: 'The Vance Family', address: '519 Crooked Lake', city: 'Angola, IN', products: 'Standing Seam Metal', installDate: '2025-09-14', coverage: 'Double Lifetime Accident-Free', status: 'active', transferable: true, photos: 47 },
    { id: uid('war'), cardNo: 'SHD-03980', homeowner: 'D. & R. Stoltz', address: '14 County Rd 9', city: 'Auburn, IN', products: 'Ribbed Metal + Soffit/Fascia', installDate: '2025-06-02', coverage: 'Double Lifetime Accident-Free', status: 'transferred', transferable: true, photos: 31 },
    { id: uid('war'), cardNo: 'SHD-03755', homeowner: 'M. Whitaker', address: '880 Lincolnway', city: 'Columbia City, IN', products: 'Asphalt (Class-4)', installDate: '2024-11-20', coverage: 'Lifetime Workmanship', status: 'active', transferable: true, photos: 22 },
  ]

  const tickets: ServiceTicket[] = [
    { id: uid('tkt'), warrantyCardNo: 'SHD-03755', homeowner: 'M. Whitaker', city: 'Columbia City, IN', issue: 'Minor flashing lift after windstorm — wants inspection.', priority: 'warm', status: 'new', createdAt: iso(-120) },
    { id: uid('tkt'), warrantyCardNo: 'SHD-04201', homeowner: 'The Vance Family', city: 'Angola, IN', issue: 'Branch fell on roof — accident claim under warranty.', priority: 'hot', status: 'scheduled', createdAt: iso(-1500) },
    { id: uid('tkt'), warrantyCardNo: 'SHD-03980', homeowner: 'D. & R. Stoltz', city: 'Auburn, IN', issue: 'New owner registering transferred warranty.', priority: 'cold', status: 'in_progress', createdAt: iso(-5000) },
    { id: uid('tkt'), warrantyCardNo: 'SHD-04388', homeowner: 'Ada Okafor', city: 'Fort Wayne, IN', issue: 'Gutter downspout adjustment requested.', priority: 'warm', status: 'resolved', createdAt: iso(-9000) },
  ]

  const applicants: Applicant[] = [
    { id: uid('app'), name: 'Tre Jackson', role: 'Sales Rep', source: 'Careers page', stage: 'applied', createdAt: iso(-200) },
    { id: uid('app'), name: 'Bianca Lopez', role: 'Canvasser', source: 'Indeed', stage: 'applied', createdAt: iso(-900) },
    { id: uid('app'), name: 'Derek Ulrich', role: 'Canvasser', source: 'Careers page', stage: 'screening', createdAt: iso(-2200) },
    { id: uid('app'), name: 'HannahMills', role: 'Event Coordinator', source: 'Referral', stage: 'interview', createdAt: iso(-4000) },
    { id: uid('app'), name: 'Victor Nguyen', role: 'Sales Rep', source: 'Careers page', stage: 'offer', createdAt: iso(-7000) },
    { id: uid('app'), name: 'Renee Park', role: 'Event Coordinator', source: 'Careers page', stage: 'hired', createdAt: iso(-30000) },
  ]

  const campaigns: Campaign[] = [
    { id: uid('cmp'), name: 'Job complete → review request', channel: 'sms', audience: 'Completed installs', recipients: 312, opens: 281, clicks: 196, status: 'sent', date: dayStr(-1) },
    { id: uid('cmp'), name: 'Spring metal financing', channel: 'email', audience: 'Aged leads (90d)', recipients: 1840, opens: 742, clicks: 188, status: 'sent', date: dayStr(-6) },
    { id: uid('cmp'), name: 'Storm response — Allen County', channel: 'sms', audience: 'Past leads in zone', recipients: 460, opens: 410, clicks: 132, status: 'scheduled', date: dayStr(2) },
    { id: uid('cmp'), name: 'Warranty anniversary check-in', channel: 'email', audience: 'Warranty holders (1yr)', recipients: 540, opens: 0, clicks: 0, status: 'draft', date: dayStr(5) },
  ]

  const automations: Automation[] = [
    { id: uid('auto'), name: 'Speed-to-lead alert', trigger: 'New website lead', action: 'Text + push on-call rep instantly', enabled: true, runs: 1284 },
    { id: uid('auto'), name: 'Job complete → review request', trigger: 'Job marked Complete', action: 'Send review SMS + email', enabled: true, runs: 312 },
    { id: uid('auto'), name: 'Auto-register warranty', trigger: 'Job marked Complete', action: 'Create warranty card + email homeowner', enabled: true, runs: 312 },
    { id: uid('auto'), name: 'Estimate follow-up sequence', trigger: 'Estimate sent', action: '3-touch follow-up over 7 days', enabled: true, runs: 488 },
    { id: uid('auto'), name: 'Storm blast', trigger: 'Storm in service area', action: 'SMS past leads in affected ZIPs', enabled: false, runs: 14 },
    { id: uid('auto'), name: 'Warranty maintenance reminder', trigger: 'Warranty anniversary', action: 'Email maintenance check-in', enabled: true, runs: 540 },
  ]

  const territories: Territory[] = [
    { id: 't1', name: 'Aboite / SW Fort Wayne', rep: 'Owen Reyes', color: '#1f9d6b', knocked: 214, contacts: 73, appointments: 11 },
    { id: 't2', name: 'Auburn / Garrett', rep: 'Derek U.', color: '#c98a1b', knocked: 168, contacts: 51, appointments: 8 },
    { id: 't3', name: 'Angola lakes', rep: 'Bianca L.', color: '#1b6fa8', knocked: 132, contacts: 44, appointments: 9 },
    { id: 't4', name: 'Huntington / Warsaw', rep: 'Owen Reyes', color: '#6b54c6', knocked: 97, contacts: 28, appointments: 4 },
  ]

  return { leads, staff, crews, jobs, estimates, invoices, warranties, tickets, applicants, campaigns, automations, territories, seededAt: iso() }
}

/* ----------------------------- persistence ----------------------------- */
function load(): DB {
  try { const raw = localStorage.getItem(KEY); if (raw) return JSON.parse(raw) as DB } catch { /* */ }
  const fresh = seed()
  try { localStorage.setItem(KEY, JSON.stringify(fresh)) } catch { /* */ }
  return fresh
}

let db: DB = load()
let snapshot: DB = db
const listeners = new Set<() => void>()

function commit() {
  snapshot = { ...db }
  try { localStorage.setItem(KEY, JSON.stringify(db)) } catch { /* */ }
  listeners.forEach((l) => l())
}
function subscribe(cb: () => void) { listeners.add(cb); return () => listeners.delete(cb) }

/* ----------------------------- mutations ----------------------------- */
export function addLead(input: {
  name: string; phone: string; email: string; service: string
  city?: string; address?: string; zip?: string; message?: string; source?: string
}): Lead {
  const lead: Lead = {
    id: uid('lead'), name: input.name, phone: input.phone, email: input.email, address: input.address,
    city: input.city || '—', zip: input.zip, service: input.service, message: input.message,
    source: input.source || 'Website — Free Inspection', stage: 'new', priority: 'hot', value: 0,
    createdAt: iso(), updatedAt: iso(),
  }
  db.leads = [lead, ...db.leads]; commit(); return lead
}
export function moveLead(id: string, stage: Stage) { db.leads = db.leads.map((l) => l.id === id ? { ...l, stage, updatedAt: iso() } : l); commit() }
export function updateLead(id: string, patch: Partial<Lead>) { db.leads = db.leads.map((l) => l.id === id ? { ...l, ...patch, updatedAt: iso() } : l); commit() }
export function setJobStatus(id: string, status: Job['status']) { db.jobs = db.jobs.map((j) => j.id === id ? { ...j, status } : j); commit() }
export function moveJobStage(id: string, prodStage: ProdStage) {
  db.jobs = db.jobs.map((j) => j.id === id ? { ...j, prodStage, status: prodStage === 'complete' ? 'done' : j.status } : j); commit()
}
export function updateEstimate(id: string, status: Estimate['status']) { db.estimates = db.estimates.map((e) => e.id === id ? { ...e, status } : e); commit() }
export function addEstimate(input: { customer: string; city: string; product: string; lines: EstimateLine[]; total: number; monthly: number }): Estimate {
  const est: Estimate = { id: uid('est'), number: 'EST-' + (2044 + db.estimates.length), createdAt: iso(), status: 'draft', ...input }
  db.estimates = [est, ...db.estimates]; commit(); return est
}
export function payInvoice(id: string) { db.invoices = db.invoices.map((i) => i.id === id ? { ...i, paid: i.amount, status: 'paid' } : i); commit() }
export function updateTicket(id: string, status: ServiceTicket['status']) { db.tickets = db.tickets.map((t) => t.id === id ? { ...t, status } : t); commit() }
export function moveApplicant(id: string, stage: AppStage) { db.applicants = db.applicants.map((a) => a.id === id ? { ...a, stage } : a); commit() }
export function toggleAutomation(id: string) { db.automations = db.automations.map((a) => a.id === id ? { ...a, enabled: !a.enabled } : a); commit() }
export function transferWarranty(id: string) { db.warranties = db.warranties.map((w) => w.id === id ? { ...w, status: 'transferred' } : w); commit() }
export function resetDemo() { db = seed(); commit() }

/* ----------------------------- hook ----------------------------- */
export function useDB(): DB { return useSyncExternalStore(subscribe, () => snapshot, () => snapshot) }
