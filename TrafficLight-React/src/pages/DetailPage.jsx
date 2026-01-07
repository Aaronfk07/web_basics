import TrafficChart from '../components/TrafficChart'
import DataPanel from '../components/DataPanel'
import './DetailPage.css'

function DetailPage({ lightId, data, onBack }) {
  return (
    <div className="detail-page">
      <button className="back-button" onClick={onBack}>
        ← Back to Main
      </button>

      <div className="detail-container">
        <h1>{data.title}</h1>

        <div className="detail-content">
          <div className="chart-section">
            <div className="chart-container">
              <TrafficChart data={data} />
            </div>
          </div>

          <div className="data-section">
            <DataPanel data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPage
