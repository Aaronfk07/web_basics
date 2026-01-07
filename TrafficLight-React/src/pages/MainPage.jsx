import TrafficLightGrid from '../components/TrafficLightGrid'
import CombinedChart from '../components/CombinedChart'
import './MainPage.css'

function MainPage({ onSelectLight }) {
  return (
    <div className="main-page">
      <div className="main-container">
        <div className="left-section">
          <h1>Traffic Light Control</h1>
          <TrafficLightGrid onSelectLight={onSelectLight} />
        </div>

        <div className="right-section">
          <div className="chart-container">
            <h2>Combined Traffic Data</h2>
            <CombinedChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
