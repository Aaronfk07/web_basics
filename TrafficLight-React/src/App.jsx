import { useState, useEffect } from 'react'
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'
import './App.css'

const API_URL = 'http://localhost:5000/api'

function App() {
  const [currentPage, setCurrentPage] = useState('main')
  const [selectedLight, setSelectedLight] = useState(null)
  const [trafficData, setTrafficData] = useState({})
  const [trafficStates, setTrafficStates] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch traffic light data from API
  const fetchTrafficData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/traffic-lights`)
      if (!response.ok) throw new Error('Failed to fetch traffic data')
      const data = await response.json()
      setTrafficData(data)
      
      // Extract states
      const states = {}
      Object.keys(data).forEach(lightId => {
        states[lightId] = data[lightId].overallState
      })
      setTrafficStates(states)
      setError(null)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to connect to API. Make sure the server is running on port 5000.')
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch and setup polling
  useEffect(() => {
    fetchTrafficData()
    
    // Poll for updates every 10 seconds
    const pollInterval = setInterval(fetchTrafficData, 10000)
    
    return () => clearInterval(pollInterval)
  }, [])

  const handleSelectLight = (lightId) => {
    setSelectedLight(lightId)
    setCurrentPage('detail')
  }

  const handleBackToMain = () => {
    setCurrentPage('main')
    setSelectedLight(null)
  }

  if (loading && Object.keys(trafficData).length === 0) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading traffic light data...</p>
      </div>
    )
  }

  if (error && Object.keys(trafficData).length === 0) {
    return (
      <div className="error-container">
        <h2>⚠️ Connection Error</h2>
        <p>{error}</p>
        <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          To start the API server, run:<br/>
          <code style={{ background: '#f0f0f0', padding: '10px', display: 'block', marginTop: '10px' }}>
            cd TrafficLight-API && npm install && npm start
          </code>
        </p>
      </div>
    )
  }

  return (
    <>
      {currentPage === 'main' && (
        <MainPage 
          onSelectLight={handleSelectLight}
          trafficStates={trafficStates}
        />
      )}
      {currentPage === 'detail' && selectedLight && trafficData[selectedLight] && (
        <DetailPage 
          lightId={selectedLight} 
          data={{
            ...trafficData[selectedLight],
            overallState: trafficStates[selectedLight]
          }}
          onBack={handleBackToMain}
        />
      )}
    </>
  )
}

export default App
