import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { trafficLightData } from '../App'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

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

function CombinedChart() {
  const chartData = {
    labels: ['Min 1', 'Min 2', 'Min 3', 'Min 4', 'Min 5', 'Min 6', 'Min 7', 'Min 8', 'Min 9', 'Min 10'],
    datasets: [
      {
        label: 'Traffic Light 1',
        data: trafficLightData['1'].minütlicheDaten,
        borderColor: '#ff6b6b',
        backgroundColor: '#ff6b6b33',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Traffic Light A',
        data: trafficLightData['A'].minütlicheDaten,
        borderColor: '#4ecdc4',
        backgroundColor: '#4ecdc433',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Traffic Light B',
        data: trafficLightData['B'].minütlicheDaten,
        borderColor: '#ffa502',
        backgroundColor: '#ffa50233',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Traffic Light C',
        data: trafficLightData['C'].minütlicheDaten,
        borderColor: '#95e1d3',
        backgroundColor: '#95e1d333',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: { size: 13 },
          padding: 15,
          usePointStyle: true,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 13 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 70,
        ticks: {
          font: { size: 12 }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      x: {
        ticks: {
          font: { size: 12 }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      }
    }
  }

  return <Line data={chartData} options={options} />
}

export default CombinedChart
