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
  // group.centerPoint = {
  //   x: group.centerPoint.x,
  //   y: group.centerPoint.y - 1
  // }

  // SquareRules.isCanMove(group.squarePoint, {
  //   x: group.centerPoint.x,
  //   y: group.centerPoint.y - 1
  // })

}, false);
$("#down")[0].addEventListener("click", () => {
  SquareRules.move(group, {
    x: group.centerPoint.x,
    y: group.centerPoint.y + 1
  });

  // group.centerPoint = {
  //   x: group.centerPoint.x,
  //   y: group.centerPoint.y + 1
  // }
}, false);
$("#left")[0].addEventListener("click", () => {
  // group.centerPoint = {
  //   x: group.centerPoint.x - 1,
  //   y: group.centerPoint.y
  // }
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
// console.log(dom);

// dom.show()

// setTimeout(() => {
//   console.log('++');

//     sq.color = 'blue'
//     sq.point = {
//     x: sq.point.x,
//     y: sq.point.y + 1
//   }

// }, 1000)

// setInterval(() => {

//   sq.point = {
//     x: sq.point.x,
//     y: sq.point.y + 1
//   }

// }, 1000)

// let show = new ShowConsoleSquare(s)
// let ss = new Square({x: 10, y: 19}, 'red', show)

// console.log(shwo);
// ss.point = {
//   x: 1,
//   y: 2
// }
// ss.point = {
//   x: 1,
//   y: 2
// }
