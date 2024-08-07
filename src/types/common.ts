// 坐标
export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface IView {
  show: () => void;
  remove: () => void
}

/**
 * 形状
 */
export type Shape = Point[]

export enum MoveDirection {
  left,
  right,
  down
}

export enum GameStatus {
  init, // 未开始
  playing,  // 进行中
  pause,  // 暂停
  over,  // 游戏结束
}