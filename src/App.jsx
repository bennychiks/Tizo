import React from 'react'
import { ChurchProvider, useChurch } from './context/ChurchContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ServiceTimesSection from './components/ServiceTimesSection'
import AboutSection from './components/AboutSection'
import SermonSection from './components/SermonSection'
import EventsSection from './components/EventsSection'
import MinistriesSection from './components/MinistriesSection'
import PrayerSection from './components/PrayerSection'
import GivingSection from './components/GivingSection'
import VisitSection from './components/VisitSection'
import LiveStreamModal from './components/LiveStreamModal'
import AdminDashboard from './components/AdminDashboard'
import Footer from './components/Footer'
import { CheckCircle2 } from 'lucide-react'

function AppContent() {
  const { toastMessage } = useChurch()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-popup">
          <CheckCircle2 color="var(--primary-gold)" size={20} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header & Navbar */}
      <Navbar />

      {/* Main Page Sections */}
      <main style={{ flex: 1 }}>
        <Hero />
        <ServiceTimesSection />
        <AboutSection />
        <SermonSection />
        <EventsSection />
        <MinistriesSection />
        <PrayerSection />
        <GivingSection />
        <VisitSection />
      </main>

      {/* Interactive Modals */}
      <LiveStreamModal />
      <AdminDashboard />

      {/* Page Footer */}
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ChurchProvider>
      <AppContent />
    </ChurchProvider>
  )
}
