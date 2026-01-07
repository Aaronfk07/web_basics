import TrafficLight from './TrafficLight'
import './TrafficLightGrid.css'

const trafficLights = [
  { id: '1', state: 'GREEN' },
  { id: 'A', state: 'YELLOW' },
  { id: 'B', state: 'RED' },
  { id: 'C', state: 'GREEN' }
]

function TrafficLightGrid({ selectedLight, onSelectLight }) {
  return (
    <div className="traffic-lights-grid">
      {trafficLights.map((light) => (
        <TrafficLight
          key={light.id}
          id={light.id}
          currentState={light.state}
          isSelected={selectedLight === light.id}
          onClick={() => onSelectLight(light.id)}
        />
      ))}
    </div>
  )
}

export default TrafficLightGrid
