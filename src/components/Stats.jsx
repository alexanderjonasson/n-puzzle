import { formatTime } from "../utils/format";

function getStatusText(gameStarted, isSolved) {
  if (!gameStarted) {
    return "Ready";
  }

  return isSolved ? "Solved!" : "In progress";
}

function Stats({ moves, elapsedSeconds, gameStarted, isSolved, hasWon }) {
  return (
    <div className="game-stats">
      <div className="stat-card">
        <span className="stat-label">MOVES</span>
        <strong>{moves}</strong>
      </div>

      <div className="stat-card">
        <span className="stat-label">TIME</span>
        <strong>{formatTime(elapsedSeconds)}</strong>
      </div>

      <div className="stat-card">
        <span className="stat-label">STATUS</span>
        <strong className={`status-text ${hasWon ? "status-won" : ""}`}>
          {getStatusText(gameStarted, isSolved)}
        </strong>
      </div>
    </div>
  );
}

export default Stats;
