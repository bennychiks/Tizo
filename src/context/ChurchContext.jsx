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
      return parsed.map(s => s.id === 'sermon-1' ? { ...s, videoUrl: 'https://www.youtube.com/embed/d86xD-j6bQ8', title: 'Giving Leverage' } : s)
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

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('tizo_sermons', JSON.stringify(sermons))
  }, [sermons])

  useEffect(() => {
    localStorage.setItem('tizo_events', JSON.stringify(events))
  }, [events])

  useEffect(() => {
    localStorage.setItem('tizo_prayers', JSON.stringify(prayers))
  }, [prayers])

  useEffect(() => {
    localStorage.setItem('tizo_giving', JSON.stringify(givingLog))
  }, [givingLog])

  useEffect(() => {
    localStorage.setItem('tizo_settings', JSON.stringify(settings))
  }, [settings])

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
      resetToDemoData
    }}>
      {children}
    </ChurchContext.Provider>
  )
}

export const useChurch = () => useContext(ChurchContext)
