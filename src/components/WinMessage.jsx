import { formatTime } from "../utils/format";

function WinMessage({ moves, elapsedSeconds }) {
  return (
    <div className="win-message">
      <div className="win-icon" aria-hidden="true">
        ✨
      </div>

      <h2>Congratulations!</h2>

      <p>
        You solved the puzzle in <strong>{moves} moves</strong> and{" "}
        <strong>{formatTime(elapsedSeconds)}</strong>!
      </p>
    </div>
  );
}

export default WinMessage;
