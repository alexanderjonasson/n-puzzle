import { useEffect, useState } from "react";
import {
  createShuffledPuzzle,
  createSolvedTiles,
  getAdjacentIndices,
  isPuzzleSolved,
} from "../utils/puzzle";

const DEFAULT_SIZE = 3;

export function useGame() {
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [difficulty, setDifficulty] = useState("easy");
  const [tiles, setTiles] = useState(() => createSolvedTiles(DEFAULT_SIZE));
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const isSolved = isPuzzleSolved(tiles);
  const hasWon = gameStarted && isSolved;

  const movableIndices =
    gameStarted && !isSolved ? getAdjacentIndices(tiles.indexOf(null), size) : [];

  useEffect(() => {
    if (!gameStarted || isSolved || startTime === null) {
      return;
    }

    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 250);

    return () => clearInterval(interval);
  }, [gameStarted, isSolved, startTime]);

  function resetGame(nextSize, nextTiles, started) {
    setSize(nextSize);
    setTiles(nextTiles);
    setMoves(0);
    setElapsedSeconds(0);
    setStartTime(started ? Date.now() : null);
    setGameStarted(started);
  }

  function startGame() {
    resetGame(size, createShuffledPuzzle(size, difficulty), true);
  }

  function changeSize(nextSize) {
    resetGame(nextSize, createSolvedTiles(nextSize), false);
  }

  function moveTile(index) {
    if (!movableIndices.includes(index)) {
      return;
    }

    const emptyIndex = tiles.indexOf(null);
    const newTiles = [...tiles];

    newTiles[emptyIndex] = tiles[index];
    newTiles[index] = null;

    // Saves the final time right at the winning move
    if (isPuzzleSolved(newTiles)) {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }

    setTiles(newTiles);
    setMoves((previous) => previous + 1);
  }

  return {
    size,
    difficulty,
    tiles,
    moves,
    elapsedSeconds,
    gameStarted,
    isSolved,
    hasWon,
    movableIndices,
    setDifficulty,
    changeSize,
    startGame,
    moveTile,
  };
}
