// find.ts
// Beispiele für Array.prototype.find in TypeScript

import { Person } from './map';

export function demoFind(): void {
  const people: Person[] = [
    { id: 1, name: 'Anna', age: 25 },
    { id: 2, name: 'Ben', age: 30 },
  ];

  const found = people.find((p) => p.id === 2);
  console.log('find - id 2:', found);

  const notFound = people.find((p) => p.id === 999);
  console.log('find - not found:', notFound); // undefined

  // Tipp: prüfe auf undefined bevor du Eigenschaften liest
  if (found) {
    console.log('found name:', found.name);
  }
}
