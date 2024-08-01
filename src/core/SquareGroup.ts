import { Point, Shape } from "../types/common";
import { Square } from "./square";
// import { Square } from "./square";

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
    this._squarePoint.forEach((item, index) => {
      this._squares[index].point = {
        x: item.x + this._centerPoint.x,
        y: item.y + this._centerPoint.y,
      };
    });
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
}
