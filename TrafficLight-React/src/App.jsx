import { useState } from 'react'
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'
import './App.css'

// Mock data for each traffic light
export const trafficLightData = {
  '1': {
    title: 'Traffic Light 1',
    overallState: 'GREEN',
    minütlicheDaten: [45, 52, 48, 61, 55, 58, 62, 51, 49, 53],
    ampelUndCarCount: [
      { ampel: 'RED', carCount: 12 },
      { ampel: 'YELLOW', carCount: 8 },
      { ampel: 'GREEN', carCount: 45 }
    ]
  },
  'A': {
    title: 'Traffic Light A',
    overallState: 'YELLOW',
    minütlicheDaten: [38, 42, 46, 41, 39, 44, 48, 43, 40, 45],
    ampelUndCarCount: [
      { ampel: 'RED', carCount: 28 },
      { ampel: 'YELLOW', carCount: 15 },
      { ampel: 'GREEN', carCount: 32 }
    ]
  },
  'B': {
    title: 'Traffic Light B',
    overallState: 'RED',
    minütlicheDaten: [22, 18, 25, 20, 23, 19, 26, 21, 24, 22],
    ampelUndCarCount: [
      { ampel: 'RED', carCount: 42 },
      { ampel: 'YELLOW', carCount: 6 },
      { ampel: 'GREEN', carCount: 18 }
    ]
  },
  'C': {
    title: 'Traffic Light C',
    overallState: 'GREEN',
    minütlicheDaten: [55, 58, 62, 59, 61, 57, 63, 60, 64, 58],
    ampelUndCarCount: [
      { ampel: 'RED', carCount: 5 },
      { ampel: 'YELLOW', carCount: 12 },
      { ampel: 'GREEN', carCount: 55 }
    ]
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState('main')
  const [selectedLight, setSelectedLight] = useState(null)

  const handleSelectLight = (lightId) => {
    setSelectedLight(lightId)
    setCurrentPage('detail')
  }

  const handleBackToMain = () => {
    setCurrentPage('main')
    setSelectedLight(null)
  }

  return (
    <>
      {currentPage === 'main' && (
        <MainPage onSelectLight={handleSelectLight} />
      )}
      {currentPage === 'detail' && selectedLight && (
        <DetailPage 
          lightId={selectedLight} 
          data={trafficLightData[selectedLight]}
          onBack={handleBackToMain}
        />
      )}
    </>
  )
}

export default App
