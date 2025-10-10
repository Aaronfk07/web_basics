// map.ts
// Beispiele für Array.prototype.map in TypeScript

export type Person = { id: number; name: string; age: number };

export function demoMap(): void {
  const nums: number[] = [1, 2, 3, 4, 5];
  const squares = nums.map((n) => n * n);
  console.log('map - squares:', squares); // [1,4,9,16,25]

  const people: Person[] = [
    { id: 1, name: 'Anna', age: 25 },
    { id: 2, name: 'Ben', age: 30 },
  ];
  const names = people.map((p) => p.name);
  console.log('map - names:', names); // ['Anna', 'Ben']

  // map ist nicht destruktiv: es erzeugt ein neues Array
}
