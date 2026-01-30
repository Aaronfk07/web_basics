# 🚗 Cars REST API

Eine einfache REST API zum Verwalten von Autos (CRUD-Operationen).

## Installation

```bash
npm install
```

## Server starten

```bash
npm start
```

Der Server läuft dann auf `http://localhost:3000`

## API Endpoints

### GET - Alle Autos abrufen
```bash
http GET http://localhost:3000/api/cars
```

### GET - Ein Auto nach ID abrufen
```bash
http GET http://localhost:3000/api/cars/1
```

### POST - Neues Auto erstellen
```bash
http POST http://localhost:3000/api/cars \
  name="Mercedes C-Klasse" \
  brand="Mercedes" \
  year=2024 \
  color="Rot" \
  horsepower=258
```

### PUT - Auto aktualisieren
```bash
http PUT http://localhost:3000/api/cars/1 \
  name="Tesla Model S" \
  year=2024 \
  horsepower=515
```

### DELETE - Auto löschen
```bash
http DELETE http://localhost:3000/api/cars/1
```

## Car Modell

```json
{
  "id": 1,
  "name": "Tesla Model 3",
  "brand": "Tesla",
  "year": 2023,
  "color": "Schwarz",
  "horsepower": 450
}
```

## Felder

- **id**: Eindeutige Identifikationsnummer (automatisch generiert)
- **name**: Modellname des Autos
- **brand**: Marke des Autos
- **year**: Baujahr
- **color**: Farbe
- **horsepower**: Leistung in PS

## Testdaten

Die API startet mit 3 Beispiel-Autos:
- Tesla Model 3
- BMW M440
- Audi A6
