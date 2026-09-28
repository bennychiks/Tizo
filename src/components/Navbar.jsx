import React, { useState } from 'react'
import { useChurch } from '../context/ChurchContext'
import { Video, Shield, Menu, X } from 'lucide-react'

export default function Navbar() {
  const { settings, setActiveModal, isAdminLoggedIn } = useChurch()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (id) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%' }}>
      {/* Top Announcement Bar */}
      {settings.announcement && (
        <div style={{
          background: 'linear-gradient(90deg, #030610 0%, #0F172A 50%, #030610 100%)',
          borderBottom: '1px solid var(--border-blue)',
          padding: '8px 5%',
          fontSize: '0.85rem',
          textAlign: 'center',
          color: 'var(--text-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px'
        }}>
          <span className="badge-blue">Live News</span>
          <span>{settings.announcement}</span>
          <button
            onClick={() => setActiveModal('livestream')}
            style={{
              background: 'none',
              border: 'none',
              color: '#60A5FA',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              marginLeft: '8px',
              cursor: 'pointer'
            }}
          >
            Watch Online <Video size={14} />
          </button>
        </div>
      )}

      {/* Main Navigation Bar */}
      <nav style={{
        background: 'rgba(6, 11, 24, 0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(59, 130, 246, 0.25)',
        padding: '12px 5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo Container */}
        <div 
          onClick={() => scrollToSection('hero')} 
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          title="The Tizo Nation Church"
        >
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 0 16px rgba(59, 130, 246, 0.18)'
          }}>
            <img 
              src="/logo.png" 
              alt="The Tizo Nation Church Logo" 
              style={{ 
                height: '46px', 
                maxWidth: '280px',
                width: 'auto', 
                objectFit: 'contain',
                mixBlendMode: 'screen',
                filter: 'brightness(1.25) contrast(1.1) drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))',
                display: 'block'
              }}
            />
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="desktop-links">
          <button onClick={() => scrollToSection('about')} style={navLinkStyle}>About</button>
          <button onClick={() => scrollToSection('sermons')} style={navLinkStyle}>Sermons</button>
          <button onClick={() => scrollToSection('ministries')} style={navLinkStyle}>Ministries</button>
          <button onClick={() => scrollToSection('events')} style={navLinkStyle}>Events</button>
          <button onClick={() => scrollToSection('prayer')} style={navLinkStyle}>Prayer</button>
          <button onClick={() => scrollToSection('giving')} style={navLinkStyle}>Give</button>
          <button onClick={() => scrollToSection('visit')} style={navLinkStyle}>Visit</button>
        </div>

        {/* Desktop Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }} className="desktop-actions">
          <button 
            className="badge-live" 
            onClick={() => setActiveModal('livestream')}
            style={{ cursor: 'pointer', padding: '8px 16px' }}
          >
            <span className="pulse-dot"></span> Watch Live
          </button>

          <button 
            className="btn-primary" 
            onClick={() => setActiveModal('visit')}
            style={{ padding: '10px 22px', fontSize: '0.9rem' }}
          >
            Plan A Visit
          </button>

          {isAdminLoggedIn ? (
            <button 
              className="btn-outline-blue" 
              onClick={() => setActiveModal('admin')}
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <Shield size={16} /> Admin Panel
            </button>
          ) : (
            <button 
              onClick={() => setActiveModal('admin')}
              title="Admin Portal Access"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--text-muted)',
                padding: '10px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Shield size={18} />
            </button>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--text-light)',
            cursor: 'pointer',
            padding: '8px'
          }}
          className="mobile-hamburger"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: 'var(--bg-dark)',
          borderBottom: '1px solid var(--border-blue)',
          padding: '24px 5%',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <img 
              src="/logo.png" 
              alt="The Tizo Nation Church Logo" 
              style={{ height: '48px', mixBlendMode: 'screen', filter: 'brightness(1.2)' }}
            />
          </div>

          <button onClick={() => scrollToSection('about')} style={mobileNavLinkStyle}>About Us</button>
          <button onClick={() => scrollToSection('sermons')} style={mobileNavLinkStyle}>Watch Sermons</button>
          <button onClick={() => scrollToSection('ministries')} style={mobileNavLinkStyle}>Ministries</button>
          <button onClick={() => scrollToSection('events')} style={mobileNavLinkStyle}>Upcoming Events</button>
          <button onClick={() => scrollToSection('prayer')} style={mobileNavLinkStyle}>Prayer Wall</button>
          <button onClick={() => scrollToSection('giving')} style={mobileNavLinkStyle}>Give Online</button>
          <button onClick={() => scrollToSection('visit')} style={mobileNavLinkStyle}>Plan Your Visit</button>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            <button 
              className="badge-live" 
              onClick={() => { setMobileMenuOpen(false); setActiveModal('livestream') }}
              style={{ justifyContent: 'center', padding: '12px' }}
            >
              <span className="pulse-dot"></span> Watch Live Stream
            </button>
            <button 
              className="btn-primary" 
              onClick={() => { setMobileMenuOpen(false); setActiveModal('visit') }}
              style={{ width: '100%' }}
            >
              Plan A Visit
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => { setMobileMenuOpen(false); setActiveModal('admin') }}
              style={{ width: '100%' }}
            >
              <Shield size={16} /> Admin Access
            </button>
          </div>
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-links, .desktop-actions {
            display: none !important;
          }
          .mobile-hamburger {
            display: block !important;
          }
        }
      `}</style>
    </header>
  )
}

const navLinkStyle = {
  background: 'none',
  border: 'none',
  color: 'var(--text-light)',
  fontSize: '0.95rem',
  fontWeight: 500,
  transition: 'color 0.2s ease',
  cursor: 'pointer'
}

const mobileNavLinkStyle = {
  background: 'none',
  border: 'none',
  color: 'var(--text-light)',
  fontSize: '1.1rem',
  fontWeight: 600,
  textAlign: 'left',
  padding: '8px 0',
  borderBottom: '1px solid rgba(255,255,255,0.05)'
}
