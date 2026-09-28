import React, { useState } from 'react'
import { useChurch } from '../context/ChurchContext'
import { Calendar, Clock, MapPin } from 'lucide-react'

export default function EventsSection() {
  const { events, showToast } = useChurch()
  const [rsvpEvent, setRsvpEvent] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleRsvpSubmit = (e) => {
    e.preventDefault()
    if (!name || !email) {
      showToast('Please fill out your name and email.')
      return
    }
    showToast(`RSVP Confirmed for ${rsvpEvent.title}! We look forward to seeing you. 🎉`)
    setRsvpEvent(null)
    setName('')
    setEmail('')
  }

  return (
    <section id="events" className="section-padding">
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span className="section-subtitle">Gatherings & Conferences</span>
        <h2 className="section-title">Upcoming Church Events</h2>
        <p className="section-desc" style={{ margin: '0 auto' }}>
          Connect, grow, and serve together. Mark your calendar for these exciting upcoming experiences.
        </p>
      </div>

      <div className="grid-2">
        {events.map(event => (
          <div key={event.id} className="glass-card responsive-event-card" style={{ display: 'flex', flexDirection: 'row', gap: '0', overflow: 'hidden' }}>
            {/* Event Image */}
            <div style={{ width: '40%', position: 'relative', minHeight: '200px' }} className="event-img-wrap">
              <img 
                src={event.image || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'} 
                alt={event.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span className="badge-blue" style={{ position: 'absolute', top: '12px', left: '12px', fontSize: '0.7rem' }}>
                {event.category}
              </span>
            </div>

            {/* Event Details */}
            <div style={{ width: '60%', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} className="event-details-wrap">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60A5FA', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  <Calendar size={14} /> {event.date}
                </div>
                <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '8px' }}>{event.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '16px', lineHeight: 1.5 }}>
                  {event.description}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '16px' }}>
                  <span><Clock size={12} style={{ inlineSize: '12px' }} /> {event.time}</span>
                  <span><MapPin size={12} style={{ inlineSize: '12px' }} /> {event.location}</span>
                </div>

                <button 
                  className="btn-outline-blue"
                  onClick={() => setRsvpEvent(event)}
                  style={{ width: '100%', padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  Reserve Seat / RSVP
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* RSVP Modal */}
      {rsvpEvent && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '8px' }}>RSVP: {rsvpEvent.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
              📍 {rsvpEvent.date} @ {rsvpEvent.time} ({rsvpEvent.location})
            </p>

            <form onSubmit={handleRsvpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Samuel Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={formInputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. samuel@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={formInputStyle}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                  Confirm Registration
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setRsvpEvent(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .responsive-event-card {
            flex-direction: column !important;
          }
          .event-img-wrap, .event-details-wrap {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  )
}

const formInputStyle = {
  width: '100%',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid var(--border-color)',
  color: 'var(--text-light)',
  padding: '12px 16px',
  borderRadius: 'var(--radius-sm)',
  fontSize: '0.95rem',
  outline: 'none'
}
