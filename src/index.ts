import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from "jquery";
import { createTeris } from "./core/Teris";
import { TerisRule } from "./core/TerisRule";
import { MoveDirection } from "./types/common";


const group = createTeris({ x: 5, y: 5 })

group.squares.forEach(sq => {
  sq.iView = new SquarePageViewer(sq, $("#root"));
});

// const handler = new TerisRule()

// let sq = new Square({ x: 4, y: 6 }, "red");
// sq.iView = new SquarePageViewer(sq, $("#root"));

$("#up")[0].addEventListener("click", () => {
  TerisRule.rotate(group)
  // group.rotate()

}, false);
$("#down")[0].addEventListener("click", () => {
  // TerisRule.move(group, {
  //   x: group.centerPoint.x,
  //   y: group.centerPoint.y + 1
  // });
  TerisRule.moveDirectly(group, MoveDirection.down);


}, false);
$("#left")[0].addEventListener("click", () => {
  TerisRule.move(group, {
    x: group.centerPoint.x - 1,
    y: group.centerPoint.y
  });
}, false);
$("#right")[0].addEventListener("click", () => {
  TerisRule.move(group, {
    x: group.centerPoint.x + 1,
    y: group.centerPoint.y
  });
}, false);
