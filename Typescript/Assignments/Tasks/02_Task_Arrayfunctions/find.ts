// find.ts
// Beispiele für Array.prototype.find in TypeScript

import { Person } from './map.ts';

export function demoFind(): void {
  const people: Person[] = [
    { id: 1, name: 'Anna', age: 25 },
    { id: 2, name: 'Ben', age: 30 },
  ];

  const found = people.find((p) => p.id === 2);
  console.log('find - id 2 name:', found ? found.name : 'not found');
}

demoFind();
