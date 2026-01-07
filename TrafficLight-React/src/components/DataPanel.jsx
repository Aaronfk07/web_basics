import './DataPanel.css'

function getStateColor(state) {
  switch(state) {
    case 'RED':
      return '#ff4444'
    case 'YELLOW':
      return '#ffdd44'
    case 'GREEN':
      return '#44ff44'
    default:
      return '#666'
  }
}

function DataPanel({ data }) {
  return (
    <div className="data-panel">
      <h3>{data.title}</h3>
      
      <div className="data-item">
        <strong>Overall State:</strong>
        <span style={{ color: getStateColor(data.overallState), fontWeight: 'bold' }}>
          ● {data.overallState}
        </span>
      </div>

      <div className="data-item">
        <strong>Minütliche Daten (letzte 10 Minuten):</strong>
        <span>{data.minütlicheDaten.join(', ')} Fahrzeuge</span>
      </div>

      <div className="data-item">
        <strong>Ampel & Car Count:</strong>
        {data.ampelUndCarCount.map((item, index) => (
          <span key={index} style={{ marginTop: '5px', display: 'block' }}>
            ● {item.ampel}: <strong>{item.carCount}</strong> Fahrzeuge
          </span>
        ))}
      </div>
    </div>
  )
}

export default DataPanel
