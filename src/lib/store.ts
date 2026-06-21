import { useSyncExternalStore } from 'react'

/* ============================================================
   Shield "back office" store — client-side demo CRM.
   The public Free-Inspection funnel writes leads here; the admin
   panel reads/updates them. Persisted to localStorage so the demo
   feels live across refreshes.
   ============================================================ */

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
  apptAt?: string
  createdAt: string
  updatedAt: string
}

export interface Staff {
  id: string
  name: string
  role: string
  phone: string
  status: 'active' | 'pto' | 'off'
  avatarTone: string
}

export interface Crew {
  id: string
  name: string
  leadName: string
  members: string[]
  color: string
  specialty: string
}

export interface Job {
  id: string
  title: string
  city: string
  crewId: string
  type: 'install' | 'inspection' | 'repair' | 'estimate'
  date: string // yyyy-mm-dd
  start: string // HH:MM
  durationDays: number
  value: number
  status: 'scheduled' | 'in_progress' | 'done'
}

interface DB {
  leads: Lead[]
  staff: Staff[]
  crews: Crew[]
  jobs: Job[]
  seededAt: string
}

const KEY = 'shield_crm_v3'

/* ----------------------------- id helper ----------------------------- */
let counter = 0
const uid = (p = 'id') =>
  `${p}_${Date.now().toString(36)}${(counter++).toString(36)}${Math.floor(Math.random() * 1e6).toString(36)}`

/* ----------------------------- date helpers ----------------------------- */
const today = new Date()
const iso = (offsetMin = 0) => new Date(Date.now() + offsetMin * 60000).toISOString()
const dayStr = (offsetDays: number) => {
  const d = new Date(today)
  d.setDate(d.getDate() + offsetDays)
  return d.toISOString().slice(0, 10)
}

