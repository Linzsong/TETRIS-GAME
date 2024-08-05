import { Point, RotationDirection, Shape } from "../types/common";
import { Square } from "./Square";

export class SquareGroup {
  private _squares: Square[] = [];
  constructor(
    private _squarePoint: Shape,
    private _centerPoint: Point,
    private _color: string
  ) {
    this._squarePoint.forEach((item) => {
      let curSquare: Square = new Square(
        {
          x: item.x + this._centerPoint.x,
          y: item.y + this._centerPoint.y,
        },
        this._color
      );
      this._squares.push(curSquare);
    });
  }

  get squarePoint() {
    return this._squarePoint;
  }
  set squarePoint(val) {
    this._squarePoint = val;
  }

  get centerPoint() {
    return this._centerPoint;
  }
  set centerPoint(val) {
    this._centerPoint = val;
    console.log(val);

    // update
    this.setSquarePoints()
  }

  get color() {
    return this._color;
  }
  set color(val) {
    this._color = val;
  }

  get squares() {
    return this._squares;
  }
  set squares(val) {
    this._squares = val;
  }

  /**
   * 根据中心点坐标，以及形状，设置每一个小方块的坐标
   */
  private setSquarePoints() {
    this._squarePoint.forEach((p, i) => {
      this._squares[i].point = {
        x: this._centerPoint.x + p.x,
        y: this._centerPoint.y + p.y,
      };
    });
  }

  afterRotateShape(direction = RotationDirection.anticlockwise): Shape {
    if (direction === RotationDirection.clockwise) {
      return this._squarePoint.map((sq) => {
        return {
          x: -sq.y,
          y: sq.x,
        };
      });
    } else {
      return this._squarePoint.map((sq) => {
        return {
          x: sq.y,
          y: -sq.x,
        };
      });
    }
  }

  rotate() {
    const newShape = this.afterRotateShape();
    this._squarePoint = newShape;
    this.setSquarePoints();
  }
}
