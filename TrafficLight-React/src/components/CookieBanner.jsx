import { useState, useEffect } from 'react'
import './CookieBanner.css'

const API_URL = 'http://localhost:5000/api'

function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkCookieConsent()
  }, [])

  const checkCookieConsent = async () => {
    try {
      const response = await fetch(`${API_URL}/cookies/consent`, {
        credentials: 'include'
      })
      const data = await response.json()
      
      // Show banner only if consent is not set
      if (data.status === 'not-set') {
        setShowBanner(true)
      }
    } catch (error) {
      console.error('Error checking cookie consent:', error)
      // If API is down, check localStorage as fallback
      const localConsent = localStorage.getItem('cookieConsent')
      if (!localConsent) {
        setShowBanner(true)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccept = async () => {
    try {
      await fetch(`${API_URL}/cookies/consent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ consent: 'accepted' })
      })
      localStorage.setItem('cookieConsent', 'accepted')
      setShowBanner(false)
    } catch (error) {
      console.error('Error setting cookie consent:', error)
      // Fallback to localStorage
      localStorage.setItem('cookieConsent', 'accepted')
      setShowBanner(false)
    }
  }

  const handleReject = async () => {
    try {
      await fetch(`${API_URL}/cookies/consent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ consent: 'rejected' })
      })
      localStorage.setItem('cookieConsent', 'rejected')
      setShowBanner(false)
    } catch (error) {
      console.error('Error setting cookie consent:', error)
      // Fallback to localStorage
      localStorage.setItem('cookieConsent', 'rejected')
      setShowBanner(false)
    }
  }

  if (isLoading || !showBanner) {
    return null
  }

  return (
    <div className="cookie-banner-overlay">
      <div className="cookie-banner">
        <div className="cookie-content">
          <div className="cookie-icon">🍪</div>
          <div className="cookie-text">
            <h3>We use cookies</h3>
            <p>
              This website uses cookies to ensure you get the best experience. 
              We use cookies to store your traffic light preferences and session data.
            </p>
          </div>
        </div>
        <div className="cookie-buttons">
          <button className="cookie-btn cookie-btn-reject" onClick={handleReject}>
            Reject
          </button>
          <button className="cookie-btn cookie-btn-accept" onClick={handleAccept}>
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieBanner
