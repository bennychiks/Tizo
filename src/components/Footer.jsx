import React from 'react'
import { useChurch } from '../context/ChurchContext'
import { MapPin, Phone, Mail, Shield, Globe, Video, Share2 } from 'lucide-react'

export default function Footer() {
  const { settings, setActiveModal } = useChurch()

  return (
    <footer style={{ background: 'var(--bg-darker)', borderTop: '1px solid var(--border-blue)', paddingTop: '60px', paddingBottom: '30px' }}>
      <div className="section-padding" style={{ paddingTop: 0, paddingBottom: '40px' }}>
        <div className="grid-4">
          {/* Col 1: Standalone Logo Image Container */}
          <div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'inline-block',
              marginBottom: '20px',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.25)'
            }}>
              <img 
                src="/logo.png" 
                alt="The Tizo Nation Logo" 
                style={{ 
                  height: '65px', 
                  maxWidth: '260px',
                  width: 'auto',
                  objectFit: 'contain', 
                  mixBlendMode: 'screen',
                  filter: 'brightness(1.25) contrast(1.15) drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',
                  display: 'block'
                }} 
              />
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '20px' }}>
              A vibrant kingdom community passionate about awakening faith, equipping believers, and walking in divine purpose.
            </p>
            <div style={{ display: 'flex', gap: '12px', color: '#60A5FA' }}>
              <a href="#" style={socialIconStyle} title="Website"><Globe size={18} /></a>
              <a href="#" style={socialIconStyle} title="Watch Channel"><Video size={18} /></a>
              <a href="#" style={socialIconStyle} title="Share Site"><Share2 size={18} /></a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '16px' }}>Quick Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li><a href="#about" style={footerLinkStyle}>About Us</a></li>
              <li><a href="#sermons" style={footerLinkStyle}>Sermon Archive</a></li>
              <li><a href="#events" style={footerLinkStyle}>Upcoming Events</a></li>
              <li><a href="#ministries" style={footerLinkStyle}>Church Ministries</a></li>
              <li><a href="#prayer" style={footerLinkStyle}>Prayer Requests</a></li>
              <li><a href="#giving" style={footerLinkStyle}>Give Online</a></li>
            </ul>
          </div>

          {/* Col 3: Service Schedule */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '16px' }}>Service Times</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <div>
                <strong style={{ color: '#60A5FA', display: 'block' }}>Sunday Services</strong>
                9:00 AM & 11:00 AM
              </div>
              <div>
                <strong style={{ color: '#60A5FA', display: 'block' }}>Wednesday Bible Study</strong>
                6:30 PM (Midweek Service)
              </div>
              <div>
                <strong style={{ color: '#60A5FA', display: 'block' }}>Friday Youth Service</strong>
                7:00 PM (Youth Hall)
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Location */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', marginBottom: '16px' }}>Sanctuary Address</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <MapPin size={16} color="#60A5FA" style={{ flexShrink: 0 }} />
                <span>{settings.address}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Phone size={16} color="#60A5FA" />
                <span>{settings.phone}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Mail size={16} color="#60A5FA" />
                <span>{settings.email}</span>
              </div>

              <div style={{ marginTop: '12px' }}>
                <button 
                  className="btn-outline-blue"
                  onClick={() => setActiveModal('admin')}
                  style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                >
                  <Shield size={14} /> Admin Portal
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '40px', paddingTop: '20px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
          © {new Date().getFullYear()} The Tizo Nation Church. All rights reserved. Empowered with Divine Purpose.
        </div>
      </div>
    </footer>
  )
}

const socialIconStyle = {
  background: 'rgba(255,255,255,0.05)',
  padding: '10px',
  borderRadius: '50%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#60A5FA',
  transition: 'all 0.2s'
}

const footerLinkStyle = {
  color: 'var(--text-muted)',
  transition: 'color 0.2s'
}
