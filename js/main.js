// Controller

import Game from "./Game.js";
import GameView from "./GameView.js";

let game = new Game();
let gameView = new GameView(document.getElementById("app"));

gameView.onCelulaClick = function (index) {
    game.fazJogada(index);
    gameView.update(game);
};

gameView.onRestartClick = function () {
    game = new Game();
    gameView.update(game)
};

gameView.update(game);

// function teste() {
//     this.a = 1;
//     this.b = 2;
//
// }
//
// let t = new teste();
// console.log(t);
