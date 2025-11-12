// ============================================================
// 💻 Objektorientierte Programmierung - Gesamterklärung
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
      class Auto { ... }  ← Klasse
      Auto meinAuto = new Auto(); ← Objekt
*/
class AutoBeispiel {
    String marke;
    int baujahr;

    void fahren() {
        System.out.println("Das Auto fährt los!");
    }
}

/*
    🔵 2️⃣ private / public
    -----------------------
    - private → nur innerhalb der Klasse sichtbar
    - public  → überall sichtbar
*/
class SichtbarkeitBeispiel {
    private int kilometerstand = 0;
    public String farbe = "Silber";

    public void fahren(int km) {
        kilometerstand += km;
        System.out.println("Gefahrene Kilometer: " + kilometerstand);
    }

    // Zugriff auf private Variable über "Getter"
    public int getKilometerstand() {
        return kilometerstand;
    }
}

/*
    🔵 3️⃣ Konstruktor
    ------------------
    - Wird automatisch aufgerufen, wenn ein Objekt erzeugt wird.
    - Hat denselben Namen wie die Klasse.
*/
class KonstruktorBeispiel {
    String name;
    int alter;

    // Konstruktor
    public KonstruktorBeispiel(String name, int alter) {
        this.name = name;
        this.alter = alter;
        System.out.println("Ein Objekt wurde erstellt: " + name + ", " + alter + " Jahre alt.");
    }
}

/*
    🔵 4️⃣ Methodensignatur
    -----------------------
    Die Methodensignatur besteht aus:
    - dem Methodennamen
    - der Reihenfolge und den Typen der Parameter
    (Rückgabetyp und Sichtbarkeit gehören NICHT dazu!)

    Beispiel:
        void addiere(int a, int b)
        → Signatur: addiere(int, int)
*/
class MethodenBeispiel {
    public int addiere(int a, int b) {
        return a + b;
    }

    public double addiere(double a, double b) {
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
    public int anzahlRaeder;
    private int geschwindigkeit;

    public Fahrzeug(int raeder) {
        this.anzahlRaeder = raeder;
        this.geschwindigkeit = 0;
    }

    public void fahren() {
        System.out.println("Das Fahrzeug fährt mit " + geschwindigkeit + " km/h.");
    }

    public void setGeschwindigkeit(int kmh) {
        this.geschwindigkeit = kmh;
    }

    public int getGeschwindigkeit() {
        return geschwindigkeit;
    }
}

// Unterklasse (innere Schale)
class Auto extends Fahrzeug {
    public String farbe;

    public Auto(String farbe, int baujahr) {
        super(4); // ruft den Konstruktor der Oberklasse auf
        this.farbe = farbe;
        System.out.println("Ein Auto aus dem Jahr " + baujahr + " wurde erstellt.");
    }

    public void hupen() {
        System.out.println("Das Auto hupt: Tuuut!");
    }
}

// ============================================================
// Hauptklasse: Hier werden alle Beispiele ausgeführt
// ============================================================
public class Main {
    public static void main(String[] args) {

        // --------------------------------------------------
        // 1️⃣ Klasse & Objekt
        // --------------------------------------------------
        System.out.println("\n--- 1️⃣ Klasse & Objekt ---");
        AutoBeispiel meinAuto = new AutoBeispiel();
        meinAuto.marke = "VW";
        meinAuto.baujahr = 2018;
        System.out.println("Marke: " + meinAuto.marke + ", Baujahr: " + meinAuto.baujahr);
        meinAuto.fahren();

        // --------------------------------------------------
        // 2️⃣ private / public
        // --------------------------------------------------
        System.out.println("\n--- 2️⃣ private / public ---");
        SichtbarkeitBeispiel auto2 = new SichtbarkeitBeispiel();
        auto2.fahren(50);
        System.out.println("Farbe: " + auto2.farbe);
        System.out.println("Kilometerstand (über Getter): " + auto2.getKilometerstand());

        // --------------------------------------------------
        // 3️⃣ Konstruktor
        // --------------------------------------------------
        System.out.println("\n--- 3️⃣ Konstruktor ---");
        KonstruktorBeispiel person = new KonstruktorBeispiel("Lukas", 25);

        // --------------------------------------------------
        // 4️⃣ Methodensignatur
        // --------------------------------------------------
        System.out.println("\n--- 4️⃣ Methodensignatur ---");
        MethodenBeispiel rechner = new MethodenBeispiel();
        System.out.println("Addiere int: " + rechner.addiere(5, 3));
        System.out.println("Addiere double: " + rechner.addiere(2.5, 3.7));

        // --------------------------------------------------
        // 5️⃣ Riedmannsches Schalenmodell (Vererbung)
        // --------------------------------------------------
        System.out.println("\n--- 5️⃣ Riedmannsches Schalenmodell (Vererbung) ---");
        Auto meinSportwagen = new Auto("Rot", 2022);
        meinSportwagen.setGeschwindigkeit(120);
        meinSportwagen.fahren();
        meinSportwagen.hupen();
        System.out.println("Farbe: " + meinSportwagen.farbe);
        System.out.println("Anzahl Räder: " + meinSportwagen.anzahlRaeder);
        System.out.println("Geschwindigkeit: " + meinSportwagen.getGeschwindigkeit() + " km/h");
    }
}

/*
📘 Zusammenfassung:
-------------------
✅ Klasse        → Bauplan für Objekte
✅ Objekt        → konkrete Instanz einer Klasse
✅ private/public → regeln Sichtbarkeit von Variablen/Methoden
✅ Konstruktor   → erstellt ein Objekt (gleicher Name wie Klasse)
✅ Methodensignatur → Name + Parameter (z. B. addiere(int, int))
✅ Riedmannsches Schalenmodell → zeigt Vererbung (Ober-/Unterklasse)
*/
