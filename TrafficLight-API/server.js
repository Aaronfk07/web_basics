import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = 5000

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// Traffic Light data store (in-memory)
const trafficLightStates = {
  '1': { startIndex: 2, cycleOrder: [2, 0, 1], currentIndex: 0 },
  'A': { startIndex: 1, cycleOrder: [1, 2, 0], currentIndex: 0 },
  'B': { startIndex: 0, cycleOrder: [0, 1, 2], currentIndex: 0 },
  'C': { startIndex: 2, cycleOrder: [2, 1, 0], currentIndex: 0 }
}

const statesCycle = ['RED', 'YELLOW', 'GREEN']

// Base traffic data template
const baseTrafficDataTemplate = {
  '1': {
    title: 'Traffic Light 1',
    baseData: [45, 52, 48, 61, 55, 58, 62, 51, 49, 53],
    ampelUndCarCountBase: [
      { ampel: 'RED', carCount: 12 },
      { ampel: 'YELLOW', carCount: 8 },
      { ampel: 'GREEN', carCount: 45 }
    ]
  },
  'A': {
    title: 'Traffic Light A',
    baseData: [38, 42, 46, 41, 39, 44, 48, 43, 40, 45],
    ampelUndCarCountBase: [
      { ampel: 'RED', carCount: 28 },
      { ampel: 'YELLOW', carCount: 15 },
      { ampel: 'GREEN', carCount: 32 }
    ]
  },
  'B': {
    title: 'Traffic Light B',
    baseData: [22, 18, 25, 20, 23, 19, 26, 21, 24, 22],
    ampelUndCarCountBase: [
      { ampel: 'RED', carCount: 42 },
      { ampel: 'YELLOW', carCount: 6 },
      { ampel: 'GREEN', carCount: 18 }
    ]
  },
  'C': {
    title: 'Traffic Light C',
    baseData: [55, 58, 62, 59, 61, 57, 63, 60, 64, 58],
    ampelUndCarCountBase: [
      { ampel: 'RED', carCount: 5 },
      { ampel: 'YELLOW', carCount: 12 },
      { ampel: 'GREEN', carCount: 55 }
    ]
  }
}

// Function to generate slightly varied data
function generateVariedData(baseData) {
  return baseData.map(value => {
    const variance = Math.floor(Math.random() * 10) - 5 // -5 to +5
    return Math.max(0, value + variance)
  })
}

// Function to generate varied car counts
function generateVariedCarCounts(baseCountArray) {
  return baseCountArray.map(item => ({
    ...item,
    carCount: Math.max(0, item.carCount + Math.floor(Math.random() * 8) - 4)
  }))
}

// Helper function to get current state and update it
function getCurrentStateAndUpdate(lightId) {
  const light = trafficLightStates[lightId]
  const stateIndex = light.cycleOrder[light.currentIndex]
  const currentState = statesCycle[stateIndex]
  
  // Update to next state for next request
  light.currentIndex = (light.currentIndex + 1) % light.cycleOrder.length
  
  return currentState
}

// Function to get traffic data with current state
function getTrafficDataWithState(lightId) {
  const template = baseTrafficDataTemplate[lightId]
  const currentState = getCurrentStateAndUpdate(lightId)
  
  return {
    title: template.title,
    overallState: currentState,
    minütlicheDaten: generateVariedData(template.baseData),
    ampelUndCarCount: generateVariedCarCounts(template.ampelUndCarCountBase)
  }
}

// Routes

// Get all traffic lights with current states
app.get('/api/traffic-lights', (req, res) => {
  const lights = {}
  Object.keys(baseTrafficDataTemplate).forEach(lightId => {
    lights[lightId] = getTrafficDataWithState(lightId)
  })
  res.json(lights)
})

// Get specific traffic light
app.get('/api/traffic-lights/:id', (req, res) => {
  const { id } = req.params
  
  if (!baseTrafficDataTemplate[id]) {
    return res.status(404).json({ error: 'Traffic light not found' })
  }

  res.json(getTrafficDataWithState(id))
})

// Get all traffic light states
app.get('/api/states', (req, res) => {
  const states = {}
  Object.keys(baseTrafficDataTemplate).forEach(lightId => {
    const light = trafficLightStates[lightId]
    const stateIndex = light.cycleOrder[light.currentIndex]
    states[lightId] = statesCycle[stateIndex]
    // Update state after reading
    light.currentIndex = (light.currentIndex + 1) % light.cycleOrder.length
  })
  res.json(states)
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Cookie consent routes

// Get cookie consent status
app.get('/api/cookies/consent', (req, res) => {
  const consent = req.cookies.cookieConsent
  res.json({ 
    hasConsent: consent === 'accepted',
    status: consent || 'not-set',
    timestamp: new Date().toISOString()
  })
})

// Set cookie consent
app.post('/api/cookies/consent', (req, res) => {
  const { consent } = req.body // 'accepted' or 'rejected'
  
  if (!consent || (consent !== 'accepted' && consent !== 'rejected')) {
    return res.status(400).json({ error: 'Invalid consent value. Must be "accepted" or "rejected"' })
  }

  // Set cookie with 1 year expiration
  const oneYear = 365 * 24 * 60 * 60 * 1000
  res.cookie('cookieConsent', consent, {
    maxAge: oneYear,
    httpOnly: false, // Allow JavaScript to read it
    sameSite: 'lax',
    secure: false // Set to true in production with HTTPS
  })

  res.json({ 
    message: `Cookie consent ${consent}`,
    consent: consent,
    timestamp: new Date().toISOString()
  })
})

// Delete cookie consent
app.delete('/api/cookies/consent', (req, res) => {
  res.clearCookie('cookieConsent')
  res.json({ 
    message: 'Cookie consent cleared',
    timestamp: new Date().toISOString()
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚦 Traffic Light API running on http://localhost:${PORT}`)
  console.log(`Available endpoints:`)
  console.log(`  GET /api/traffic-lights - Get all traffic lights`)
  console.log(`  GET /api/traffic-lights/:id - Get specific traffic light`)
  console.log(`  GET /api/states - Get all traffic light states`)
  console.log(`  GET /api/health - Health check`)
  console.log(`  GET /api/cookies/consent - Get cookie consent status`)
  console.log(`  POST /api/cookies/consent - Set cookie consent`)
  console.log(`  DELETE /api/cookies/consent - Clear cookie consent`)
})
