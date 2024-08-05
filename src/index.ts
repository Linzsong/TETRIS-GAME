import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from "jquery";
import { createTeris } from "./core/Teris";
import { SquareRules } from "./core/SquareRules";
import { MoveDirection } from "./types/common";

// class ShowConsoleSquare implements IView {
//   private _sq: Square

//   constructor(sq: Square) {
//     this._sq = sq
//   }

//   show() {
//     console.log('in show', this._sq);

//   }
//   remove() {

//   };
// }

// const group = new SquareGroup(
//   [
//     { x: 0, y: -1 },
//     { x: -1, y: 0 },
//     { x: 0, y: 0 },
//     { x: 0, y: 1 },
//   ],
//   { x: 5, y: 5 },
//   "red"
// );

const group = createTeris({ x: 5, y: 5 })

group.squares.forEach(sq => {
  sq.iView = new SquarePageViewer(sq, $("#root"));
});

// const handler = new SquareRules()

// let sq = new Square({ x: 4, y: 6 }, "red");
// sq.iView = new SquarePageViewer(sq, $("#root"));

$("#up")[0].addEventListener("click", () => {
  SquareRules.rotate(group)

}, false);
$("#down")[0].addEventListener("click", () => {
  // SquareRules.move(group, {
  //   x: group.centerPoint.x,
  //   y: group.centerPoint.y + 1
  // });
  SquareRules.moveDirectly(group, MoveDirection.down);


}, false);
$("#left")[0].addEventListener("click", () => {
  SquareRules.move(group, {
    x: group.centerPoint.x - 1,
    y: group.centerPoint.y
  });
}, false);
$("#right")[0].addEventListener("click", () => {
  SquareRules.move(group, {
    x: group.centerPoint.x + 1,
    y: group.centerPoint.y
  });
}, false);
