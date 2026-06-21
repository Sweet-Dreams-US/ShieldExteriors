import { Routes, Route } from 'react-router-dom'
import { LeadModalProvider } from './components/LeadModal'
import Layout from './components/layout/Layout'

// Marketing pages
import Home from './pages/Home'
import MetalRoofing from './pages/MetalRoofing'
import MetalType from './pages/MetalType'
import Asphalt from './pages/Asphalt'
import Gutters from './pages/Gutters'
import Warranty from './pages/Warranty'
import Financing from './pages/Financing'
import Reviews from './pages/Reviews'
import About from './pages/About'
import ServiceArea from './pages/ServiceArea'
import CityPage from './pages/CityPage'
import Careers from './pages/Careers'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import ThankYou from './pages/ThankYou'
import Privacy from './pages/Privacy'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'

// Admin (crew portal)
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Dashboard'
import Leads from './admin/Leads'
import Pipeline from './admin/Pipeline'
import Crew from './admin/Crew'
import Schedule from './admin/Schedule'
import Operations from './admin/Operations'

export default function App() {
  return (
    <LeadModalProvider>
      <Routes>
        {/* Public site */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="metal-roofing" element={<MetalRoofing />} />
          <Route path="metal-roofing/:type" element={<MetalType />} />
          <Route path="asphalt-roofing" element={<Asphalt />} />
          <Route path="gutters" element={<Gutters />} />
          <Route path="warranty" element={<Warranty />} />
          <Route path="financing" element={<Financing />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="about" element={<About />} />
          <Route path="service-area" element={<ServiceArea />} />
          <Route path="service-area/:city" element={<CityPage />} />
          <Route path="careers" element={<Careers />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="thank-you" element={<ThankYou />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>

        {/* Dedicated paid-traffic landing pages (no nav distractions) */}
        <Route path="free-inspection" element={<Landing variant="free" />} />
        <Route path="storm-damage" element={<Landing variant="storm" />} />

        {/* Admin / crew portal */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="pipeline" element={<Pipeline />} />
          <Route path="crew" element={<Crew />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="operations" element={<Operations />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </LeadModalProvider>
  )
}
