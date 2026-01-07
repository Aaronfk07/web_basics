import './TrafficLight.css'

function TrafficLight({ id, currentState, onClick, isSelected }) {
  const getStateIndex = (state) => {
    const states = { RED: 0, YELLOW: 1, GREEN: 2 }
    return states[state] || 2
  }

  const stateIndex = getStateIndex(currentState)
  const lights = ['red', 'yellow', 'green']

  return (
    <div className="traffic-light-wrapper">
      <h2>{id}</h2>
      <div 
        className={`traffic-light ${isSelected ? 'selected' : ''}`}
        onClick={onClick}
      >
        {lights.map((light, index) => (
          <div
            key={light}
            className={`light ${light} ${index === stateIndex ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}

export default TrafficLight
