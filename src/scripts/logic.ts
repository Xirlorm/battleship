"use strict";

import { Computer, Player } from "./player";
import ui from "./ui";
import explosion from "../assets/audio/explosion.mp3";
import splash from "../assets/audio/splash.mp3";

let playerTurn: Player | Computer;
// let isPlaying = false;
let lib: {
  play: (player: Player, opponent: Computer | Player) => void;
  winner: Player | Computer | null;
} = { play, winner: null };

// ************************************************************
// Player takes turn playing game
// ************************************************************
function play(player: Player, opponent: Computer | Player) {
  playerTurn = player;
  const battlefield = document.querySelectorAll(".player2 .spot");

  for (let spot of battlefield) {
    spot.addEventListener("click", (e) => {
      if (playerTurn === player && lib.winner === null) {
        const spot = e.target as HTMLElement;
        const coord = spot.getAttribute("data-coord")?.split(",");
        let row = 0,
          col = 0;

        if (coord !== undefined) {
          [row, col] = coord.map((e) => parseInt(e));
        }

        if (!player.wasAttacked(row, col)) {
          playerTurn = opponent;
          const hasHitShip = opponent.gameboard.receiveAttack(row, col);
          player.recordAttack(row, col);

          if (hasHitShip) {
            spot.classList.add("hit");

            if (opponent.gameboard.allShipsSunk()) {
              lib.winner = player;
              playerTurn = player;
              ui.showWinnerBanner(lib.winner.name);
              ui.showInfo(`${lib.winner.name} won!`);
            }
            playHitSfx();
          } else {
            spot.classList.add("missed");
            playMissSfx();
          }

          if (opponent.name === "Computer") {
            computerPlay(opponent as Computer, player);
          }
        }
      }
    });
  }
}

// ************************************************************
// Compluter takes turn playing game
// ************************************************************
function computerPlay(computer: Computer, opponent: Player) {
  if (playerTurn === computer && lib.winner === null) {
    setTimeout(function () {
      const attack = computer.launchAttack();
      const { row, col } = attack;
      const hasHitShip = opponent.gameboard.receiveAttack(row, col);
      const spot = document.querySelector(
        `.player1 .spot[data-coord="${row},${col}"]`,
      );

      if (hasHitShip) {
        spot?.classList.add("hit");

        if (opponent.gameboard.allShipsSunk()) {
          lib.winner = computer;
          ui.showWinnerBanner(lib.winner.name);
          ui.showInfo(`${lib.winner.name} won!`);
        }

        playHitSfx();
      } else {
        spot?.classList.add("missed");
        playMissSfx();
      }

      playerTurn = opponent;
    }, 2000);
  }
}

// <source src="./assets/audio/explosion.ogg" type="audio/ogg">
const hitSound = new Audio(explosion);
// <source src="./assets/audio/splash.ogg" type="audio/ogg">
const missedSound = new Audio(splash);

function playHitSfx() {
  missedSound.pause();
  missedSound.currentTime = 0;
  hitSound.currentTime = 0;
  hitSound.play();
}

function playMissSfx() {
  hitSound.pause();
  hitSound.currentTime = 0;
  missedSound.currentTime = 0;
  missedSound.play();
}

// ################################
/* # */ export default lib; // #
// ################################
