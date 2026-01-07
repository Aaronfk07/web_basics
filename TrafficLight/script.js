// Mock data for each traffic light
const trafficLightData = {
    '1': {
        title: 'Traffic Light 1',
        overallState: 'GREEN',
        minütlicheDaten: [45, 52, 48, 61, 55, 58, 62, 51, 49, 53],
        ampelUndCarCount: [
            { ampel: 'RED', carCount: 12 },
            { ampel: 'YELLOW', carCount: 8 },
            { ampel: 'GREEN', carCount: 45 }
        ]
    },
    'A': {
        title: 'Traffic Light A',
        overallState: 'YELLOW',
        minütlicheDaten: [38, 42, 46, 41, 39, 44, 48, 43, 40, 45],
        ampelUndCarCount: [
            { ampel: 'RED', carCount: 28 },
            { ampel: 'YELLOW', carCount: 15 },
            { ampel: 'GREEN', carCount: 32 }
        ]
    },
    'B': {
        title: 'Traffic Light B',
        overallState: 'RED',
        minütlicheDaten: [22, 18, 25, 20, 23, 19, 26, 21, 24, 22],
        ampelUndCarCount: [
            { ampel: 'RED', carCount: 42 },
            { ampel: 'YELLOW', carCount: 6 },
            { ampel: 'GREEN', carCount: 18 }
        ]
    },
    'C': {
        title: 'Traffic Light C',
        overallState: 'GREEN',
        minütlicheDaten: [55, 58, 62, 59, 61, 57, 63, 60, 64, 58],
        ampelUndCarCount: [
            { ampel: 'RED', carCount: 5 },
            { ampel: 'YELLOW', carCount: 12 },
            { ampel: 'GREEN', carCount: 55 }
        ]
    }
};

let currentChart = null;

// Initialize traffic light interactions
document.querySelectorAll('.traffic-light').forEach(light => {
    light.addEventListener('click', function() {
        const id = this.dataset.id;
        displayTrafficLightData(id);
    });
});

function displayTrafficLightData(id) {
    const data = trafficLightData[id];
    const dataPanel = document.getElementById('dataPanel');
    
    // Create data display
    let html = `<h3>${data.title}</h3>`;
    
    html += `<div class="data-item">
        <strong>Overall State:</strong>
        <span style="color: ${getStateColor(data.overallState)}; font-weight: bold;">● ${data.overallState}</span>
    </div>`;
    
    html += `<div class="data-item">
        <strong>Minütliche Daten (letzte 10 Minuten):</strong>
        <span>${data.minütlicheDaten.join(', ')} Fahrzeuge</span>
    </div>`;
    
    html += `<div class="data-item">
        <strong>Ampel & Car Count:</strong>`;
    
    data.ampelUndCarCount.forEach(item => {
        html += `<span style="margin-top: 5px;">● ${item.ampel}: <strong>${item.carCount}</strong> Fahrzeuge</span>`;
    });
    
    html += `</div>`;
    
    dataPanel.innerHTML = html;
    
    // Update chart
    updateTrafficChart(data);
}

function getStateColor(state) {
    switch(state) {
        case 'RED':
            return '#ff4444';
        case 'YELLOW':
            return '#ffdd44';
        case 'GREEN':
            return '#44ff44';
        default:
            return '#666';
    }
}

function updateTrafficChart(data) {
    const ctx = document.getElementById('trafficChart').getContext('2d');
    
    if (currentChart) {
        currentChart.destroy();
    }
    
    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Min 1', 'Min 2', 'Min 3', 'Min 4', 'Min 5', 'Min 6', 'Min 7', 'Min 8', 'Min 9', 'Min 10'],
            datasets: [{
                label: 'Car Count per Minute',
                data: data.minütlicheDaten,
                borderColor: getStateColor(data.overallState),
                backgroundColor: getStateColor(data.overallState) + '20',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: getStateColor(data.overallState),
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
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
                    title: {
                        display: true,
                        text: 'Number of Cars'
                    }
                }
            }
        }
    });
}

// Set default view on page load
window.addEventListener('DOMContentLoaded', function() {
    displayTrafficLightData('1');
});
