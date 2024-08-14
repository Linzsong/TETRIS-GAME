import { GameStatus, GameViewer, MoveDirection } from "../types/common";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Teris";
import { TerisRule } from "./TerisRule";

export class Game {
  // 游戏状态
  private _gameStatus: GameStatus = GameStatus.init;
  // 当前方块
  private _curTeris?: SquareGroup;
  // 下一个方块
  private _nextTeris: SquareGroup = createTeris({ x: 0, y: 0 });
  private _timer?: number;
  private _duration: number = 1000;

  constructor(private _viewer: GameViewer) {
    // this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris);
    // this._viewer.showNext(this._nextTeris);
  }


  // 游戏开始
  start() {
    if (this._gameStatus === GameStatus.playing) {
      return;
    }
    this._gameStatus = GameStatus.playing;
    if (!this._curTeris) {
      this.switchTeris();
    }
    this.autoDrop();
  }

  // 当前方块自由下落
  private autoDrop() {
    if(this._timer || this._gameStatus === GameStatus.over) {
      return
    }
    this._timer = setInterval(() => {
      if(this._curTeris) {
        TerisRule.move(this._curTeris, MoveDirection.down)
      }

    }, this._duration)
  }

  // 切换方块
  private switchTeris() {
    this._curTeris = this._nextTeris;
    this._nextTeris = createTeris({ x: 0, y: 0 });
  }
}
