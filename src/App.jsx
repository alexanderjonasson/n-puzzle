import "./App.css";
import Board from "./components/Board";
import ControlPanel from "./components/ControlPanel";
import WinMessage from "./components/WinMessage";
import { useGame } from "./hooks/useGame";

function App() {
  const {
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
  } = useGame();

  return (
    <main className="app">
      <section className="game-container">
        <header className="game-header">
          <div>
            <span className="eyebrow">THE SLIDING PUZZLE</span>

            <h1>N-Puzzle</h1>

            <p className="game-description">
              Put the tiles in the right order.
            </p>
          </div>

          <div className="header-icon" aria-hidden="true">
            🧩
          </div>
        </header>

        <div className="game-layout">
          <section className="board-section">
            <Board
              tiles={tiles}
              size={size}
              movableIndices={movableIndices}
              isWon={hasWon}
              onTileClick={moveTile}
            />

            <div role="status">
              {hasWon && (
                <WinMessage moves={moves} elapsedSeconds={elapsedSeconds} />
              )}
            </div>
          </section>

          <ControlPanel
            size={size}
            difficulty={difficulty}
            gameStarted={gameStarted}
            stats={{ moves, elapsedSeconds, isSolved, hasWon }}
            onSizeChange={changeSize}
            onDifficultyChange={setDifficulty}
            onStart={startGame}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
