import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 5000

// Middleware
app.use(cors())
app.use(express.json())

// Traffic Light data store (in-memory)
const trafficLightStates = {
  '1': { startIndex: 2, cycleOrder: [2, 0, 1], currentIndex: 0 },
  'A': { startIndex: 1, cycleOrder: [1, 2, 0], currentIndex: 0 },
  'B': { startIndex: 0, cycleOrder: [0, 1, 2], currentIndex: 0 },
  'C': { startIndex: 2, cycleOrder: [2, 1, 0], currentIndex: 0 }
}

const statesCycle = ['RED', 'YELLOW', 'GREEN']

const baseTrafficData = {
  '1': {
    title: 'Traffic Light 1',
    minütlicheDaten: [45, 52, 48, 61, 55, 58, 62, 51, 49, 53],
    ampelUndCarCount: [
      { ampel: 'RED', carCount: 12 },
      { ampel: 'YELLOW', carCount: 8 },
      { ampel: 'GREEN', carCount: 45 }
    ]
  },
  'A': {
    title: 'Traffic Light A',
    minütlicheDaten: [38, 42, 46, 41, 39, 44, 48, 43, 40, 45],
    ampelUndCarCount: [
      { ampel: 'RED', carCount: 28 },
      { ampel: 'YELLOW', carCount: 15 },
      { ampel: 'GREEN', carCount: 32 }
    ]
  },
  'B': {
    title: 'Traffic Light B',
    minütlicheDaten: [22, 18, 25, 20, 23, 19, 26, 21, 24, 22],
    ampelUndCarCount: [
      { ampel: 'RED', carCount: 42 },
      { ampel: 'YELLOW', carCount: 6 },
      { ampel: 'GREEN', carCount: 18 }
    ]
  },
  'C': {
    title: 'Traffic Light C',
    minütlicheDaten: [55, 58, 62, 59, 61, 57, 63, 60, 64, 58],
    ampelUndCarCount: [
      { ampel: 'RED', carCount: 5 },
      { ampel: 'YELLOW', carCount: 12 },
      { ampel: 'GREEN', carCount: 55 }
    ]
  }
}

// Helper function to get current state
function getCurrentState(lightId) {
  const light = trafficLightStates[lightId]
  const stateIndex = light.cycleOrder[light.currentIndex]
  return statesCycle[stateIndex]
}

// Update states every minute
setInterval(() => {
  Object.keys(trafficLightStates).forEach(lightId => {
    const light = trafficLightStates[lightId]
    light.currentIndex = (light.currentIndex + 1) % light.cycleOrder.length
  })
}, 60000) // 60000ms = 1 minute

// Routes

// Get all traffic lights with current states
app.get('/api/traffic-lights', (req, res) => {
  const lights = {}
  Object.keys(baseTrafficData).forEach(lightId => {
    lights[lightId] = {
      ...baseTrafficData[lightId],
      overallState: getCurrentState(lightId)
    }
  })
  res.json(lights)
})

// Get specific traffic light
app.get('/api/traffic-lights/:id', (req, res) => {
  const { id } = req.params
  
  if (!baseTrafficData[id]) {
    return res.status(404).json({ error: 'Traffic light not found' })
  }

  res.json({
    ...baseTrafficData[id],
    overallState: getCurrentState(id)
  })
})

// Get all traffic light states
app.get('/api/states', (req, res) => {
  const states = {}
  Object.keys(baseTrafficData).forEach(lightId => {
    states[lightId] = getCurrentState(lightId)
  })
  res.json(states)
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
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
})
