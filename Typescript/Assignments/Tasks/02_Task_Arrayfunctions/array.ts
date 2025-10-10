// Beispiele für Array-Methoden in TypeScript
// map, filter, sort, find, reduce, some, every

// --- 1) map ---
const nums: number[] = [1, 2, 3, 4, 5];

// quadriert jede Zahl
const squares: number[] = nums.map((n) => n * n);
console.log('map - squares:', squares); // [1, 4, 9, 16, 25]

// map kann auch Objekte transformieren
type Person = { id: number; name: string; age: number };
const people: Person[] = [
	{ id: 1, name: 'Anna', age: 25 },
	{ id: 2, name: 'Ben', age: 30 },
];

const names: string[] = people.map((p) => p.name);
console.log('map - names:', names); // ['Anna', 'Ben']

// --- 2) filter ---
// Filtert nur gerade Zahlen
const evens: number[] = nums.filter((n) => n % 2 === 0);
console.log('filter - evens:', evens); // [2, 4]

// Filter anwendungsbeispiel für Objekte
const adults: Person[] = people.filter((p) => p.age >= 18);
console.log('filter - adults:', adults);

// --- 3) sort ---
// Achtung: sort() verändert das Array in-place. Verwende [...arr] um zu kopieren.
const unsorted: number[] = [10, 3, 42, 7];

// numerisch aufsteigend
const sortedAsc = [...unsorted].sort((a, b) => a - b);
console.log('sort - asc:', sortedAsc); // [3, 7, 10, 42]

// numerisch absteigend
const sortedDesc = [...unsorted].sort((a, b) => b - a);
console.log('sort - desc:', sortedDesc); // [42, 10, 7, 3]

// Strings: localeCompare für sprachspezifische Sortierung
const words = ['zebra', 'Ähre', 'apple'];
const sortedWords = [...words].sort((a, b) => a.localeCompare(b, 'de'));
console.log('sort - words (de):', sortedWords);

// --- 4) find ---
// find gibt das erste Element zurück oder undefined
const found: Person | undefined = people.find((p) => p.id === 2);
console.log('find - id 2:', found); // { id: 2, name: 'Ben', age: 30 }

const notFound = people.find((p) => p.id === 999);
console.log('find - not found:', notFound); // undefined

// --- 5) reduce ---
// Summe aller Zahlen
const sum = nums.reduce((acc, n) => acc + n, 0);
console.log('reduce - sum:', sum); // 15

// Reduzieren zu einem Objekt (zähle Personen nach Alterklasse)
type AgeGroups = { [key: string]: number };
const ageGroups: AgeGroups = people.reduce((acc, p) => {
	const key = p.age >= 30 ? '30+' : 'under30';
	acc[key] = (acc[key] ?? 0) + 1;
	return acc;
}, {} as AgeGroups);
console.log('reduce - ageGroups:', ageGroups); // { under30: 1, '30+': 1 }

// WICHTIG: reduce ohne Initialwert kann bei leeren Arrays Fehler werfen.
// z.B.: [].reduce((a,b)=>a+b) -> TypeError

// --- 6) some ---
// Prüft, ob mindestens ein Element eine Bedingung erfüllt
const hasLarge = unsorted.some((n) => n > 40);
console.log('some - any > 40?:', hasLarge); // true

// Edge-case: leeres Array -> some(...) === false
console.log('some on []:', ([] as number[]).some((n) => n > 0)); // false

// --- 7) every ---
// Prüft, ob alle Elemente eine Bedingung erfüllen
const allPositive = nums.every((n) => n > 0);
console.log('every - all positive?:', allPositive); // true

// Edge-case: leeres Array -> every(...) === true (vakuumswahrheit)
console.log('every on []:', ([] as number[]).every((n) => n > 0)); // true

// --- Kleine Zusammenfassung als Funktionstest ---
export function demoArrayMethods(): void {
	// Diese Funktion existiert, um von außen die Beispiele aufzurufen
	// (z.B. in Tests). Die console.logs oben werden beim Laden der Datei
	// einmal ausgeführt, und hier können wir dasselbe noch einmal demonstrieren.
	console.log('--- demoArrayMethods() called ---');
	console.log('squares:', squares);
	console.log('evens:', evens);
}

// Option: Demo aufrufen, wenn dieses Skript direkt ausgeführt wird.
// Bei Bundlern/TS-Setups ist das nicht immer notwendig — diese Bedingung
// vermeidet Node-spezifische Namen wie `require`/`module`.
if (typeof (globalThis as any) !== 'undefined' && (globalThis as any).document === undefined) {
	
	demoArrayMethods();
}

