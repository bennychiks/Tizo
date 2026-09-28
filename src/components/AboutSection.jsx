import React from 'react'
import { useChurch } from '../context/ChurchContext'
import { ShieldCheck, Flame, Heart, Compass, Users } from 'lucide-react'

export default function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="grid-2" style={{ alignItems: 'center' }}>
        {/* Left Image Collage */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-main)',
            border: '1px solid var(--border-blue)'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1510519138161-58446232811f?auto=format&fit=crop&w=800&q=80" 
              alt="The Tizo Nation Worship" 
              style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(0deg, rgba(6,11,24,0.92) 0%, transparent 60%)'
            }}></div>
            <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
              <span className="badge-blue" style={{ marginBottom: '8px' }}>Senior Leadership</span>
              <h4 style={{ fontSize: '1.3rem', color: '#FFFFFF' }}>Pastor David & Grace Tizo</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Lead Pastors, The Tizo Nation Church</p>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div>
          <span className="section-subtitle">Who We Are</span>
          <h2 className="section-title">A Nation Called to Illuminate the World</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '32px' }}>
            At <strong>The Tizo Nation Church</strong>, we believe every individual has a God-ordained assignment. We are a multicultural, Spirit-filled church dedicated to preaching the uncompromised Word of God, cultivating genuine brotherhood, and equipping believers to lead in every sphere of life.
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
