import React, { useState, useEffect } from 'react'
import { useChurch } from '../context/ChurchContext'
import { ArrowRight, Play, Heart } from 'lucide-react'

export default function Hero() {
  const { setActiveModal, settings } = useChurch()

  // Countdown to next Sunday 9:00 AM
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date()
      const nextSunday = new Date()
      nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7))
      nextSunday.setHours(9, 0, 0, 0)
      if (now > nextSunday) {
        nextSunday.setDate(nextSunday.getDate() + 7)
      }

      const diff = nextSunday.getTime() - now.getTime()
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / 1000 / 60) % 60)
      const seconds = Math.floor((diff / 1000) % 60)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    calculateCountdown()
    const timer = setInterval(calculateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="hero" style={{ position: 'relative', overflow: 'hidden', minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
      {/* Background Image Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url("https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.35) contrast(1.1)',
        transform: 'scale(1.02)'
      }}></div>

      {/* Radial Blue Gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 30%, rgba(37, 99, 235, 0.28) 0%, rgba(6, 11, 24, 0.88) 60%, rgba(6, 11, 24, 0.98) 100%)'
      }}></div>

      <div className="section-padding" style={{ position: 'relative', zIndex: 10, width: '100%', paddingTop: '60px', paddingBottom: '60px' }}>
        <div style={{ maxWidth: '880px' }}>
          
          {/* Top Tagline Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <span className="badge-blue">Welcome Home</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>• The Tizo Nation Experience</span>
          </div>

          {/* Main Hero Headline */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            marginBottom: '20px',
            color: '#FFFFFF',
            textShadow: '0 4px 20px rgba(0,0,0,0.6)'
          }}>
            Where Faith Awakens & <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #FFFFFF 0%, #60A5FA 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Purpose Prevails
            </span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            color: '#CBD5E1',
            marginBottom: '36px',
            maxWidth: '680px',
            lineHeight: 1.6
          }}>
            {settings.tagline} We warmly invite you to join us this weekend for dynamic worship, empowering biblical teaching, and real fellowship.
          </p>

          {/* Action Button Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '48px' }}>
            <button className="btn-primary" onClick={() => setActiveModal('visit')}>
              Plan Your Visit <ArrowRight size={18} />
            </button>
            <button className="btn-secondary" onClick={() => setActiveModal('livestream')}>
              <Play size={18} fill="#0F172A" /> Watch Online
            </button>
            <button className="btn-outline-blue" onClick={() => setActiveModal('giving')}>
              <Heart size={18} /> Give Online
            </button>
          </div>

          {/* Next Service Countdown Bar */}
          <div className="glass-panel" style={{
            padding: '20px 28px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap',
            borderColor: 'var(--border-blue)'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Next Service Countdown
              </span>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#FFFFFF' }}>
                Sunday Morning @ 9:00 AM
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', textAlign: 'center' }}>
              <CountdownBox num={timeLeft.days} label="Days" />
              <CountdownBox num={timeLeft.hours} label="Hrs" />
              <CountdownBox num={timeLeft.minutes} label="Mins" />
              <CountdownBox num={timeLeft.seconds} label="Secs" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const CountdownBox = ({ num, label }) => (
  <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', minWidth: '48px' }}>
    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: '#60A5FA', display: 'block', lineHeight: 1 }}>
      {String(num).padStart(2, '0')}
    </span>
    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
      {label}
    </span>
  </div>
)
