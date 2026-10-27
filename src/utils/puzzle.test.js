import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  SIZES,
  createShuffledPuzzle,
  createSolvedTiles,
  getAdjacentIndices,
  getManhattanDistance,
  isPuzzleSolved,
} from "./puzzle.js";

const DIFFICULTIES = ["easy", "medium", "hard"];

function countInversions(tiles) {
  const numbers = tiles.filter((tile) => tile !== null);
  let inversions = 0;

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] > numbers[j]) inversions++;
    }
  }

  return inversions;
}

// The standard rule for whether a sliding puzzle is solvable
function isSolvable(tiles, size) {
  const inversions = countInversions(tiles);

  if (size % 2 === 1) {
    return inversions % 2 === 0;
  }

  const blankRowFromBottom = size - Math.floor(tiles.indexOf(null) / size);

  return (inversions + blankRowFromBottom) % 2 === 1;
}

describe("createSolvedTiles och isPuzzleSolved", () => {
  test("the solved puzzle is in order with the empty square last", () => {
    assert.deepEqual(createSolvedTiles(3), [1, 2, 3, 4, 5, 6, 7, 8, null]);
    assert.equal(createSolvedTiles(4).length, 16);
  });

  test("recognises solved and unsolved puzzles", () => {
    assert.equal(isPuzzleSolved(createSolvedTiles(3)), true);
    assert.equal(isPuzzleSolved([1, 2, 3, 4, 5, 6, 7, null, 8]), false);
  });
});

describe("getAdjacentIndices", () => {
  test("corner, edge and centre on 3x3", () => {
    assert.deepEqual(getAdjacentIndices(0, 3).sort(), [1, 3]);
    assert.deepEqual(getAdjacentIndices(1, 3).sort(), [0, 2, 4]);
    assert.deepEqual(getAdjacentIndices(4, 3).sort(), [1, 3, 5, 7]);
  });

  test("corner on 4x4 uses the right row width", () => {
    assert.deepEqual(getAdjacentIndices(15, 4).sort((a, b) => a - b), [11, 14]);
  });
});

describe("getManhattanDistance", () => {
  test("is 0 for a solved puzzle and 1 after one move", () => {
    assert.equal(getManhattanDistance(createSolvedTiles(3), 3), 0);
    assert.equal(getManhattanDistance([1, 2, 3, 4, 5, 6, 7, null, 8], 3), 1);
  });
});

describe("createShuffledPuzzle", () => {
  for (const size of SIZES) {
    test(`always gives solvable, shuffled puzzles (${size}x${size})`, () => {
      for (const difficulty of DIFFICULTIES) {
        for (let i = 0; i < 100; i++) {
          const tiles = createShuffledPuzzle(size, difficulty);

          assert.equal(tiles.length, size * size);
          assert.equal(isPuzzleSolved(tiles), false);
          assert.deepEqual(
            [...tiles].sort((a, b) => (a ?? 99) - (b ?? 99)),
            createSolvedTiles(size),
          );
          assert.equal(isSolvable(tiles, size), true);
        }
      }
    });

    test(`harder levels shuffle more (${size}x${size})`, () => {
      const average = (difficulty) => {
        let total = 0;

        for (let i = 0; i < 50; i++) {
          total += getManhattanDistance(
            createShuffledPuzzle(size, difficulty),
            size,
          );
        }

        return total / 50;
      };

      const [easy, medium, hard] = DIFFICULTIES.map(average);

      assert.ok(easy < medium, `easy ${easy} < medium ${medium}`);
      assert.ok(medium < hard, `medium ${medium} < hard ${hard}`);
    });
  }
});
