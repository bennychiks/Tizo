import React, { useState } from 'react'
import { useChurch } from '../context/ChurchContext'
import { X, Heart, MessageSquare, Send } from 'lucide-react'

export default function LiveStreamModal() {
  const { activeModal, setActiveModal, selectedSermon, settings } = useChurch()
  const [chatMessage, setChatMessage] = useState('')
  const [chatList, setChatList] = useState([
    { id: 1, user: 'Sister Angela', text: 'Amen! Watching live from Houston!' },
    { id: 2, user: 'Deacon Mark', text: 'God bless the worship team! Such a powerful presence today.' },
    { id: 3, user: 'Pastor David Tizo', text: 'Welcome everyone joining us online today!' }
  ])

  if (activeModal !== 'livestream') return null

  const embedUrl = selectedSermon ? selectedSermon.videoUrl : settings.liveStreamUrl

  const handleSendChat = (e) => {
    e.preventDefault()
    if (!chatMessage.trim()) return
    setChatList([...chatList, { id: Date.now(), user: 'You', text: chatMessage }])
    setChatMessage('')
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '1050px', width: '95%', padding: '0', overflow: 'hidden' }}>
        {/* Header Bar */}
        <div style={{
          background: 'var(--bg-darker)',
          padding: '16px 24px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="badge-live"><span className="pulse-dot"></span> Live Broadcast</span>
            <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', margin: 0 }}>
              {selectedSermon ? selectedSermon.title : 'The Tizo Nation Worship Service Live'}
            </h3>
          </div>
          <button 
            onClick={() => setActiveModal(null)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Video & Chat Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', background: '#000000' }}>
          {/* Left: Video Player */}
          <div style={{ flex: 2, minWidth: '320px', aspectRatio: '16/9', background: '#000' }}>
            <iframe 
              src={embedUrl}
              title="Live Church Service"
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Right: Live Chat & Notes */}
          <div style={{
            flex: 1,
            minWidth: '280px',
            background: 'var(--bg-card)',
            borderLeft: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            height: '450px'
          }}>
            <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#60A5FA', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MessageSquare size={16} /> Online Sanctuary Chat
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>👥 142 Viewing</span>
            </div>

            {/* Chat Messages */}
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {chatList.map(item => (
                <div key={item.id} style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.04)', padding: '8px 12px', borderRadius: '8px' }}>
                  <span style={{ color: '#60A5FA', fontWeight: 700, marginRight: '6px' }}>{item.user}:</span>
                  <span style={{ color: 'var(--text-light)' }}>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} style={{ padding: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="Send blessing or chat message..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-color)',
                  color: '#FFFFFF',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '8px 14px' }}>
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ padding: '16px 24px', background: 'var(--bg-darker)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Speaker: {selectedSermon ? selectedSermon.speaker : 'Pastor David Tizo'}
          </span>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className="btn-outline-blue" 
              onClick={() => { setActiveModal('giving') }}
              style={{ padding: '6px 14px', fontSize: '0.85rem' }}
            >
              <Heart size={14} /> Give Online
            </button>
            <button 
              className="btn-secondary" 
              onClick={() => { setActiveModal('prayer') }}
              style={{ padding: '6px 14px', fontSize: '0.85rem' }}
            >
              Request Prayer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
