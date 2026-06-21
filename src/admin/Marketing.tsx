import { Star, Send, Gift, Mail, MessageSquare, TrendingUp } from 'lucide-react'
import { useDB, type Campaign } from '../lib/store'
import { PageTitle, Panel, StatTile, Bar } from './ui'
import { money } from '../lib/utils'

const CH_ICON = { email: Mail, sms: MessageSquare }
const ST_TONE: Record<Campaign['status'], string> = { sent: '#1f9d6b', scheduled: '#c98a1b', draft: '#6b7785' }

const REFERRALS = [
  { name: 'Helen Cho', referred: 'The Mercers', status: 'Booked', payout: 250 },
  { name: 'Ada Okafor', referred: 'J. Patel', status: 'Inspecting', payout: 0 },
  { name: 'Vance Family', referred: '2 neighbors', status: 'Won ×1', payout: 250 },
]

export default function Marketing() {
  const { campaigns, jobs } = useDB()
  const completed = jobs.filter((j) => j.prodStage === 'complete' || j.status === 'done')
  const sent = campaigns.filter((c) => c.status === 'sent')
  const totalReach = sent.reduce((s, c) => s + c.recipients, 0)
  const reviewCampaign = campaigns.find((c) => c.name.includes('review'))
  const referralPayout = REFERRALS.reduce((s, r) => s + r.payout, 0)

  return (
    <>
      <PageTitle title="Marketing, Reviews & Referrals" sub="The engine behind 1,000+ reviews — automated requests, campaigns, and a tracked referral program." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile label="Avg rating" value="4.9★" sub="across 1,000+ reviews" Icon={Star} tone="#f5a623" />
        <StatTile label="Review requests" value={reviewCampaign?.recipients ?? 0} sub={`${reviewCampaign?.clicks ?? 0} left a review`} Icon={Send} tone="#1f9d6b" />
        <StatTile label="Campaign reach" value={totalReach.toLocaleString()} sub={`${sent.length} sent`} Icon={TrendingUp} tone="#1b6fa8" />
        <StatTile label="Referral payouts" value={money(referralPayout)} sub={`${REFERRALS.length} active referrers`} Icon={Gift} tone="#6b54c6" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Panel>
          <div className="border-b border-ink-line p-5"><h2 className="font-bold text-bone">Campaigns</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink-line text-[12px] uppercase tracking-wide text-bone/45">
                <tr><th className="p-4 font-semibold">Campaign</th><th className="hidden p-4 font-semibold sm:table-cell">Audience</th><th className="p-4 font-semibold">Reach</th><th className="hidden p-4 font-semibold md:table-cell">Open rate</th><th className="p-4 font-semibold">Status</th></tr>
              </thead>
              <tbody className="divide-y divide-ink-line">
                {campaigns.map((c) => {
                  const Icon = CH_ICON[c.channel]
                  const openRate = c.recipients ? Math.round((c.opens / c.recipients) * 100) : 0
                  return (
                    <tr key={c.id} className="hover:bg-white/[0.02]">
                      <td className="p-4"><div className="flex items-center gap-2.5"><Icon size={16} className="text-amber" /><span className="font-semibold text-bone">{c.name}</span></div></td>
                      <td className="hidden p-4 text-bone/60 sm:table-cell">{c.audience}</td>
                      <td className="p-4 font-semibold text-bone">{c.recipients.toLocaleString()}</td>
                      <td className="hidden p-4 text-bone/70 md:table-cell">{c.status === 'sent' ? `${openRate}%` : '—'}</td>
                      <td className="p-4"><span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-bold capitalize" style={{ background: `${ST_TONE[c.status]}22`, color: ST_TONE[c.status] }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: ST_TONE[c.status] }} />{c.status}</span></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="p-5">
            <h2 className="font-bold text-bone">Referral program</h2>
            <div className="mt-4 space-y-3">
              {REFERRALS.map((r) => (
                <div key={r.name} className="flex items-center justify-between rounded-xl bg-ink p-3">
                  <div><div className="text-[13.5px] font-semibold text-bone">{r.name}</div><div className="text-[12px] text-bone/45">→ {r.referred} · {r.status}</div></div>
                  <span className="font-bold text-guard">{r.payout ? money(r.payout) : '—'}</span>
                </div>
              ))}
            </div>
          </Panel>
          <Panel className="p-5">
            <h2 className="font-bold text-bone">Review request auto-fires</h2>
            <p className="mt-1 text-[13px] text-bone/50">Sent the moment a job is marked Complete.</p>
            <div className="mt-3 space-y-2">
              {completed.map((j) => (
                <div key={j.id} className="flex items-center gap-2 rounded-lg bg-ink p-2.5 text-[13px]">
                  <Send size={14} className="text-guard" /> <span className="text-bone/80">{j.customer}</span> <span className="ml-auto text-[11px] text-bone/40">review SMS sent</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </>
  )
}
