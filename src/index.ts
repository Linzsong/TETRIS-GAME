import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from "jquery";
import { createTeris } from "./core/Teris";
import { TerisRule } from "./core/TerisRule";
import { MoveDirection } from "./types/common";
import { Game } from "./core/Game";
import { GamePageViewer } from "./core/viewer/GamePageViewer";


var g = new Game(new GamePageViewer());

// const group = createTeris({ x: 5, y: 5 })

// group.squares.forEach(sq => {
//   sq.iView = new SquarePageViewer(sq, $("#root"));
// });

$("#btnStart")[0].addEventListener("click", () => {
  g.start();
}, false);
$("#btnStart")[0].addEventListener("click", () => {
  g.pause();
}, false);

$("#up")[0].addEventListener("click", () => {
  g.controlRotate();

}, false);
$("#down")[0].addEventListener("click", () => {
  g.controlDown();
}, false);

$("#left")[0].addEventListener("click", () => {
  g.controlLeft();

}, false);
$("#right")[0].addEventListener("click", () => {
  g.controlRight();
}, false);
