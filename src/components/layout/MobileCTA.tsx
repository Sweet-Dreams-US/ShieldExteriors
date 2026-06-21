import { Phone, CalendarCheck } from 'lucide-react'
import { CtaButton } from '../LeadModal'
import { PHONE_HREF } from '../../lib/utils'

/** Sticky bottom call/inspection bar — phone-first, mobile only. */
export default function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-line/40 bg-ink/95 p-2.5 backdrop-blur lg:hidden">
      <div className="flex items-center gap-2.5">
        <a href={PHONE_HREF} className="btn-steel flex-1 justify-center py-3.5">
          <Phone size={18} /> Call Now
        </a>
        <CtaButton className="flex-1 justify-center py-3.5">
          <CalendarCheck size={18} /> Free Inspection
        </CtaButton>
      </div>
    </div>
  )
}
