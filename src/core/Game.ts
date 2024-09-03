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
  // 积分
  private _score: number = 0;
  public get score() {
    return this._score;
  }
  public set score(val) {
    this._score = val;
    this._viewer.showScoree(val);
  }

  constructor(private _viewer: GameViewer) {
    this.createNext();
    // this.resetCenterPoint(GameConfig.nextSize.width, this._nextTeris);
    this._viewer.init(this);
    this.score = 0;
  }

  // 游戏开始
  start() {
    if (this._gameStatus === GameStatus.playing) {
      return;
    }
    if (this._gameStatus === GameStatus.over) {
      // 初始化状态
      this.init();
    }
    this._gameStatus = GameStatus.playing;
    if (!this._curTeris) {
      this.switchTeris();
    }
    this.autoDrop();
    this._viewer.showGameStart();
  }

  private init() {
    this._exists.forEach((sq) => {
      sq.iView?.remove();
    });
    this._exists = [];
    this.createNext();
    this._curTeris = undefined;
    this.score = 0;
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
    // 清除
    this._curTeris.squares.forEach((sq) => {
      sq.iView?.remove();
    });
    this.resetCenterPoint(GameConfig.panelSize.width, this._curTeris);

    // 切换方块时，可能会溢出
    const { squarePoint, centerPoint } = this._curTeris;
    if (!TerisRule.isCanMove(squarePoint, centerPoint, this._exists)) {
      // 游戏结束
      this._gameStatus = GameStatus.over;
      clearInterval(this._timer);
      this._timer = undefined;
      this._viewer.showGameOver();
      return;
    }

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
      teris.centerPoint = {
        x: teris.centerPoint.x,
        y: teris.centerPoint.y + 1,
      };
    }
  }

  // 触底后的操作
  private hitBottom() {
    // 将当前方块保存
    this._exists = this._exists.concat(this._curTeris!.squares);
    // 消除方块
    const num = TerisRule.deleteSquares(this._exists);
    // 添加积分
    this.addScore(num);
    // 切换下一个方块
    this.switchTeris();
  }

  private addScore(num: number) {
    if (num === 0) {
      return;
    } else if (num === 1) {
      this.score += 10;
    } else if (num === 2) {
      this.score += 25;
    } else if (num === 3) {
      this.score += 50;
    } else {
      this.score += 100;
    }
  }
}
