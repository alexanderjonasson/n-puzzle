function Board({ tiles, size, movableIndices, isWon, onTileClick }) {
  const tileNumbers = Array.from(
    { length: size * size - 1 },
    (_, index) => index + 1,
  );

  return (
    <div
      className={`puzzle-board ${isWon ? "board-won" : ""}`}
      style={{ "--size": size }}
      role="group"
      aria-label={`${size} by ${size} sliding puzzle`}>
      {tileNumbers.map((tile) => {
        const index = tiles.indexOf(tile);
        const canMove = movableIndices.includes(index);

        return (
          <button
            key={tile}
            type="button"
            className={`tile ${canMove ? "tile-movable" : ""}`}
            style={{
              "--row": Math.floor(index / size),
              "--col": index % size,
              "--tile-index": tile - 1,
            }}
            onClick={() => onTileClick(index)}
            disabled={!canMove}
            aria-label={`Move tile ${tile}`}>
            {tile}
          </button>
        );
      })}
    </div>
  );
}

export default Board;
