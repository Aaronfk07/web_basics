# HTL Dornbirn Jump & Run Game

Ein einfaches Jump and Run Spiel mit Charakter- und Levelauswahl.

## Spielanleitung

### Steuerung
- **Pfeiltasten** oder **WASD**: Bewegung
- **Pfeil nach oben**, **W** oder **Leertaste**: Springen
- **Ziel**: Erreiche den goldenen Stern! ⭐

### Spielablauf
1. Wähle einen Charakter (jeder hat unterschiedliche Eigenschaften)
2. Wähle ein Level (von Einfach bis Schwer)
3. Klicke auf "Spiel starten"
4. Springe über Plattformen und vermeide die roten Stacheln
5. Erreiche das Ziel!

## Neue Charaktere hinzufügen

Um einen neuen Charakter hinzuzufügen, öffne die Datei `characters/characters.json` und füge ein neues Objekt hinzu:

\`\`\`json
{
    "id": "dein-charakter-id",
    "name": "Charaktername",
    "icon": "🎮",
    "color": "#FF5733",
    "speed": 5,
    "jumpPower": 16,
    "description": "Kurze Beschreibung"
}
\`\`\`

### Parameter erklärt:
- **id**: Eindeutige Kennung (z.B. "superman", "pirat")
- **name**: Anzeigename des Charakters
- **icon**: Emoji-Symbol (kopiere einfach ein Emoji 😊)
- **color**: Hintergrundfarbe in Hex-Format (#RRGGBB)
- **speed**: Bewegungsgeschwindigkeit (1-10, empfohlen 3-7)
- **jumpPower**: Sprunghöhe (10-25, empfohlen 12-20)
- **description**: Kurze Beschreibung der Eigenschaften

### Beispiel - Pirat hinzufügen:

Öffne `characters/characters.json` und füge am Ende hinzu:

\`\`\`json
    ,
    {
        "id": "pirate",
        "name": "Pirat",
        "icon": "🏴‍☠️",
        "color": "#1abc9c",
        "speed": 5,
        "jumpPower": 14,
        "description": "Ausgewogen"
    }
\`\`\`

**Wichtig**: Vergiss nicht das Komma vor dem neuen Eintrag!

## Neue Levels hinzufügen

Um ein neues Level hinzuzufügen, öffne `levels/levels.json` und füge ein neues Level-Objekt hinzu:

\`\`\`json
{
    "id": 4,
    "name": "Levelname",
    "difficulty": "Mittel",
    "platforms": [
        { "x": 0, "y": 550, "width": 200, "height": 50 }
    ],
    "goal": { "x": 700, "y": 150, "width": 50, "height": 50 },
    "obstacles": [
        { "x": 300, "y": 430, "width": 40, "height": 20, "type": "spike" }
    ]
}
\`\`\`

### Level-Parameter:
- **id**: Level-Nummer (fortlaufend)
- **name**: Levelname
- **difficulty**: "Einfach", "Mittel" oder "Schwer"
- **platforms**: Array von Plattformen mit x, y, Breite und Höhe
- **goal**: Zielposition (goldener Stern)
- **obstacles**: Hindernisse (optional)

### Tipps für gute Levels:
- Canvas-Größe: 800x600 Pixel
- Startplattform bei y=550 (unten)
- Plattformen sollten erreichbar sein (max. ~150px Abstand)
- Ziel sollte eine Herausforderung sein, aber erreichbar

## Spiel starten

Öffne einfach die `index.html` Datei im Browser oder nutze einen lokalen Webserver.

Mit VS Code Live Server:
1. Installiere die "Live Server" Extension
2. Rechtsklick auf `index.html`
3. Wähle "Open with Live Server"

## Technologie-Stack
- HTML5
- CSS3
- Vanilla JavaScript
- Canvas API

Viel Spaß beim Spielen! 🎮
