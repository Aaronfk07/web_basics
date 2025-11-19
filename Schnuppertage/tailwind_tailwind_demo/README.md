# Tailwind Demo: Erklärung + Theoretische Login Page

Kurze Demo, die Tailwind-Utilities verwendet und daneben äquivalente CSS-Regeln zeigt.

Dateien:
- `index.html` – Demo-Seite (verwendet Tailwind via CDN)
- `styles.css` – ergänzende CSS-Regeln, die zeigen, wie Tailwind-Klassen in normales CSS übersetzt werden können

Öffnen:
1. Datei `index.html` im Browser öffnen (doppelklick oder über Editor -> "Open in Default Browser").
   - `index.html` ist die Startseite (Home).
2. Alternativ existieren zwei Platzhalterseiten: `schueler.html` und `lehrer.html`.
3. Die Seite braucht kein Build-Tool, Tailwind kommt über das Play-CDN.

Logo:
- Legen Sie eine Datei `htl_dornbirn_logo.png` in denselben Ordner (`tailwind_tailwind_demo`), damit das Logo oben rechts angezeigt wird. Alternativ passen Sie den `img src` in den Header-Elementen an.

Hinweis zur Funktionsweise:
- `login.html` existiert weiterhin als optionale Demo-Seite, sie ist jedoch nicht mehr erforderlich, um `index.html` zu öffnen.
- Für produktive Nutzung ist ein echtes Backend nötig; diese Demo nutzt keine serverseitige Authentifizierung.

Hinweis: Für produktive Nutzung sollte Tailwind via npm+Build eingebunden werden und Content/Purge konfiguriert werden.
