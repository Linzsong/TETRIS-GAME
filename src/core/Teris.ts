import { Point, Shape } from "../types/common";
import { SquareGroup } from "./SquareGroup";
import { getRandom } from "./utils";

export class TShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    const shapeData: Shape = [
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
    ];
    console.log('TShape');
    
    super(shapeData, _centerPoint, _color);
  }
}

export class LShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    const shapeData: Shape = [
      { x: -2, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: -1 },
    ];
    super(shapeData, _centerPoint, _color);
  }
}

export class LMirrorShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    const shapeData: Shape = [
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: -1 },
    ];
    super(shapeData, _centerPoint, _color);
  }
}
export class SShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    const shapeData: Shape = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 1 },
    ];
    super(shapeData, _centerPoint, _color);
  }

  // 只有两个方向的旋转
  rotate(): void {
    super.rotate()
    this.isClock = !this.isClock
  }
}
export class LineShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    const shapeData: Shape = [
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ];
    super(shapeData, _centerPoint, _color);
  }
  // 只有两个方向的旋转
  rotate(): void {
    super.rotate()
    this.isClock = !this.isClock
  }
}
export class SquareShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    const shapeData: Shape = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ];
    super(shapeData, _centerPoint, _color);
  }
  afterRotateShape() {
    return this.squarePoint
  }
}
export class SMirrorShape extends SquareGroup {
  constructor(_centerPoint: Point, _color: string) {
    const shapeData: Shape = [
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ];
    super(shapeData, _centerPoint, _color);
  }
  // 只有两个方向的旋转
  rotate(): void {
    super.rotate()
    this.isClock = !this.isClock
  }
}

export const shapes = [
  TShape,
  LShape,
  LMirrorShape,
  SShape,
  SMirrorShape,
  SquareShape,
  LineShape
];

export const colors = ["red", "#fff", "green", "blue", "orange"];

/**
 * 随机产生一个俄罗斯方块（颜色随机、形状随机）
 * @param centerPoint
 */

export const createTeris = (centerPoint: Point): SquareGroup => {
  const shapesIndex = getRandom(0, shapes.length);
  const colorIndex = getRandom(0, colors.length);

  const shape = shapes[shapesIndex];

  return new shape(centerPoint, colors[colorIndex]);
};
