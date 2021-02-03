type GameEvent = "newMove" | "newRecord" | "timeout" | "wrongMove";
type GameStatus = "stopped" | "handlingInputs" | "showingMoves";
type Position = "upLeft" | "upRight" | "downLeft" | "downRight";

export type {
  GameEvent,
  GameStatus,
  Position,
}