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

function TrafficChart({ data }) {
  const chartData = {
    labels: ['Min 1', 'Min 2', 'Min 3', 'Min 4', 'Min 5', 'Min 6', 'Min 7', 'Min 8', 'Min 9', 'Min 10'],
    datasets: [{
      label: 'Car Count per Minute',
      data: data.minütlicheDaten,
      borderColor: getStateColor(data.overallState),
      backgroundColor: getStateColor(data.overallState) + '33',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7,
      pointBackgroundColor: getStateColor(data.overallState),
      pointBorderColor: '#fff',
      pointBorderWidth: 2
    }]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: { size: 14 },
          padding: 15
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 70,
        ticks: {
          font: { size: 12 }
        }
      },
      x: {
        ticks: {
          font: { size: 12 }
        }
      }
    }
  }

  return <Line data={chartData} options={options} />
}

export default TrafficChart
