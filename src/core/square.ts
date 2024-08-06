import { IView, Point } from "../types/common";

/**
 * 小方块
 * 1. 严格控制属性
 * 2. 显示者
 */
export class Square {
  private _point: Point;
  private _color: string;
  private _iView?: IView

  constructor(point: Point, color: string, iView?: IView) {
    this._point = point;
    this._color = color;
    this._iView = iView;
  }

  public get point(): Point {
    return this._point;
  }
  public set point(val) {

    this._point = val;
    // 渲染
    if(this._iView) {
      this._iView.show()
    }

  }

  public get color(): string {
    return this._color;
  }
  public set color(val) {
    
    this._color = val;
  }

  public get iView(): IView | undefined{
    return this._iView;
  }
  public set iView(val) {
    this._iView = val;
    // 渲染
    if(this._iView) {
      this._iView.show()
    }
  }


}

