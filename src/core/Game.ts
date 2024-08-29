import { GameStatus, GameViewer, MoveDirection } from "../types/common";
import GameConfig from "./GameConfig";
import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Teris";
import { TerisRule } from "./TerisRule";

export class Game {
  // 游戏状态
  private _gameStatus: GameStatus = GameStatus.init;
  public get gameStatus() {
    return this._gameStatus;
  }
  // 当前方块
  private _curTeris?: SquareGroup;
  // 下一个方块
  private _nextTeris: SquareGroup = createTeris({ x: 0, y: 0 });
  private _timer?: number;
  private _duration: number = 1000;
  // 当前已经存在的小方块
  private _exists: Square[] = [];

  constructor(private _viewer: GameViewer) {
    this.createNext();
    // this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris);
    this._viewer.init(this);
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

  /**
   * 游戏暂停
   */
  pause() {
    if (this._gameStatus === GameStatus.playing) {
      this._gameStatus = GameStatus.pause;
      clearInterval(this._timer);
      this._timer = undefined;
    }
  }

  // 当前方块自由下落
  private autoDrop() {
    if (this._timer || this._gameStatus === GameStatus.over) {
      return;
    }
    this._timer = window.setInterval(() => {
      if (this._curTeris) {
        if (!TerisRule.move(this._curTeris, MoveDirection.down, this._exists)) {
          // 触底
          this.hitBottom();
        }
      }
    }, this._duration);
  }

  // 切换方块
  private switchTeris() {
    this._curTeris = this._nextTeris;
    this.resetCenterPoint(GameConfig.panelSize.width, this._curTeris);
    this.createNext();
    this._viewer.swtich(this._curTeris);
  }

  
  private createNext() {
    this._nextTeris = createTeris({ x: 0, y: 0 });
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris);
    this._viewer.showNext(this._nextTeris);
  }

  controlLeft() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRule.move(this._curTeris, MoveDirection.left, this._exists);
    }
  }

  controlRight() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRule.move(this._curTeris, MoveDirection.right, this._exists);
    }
  }

  controlDown() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRule.moveDirectly(this._curTeris, MoveDirection.down, this._exists);
      // 触底
      this.hitBottom();
    }
  }

  controlRotate() {
    if (this._curTeris && this._gameStatus === GameStatus.playing) {
      TerisRule.rotate(this._curTeris, this._exists);
    }
  }

  // 设置中心坐标
  resetCenterPoint(width: number, teris: SquareGroup) {
    const x = Math.ceil(width / 2) - 1;
    const y = 0;
    teris.centerPoint = { x, y };
    while (teris.squares.some((it) => it.point.y < 0)) {
      teris.squares.forEach(
        (sq) =>
          (sq.point = {
            x: sq.point.x,
            y: sq.point.y + 1,
          })
      );
    }
  }

  // 触底后的操作
  private hitBottom() {
    // 将当前方块保存
    this._exists = this._exists.concat(this._curTeris!.squares);
    console.log(this._exists);
    
    // 切换下一个方块
    this.switchTeris();
    // 消除方块

    // 判断游戏是否结束
  }
}
