// every.ts
// Beispiele für Array.prototype.every in TypeScript

export function demoEvery(): void {
  const nums: number[] = [1, 2, 3, 4, 5];
  const allPositive = nums.every((n) => n > 0);
  console.log('every - all positive?:', allPositive); // true

  // Edge-case: leeres Array -> every === true
  console.log('every on []:', ([] as number[]).every((n) => n > 0)); // true
}

demoEvery();
