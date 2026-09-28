import React, { useState } from 'react'
import { useChurch } from '../context/ChurchContext'
import { Sparkles, MapPin, Users, Gift } from 'lucide-react'

export default function VisitSection() {
  const { activeModal, setActiveModal, showToast } = useChurch()
  const [guestName, setGuestName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [serviceChoice, setServiceChoice] = useState('Sunday 9:00 AM')
  const [hasKids, setHasKids] = useState('No')

  const handleVisitSubmit = (e) => {
    e.preventDefault()
    if (!guestName || !email) {
      showToast('Please fill out your name and email.')
      return
    }
    showToast(`VIP Guest Pass Registered for ${guestName}! We have saved a front parking spot and welcome gift for you on ${serviceChoice}! 🎁`)
    setActiveModal(null)
    setGuestName('')
    setEmail('')
    setPhone('')
  }

  return (
    <section id="visit" className="section-padding">
      <div className="glass-panel" style={{ padding: '48px', position: 'relative', overflow: 'hidden', borderColor: 'var(--border-blue)' }}>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto' }}>
            <span className="badge-blue" style={{ marginBottom: '12px' }}>VIP First-Time Guest</span>
            <h2 className="section-title">We Can’t Wait to Welcome You!</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '32px', lineHeight: 1.6 }}>
              Visiting a new church for the first time can be intimidating. When you plan your visit ahead, we will reserve a prime parking spot, meet you at the door, show you around, and have a special welcome gift waiting for you!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '36px', textAlign: 'left' }} className="grid-3">
              <div className="glass-card" style={{ padding: '20px' }}>
                <Gift size={24} color="#60A5FA" style={{ marginBottom: '8px' }} />
                <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '4px' }}>Free Welcome Gift</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>A special gift pack waiting at our Welcome Center.</p>
              </div>
              <div className="glass-card" style={{ padding: '20px' }}>
                <MapPin size={24} color="#60A5FA" style={{ marginBottom: '8px' }} />
                <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '4px' }}>Reserved VIP Parking</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Prime parking spots right at the front entrance.</p>
              </div>
              <div className="glass-card" style={{ padding: '20px' }}>
                <Users size={24} color="#60A5FA" style={{ marginBottom: '8px' }} />
                <h4 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '4px' }}>Personal Host</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>A friendly guide to introduce you and assist kids check-in.</p>
              </div>
            </div>

            <button className="btn-primary" onClick={() => setActiveModal('visit')} style={{ padding: '14px 32px', fontSize: '1rem' }}>
              <Sparkles size={18} /> Register Your VIP Visit
            </button>
          </div>
        </div>
      </div>

      {/* Plan Visit Modal */}
      {activeModal === 'visit' && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: '36px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <span className="badge-blue">VIP Registration</span>
                <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginTop: '4px' }}>Plan Your Visit</h3>
              </div>
              <button onClick={() => setActiveModal(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Let us know when you're coming so our hospitality team can prepare for your arrival!
            </p>

            <form onSubmit={handleVisitSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Your Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Marcus Vance"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="marcus@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Mobile Phone</label>
                  <input 
                    type="text" 
                    placeholder="(555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Which Service?</label>
                  <select value={serviceChoice} onChange={(e) => setServiceChoice(e.target.value)} style={selectStyle}>
                    <option value="Sunday 8:30 AM">Sunday 8:30 AM</option>
                    <option value="Sunday 11:00 AM">Sunday 11:00 AM</option>
                    <option value="Wednesday 5:00 PM">Wednesday 5:00 PM</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Bringing Children?</label>
                  <select value={hasKids} onChange={(e) => setHasKids(e.target.value)} style={selectStyle}>
                    <option value="No">No kids this time</option>
                    <option value="Yes">Yes, need Tizo Kids info</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                  Confirm VIP Guest Pass
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setActiveModal(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

const labelStyle = { display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }
const inputStyle = { width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', color: 'var(--text-light)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem', outline: 'none' }
const selectStyle = { width: '100%', background: '#0F172A', border: '1px solid var(--border-color)', color: 'var(--text-light)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem', outline: 'none' }
