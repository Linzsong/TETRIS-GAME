import { IView } from "../../types/common";
import { Square } from "../Square";
import { PageConfig } from "./pageConfig";
import $ from "jquery";

export class SquarePageViewer implements IView {
  private dom?: JQuery<HTMLElement>;
  private isRemove: Boolean = false;

  constructor(private square: Square, private contenter: JQuery<HTMLElement>) {}

  show() {
    const { SquareSize } = PageConfig;
    if (this.isRemove) return;
    if (!this.dom) {
      this.dom = $("<div>")
        .css({
          position: "absolute",
          width: SquareSize.width,
          height: SquareSize.height,
          border: "1px solid #ccc",
          boxSizing: "border-box",
        })
        .appendTo(this.contenter);
    }
    this.dom.css({
      left: this.square.point.x * SquareSize.width,
      top: this.square.point.y * SquareSize.height,
      backgroundColor: this.square.color,
    });
  }
  remove() {
    if (this.dom && !this.isRemove) {
      this.dom.remove();
      this.isRemove = true;
    }
  }
}
