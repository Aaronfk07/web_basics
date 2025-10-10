// reduce.ts
// Beispiele für Array.prototype.reduce in TypeScript

export function demoReduce(): void {
  const nums: number[] = [1, 2, 3, 4, 5];
  const sum = nums.reduce((acc, n) => acc + n, 0);
  console.log('reduce - sum:', sum); // 15

  type Person = { id: number; name: string; age: number };
  const people: Person[] = [
    { id: 1, name: 'Anna', age: 25 },
    { id: 2, name: 'Ben', age: 30 },
  ];

  const groups = people.reduce((acc: { [k: string]: number }, p) => {
    const key = p.age >= 30 ? '30+' : 'under30';
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {} as { [k: string]: number });

  console.log('reduce - groups:', groups);

  // Vorsicht: reduce ohne Initialwert ist für leere Arrays gefährlich
  const empty: number[] = [];
  // das folgende wäre ein Fehler: empty.reduce((a,b)=>a+b)
}
demoReduce();
