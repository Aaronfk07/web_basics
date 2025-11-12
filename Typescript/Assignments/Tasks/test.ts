// ============================================================
// 💻 Objektorientierte Programmierung in TypeScript
// ============================================================
// Themen:
// 1️⃣ Klasse & Objekt
// 2️⃣ private / public (Sichtbarkeiten)
// 3️⃣ Konstruktor
// 4️⃣ Methodensignatur
// 5️⃣ Riedmannsches Schalenmodell (Vererbung von Objekten)
// ============================================================

/*
    🔵 1️⃣ Klasse & Objekt
    ----------------------
    - Eine Klasse ist ein Bauplan für Objekte.
    - Ein Objekt ist eine konkrete Instanz dieser Klasse.

    Beispiel:
        class Auto { ... }   ← Klasse
        const meinAuto = new Auto(); ← Objekt
*/
class AutoBeispiel {
    marke: string;
    baujahr: number;

    constructor() {
        this.marke = "BMW";
        this.baujahr = 0;
    }

    fahren(): void {
        console.log("Das Auto fährt los!");
    }
}

/*
    🔵 2️⃣ private / public
    -----------------------
    - private → nur innerhalb der Klasse sichtbar
    - public  → überall sichtbar
*/
class SichtbarkeitBeispiel {
    private kilometerstand: number = 0;
    public farbe: string = "Silber";

    public fahren(km: number): void {
        this.kilometerstand += km;
        console.log("Gefahrene Kilometer:", this.kilometerstand);
    }

    // Zugriff auf private Variable über "Getter"
    public getKilometerstand(): number {
        return this.kilometerstand;
    }
}

/*
    🔵 3️⃣ Konstruktor
    ------------------
    - Wird automatisch aufgerufen, wenn ein Objekt erzeugt wird.
    - Hat denselben Namen wie die Klasse (in TS immer "constructor").
*/
class KonstruktorBeispiel {
    name: string;
    alter: number;

    constructor(name: string, alter: number) {
        this.name = name;
        this.alter = alter;
        console.log(`Ein Objekt wurde erstellt: ${name}, ${alter} Jahre alt.`);
    }
}

/*
    🔵 4️⃣ Methodensignatur
    -----------------------
    Die Methodensignatur besteht aus:
    - dem Methodennamen
    - der Reihenfolge und den Typen der Parameter

    Beispiel:
        addiere(a: number, b: number)
        → Signatur: addiere(number, number)
*/
class MethodenBeispiel {
    public addiere(a: number, b: number): number {
        return a + b;
    }

    public addiereDouble(a: number, b: number): number {
        return a + b;
    }
}

/*
    🔵 5️⃣ Riedmannsches Schalenmodell (Vererbung)
    ----------------------------------------------
    - Darstellung der Vererbung wie „Schalen“.
    - Eine Unterklasse erbt Attribute und Methoden der Oberklasse.

    Beispiel:

          +---------------------+
          |      Fahrzeug       |  ← Oberklasse
          |---------------------|
          | + anzahlRaeder     |
          | + fahren()         |
          +---------------------+
                    ↓
          +---------------------+
          |        Auto         |  ← Unterklasse
          |---------------------|
          | + farbe             |
          | + hupen()           |
          +---------------------+
*/

// Oberklasse (äußere Schale)
class Fahrzeug {
    public anzahlRaeder: number;
    private geschwindigkeit: number;

    constructor(raeder: number) {
        this.anzahlRaeder = raeder;
        this.geschwindigkeit = 0;
    }

    public fahren(): void {
        console.log(`Das Fahrzeug fährt mit ${this.geschwindigkeit} km/h.`);
    }

    public setGeschwindigkeit(kmh: number): void {
        this.geschwindigkeit = kmh;
    }

    public getGeschwindigkeit(): number {
        return this.geschwindigkeit;
    }
}

// Unterklasse (innere Schale)
class Auto extends Fahrzeug {
    public farbe: string;

    constructor(farbe: string, baujahr: number) {
        super(4); // ruft den Konstruktor der Oberklasse auf
        this.farbe = farbe;
        console.log(`Ein Auto aus dem Jahr ${baujahr} wurde erstellt.`);
    }

    public hupen(): void {
        console.log("Das Auto hupt: Tuuut!");
    }
}

// ============================================================
// Hauptteil – Beispiele ausführen
// ============================================================

console.log("\n--- 1️⃣ Klasse & Objekt ---");
const meinAuto = new AutoBeispiel();
meinAuto.marke = "VW";
meinAuto.baujahr = 2018;
console.log(`Marke: ${meinAuto.marke}, Baujahr: ${meinAuto.baujahr}`);
meinAuto.fahren();

console.log("\n--- 2️⃣ private / public ---");
const auto2 = new SichtbarkeitBeispiel();
auto2.fahren(50);
console.log("Farbe:", auto2.farbe);
console.log("Kilometerstand (über Getter):", auto2.getKilometerstand());

console.log("\n--- 3️⃣ Konstruktor ---");
const person = new KonstruktorBeispiel("Lukas", 25);

console.log("\n--- 4️⃣ Methodensignatur ---");
const rechner = new MethodenBeispiel();
console.log("Addiere int:", rechner.addiere(5, 3));
console.log("Addiere double:", rechner.addiereDouble(2.5, 3.7));

console.log("\n--- 5️⃣ Riedmannsches Schalenmodell (Vererbung) ---");
const sportwagen = new Auto("Rot", 2022);
sportwagen.setGeschwindigkeit(120);
sportwagen.fahren();
sportwagen.hupen();
console.log("Farbe:", sportwagen.farbe);
console.log("Anzahl Räder:", sportwagen.anzahlRaeder);
console.log("Geschwindigkeit:", sportwagen.getGeschwindigkeit(), "km/h");

/*
📘 Zusammenfassung:
-------------------
✅ Klasse        → Bauplan für Objekte
✅ Objekt        → konkrete Instanz einer Klasse
✅ private/public → regeln Sichtbarkeit von Variablen/Methoden
✅ Konstruktor   → erstellt ein Objekt (constructor)
✅ Methodensignatur → Name + Parameter (z. B. addiere(number, number))
✅ Riedmannsches Schalenmodell → zeigt Vererbung (Ober-/Unterklasse)
*/
