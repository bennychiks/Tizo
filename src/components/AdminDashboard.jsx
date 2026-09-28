import React, { useState } from 'react'
import { useChurch } from '../context/ChurchContext'
import {
  Shield,
  X,
  LogOut,
  Trash2,
  Edit3,
  Video,
  Calendar,
  Heart,
  DollarSign,
  Settings,
  RefreshCw,
  FileText,
  Key
} from 'lucide-react'

export default function AdminDashboard() {
  const {
    activeModal,
    setActiveModal,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    sermons,
    addSermon,
    updateSermon,
    deleteSermon,
    events,
    addEvent,
    deleteEvent,
    prayers,
    deletePrayer,
    givingLog,
    settings,
    setSettings,
    showToast,
    resetToDemoData
  } = useChurch()

  const [passcode, setPasscode] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [editingSermonId, setEditingSermonId] = useState(null)

  const [newSermon, setNewSermon] = useState({
    title: '',
    speaker: 'Pastor David Tizo',
    series: 'Kingdom Faith',
    date: new Date().toISOString().split('T')[0],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80',
    description: '',
    duration: '45 mins'
  })

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '7:00 PM',
    location: 'Main Sanctuary',
    category: 'Worship',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    description: ''
  })

  if (activeModal !== 'admin') return null

  const handleLogin = (e) => {
    e.preventDefault()
    const success = loginAdmin(passcode)
    if (!success) {
      showToast('Incorrect passcode. Try admin123 or click Quick Demo Access.')
    }
  }

  const handleSaveSermon = (e) => {
    e.preventDefault()
    if (!newSermon.title) return

    // Standardize YouTube URLs if needed
    let formattedUrl = newSermon.videoUrl || ''
    if (formattedUrl.includes('youtu.be/')) {
      const id = formattedUrl.split('youtu.be/')[1]?.split('?')[0]
      if (id) formattedUrl = `https://www.youtube.com/embed/${id}`
    } else if (formattedUrl.includes('youtube.com/watch')) {
      try {
        const urlObj = new URL(formattedUrl)
        const id = urlObj.searchParams.get('v')
        if (id) formattedUrl = `https://www.youtube.com/embed/${id}`
      } catch (err) {
        // fallback keep original string
      }
    }

    // Auto update thumbnail if YouTube ID found
    let formattedThumbnail = newSermon.thumbnail
    const ytMatch = formattedUrl.match(/(?:youtube\.com\/embed\/)([\w-]{11})/)
    if (ytMatch && ytMatch[1]) {
      formattedThumbnail = `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`
    }

    const sermonPayload = {
      ...newSermon,
      videoUrl: formattedUrl,
      thumbnail: formattedThumbnail || 'images/lead_pastor.jpg'
    }

    if (editingSermonId) {
      updateSermon({ ...sermonPayload, id: editingSermonId })
      setEditingSermonId(null)
    } else {
      addSermon(sermonPayload)
    }

    setNewSermon({
      title: '',
      speaker: 'Pastor David Tizo',
      series: 'Kingdom Faith',
      date: new Date().toISOString().split('T')[0],
      videoUrl: 'https://www.youtube.com/embed/d86xD-j6bQ8',
      thumbnail: 'images/lead_pastor.jpg',
      description: '',
      duration: '45 mins'
    })
  }

  const handleStartEditSermon = (sermon) => {
    setEditingSermonId(sermon.id)
    setNewSermon({
      title: sermon.title || '',
      speaker: sermon.speaker || 'Pastor David Tizo',
      series: sermon.series || '',
      date: sermon.date || new Date().toISOString().split('T')[0],
      videoUrl: sermon.videoUrl || '',
      thumbnail: sermon.thumbnail || '',
      description: sermon.description || '',
      duration: sermon.duration || '45 mins'
    })
  }

  const handleCancelEditSermon = () => {
    setEditingSermonId(null)
    setNewSermon({
      title: '',
      speaker: 'Pastor David Tizo',
      series: 'Kingdom Faith',
      date: new Date().toISOString().split('T')[0],
      videoUrl: 'https://www.youtube.com/embed/d86xD-j6bQ8',
      thumbnail: 'images/lead_pastor.jpg',
      description: '',
      duration: '45 mins'
    })
  }

  const handleCreateEvent = (e) => {
    e.preventDefault()
    if (!newEvent.title) return
    addEvent(newEvent)
    setNewEvent({
      title: '',
      date: '',
      time: '7:00 PM',
      location: 'Main Sanctuary',
      category: 'Worship',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      description: ''
    })
  }

  const totalGivingAmount = givingLog.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '1100px', width: '95%', padding: '0', minHeight: '680px' }}>
        
        {/* Header Bar */}
        <div style={{
          background: 'var(--bg-darker)',
          padding: '20px 28px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-blue)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: 'rgba(37, 99, 235, 0.2)',
              color: '#60A5FA',
              padding: '10px',
              borderRadius: '50%'
            }}>
              <Shield size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', margin: 0 }}>
                The Tizo Nation — Admin Command Portal
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {isAdminLoggedIn ? 'Status: Authorized Admin' : 'Status: Restricted Access'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isAdminLoggedIn && (
              <button 
                onClick={logoutAdmin}
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.85rem' }}
              >
                <LogOut size={14} /> Logout
              </button>
            )}
            <button 
              onClick={() => setActiveModal(null)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {!isAdminLoggedIn ? (
          /* LOGIN SCREEN */
          <div style={{ padding: '60px 28px', maxWidth: '440px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(37, 99, 235, 0.2)',
              color: '#60A5FA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <Key size={32} />
            </div>

            <h3 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '8px' }}>Admin Authentication</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '28px', lineHeight: 1.5 }}>
              Enter administrator passcode to manage church content, sermons, events, prayer requests, and settings.
            </p>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input 
                type="password" 
                placeholder="Enter Passcode (e.g. admin123)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-blue)',
                  color: '#FFFFFF',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem',
                  textAlign: 'center',
                  outline: 'none'
                }}
              />

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px' }}>
                Authenticate Access
              </button>
            </form>

            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
              <button 
                onClick={() => loginAdmin('admin123')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#60A5FA',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                ✨ Click Here For Instant Demo Admin Access (admin123)
              </button>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
          <div style={{ display: 'flex', minHeight: '580px' }}>
            {/* Sidebar Navigation */}
            <div style={{
              width: '240px',
              background: 'var(--bg-darker)',
              borderRight: '1px solid var(--border-color)',
              padding: '20px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <SidebarBtn label="Overview Stats" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<FileText size={18} />} />
              <SidebarBtn label="Manage Sermons" active={activeTab === 'sermons'} onClick={() => setActiveTab('sermons')} icon={<Video size={18} />} />
              <SidebarBtn label="Manage Events" active={activeTab === 'events'} onClick={() => setActiveTab('events')} icon={<Calendar size={18} />} />
              <SidebarBtn label="Prayer Requests" active={activeTab === 'prayers'} onClick={() => setActiveTab('prayers')} icon={<Heart size={18} />} />
              <SidebarBtn label="Giving Ledger" active={activeTab === 'giving'} onClick={() => setActiveTab('giving')} icon={<DollarSign size={18} />} />
              <SidebarBtn label="Church Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={<Settings size={18} />} />
            </div>

            {/* Main Dashboard Content */}
            <div style={{ flex: 1, padding: '32px', overflowY: 'auto', background: 'var(--bg-card)' }}>
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '20px' }}>Dashboard Overview</h3>
                  
                  <div className="grid-4" style={{ marginBottom: '36px' }}>
                    <StatBox label="Total Sermons" value={sermons.length} icon={<Video color="#60A5FA" size={24} />} />
                    <StatBox label="Upcoming Events" value={events.length} icon={<Calendar color="#60A5FA" size={24} />} />
                    <StatBox label="Active Prayers" value={prayers.length} icon={<Heart color="#60A5FA" size={24} />} />
                    <StatBox label="Total Giving Log" value={`$${totalGivingAmount}`} icon={<DollarSign color="#60A5FA" size={24} />} />
                  </div>

                  <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
                    <h4 style={{ color: '#60A5FA', marginBottom: '12px' }}>Quick Admin Actions</h4>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <button className="btn-primary" onClick={() => setActiveTab('sermons')}>+ Add New Sermon</button>
                      <button className="btn-primary" onClick={() => setActiveTab('events')}>+ Create New Event</button>
                      <button className="btn-secondary" onClick={() => setActiveTab('settings')}>Edit Live Stream Link</button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SERMONS */}
              {activeTab === 'sermons' && (
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '20px' }}>Manage Sermons</h3>

                  <form onSubmit={handleSaveSermon} className="glass-card" style={{ padding: '24px', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ color: editingSermonId ? '#F59E0B' : '#60A5FA', margin: 0 }}>
                        {editingSermonId ? '✏️ Edit Sermon Video Details' : '+ Publish New Sermon Video'}
                      </h4>
                      {editingSermonId && (
                        <span style={{ fontSize: '0.8rem', background: 'rgba(245, 158, 11, 0.2)', color: '#F59E0B', padding: '4px 10px', borderRadius: '12px', fontWeight: 600 }}>
                          Editing ID: {editingSermonId}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                      <div>
                        <label style={labelStyle}>Sermon Title *</label>
                        <input type="text" required placeholder="Sermon Title *" value={newSermon.title} onChange={e => setNewSermon({ ...newSermon, title: e.target.value })} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Speaker *</label>
                        <input type="text" required placeholder="Speaker *" value={newSermon.speaker} onChange={e => setNewSermon({ ...newSermon, speaker: e.target.value })} style={inputStyle} />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                      <div>
                        <label style={labelStyle}>Series Name</label>
                        <input type="text" placeholder="Series Name" value={newSermon.series} onChange={e => setNewSermon({ ...newSermon, series: e.target.value })} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Preach Date</label>
                        <input type="date" value={newSermon.date} onChange={e => setNewSermon({ ...newSermon, date: e.target.value })} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Duration</label>
                        <input type="text" placeholder="Duration (e.g. 45 mins)" value={newSermon.duration} onChange={e => setNewSermon({ ...newSermon, duration: e.target.value })} style={inputStyle} />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>YouTube URL or Embed Link</label>
                      <input type="text" placeholder="e.g. https://youtu.be/1ss-ccxQi9g or https://www.youtube.com/embed/1ss-ccxQi9g" value={newSermon.videoUrl} onChange={e => setNewSermon({ ...newSermon, videoUrl: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Brief Description</label>
                      <textarea rows="2" placeholder="Brief Sermon Description..." value={newSermon.description} onChange={e => setNewSermon({ ...newSermon, description: e.target.value })} style={inputStyle}></textarea>
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button type="submit" className="btn-primary">
                        {editingSermonId ? 'Save & Update Sermon' : 'Publish Sermon'}
                      </button>
                      {editingSermonId && (
                        <button type="button" onClick={handleCancelEditSermon} className="btn-secondary">
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>

                  <h4 style={{ color: '#FFFFFF', marginBottom: '16px', fontSize: '1.1rem' }}>Uploaded Sermons ({sermons.length})</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {sermons.map(s => (
                      <div key={s.id} className="glass-card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: editingSermonId === s.id ? '4px solid #F59E0B' : '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <img 
                            src={s.thumbnail || 'images/lead_pastor.jpg'} 
                            alt={s.title}
                            style={{ width: '70px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                            onError={(e) => { e.target.src = 'images/lead_pastor.jpg' }}
                          />
                          <div>
                            <h5 style={{ fontSize: '1.05rem', color: '#FFFFFF', margin: 0 }}>{s.title}</h5>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.speaker} • {s.series} • {s.date}</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleStartEditSermon(s)}
                            style={{
                              background: 'rgba(37, 99, 235, 0.25)',
                              color: '#60A5FA',
                              border: 'none',
                              padding: '8px 14px',
                              borderRadius: 'var(--radius-sm)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontWeight: 600,
                              fontSize: '0.85rem'
                            }}
                          >
                            <Edit3 size={15} /> Edit
                          </button>
                          <button
                            onClick={() => deleteSermon(s.id)}
                            style={{
                              background: 'rgba(239, 68, 68, 0.2)',
                              color: '#EF4444',
                              border: 'none',
                              padding: '8px 14px',
                              borderRadius: 'var(--radius-sm)',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              fontSize: '0.85rem'
                            }}
                          >
                            <Trash2 size={15} /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: EVENTS */}
              {activeTab === 'events' && (
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '20px' }}>Manage Church Events</h3>
                  
                  <form onSubmit={handleCreateEvent} className="glass-card" style={{ padding: '24px', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h4 style={{ color: '#60A5FA' }}>+ Create Upcoming Event</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                      <input type="text" required placeholder="Event Title *" value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} style={inputStyle} />
                      <input type="date" required value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} style={inputStyle} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                      <input type="text" placeholder="Time (e.g. 7:00 PM)" value={newEvent.time} onChange={e => setNewEvent({ ...newEvent, time: e.target.value })} style={inputStyle} />
                      <input type="text" placeholder="Location" value={newEvent.location} onChange={e => setNewEvent({ ...newEvent, location: e.target.value })} style={inputStyle} />
                      <input type="text" placeholder="Category (Worship, Youth, etc)" value={newEvent.category} onChange={e => setNewEvent({ ...newEvent, category: e.target.value })} style={inputStyle} />
                    </div>
                    <textarea rows="2" placeholder="Event Description..." value={newEvent.description} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} style={inputStyle}></textarea>
                    <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>Save Event</button>
                  </form>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {events.map(ev => (
                      <div key={ev.id} className="glass-card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <h5 style={{ fontSize: '1.1rem', color: '#FFFFFF' }}>{ev.title}</h5>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>📅 {ev.date} @ {ev.time} ({ev.location})</span>
                        </div>
                        <button onClick={() => deleteEvent(ev.id)} style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', border: 'none', padding: '8px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: PRAYERS */}
              {activeTab === 'prayers' && (
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '20px' }}>Prayer Wall Moderation</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {prayers.map(p => (
                      <div key={p.id} className="glass-card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1, paddingRight: '16px' }}>
                          <h5 style={{ fontSize: '1rem', color: '#60A5FA' }}>{p.author} ({p.date})</h5>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginTop: '4px' }}>"{p.request}"</p>
                        </div>
                        <button onClick={() => deletePrayer(p.id)} style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', border: 'none', padding: '8px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>
                          <Trash2 size={16} /> Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: GIVING LEDGER */}
              {activeTab === 'giving' && (
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '20px' }}>Donation & Giving Ledger</h3>
                  <div className="glass-card" style={{ padding: '24px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-color)', color: '#60A5FA' }}>
                          <th style={{ padding: '12px' }}>Date</th>
                          <th style={{ padding: '12px' }}>Donor</th>
                          <th style={{ padding: '12px' }}>Designated Fund</th>
                          <th style={{ padding: '12px', textAlign: 'right' }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {givingLog.map(g => (
                          <tr key={g.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-light)' }}>
                            <td style={{ padding: '12px' }}>{g.date}</td>
                            <td style={{ padding: '12px' }}>{g.name}</td>
                            <td style={{ padding: '12px' }}>{g.fund}</td>
                            <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#60A5FA' }}>${g.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 6: SETTINGS */}
              {activeTab === 'settings' && (
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '20px' }}>Church Information & Settings</h3>
                  <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label style={labelStyle}>Announcement Bar Text</label>
                      <input type="text" value={settings.announcement} onChange={e => setSettings({ ...settings, announcement: e.target.value })} style={inputStyle} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                      <div>
                        <label style={labelStyle}>Phone Contact</label>
                        <input type="text" value={settings.phone} onChange={e => setSettings({ ...settings, phone: e.target.value })} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Email Contact</label>
                        <input type="text" value={settings.email} onChange={e => setSettings({ ...settings, email: e.target.value })} style={inputStyle} />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>Physical Address</label>
                      <input type="text" value={settings.address} onChange={e => setSettings({ ...settings, address: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Live Stream Embed Video URL</label>
                      <input type="text" value={settings.liveStreamUrl} onChange={e => setSettings({ ...settings, liveStreamUrl: e.target.value })} style={inputStyle} />
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button className="btn-primary" onClick={() => showToast('Church settings updated!')}>Save Settings</button>
                      <button className="btn-secondary" onClick={resetToDemoData}>
                        <RefreshCw size={14} /> Restore Default Demo Data
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const SidebarBtn = ({ label, active, onClick, icon }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px 16px',
      borderRadius: 'var(--radius-sm)',
      border: 'none',
      background: active ? 'rgba(37, 99, 235, 0.25)' : 'transparent',
      color: active ? '#60A5FA' : 'var(--text-muted)',
      fontWeight: active ? 700 : 500,
      fontSize: '0.9rem',
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all 0.2s'
    }}
  >
    {icon} {label}
  </button>
)

const StatBox = ({ label, value, icon }) => (
  <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
      {icon}
    </div>
    <div>
      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{label}</span>
      <h4 style={{ fontSize: '1.4rem', color: '#FFFFFF', margin: 0 }}>{value}</h4>
    </div>
  </div>
)

const labelStyle = { display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px' }
const inputStyle = { width: '100%', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', color: 'var(--text-light)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', outline: 'none' }
