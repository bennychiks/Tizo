import React, { useState } from 'react'
import { useChurch } from '../context/ChurchContext'
import { Heart, Send } from 'lucide-react'

export default function PrayerSection() {
  const { prayers, submitPrayer, incrementPrayer, showToast } = useChurch()
  const [author, setAuthor] = useState('')
  const [request, setRequest] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!request.trim()) {
      showToast('Please type your prayer request.')
      return
    }
    submitPrayer(author, request)
    setAuthor('')
    setRequest('')
  }

  return (
    <section id="prayer" className="section-padding">
      <div className="grid-2" style={{ alignItems: 'flex-start' }}>
        {/* Left: Submit Prayer Request */}
        <div className="glass-panel" style={{ padding: '36px', borderColor: 'var(--border-blue)' }}>
          <span className="section-subtitle">We Are Praying For You</span>
          <h2 style={{ fontSize: '2rem', color: '#FFFFFF', marginBottom: '12px' }}>Submit a Prayer Request</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.6 }}>
            "For where two or three gather in my name, there am I with them." — Matthew 18:20. Share your burden with our dedicated pastoral prayer team.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                Your Name (Optional / Anonymous)
              </label>
              <input 
                type="text" 
                placeholder="e.g. Brother Thomas"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                Your Prayer Request *
              </label>
              <textarea 
                rows="4"
                required
                placeholder="Share how we can pray for you, your family, healing, or breakthrough..."
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                style={{ ...inputStyle, resize: 'vertical' }}
              ></textarea>
            </div>

            <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
              <Send size={18} /> Submit Prayer Request
            </button>
          </form>
        </div>

        {/* Right: Community Prayer Wall */}
        <div>
          <span className="section-subtitle">Community Prayer Wall</span>
          <h2 style={{ fontSize: '2rem', color: '#FFFFFF', marginBottom: '12px' }}>Stand in Faith Together</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.6 }}>
            Click "I Prayed for This" to let your brothers and sisters know you are standing with them in faith.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {prayers.map(prayer => (
              <div key={prayer.id} className="glass-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 700, color: '#60A5FA', fontSize: '0.95rem' }}>
                    {prayer.author}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                    {prayer.date}
                  </span>
                </div>

                <p style={{ color: 'var(--text-light)', fontSize: '0.92rem', marginBottom: '16px', lineHeight: 1.5 }}>
                  "{prayer.request}"
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    🙏 {prayer.prayedCount} people prayed
                  </span>

                  <button 
                    onClick={() => incrementPrayer(prayer.id)}
                    className="btn-outline-blue"
                    style={{ padding: '4px 12px', fontSize: '0.8rem' }}
                  >
                    <Heart size={14} fill="currentColor" /> I Prayed for This
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
