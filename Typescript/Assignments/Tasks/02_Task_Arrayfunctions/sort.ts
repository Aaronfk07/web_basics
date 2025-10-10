// sort.ts
// Beispiele für Array.prototype.sort in TypeScript

export function demoSort(): void {
  const unsorted: number[] = [10, 3, 42, 7];
  const asc = [...unsorted].sort((a, b) => a - b);
  const desc = [...unsorted].sort((a, b) => b - a);
  console.log('sort - asc:', asc);
  console.log('sort - desc:', desc);

  const words = ['zebra', 'Ähre', 'apple'];
  const sortedWords = [...words].sort((a, b) => a.localeCompare(b, 'de'));
  console.log('sort - words (de):', sortedWords);

  // Hinweis: sort verändert das Array in-place -> nutze Kopie wenn du das Original behalten willst
}

demoSort();
