// filter.ts
// Beispiele für Array.prototype.filter in TypeScript

import { Person } from './map.ts';

export function demoFilter(): void {
  const nums: number[] = [1, 2, 3, 4];
  const evens = nums.filter((n) => n % 2 === 0);
  console.log('filter - evens:', evens); // [2,4]

  const people: Person[] = [
    { id: 1, name: 'Anna', age: 17 },
    { id: 2, name: 'Ben', age: 20 },
  ];
  const adults = people.filter((p) => p.age >= 18);
  console.log('filter - adults names:', adults.map((p) => p.name)); // ['Ben']
}

demoFilter();
