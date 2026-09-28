import React, { useState } from 'react'
import { useChurch } from '../context/ChurchContext'

export default function MinistriesSection() {
  const { ministries, showToast } = useChurch()
  const [selectedMinistry, setSelectedMinistry] = useState(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handleJoinSubmit = (e) => {
    e.preventDefault()
    if (!name) return
    showToast(`Thank you ${name}! The lead team for ${selectedMinistry.name} will reach out to you shortly! 🙏`)
    setSelectedMinistry(null)
    setName('')
    setPhone('')
  }

  return (
    <section id="ministries" style={{ background: 'var(--bg-darker)', borderTop: '1px solid var(--border-color)' }}>
      <div className="section-padding">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="section-subtitle">Get Connected</span>
          <h2 className="section-title">Our Ministries</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            There is a place for everyone at The Tizo Nation. Discover opportunities to grow in faith and use your gifts to serve others.
          </p>
        </div>

        <div className="grid-3">
          {ministries.map(ministry => (
            <div key={ministry.id} className="glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ height: '160px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '20px', position: 'relative' }}>
                  <img src={ministry.image} alt={ministry.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span className="badge-blue" style={{ position: 'absolute', bottom: '12px', left: '12px', fontSize: '0.75rem' }}>
                    {ministry.ageGroup}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '6px' }}>{ministry.name}</h3>
                <p style={{ color: '#60A5FA', fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px' }}>
                  {ministry.tagline}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  {ministry.description}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
                  Leader: {ministry.leader}
                </span>

                <button 
                  className="btn-outline-blue"
                  onClick={() => setSelectedMinistry(ministry)}
                  style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                >
                  Join Ministry
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join Ministry Modal */}
      {selectedMinistry && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '4px' }}>Get Involved: {selectedMinistry.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Fill out your contact details below and our team will get in touch with next steps!
            </p>

            <form onSubmit={handleJoinSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. David Williams"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Phone / Email</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. (555) 234-5678 or david@example.com"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                  Submit Request
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setSelectedMinistry(null)}
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

const inputStyle = {
  width: '100%',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid var(--border-color)',
  color: 'var(--text-light)',
  padding: '12px 16px',
  borderRadius: 'var(--radius-sm)',
  fontSize: '0.95rem',
  outline: 'none'
}
