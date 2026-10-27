# N-Puzzle

A sliding puzzle built with React and Vite. Click the tiles next to the empty square and put them in the right order. Choose a size (3×3, 4×4 or 5×5) and a difficulty, and keep track of your moves and time.

By [Alexander Jonasson](https://github.com/alexanderjonasson).

**Live:** [n-puzzle-seven.vercel.app](https://n-puzzle-seven.vercel.app)

## Features

- Three board sizes and three difficulty levels
- Move and time counters, with a message when the puzzle is solved
- Tiles slide smoothly between squares
- Every shuffle is solvable
- Responsive layout, focus styles and `prefers-reduced-motion` support
- Unit tests for the game logic

## How the shuffle works

The puzzle is shuffled by making random legal moves from the solved state. That way it is always solvable, which is not the case if you just randomise the order (half of all random arrangements are unsolvable).

Difficulty is controlled by how far the tiles are from their correct positions, measured as the sum of their Manhattan distances. The walk stops when the distance reaches a set share of the average distance of a fully random puzzle. On 3×3, an easy puzzle takes about 6 moves to solve on average, a medium one 17 and a hard one 22, and a hard puzzle never takes fewer than 17 (measured with an exhaustive search over all positions).

## Tech stack

- React 19 (hooks)
- Vite
- Node.js built-in test runner (`node --test`)

## Getting started

```bash
npm install
npm run dev
```

Other commands: `npm run build`, `npm run preview`, `npm run lint` and `npm test`.

## Project structure

```
src/
  utils/puzzle.js       Game logic: shuffling, neighbours, distance, solved check
  utils/puzzle.test.js  Tests for the game logic
  utils/format.js       Time formatting
  hooks/useGame.js      Game state, timer and moves
  components/           Board, ControlPanel, Stats, WinMessage
  App.jsx               Puts the game together
```

## Possible improvements

- Save the best time and fewest moves per size (`localStorage`)
- Arrow key controls
- A solver that shows the next move
