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