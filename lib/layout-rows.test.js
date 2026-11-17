import assert from 'node:assert/strict';
import test from 'node:test';

import { chunkRows } from './layout-rows.ts';

test('chunks items using the 3-2 repeating pattern', () => {
  const items = Array.from({ length: 13 }, (_, index) => index + 1);

  assert.deepEqual(chunkRows(items), [
    [1, 2, 3],
    [4, 5],
    [6, 7, 8],
    [9, 10],
    [11, 12, 13],
  ]);
});

test('returns an empty array when no items are provided', () => {
  assert.deepEqual(chunkRows([]), []);
});
