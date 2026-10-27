export const SIZES = [3, 4, 5];

// What share of a fully random puzzle's average Manhattan distance a
// shuffle should reach for each difficulty
const DIFFICULTY_LEVELS = {
  easy: 0.4,
  medium: 0.9,
  hard: 1.2,
};

export function createSolvedTiles(size) {
  return [
    ...Array.from({ length: size * size - 1 }, (_, index) => index + 1),
    null,
  ];
}

export function isPuzzleSolved(tiles) {
  return tiles.every(
    (tile, index) => tile === (index === tiles.length - 1 ? null : index + 1),
  );
}

export function getAdjacentIndices(emptyIndex, size) {
  const row = Math.floor(emptyIndex / size);
  const col = emptyIndex % size;
  const neighbors = [];

  if (row > 0) neighbors.push(emptyIndex - size);
  if (row < size - 1) neighbors.push(emptyIndex + size);
  if (col > 0) neighbors.push(emptyIndex - 1);
  if (col < size - 1) neighbors.push(emptyIndex + 1);

  return neighbors;
}

// Sum of how many steps each tile is from its correct position
export function getManhattanDistance(tiles, size) {
  return tiles.reduce((total, tile, index) => {
    if (tile === null) {
      return total;
    }

    const goalIndex = tile - 1;
    const rowDistance = Math.abs(
      Math.floor(index / size) - Math.floor(goalIndex / size),
    );
    const colDistance = Math.abs((index % size) - (goalIndex % size));

    return total + rowDistance + colDistance;
  }, 0);
}

// Average Manhattan distance of a fully random puzzle
function getAverageRandomDistance(size) {
  const cellCount = size * size;
  const averageTileDistance = (2 * (cellCount - 1)) / (3 * size);

  return (cellCount - 1) * averageTileDistance;
}

// Shuffles by making random legal moves from the solved state, so the puzzle
// is always solvable. Each move changes the distance by exactly one step, so
// the walk stops when the target distance for the difficulty is reached.
export function createShuffledPuzzle(size, difficulty) {
  const targetDistance = Math.max(
    1,
    Math.round(getAverageRandomDistance(size) * DIFFICULTY_LEVELS[difficulty]),
  );

  const tiles = createSolvedTiles(size);
  let previousEmptyIndex = -1;

  while (getManhattanDistance(tiles, size) < targetDistance) {
    const emptyIndex = tiles.indexOf(null);

    // Prevents the last move from being undone straight away
    const options = getAdjacentIndices(emptyIndex, size).filter(
      (index) => index !== previousEmptyIndex,
    );

    const tileIndex = options[Math.floor(Math.random() * options.length)];

    tiles[emptyIndex] = tiles[tileIndex];
    tiles[tileIndex] = null;
    previousEmptyIndex = emptyIndex;
  }

  return tiles;
}
