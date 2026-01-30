const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// In-Memory Datenbank
let cars = [
  { id: 1, name: 'Tesla Model 3', brand: 'Tesla', year: 2023, color: 'Schwarz', horsepower: 450 },
  { id: 2, name: 'BMW M440', brand: 'BMW', year: 2022, color: 'Blau', horsepower: 503 },
  { id: 3, name: 'Audi A6', brand: 'Audi', year: 2023, color: 'Silber', horsepower: 340 }
];

let nextId = 4;

// GET - Alle Autos
app.get('/api/cars', (req, res) => {
  res.json(cars);
});

// GET - Ein Auto nach ID
app.get('/api/cars/:id', (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  
  if (!car) {
    return res.status(404).json({ error: 'Auto nicht gefunden' });
  }
  
  res.json(car);
});

// POST - Neues Auto erstellen
app.post('/api/cars', (req, res) => {
  const { name, brand, year, color, horsepower } = req.body;
  
  // Validierung
  if (!name || !brand || !year) {
    return res.status(400).json({ error: 'Name, Brand und Year sind erforderlich' });
  }
  
  const newCar = {
    id: nextId++,
    name,
    brand,
    year,
    color: color || 'Unbekannt',
    horsepower: horsepower || 0
  };
  
  cars.push(newCar);
  res.status(201).json(newCar);
});

// PUT - Auto aktualisieren
app.put('/api/cars/:id', (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  
  if (!car) {
    return res.status(404).json({ error: 'Auto nicht gefunden' });
  }
  
  const { name, brand, year, color, horsepower } = req.body;
  
  // Nur Felder aktualisieren, die vorhanden sind
  if (name) car.name = name;
  if (brand) car.brand = brand;
  if (year) car.year = year;
  if (color) car.color = color;
  if (horsepower) car.horsepower = horsepower;
  
  res.json(car);
});

// DELETE - Auto löschen
app.delete('/api/cars/:id', (req, res) => {
  const index = cars.findIndex(c => c.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'Auto nicht gefunden' });
  }
  
  const deletedCar = cars.splice(index, 1);
  res.json({ message: 'Auto gelöscht', car: deletedCar[0] });
});

// Server starten
app.listen(PORT, () => {
  console.log(`🚗 Cars API läuft auf http://localhost:${PORT}`);
  console.log(`Verfügbare Endpoints:`);
  console.log(`  GET    /api/cars`);
  console.log(`  GET    /api/cars/:id`);
  console.log(`  POST   /api/cars`);
  console.log(`  PUT    /api/cars/:id`);
  console.log(`  DELETE /api/cars/:id`);
});
