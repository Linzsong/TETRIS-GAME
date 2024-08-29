import { MoveDirection, Point, Shape } from "../types/common";
import GameConfig from "./GameConfig";
import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";

function isPoint(obj: Point | MoveDirection | any): obj is Point {
  if (typeof obj.x !== "undefined") {
    return true;
  }
  return false;
}

export class TerisRule {
  static isCanMove(
    shapes: Shape,
    tragePoint: Point,
    exists: Square[]
  ): boolean {
    // 移动到中心位置后，每个小方块的坐标
    const targetSquarePoints: Point[] = shapes.map((sq) => {
      return {
        x: sq.x + tragePoint.x,
        y: sq.y + tragePoint.y,
      };
    });
    // 边界判断
    let flag = targetSquarePoints.some((sq) => {
      const xP = sq.x;
      const yP = sq.y;
      return xP < 0 || xP > GameConfig.panelSize.width - 1 || yP < 0 || yP > GameConfig.panelSize.height - 1;
    });
    if (flag) {
      return false;
    }

    // 判断是否与已有方块重叠
    flag = targetSquarePoints.some((tSq) => {
      return exists.some((sq) => sq.point.x === tSq.x && sq.point.y === tSq.y);
    });
    if (flag) {
      return false;
    }

    return true;
  }
  static move(teris: SquareGroup, targetPoint: Point, exists: Square[]): boolean;
  static move(teris: SquareGroup, direction: MoveDirection, exists: Square[]): boolean;
  static move(
    teris: SquareGroup,
    targetPointOrDirection: Point | MoveDirection,
    exists: Square[]
  ): boolean {
    if (isPoint(targetPointOrDirection)) {
      if (this.isCanMove(teris.squarePoint, targetPointOrDirection, exists)) {
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
      return this.move(teris, targetPoint, exists);
    }
  }

  /**
   * 将当前的方块，移动到目标方向的终点
   * @param teris
   * @param direction
   */
  static moveDirectly(teris: SquareGroup, direction: MoveDirection, exists: Square[]) {
    while (this.move(teris, direction, exists)) {}
  }

  /**
   * 旋转
   */
  static rotate(teris: SquareGroup, exists: Square[]): boolean {
    const newShape = teris.afterRotateShape(); //得到旋转之后新的形状
    if (this.isCanMove(newShape, teris.centerPoint, exists)) {
      teris.rotate();
      return true;
    } else {
      return false;
    }
  }
}
