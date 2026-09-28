import React from 'react'
import { useChurch } from '../context/ChurchContext'
import { Clock, MapPin, Navigation, Car, HeartHandshake, Sparkles } from 'lucide-react'

export default function ServiceTimesSection() {
  const { settings, setActiveModal } = useChurch()

  return (
    <section style={{ background: 'var(--bg-darker)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="section-padding">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="section-subtitle">Gathering Times & Location</span>
          <h2 className="section-title">Join Us In Person or Online</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            There’s a seat saved for you! Experience life-changing worship and an encouraging community at any of our weekly gatherings.
          </p>
        </div>

        <div className="grid-2">
          {/* Left: Service Schedule */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: '#60A5FA' }}>Weekly Service Schedule</h3>

            {settings.serviceTimes.map((service, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                  background: 'rgba(37, 99, 235, 0.2)',
                  color: '#60A5FA',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Clock size={28} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', color: '#FFFFFF', marginBottom: '4px' }}>{service.day}</h4>
                  <div style={{ fontSize: '1rem', color: '#60A5FA', fontWeight: 700, marginBottom: '2px' }}>
                    {service.time}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    📍 {service.location}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Location & Directions */}
          <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderColor: 'var(--border-blue)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <MapPin size={24} color="#60A5FA" />
                <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF' }}>Our Sanctuary Location</h3>
              </div>

              <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>
                The Tizo Nation Church
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '24px', lineHeight: 1.6 }}>
                {settings.address}<br />
                Phone: {settings.phone}<br />
                Email: {settings.email}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <Car size={18} color="#60A5FA" />
                  <span>Free reserved parking for first-time guests right at the front entrance.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <HeartHandshake size={18} color="#60A5FA" />
                  <span>Friendly hosts waiting to welcome you and assist with kids check-in.</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(settings.address)}`} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-primary"
                style={{ flex: 1, padding: '12px 18px', fontSize: '0.9rem' }}
              >
                <Navigation size={16} /> Get Directions
              </a>
              <button 
                onClick={() => setActiveModal('visit')} 
                className="btn-outline-blue"
                style={{ flex: 1, padding: '12px 18px', fontSize: '0.9rem' }}
              >
                <Sparkles size={16} /> VIP Guest Pass
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
