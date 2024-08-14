import { GameStatus } from "../types/common";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Teris";

export class Game {
  // 游戏状态
  gameStatus: GameStatus = GameStatus.init;
  // 当前方块
  curTeris?: SquareGroup;
  // 下一个方块
  nextTeris: SquareGroup = createTeris({x: 0, y: 0});

  // 游戏开始
  start() {}

  // 当前方块自由下落
  private autoDrop() {}

  // 切换方块
  private switchTeris() {
    this.curTeris = this.nextTeris
    this.nextTeris = createTeris({x: 0, y: 0});
  }
}
