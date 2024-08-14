import { GameViewer } from "../../types/common";
import { SquareGroup } from "../SquareGroup";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from "jquery";

export class GamePageViewer implements GameViewer {
  showNext(teris: SquareGroup): void {
    teris.squares.forEach((sq) => {
      sq.iView = new SquarePageViewer(sq, $("#next"));
    });
  }

  swtich(teris: SquareGroup): void {
    teris.squares.forEach((sq) => {
      sq.iView!.remove();
      sq.iView = new SquarePageViewer(sq, $("#panel"));
    });
  }
}
