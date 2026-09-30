import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  INITIAL_SERMONS,
  INITIAL_EVENTS,
  INITIAL_PRAYERS,
  INITIAL_MINISTRIES,
  INITIAL_GIVING_LOG,
  INITIAL_SETTINGS
} from '../data/initialData'

const ChurchContext = createContext()

export const ChurchProvider = ({ children }) => {
  // Sermons
  const [sermons, setSermons] = useState(() => {
    const saved = localStorage.getItem('tizo_sermons')
    if (saved) {
      const parsed = JSON.parse(saved)
      // Ensure 'sermon-1' Giving Leverage points to user's YouTube link https://www.youtube.com/embed/d86xD-j6bQ8
      return parsed.map(s => {
        if (s.id === 'sermon-1') return { ...s, videoUrl: 'https://www.youtube.com/embed/d86xD-j6bQ8', title: 'Giving Leverage' }
        if (s.id === 'sermon-2') return { ...s, videoUrl: 'https://www.youtube.com/embed/1ss-ccxQi9g', thumbnail: 'https://img.youtube.com/vi/1ss-ccxQi9g/hqdefault.jpg', title: 'The Power of Unshakable Faith' }
        return s
      })
    }
    return INITIAL_SERMONS
  })

  // Events
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('tizo_events')
    return saved ? JSON.parse(saved) : INITIAL_EVENTS
  })

  // Prayer Requests
  const [prayers, setPrayers] = useState(() => {
    const saved = localStorage.getItem('tizo_prayers')
    return saved ? JSON.parse(saved) : INITIAL_PRAYERS
  })

  // Ministries
  const [ministries, setMinistries] = useState(() => {
    const saved = localStorage.getItem('tizo_ministries')
    return saved ? JSON.parse(saved) : INITIAL_MINISTRIES
  })

  // Giving Log
  const [givingLog, setGivingLog] = useState(() => {
    const saved = localStorage.getItem('tizo_giving')
    return saved ? JSON.parse(saved) : INITIAL_GIVING_LOG
  })

  // Site Settings
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('tizo_settings')
    if (saved) {
      const parsed = JSON.parse(saved)
      return { ...parsed, liveStreamUrl: 'https://www.youtube.com/embed/d86xD-j6bQ8' }
    }
    return INITIAL_SETTINGS
  })

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('tizo_admin_auth') === 'true'
  })

  // Modals state
  const [activeModal, setActiveModal] = useState(null) // 'livestream' | 'giving' | 'prayer' | 'visit' | 'admin' | null
  const [selectedSermon, setSelectedSermon] = useState(null)
  const [toastMessage, setToastMessage] = useState(null)

  // System Files & Git Sync State
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSyncedAt, setLastSyncedAt] = useState(() => localStorage.getItem('tizo_last_synced') || null)
  const [syncStatusMessage, setSyncStatusMessage] = useState(null)

  // Helper to persist system files (src/data/initialData.js & src/data/data.json)
  const saveToSystemFiles = async (customPayload = null) => {
    const payload = customPayload || {
      sermons,
      events,
      prayers,
      ministries,
      givingLog,
      settings
    }

    try {
      const res = await fetch('./api/save-system-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        const result = await res.json()
        const now = new Date().toLocaleTimeString()
        localStorage.setItem('tizo_last_synced', now)
        return { success: true, message: result.message, timestamp: now }
      }
    } catch (err) {
      console.warn('System file save endpoint unavailable in static host:', err)
    }
    return { success: false }
  }

  // Helper to commit & push changes to GitHub repository
  const syncToGitHub = async (commitMsg = 'Admin updated site content') => {
    setIsSyncing(true)
    setSyncStatusMessage('Saving data to system files...')

    // Step 1: Save to system files first
    const saveRes = await saveToSystemFiles()
    if (saveRes.timestamp) {
      setLastSyncedAt(saveRes.timestamp)
    }

    setSyncStatusMessage('Committing & pushing to GitHub repository...')
    try {
      const res = await fetch('./api/git-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: commitMsg })
      })

      if (res.ok) {
        const result = await res.json()
        const timeStr = new Date().toLocaleTimeString()
        setLastSyncedAt(timeStr)
        localStorage.setItem('tizo_last_synced', timeStr)
        setIsSyncing(false)

        if (result.success) {
          const successMsg = result.committed 
            ? '✅ Successfully saved to system files & pushed to GitHub repository!'
            : '✅ System files up to date! GitHub repository is clean.'
          showToast(successMsg)
          setSyncStatusMessage(successMsg)
          return { success: true, message: successMsg }
        } else {
          showToast('⚠️ Data saved to system files. GitHub sync note: ' + (result.warning || result.output))
          setSyncStatusMessage('Data saved to system files (`src/data/initialData.js`).')
          return { success: true, warning: result.warning }
        }
      }
    } catch (err) {
      console.error('Git sync failed:', err)
      setIsSyncing(false)
      showToast('⚠️ Saved to browser & system files. (Git sync available in server mode)')
    }
    setIsSyncing(false)
    return { success: false }
  }

  // Sync to localStorage & Auto-save to system files on data changes
  useEffect(() => {
    localStorage.setItem('tizo_sermons', JSON.stringify(sermons))
    localStorage.setItem('tizo_events', JSON.stringify(events))
    localStorage.setItem('tizo_prayers', JSON.stringify(prayers))
    localStorage.setItem('tizo_giving', JSON.stringify(givingLog))
    localStorage.setItem('tizo_settings', JSON.stringify(settings))

    saveToSystemFiles({ sermons, events, prayers, ministries, givingLog, settings })
  }, [sermons, events, prayers, givingLog, settings, ministries])

  useEffect(() => {
    localStorage.setItem('tizo_admin_auth', isAdminLoggedIn ? 'true' : 'false')
  }, [isAdminLoggedIn])

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 4000)
  }

  // Admin Login
  const loginAdmin = (passcode) => {
    if (passcode === 'admin123' || passcode === 'tizo2026') {
      setIsAdminLoggedIn(true)
      showToast('Welcome Admin! Access granted.')
      return true
    }
    return false
  }

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false)
    showToast('Admin logged out safely.')
  }

  // Actions: Sermons
  const addSermon = (newSermon) => {
    const item = { ...newSermon, id: 'sermon-' + Date.now() }
    setSermons([item, ...sermons])
    showToast('Sermon published successfully!')
  }

  const updateSermon = (updatedSermon) => {
    setSermons(sermons.map(s => s.id === updatedSermon.id ? updatedSermon : s))
    showToast('Sermon updated successfully!')
  }

  const deleteSermon = (id) => {
    setSermons(sermons.filter(s => s.id !== id))
    showToast('Sermon deleted.')
  }

  // Actions: Events
  const addEvent = (newEvent) => {
    const item = { ...newEvent, id: 'event-' + Date.now() }
    setEvents([item, ...events])
    showToast('Event created successfully!')
  }

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id))
    showToast('Event deleted.')
  }

  // Actions: Prayer Requests
  const submitPrayer = (author, request) => {
    const item = {
      id: 'prayer-' + Date.now(),
      author: author || 'Anonymous',
      request,
      date: new Date().toISOString().split('T')[0],
      prayedCount: 1,
      status: 'approved'
    }
    setPrayers([item, ...prayers])
    showToast('Your prayer request has been posted. Our prayer team is standing with you!')
  }

  const incrementPrayer = (id) => {
    setPrayers(prayers.map(p => p.id === id ? { ...p, prayedCount: p.prayedCount + 1 } : p))
    showToast('Thank you for praying for this request! 🙏')
  }

  const deletePrayer = (id) => {
    setPrayers(prayers.filter(p => p.id !== id))
    showToast('Prayer request removed.')
  }

  // Actions: Giving
  const recordGiving = (donorName, amount, fund) => {
    const record = {
      id: 'give-' + Date.now(),
      name: donorName || 'Anonymous',
      amount: parseFloat(amount),
      fund: fund || 'General Fund',
      date: new Date().toISOString().split('T')[0]
    }
    setGivingLog([record, ...givingLog])
    showToast(`Thank you for your generous gift of $${amount} to ${fund}! God bless you! ❤️`)
  }

  // Reset to initial demo data
  const resetToDemoData = () => {
    setSermons(INITIAL_SERMONS)
    setEvents(INITIAL_EVENTS)
    setPrayers(INITIAL_PRAYERS)
    setMinistries(INITIAL_MINISTRIES)
    setGivingLog(INITIAL_GIVING_LOG)
    setSettings(INITIAL_SETTINGS)
    localStorage.clear()
    saveToSystemFiles({
      sermons: INITIAL_SERMONS,
      events: INITIAL_EVENTS,
      prayers: INITIAL_PRAYERS,
      ministries: INITIAL_MINISTRIES,
      givingLog: INITIAL_GIVING_LOG,
      settings: INITIAL_SETTINGS
    })
    showToast('Demo data restored successfully!')
  }

  return (
    <ChurchContext.Provider value={{
      sermons,
      events,
      prayers,
      ministries,
      givingLog,
      settings,
      setSettings,
      isAdminLoggedIn,
      loginAdmin,
      logoutAdmin,
      addSermon,
      updateSermon,
      deleteSermon,
      addEvent,
      deleteEvent,
      submitPrayer,
      incrementPrayer,
      deletePrayer,
      recordGiving,
      activeModal,
      setActiveModal,
      selectedSermon,
      setSelectedSermon,
      toastMessage,
      showToast,
      resetToDemoData,
      isSyncing,
      lastSyncedAt,
      syncStatusMessage,
      saveToSystemFiles,
      syncToGitHub
    }}>
      {children}
    </ChurchContext.Provider>
  )
}

export const useChurch = () => useContext(ChurchContext)

