import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import MobileCTA from './MobileCTA'
import ScrollToTop from './ScrollToTop'

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      {/* spacer so content clears the sticky mobile bar */}
      <div className="h-[68px] lg:hidden" />
      <MobileCTA />
    </>
  )
}
