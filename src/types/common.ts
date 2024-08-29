import { Game } from "../core/Game";
import { SquareGroup } from "../core/SquareGroup";

// 坐标
export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface IView {
  show: () => void;
  remove: () => void;
}

/**
 * 形状
 */
export type Shape = Point[];

export enum MoveDirection {
  left,
  right,
  down,
}

export enum GameStatus {
  init, // 未开始
  playing, // 进行中
  pause, // 暂停
  over, // 游戏结束
}

export interface GameViewer {
  /**
   * @param teris 下一个方块对象
   */
  showNext(teris: SquareGroup): void;
  /**
   * @param teris 切换的方块对象
   */
  swtich(teris: SquareGroup): void;
  /**
   * 游戏初始化
   */
  init(game: Game): void;

  /**
   * 显示分数
   */
  showScoree(score: number): void;

}
