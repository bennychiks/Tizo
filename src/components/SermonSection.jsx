import React, { useState } from 'react'
import { useChurch } from '../context/ChurchContext'
import { Play, Search, User } from 'lucide-react'

export default function SermonSection() {
  const { sermons, setSelectedSermon, setActiveModal } = useChurch()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('All')

  // Get unique tags/series
  const allTags = ['All', ...new Set(sermons.flatMap(s => s.tags || []))]

  const filteredSermons = sermons.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sermon.series.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = selectedTag === 'All' || (sermon.tags && sermon.tags.includes(selectedTag))
    return matchesSearch && matchesTag
  })

  const watchSermon = (sermon) => {
    setSelectedSermon(sermon)
    setActiveModal('livestream')
  }

  return (
    <section id="sermons" style={{ background: 'var(--bg-darker)', borderTop: '1px solid var(--border-color)' }}>
      <div className="section-padding">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
          <div>
            <span className="section-subtitle">Media & Messages</span>
            <h2 className="section-title">Sermon Library</h2>
            <p className="section-desc" style={{ marginBottom: 0 }}>
              Be inspired by life-transforming messages from Pastor Chris Amaechi and guest speakers.
            </p>
          </div>

          {/* Search & Tag Filter controls */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', width: '100%', maxWidth: '500px' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
              <input 
                type="text" 
                placeholder="Search by title, speaker, or series..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-light)',
                  padding: '10px 14px 10px 42px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  style={{
                    background: selectedTag === tag ? 'var(--primary-blue)' : 'rgba(255,255,255,0.05)',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid ' + (selectedTag === tag ? 'var(--primary-blue)' : 'var(--border-color)'),
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sermon Cards Grid */}
        {filteredSermons.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <p>No sermons found matching your criteria. Try adjusting your search.</p>
          </div>
        ) : (
          <div className="grid-3">
            {filteredSermons.map(sermon => (
              <div key={sermon.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {/* Thumbnail Header */}
                <div style={{ position: 'relative', height: '200px', cursor: 'pointer' }} onClick={() => watchSermon(sermon)}>
                  <img 
                    src={sermon.thumbnail || 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80'} 
                    alt={sermon.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(6, 11, 24, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s'
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'var(--primary-blue)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 24px rgba(37, 99, 235, 0.6)'
                    }}>
                      <Play size={24} fill="#FFFFFF" style={{ marginLeft: '4px' }} />
                    </div>
                  </div>

                  {sermon.duration && (
                    <span style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: 'rgba(0,0,0,0.85)',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontWeight: 600
                    }}>
                      {sermon.duration}
                    </span>
                  )}
                </div>

                {/* Sermon Body Content */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="badge-blue" style={{ fontSize: '0.7rem' }}>{sermon.series}</span>
                      <span style={{ color: 'var(--text-subtle)', fontSize: '0.8rem' }}>{sermon.date}</span>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '8px', lineHeight: 1.3 }}>
                      {sermon.title}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '16px', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {sermon.description}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={14} color="#60A5FA" /> {sermon.speaker}
                    </span>

                    <button 
                      onClick={() => watchSermon(sermon)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#60A5FA',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      Watch <Play size={12} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
