const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Funktion um Daten zu JSON zu konvertieren
function toJSON(data) {
  return data;
}

// Funktion um Daten zu XML zu konvertieren
function toXML(data) {
  if (Array.isArray(data)) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<cars>\n';
    data.forEach(car => {
      xml += '  <car>\n';
      xml += `    <id>${car.id}</id>\n`;
      xml += `    <name>${escapeXML(car.name)}</name>\n`;
      xml += `    <brand>${escapeXML(car.brand)}</brand>\n`;
      xml += `    <year>${car.year}</year>\n`;
      xml += `    <color>${escapeXML(car.color)}</color>\n`;
      xml += `    <horsepower>${car.horsepower}</horsepower>\n`;
      xml += '  </car>\n';
    });
    xml += '</cars>';
    return xml;
  } else {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<car>\n';
    xml += `  <id>${data.id}</id>\n`;
    xml += `  <name>${escapeXML(data.name)}</name>\n`;
    xml += `  <brand>${escapeXML(data.brand)}</brand>\n`;
    xml += `  <year>${data.year}</year>\n`;
    xml += `  <color>${escapeXML(data.color)}</color>\n`;
    xml += `  <horsepower>${data.horsepower}</horsepower>\n`;
    xml += '</car>';
    return xml;
  }
}

// XML-Zeichen escapen
function escapeXML(str) {
  return String(str).replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

// Middleware um Format zu bestimmen
app.use((req, res, next) => {
  // Format basierend auf Accept-Header oder format-Parameter bestimmen
  const format = req.query.format || req.get('Accept');
  
  if (format && format.includes('xml')) {
    res.locals.format = 'xml';
  } else {
    res.locals.format = 'json';
  }
  next();
});

// Middleware um Response-Format zu setzen
function sendResponse(res, data, statusCode = 200) {
  if (res.locals.format === 'xml') {
    res.status(statusCode).type('application/xml').send(toXML(data));
  } else {
    res.status(statusCode).json(data);
  }
}

// In-Memory Datenbank
let cars = [
  { id: 1, name: 'Tesla Model 3', brand: 'Tesla', year: 2023, color: 'Schwarz', horsepower: 450 },
  { id: 2, name: 'BMW M440', brand: 'BMW', year: 2022, color: 'Blau', horsepower: 503 },
  { id: 3, name: 'Audi A6', brand: 'Audi', year: 2023, color: 'Silber', horsepower: 340 }
];

let nextId = 4;

// GET - Alle Autos
app.get('/api/cars', (req, res) => {
  sendResponse(res, cars);
});

// GET - Ein Auto nach ID
app.get('/api/cars/:id', (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  
  if (!car) {
    if (res.locals.format === 'xml') {
      return res.status(404).type('application/xml').send('<?xml version="1.0" encoding="UTF-8"?>\n<error>Auto nicht gefunden</error>');
    }
    return res.status(404).json({ error: 'Auto nicht gefunden' });
  }
  
  sendResponse(res, car);
});

// POST - Neues Auto erstellen
app.post('/api/cars', (req, res) => {
  const { name, brand, year, color, horsepower } = req.body;
  
  // Validierung
  if (!name || !brand || !year) {
    if (res.locals.format === 'xml') {
      return res.status(400).type('application/xml').send('<?xml version="1.0" encoding="UTF-8"?>\n<error>Name, Brand und Year sind erforderlich</error>');
    }
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
  sendResponse(res, newCar, 201);
});

// PUT - Auto aktualisieren
app.put('/api/cars/:id', (req, res) => {
  const car = cars.find(c => c.id === parseInt(req.params.id));
  
  if (!car) {
    if (res.locals.format === 'xml') {
      return res.status(404).type('application/xml').send('<?xml version="1.0" encoding="UTF-8"?>\n<error>Auto nicht gefunden</error>');
    }
    return res.status(404).json({ error: 'Auto nicht gefunden' });
  }
  
  const { name, brand, year, color, horsepower } = req.body;
  
  // Nur Felder aktualisieren, die vorhanden sind
  if (name) car.name = name;
  if (brand) car.brand = brand;
  if (year) car.year = year;
  if (color) car.color = color;
  if (horsepower) car.horsepower = horsepower;
  
  sendResponse(res, car);
});

// DELETE - Auto löschen
app.delete('/api/cars/:id', (req, res) => {
  const index = cars.findIndex(c => c.id === parseInt(req.params.id));
  
  if (index === -1) {
    if (res.locals.format === 'xml') {
      return res.status(404).type('application/xml').send('<?xml version="1.0" encoding="UTF-8"?>\n<error>Auto nicht gefunden</error>');
    }
    return res.status(404).json({ error: 'Auto nicht gefunden' });
  }
  
  const deletedCar = cars.splice(index, 1);
  
  if (res.locals.format === 'xml') {
    const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<response>\n  <message>Auto gelöscht</message>\n' + 
                '  <car>\n' +
                `    <id>${deletedCar[0].id}</id>\n` +
                `    <name>${escapeXML(deletedCar[0].name)}</name>\n` +
                `    <brand>${escapeXML(deletedCar[0].brand)}</brand>\n` +
                `    <year>${deletedCar[0].year}</year>\n` +
                `    <color>${escapeXML(deletedCar[0].color)}</color>\n` +
                `    <horsepower>${deletedCar[0].horsepower}</horsepower>\n` +
                '  </car>\n</response>';
    return res.type('application/xml').send(xml);
  }
  
  res.json({ message: 'Auto gelöscht', car: deletedCar[0] });
});

// Server starten
app.listen(PORT, () => {
  console.log(`🚗 Cars API läuft auf http://localhost:${PORT}`);
  console.log(`\nVerfügbare Endpoints:`);
  console.log(`  GET    /api/cars`);
  console.log(`  GET    /api/cars/:id`);
  console.log(`  POST   /api/cars`);
  console.log(`  PUT    /api/cars/:id`);
  console.log(`  DELETE /api/cars/:id`);
  console.log(`\nFormat-Parameter: ?format=xml (Standard: JSON)`);
  console.log(`Oder Accept-Header: Accept: application/xml`);
});
