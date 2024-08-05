import { MoveDirection, Point, Shape } from "../types/common";
import { SquareGroup } from "./SquareGroup";
import { PageConfig } from "./viewer/pageConfig";

function isPoint(obj: Point | MoveDirection | any): obj is Point {
  if (obj.x && typeof obj.x !== "undefined") {
    return true;
  }
  return false;
}

export class SquareRules {
  static isCanMove(shapes: Shape, tragePoint: Point): boolean {
    let trage = shapes.some((shape) => {
      const xP = shape.x + tragePoint.x;
      const yP = shape.y + tragePoint.y;
      return xP < 0 || xP > PageConfig.x - 1 || yP < 0 || yP > PageConfig.y - 1;
    });
    console.log(trage);

    return !trage;
  }
  static move(teris: SquareGroup, targetPoint: Point): boolean;
  static move(teris: SquareGroup, direction: MoveDirection): boolean;
  static move(
    teris: SquareGroup,
    targetPointOrDirection: Point | MoveDirection
  ): boolean {
    if (isPoint(targetPointOrDirection)) {
      if (this.isCanMove(teris.squarePoint, targetPointOrDirection)) {
        teris.centerPoint = targetPointOrDirection;
        return true;
      }
      return false;
    } else {
      const direction = targetPointOrDirection;
      let targetPoint: Point;
      if (direction === MoveDirection.down) {
        targetPoint = {
          x: teris.centerPoint.x,
          y: teris.centerPoint.y + 1,
        };
      } else if (direction === MoveDirection.left) {
        targetPoint = {
          x: teris.centerPoint.x - 1,
          y: teris.centerPoint.y,
        };
      } else {
        targetPoint = {
          x: teris.centerPoint.x + 1,
          y: teris.centerPoint.y,
        };
      }
      return this.move(teris, targetPoint);
    }
  }

  /**
   * 将当前的方块，移动到目标方向的终点
   * @param teris
   * @param direction
   */
  static moveDirectly(teris: SquareGroup, direction: MoveDirection) {
    while (this.move(teris, direction)) {}
  }

  /**
   * 旋转
   */
  static rotate(teris: SquareGroup): boolean {
    const newShape = teris.rotate()  //得到旋转之后新的形状
    // console.log(newShape);
    // teris.rotate()
    



    return false

  }
}
