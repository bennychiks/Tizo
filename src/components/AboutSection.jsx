import React from 'react'
import { ShieldCheck, Flame, Compass, Users } from 'lucide-react'

export default function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="grid-2" style={{ alignItems: 'center', marginBottom: '60px' }}>
        {/* Left Image Spotlight: Lead Pastor Portrait */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: '0 20px 50px -10px rgba(37, 99, 235, 0.35)',
            border: '1px solid var(--border-blue)'
          }}>
            <img 
              src="images/lead_pastor.jpg" 
              alt="LeadPastor Chris Amaechi" 
              style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block', objectPosition: 'center 20%' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(0deg, rgba(6,11,24,0.95) 0%, rgba(6,11,24,0.2) 60%, transparent 100%)'
            }}></div>
            <div style={{ position: 'absolute', bottom: '28px', left: '28px', right: '28px' }}>
              <span className="badge-blue" style={{ marginBottom: '8px' }}>Senior Leadership</span>
              <h4 style={{ fontSize: '1.45rem', color: '#FFFFFF', fontWeight: 800 }}>Pastor Chris Amaechi</h4>
              <p style={{ fontSize: '0.9rem', color: '#60A5FA', fontWeight: 600 }}>Lead Pastor, The Tizo Nation Church</p>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div>
          <span className="section-subtitle">Who We Are</span>
          <h2 className="section-title">A Nation Called to Illuminate the World</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '32px' }}>
            Under the leadership of <strong>Pastor Chris Amaechi</strong>, The Tizo Nation Church is a vibrant, Spirit-filled kingdom community. We are dedicated to preaching the uncompromised Word of God, cultivating authentic fellowship, and equipping believers to fulfill their divine destiny.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <ValueCard 
              icon={<Flame color="#60A5FA" size={24} />} 
              title="Vibrant Worship" 
              desc="Atmospheres charged with God’s presence and divine breakthrough."
            />
            <ValueCard 
              icon={<ShieldCheck color="#60A5FA" size={24} />} 
              title="Unshakable Word" 
              desc="Biblical teaching that builds victorious life foundations."
            />
            <ValueCard 
              icon={<Users color="#60A5FA" size={24} />} 
              title="Genuine Family" 
              desc="A supportive community where no one walks alone."
            />
            <ValueCard 
              icon={<Compass color="#60A5FA" size={24} />} 
              title="Kingdom Impact" 
              desc="Transforming cities and nations through faith and service."
            />
          </div>
        </div>
      </div>

      {/* Real Church Life Photo Gallery */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '48px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span className="section-subtitle">Life At The Tizo Nation</span>
          <h3 style={{ fontSize: '1.85rem', color: '#FFFFFF' }}>Experience Our Sanctuary Family</h3>
        </div>

        <div className="grid-4">
          <GalleryCard img="images/pastor_preaching.jpg" title="Preaching The Word" subtitle="Altar Ministry & Power" />
          <GalleryCard img="images/worship_hands_raised.jpg" title="Atmosphere of Prayer" subtitle="Deep Worship & Deliverance" />
          <GalleryCard img="images/congregation_joy.jpg" title="Joyful Fellowship" subtitle="Community & Sisterhood" />
          <GalleryCard img="images/worship_singing.jpg" title="Praise & Adoration" subtitle="Voices Raised As One" />
        </div>
      </div>
    </section>
  )
}

const ValueCard = ({ icon, title, desc }) => (
  <div className="glass-card" style={{ padding: '20px' }}>
    <div style={{ marginBottom: '12px' }}>{icon}</div>
    <h4 style={{ fontSize: '1.05rem', color: '#FFFFFF', marginBottom: '4px' }}>{title}</h4>
    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{desc}</p>
  </div>
)

const GalleryCard = ({ img, title, subtitle }) => (
  <div className="glass-card" style={{ overflow: 'hidden' }}>
    <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
      <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(0deg, rgba(6,11,24,0.9) 0%, transparent 70%)'
      }}></div>
      <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
        <h5 style={{ color: '#FFFFFF', fontSize: '1rem', marginBottom: '2px' }}>{title}</h5>
        <span style={{ color: '#60A5FA', fontSize: '0.78rem', fontWeight: 600 }}>{subtitle}</span>
      </div>
    </div>
  </div>
)
