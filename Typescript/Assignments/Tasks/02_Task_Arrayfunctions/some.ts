// some.ts
// Beispiele für Array.prototype.some in TypeScript

export function demoSome(): void {
  const nums: number[] = [10, 3, 42, 7];
  const hasLarge = nums.some((n) => n > 40);
  console.log('some - any > 40?:', hasLarge); // true

  // Edge-case: leeres Array -> some === false
  console.log('some on []:', ([] as number[]).some((n) => n > 0)); // false
}

demoSome();
