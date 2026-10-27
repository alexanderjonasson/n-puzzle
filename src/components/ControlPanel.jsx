import { SIZES } from "../utils/puzzle";
import Stats from "./Stats";

function ControlPanel({
  size,
  difficulty,
  stats,
  gameStarted,
  onSizeChange,
  onDifficultyChange,
  onStart,
}) {
  return (
    <aside className="control-panel">
      <div className="settings">
        <div className="select-field">
          <label htmlFor="size">Size</label>

          <select
            id="size"
            value={size}
            onChange={(event) => onSizeChange(Number(event.target.value))}>
            {SIZES.map((option) => (
              <option key={option} value={option}>
                {option} × {option}
              </option>
            ))}
          </select>
        </div>

        <div className="select-field">
          <label htmlFor="difficulty">Difficulty</label>

          <select
            id="difficulty"
            value={difficulty}
            onChange={(event) => onDifficultyChange(event.target.value)}>
            <option value="easy">🟢 Easy</option>
            <option value="medium">🟡 Medium</option>
            <option value="hard">🔴 Hard</option>
          </select>
        </div>
      </div>

      <Stats {...stats} gameStarted={gameStarted} />

      <button type="button" className="shuffle-button" onClick={onStart}>
        🔀 {gameStarted ? "Shuffle again" : "Start game"}
      </button>

      <div className="game-tip">
        <span className="tip-label">HOW TO PLAY</span>

        <p>
          Click a tile next to the empty square. Arrange the numbers from 1 to{" "}
          {size * size - 1} to win.
        </p>
      </div>
    </aside>
  );
}

export default ControlPanel;
