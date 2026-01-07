import TrafficLight from './TrafficLight'
import './TrafficLightGrid.css'

const trafficLights = [
  { id: '1' },
  { id: 'A' },
  { id: 'B' },
  { id: 'C' }
]

function TrafficLightGrid({ onSelectLight, selectedLight, trafficStates }) {
  return (
    <div className="traffic-lights-grid">
      {trafficLights.map((light) => (
        <TrafficLight
          key={light.id}
          id={light.id}
          currentState={trafficStates[light.id]}
          isSelected={selectedLight === light.id}
          onClick={() => onSelectLight(light.id)}
        />
      ))}
    </div>
  )
}

export default TrafficLightGrid