/* ----------------------------- seed data ----------------------------- */
function seed(): DB {
  const staff: Staff[] = [
    { id: 's1', name: 'Brad Ledgerwood', role: 'Owner / Founder', phone: '(260) 818-6072', status: 'active', avatarTone: '#11486d' },
    { id: 's2', name: 'Marcus Hale', role: 'Crew Lead — Metal', phone: '(260) 555-0142', status: 'active', avatarTone: '#1f9d6b' },
    { id: 's3', name: 'Tyler BoZ', role: 'Crew Lead — Asphalt', phone: '(260) 555-0177', status: 'active', avatarTone: '#b5651d' },
    { id: 's4', name: 'Denise Carver', role: 'Office / Scheduling', phone: '(260) 555-0190', status: 'active', avatarTone: '#6b54c6' },
    { id: 's5', name: 'Jordan Pruitt', role: 'Sales Rep', phone: '(260) 555-0123', status: 'active', avatarTone: '#c98a1b' },
    { id: 's6', name: 'Kayla Friend', role: 'Sales Rep', phone: '(260) 555-0144', status: 'pto', avatarTone: '#1b6fa8' },
    { id: 's7', name: 'Owen Reyes', role: 'Installer', phone: '(260) 555-0166', status: 'active', avatarTone: '#9a4f2b' },
    { id: 's8', name: 'Sam Whitfield', role: 'Installer', phone: '(260) 555-0188', status: 'off', avatarTone: '#2b6f9a' },
  ]

  const crews: Crew[] = [
    { id: 'c1', name: 'Crew A — Hale', leadName: 'Marcus Hale', members: ['Owen Reyes', 'Sam Whitfield', '+2'], color: '#1f9d6b', specialty: 'Standing seam metal' },
    { id: 'c2', name: 'Crew B — Boz', leadName: 'Tyler Boz', members: ['Diego R.', 'Cole H.', '+1'], color: '#b5651d', specialty: 'Asphalt & metal shingle' },
    { id: 'c3', name: 'Crew C — Gutters', leadName: 'Hank Mills', members: ['Pat V.', 'Lon S.'], color: '#1b6fa8', specialty: 'Gutters & guards' },
  ]

  const L = (p: Partial<Lead> & Pick<Lead, 'name' | 'city' | 'service' | 'stage' | 'value'>): Lead => ({
    id: uid('lead'),
    phone: '(260) 555-0100',
    email: 'homeowner@example.com',
    source: 'Website — Free Inspection',
    priority: 'warm',
    createdAt: iso(-Math.floor(Math.random() * 4000)),
    updatedAt: iso(-Math.floor(Math.random() * 1000)),
    ...p,
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

  const jobs: Job[] = [
    { id: uid('job'), title: 'Hartman — Standing Seam', city: 'Angola', crewId: 'c1', type: 'install', date: dayStr(1), start: '07:30', durationDays: 3, value: 41000, status: 'scheduled' },
    { id: uid('job'), title: 'Cho — Standing Seam', city: 'Garrett', crewId: 'c1', type: 'install', date: dayStr(0), start: '07:30', durationDays: 2, value: 38500, status: 'in_progress' },
    { id: uid('job'), title: 'DiMaggio — Asphalt Tear-off', city: 'Coldwater, MI', crewId: 'c2', type: 'install', date: dayStr(0), start: '08:00', durationDays: 1, value: 15900, status: 'in_progress' },
    { id: uid('job'), title: 'Pearson — Ribbed Metal', city: 'Bryan, OH', crewId: 'c1', type: 'install', date: dayStr(4), start: '07:30', durationDays: 2, value: 21200, status: 'scheduled' },
    { id: uid('job'), title: 'Beck — Estimate Walkthrough', city: 'Decatur', crewId: 'c2', type: 'estimate', date: dayStr(1), start: '15:00', durationDays: 1, value: 26750, status: 'scheduled' },
    { id: uid('job'), title: 'Mwangi — Gutter Install', city: 'Kendallville', crewId: 'c3', type: 'install', date: dayStr(2), start: '09:00', durationDays: 1, value: 6400, status: 'scheduled' },
    { id: uid('job'), title: 'Hartman — Free Inspection', city: 'Angola', crewId: 'c3', type: 'inspection', date: dayStr(1), start: '10:00', durationDays: 1, value: 0, status: 'scheduled' },
    { id: uid('job'), title: 'Webb — Insurance Re-inspect', city: 'Defiance, OH', crewId: 'c2', type: 'inspection', date: dayStr(3), start: '11:00', durationDays: 1, value: 0, status: 'scheduled' },
  ]

  return { leads, staff, crews, jobs, seededAt: iso() }
}

/* ----------------------------- persistence ----------------------------- */
function load(): DB {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as DB
  } catch {
    /* ignore */
  }
  const fresh = seed()
  try {
    localStorage.setItem(KEY, JSON.stringify(fresh))
  } catch {
    /* ignore */
  }
  return fresh
}

let db: DB = load()
const listeners = new Set<() => void>()
let snapshot: DB = db

function commit() {
  snapshot = { ...db, leads: [...db.leads], jobs: [...db.jobs], crews: [...db.crews], staff: [...db.staff] }
  try {
    localStorage.setItem(KEY, JSON.stringify(db))
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l())
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

/* ----------------------------- mutations ----------------------------- */
export function addLead(input: {
  name: string
  phone: string
  email: string
  service: string
  city?: string
  address?: string
  zip?: string
  message?: string
  source?: string
}): Lead {
  const lead: Lead = {
    id: uid('lead'),
    name: input.name,
    phone: input.phone,
    email: input.email,
    address: input.address,
    city: input.city || '—',
    zip: input.zip,
    service: input.service,
    message: input.message,
    source: input.source || 'Website — Free Inspection',
    stage: 'new',
    priority: 'hot',
    value: 0,
    createdAt: iso(),
    updatedAt: iso(),
  }
  db.leads = [lead, ...db.leads]
  commit()
  return lead
}

export function moveLead(id: string, stage: Stage) {
  db.leads = db.leads.map((l) => (l.id === id ? { ...l, stage, updatedAt: iso() } : l))
  commit()
}

export function updateLead(id: string, patch: Partial<Lead>) {
  db.leads = db.leads.map((l) => (l.id === id ? { ...l, ...patch, updatedAt: iso() } : l))
  commit()
}

export function setJobStatus(id: string, status: Job['status']) {
  db.jobs = db.jobs.map((j) => (j.id === id ? { ...j, status } : j))
  commit()
}

export function resetDemo() {
  db = seed()
  commit()
}

/* ----------------------------- hook ----------------------------- */
export function useDB(): DB {
  return useSyncExternalStore(subscribe, () => snapshot, () => snapshot)
}
