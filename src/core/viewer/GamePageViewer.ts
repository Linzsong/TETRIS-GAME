import { GameStatus, GameViewer } from "../../types/common";
import { Game } from "../Game";
import GameConfig from "../GameConfig";
import { SquareGroup } from "../SquareGroup";
import { PageConfig } from "./pageConfig";
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

  private nextDom = $("#next");
  private panelDom = $("#panel");
  private scoreDom = $("#score");
  private msgDom = $("#msg");

  init(game: Game): void {
    //1. 设置宽高
    this.panelDom.css({
      width: GameConfig.panelSize.width * PageConfig.SquareSize.width,
      height: GameConfig.panelSize.height * PageConfig.SquareSize.height,
    });
    this.nextDom.css({
      width: GameConfig.nextSize.width * PageConfig.SquareSize.width,
      height: GameConfig.nextSize.height * PageConfig.SquareSize.height,
    });

    //2. 注册键盘事件
    $(document).keydown((e) => {
      if (e.keyCode === 37) {
        game.controlLeft();
      } else if (e.keyCode === 38) {
        game.controlRotate();
      } else if (e.keyCode === 39) {
        game.controlRight();
      } else if (e.keyCode === 40) {
        game.controlDown();
      } else if (e.keyCode === 32) {
        if (game.gameStatus === GameStatus.playing) {
          game.pause();
        } else {
          game.start();
        }
      }
    });
  }
}
