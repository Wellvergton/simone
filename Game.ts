import Timer from "./Timer";
import type { Position, GameEvent } from "./types";

const positions: Array<Position> = ["upLeft", "upRight", "downLeft", "downRight"];

class Game {
  constructor(timer: Timer) {
    this.timer = timer;
  }

  private timer: Timer;
  private isPlaying: Boolean = false;
  private moves: Array<Position> = [];
  private userInputs: Array<Position> = [];
  private record: Number = 0;
  private events = {
    newMove: Array<Function>(),
    newRecord: Array<Function>(),
    wrongMove: Array<Function>(),
    timeout: Array<Function>(),
  }

  public on(event: GameEvent, callback: Function): void {
    this.events[event].push(callback);
  }

  private notify(event: GameEvent, value?: any): void {
    this.events[event].forEach((callback) => callback(value));
  }

  private addMove(): void {
    if (this.isPlaying) {
      const randomNumber = Math.floor(Math.random() * 4);
      this.moves.push(positions[randomNumber]);
      this.notify("newMove", Array.from(this.moves));
    }
  }

  public init(): void {
    this.isPlaying = true;
    this.addMove();
  }

  public destroy(): void {
    this.isPlaying = false;
    this.moves = [];
    this.userInputs = [];
    this.timer.clear();
  }

  public handleUserInput(position: Position): void {
    this.userInputs.push(position);
    this.timer.clear();

    const userInputsLength = this.userInputs.length;
    const movesLength = this.moves.length;

    if (this.userInputs[userInputsLength - 1] !== this.moves[userInputsLength - 1]) {
      this.notify("wrongMove");
      this.destroy();
    } else if (userInputsLength === movesLength) {
      this.userInputs = [];

      if (userInputsLength > this.record) {
        this.record = userInputsLength;
        this.notify("newRecord", this.record);
      }

      this.addMove();
      this.timer.clear();
    } else {
      this.timer.init();
    }
  }
}

export default Game;
