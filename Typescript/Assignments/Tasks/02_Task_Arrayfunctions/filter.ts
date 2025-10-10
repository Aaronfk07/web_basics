// filter.ts
// Beispiele für Array.prototype.filter in TypeScript

import { Person } from './map';

export function demoFilter(): void {
  const nums: number[] = [1, 2, 3, 4, 5];
  const evens = nums.filter((n) => n % 2 === 0);
  console.log('filter - evens:', evens); // [2,4]

  const people: Person[] = [
    { id: 1, name: 'Anna', age: 25 },
    { id: 2, name: 'Ben', age: 30 },
    { id: 3, name: 'Chris', age: 15 },
  ];
  const adults = people.filter((p) => p.age >= 18);
  console.log('filter - adults:', adults);

  // filter erstellt ein neues Array mit Elementen, die die Bedingung erfüllen
}
