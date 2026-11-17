export function chunkRows<T>(items: T[], pattern: number[] = [3, 2]): T[][] {
  if (items.length === 0) return [];

  const rows: T[][] = [];
  let index = 0;
  let patternIndex = 0;

  while (index < items.length) {
    const chunkSize = pattern[patternIndex % pattern.length] ?? pattern[0];
    const slice = items.slice(index, index + chunkSize);
    rows.push(slice);
    index += chunkSize;
    patternIndex += 1;
  }

  return rows;
}
