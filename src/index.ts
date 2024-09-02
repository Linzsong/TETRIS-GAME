import $ from "jquery";
import { Game } from "./core/Game";
import { GamePageViewer } from "./core/viewer/GamePageViewer";


var g = new Game(new GamePageViewer());


$("#btnStart")[0].addEventListener("click", () => {
  g.start();
}, false);
$("#btnPause")[0].addEventListener("click", () => {
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
