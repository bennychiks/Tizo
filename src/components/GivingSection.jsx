import React, { useState } from 'react'
import { useChurch } from '../context/ChurchContext'
import { Heart, CreditCard, Lock } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function GivingSection() {
  const { recordGiving, showToast } = useChurch()
  const [frequency, setFrequency] = useState('One-Time')
  const [fund, setFund] = useState('General Tithes & Offerings')
  const [selectedAmount, setSelectedAmount] = useState(100)
  const [customAmount, setCustomAmount] = useState('')
  const [donorName, setDonorName] = useState('')
  const [cardNumber, setCardNumber] = useState('')

  const handleGiveSubmit = (e) => {
    e.preventDefault()
    const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount
    if (!finalAmount || finalAmount <= 0) {
      showToast('Please select or enter a valid giving amount.')
      return
    }

    // Trigger celebratory confetti animation!
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    })

    recordGiving(donorName || 'Anonymous Giver', finalAmount, fund)

    // Reset form
    setCustomAmount('')
    setDonorName('')
    setCardNumber('')
  }

  return (
    <section id="giving" style={{ background: 'var(--bg-darker)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="section-padding">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="section-subtitle">Generosity & Stewardship</span>
          <h2 className="section-title">Online Giving Portal</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            "Bring the whole tithe into the storehouse... test me in this, says the LORD Almighty." — Malachi 3:10. Thank you for faithfully supporting the vision and mission of The Tizo Nation Church!
          </p>
        </div>

        <div style={{ maxWidth: '680px', margin: '0 auto' }} className="glass-panel">
          <div style={{ padding: '36px' }}>
            <form onSubmit={handleGiveSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Frequency Selector */}
              <div>
                <label style={labelStyle}>Giving Frequency</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  {['One-Time', 'Weekly', 'Monthly'].map(item => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setFrequency(item)}
                      style={{
                        padding: '10px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid ' + (frequency === item ? 'var(--primary-blue)' : 'var(--border-color)'),
                        background: frequency === item ? 'rgba(37, 99, 235, 0.2)' : 'rgba(255,255,255,0.03)',
                        color: frequency === item ? '#FFFFFF' : 'var(--text-light)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer'
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fund Selection */}
              <div>
                <label style={labelStyle}>Select Fund / Designation</label>
                <select 
                  value={fund} 
                  onChange={(e) => setFund(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#0F172A',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-light)',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                >
                  <option value="General Tithes & Offerings">General Tithes & Offerings</option>
                  <option value="Building & Expansion Fund">Building & Expansion Fund</option>
                  <option value="Global Missions & Outreach">Global Missions & Outreach</option>
                  <option value="Youth & NextGen Ministry">Youth & NextGen Ministry</option>
                </select>
              </div>

              {/* Amount Selection */}
              <div>
                <label style={labelStyle}>Select Giving Amount ($ USD)</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '12px' }}>
                  {[25, 50, 100, 250].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => { setSelectedAmount(amt); setCustomAmount('') }}
                      style={{
                        padding: '14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid ' + (selectedAmount === amt && !customAmount ? 'var(--primary-blue)' : 'var(--border-color)'),
                        background: selectedAmount === amt && !customAmount ? 'var(--primary-blue)' : 'rgba(255,255,255,0.03)',
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        cursor: 'pointer'
                      }}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>

                <input 
                  type="number"
                  placeholder="Or enter custom amount e.g. 500"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-light)',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Giver Name & Card Information */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={labelStyle}>Your Name (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Jane Doe"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Payment Card Details (Demo Checkout)</label>
                  <div style={{ position: 'relative' }}>
                    <CreditCard size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
                    <input 
                      type="text" 
                      placeholder="4532 •••• •••• 8892"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      style={{ ...inputStyle, paddingLeft: '42px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn-primary" style={{ padding: '16px', fontSize: '1.05rem', marginTop: '8px' }}>
                <Heart size={20} fill="#FFFFFF" /> Give ${customAmount || selectedAmount} ({frequency})
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
                <Lock size={14} color="#60A5FA" /> 256-Bit Bank-Grade Secure Payment Encryption
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

const labelStyle = {
  display: 'block',
  fontSize: '0.85rem',
  color: 'var(--text-muted)',
  marginBottom: '8px',
  fontWeight: 600
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
