// map.ts
// Beispiele für Array.prototype.map in TypeScript

export type Person = { id: number; name: string; age: number };

export function demoMap(): void {
  // einfaches Beispiel: verdopple jede Zahl
  const nums: number[] = [1, 2, 3];
  const doubled = nums.map((n) => n * 2);
  console.log('map - doubled:', doubled); // [2,4,6]

  // Objekt-Map: nur Namen extrahieren
  const people: Person[] = [
    { id: 1, name: 'Anna', age: 25 },
    { id: 2, name: 'Ben', age: 30 },
  ];
  const names = people.map((p) => p.name);
  console.log('map - names:', names); // ['Anna','Ben']
}

// Beim Ausführen mit Deno/ts-node soll die Demo direkt laufen
demoMap();
