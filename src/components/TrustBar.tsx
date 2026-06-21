import { Star, ShieldCheck, BadgeCheck, ThumbsUp } from 'lucide-react'
import { cn } from '../lib/utils'

const ITEMS = [
  { Icon: Star, label: '1,000+ 5-Star Reviews' },
  { Icon: BadgeCheck, label: 'A+ BBB Accredited' },
  { Icon: ThumbsUp, label: '0 Complaints, Ever' },
  { Icon: ShieldCheck, label: 'Free Repairs for Life' },
]

export default function TrustBar({ dark = true, className }: { dark?: boolean; className?: string }) {
  return (
    <div className={cn(dark ? 'bg-ink text-bone' : 'bg-bone-dim text-ink', className)}>
      <div className="wrap grid grid-cols-2 gap-y-4 py-5 md:grid-cols-4">
        {ITEMS.map(({ Icon, label }) => (
          <div key={label} className="flex items-center justify-center gap-2.5 text-center text-[13.5px] font-semibold md:text-[15px]">
            <Icon size={20} className="shrink-0 text-amber" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
