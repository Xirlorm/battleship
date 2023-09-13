'use strict';

import { Computer, Player } from "./player";
import ui from "./ui";

let playerTurn: Player|Computer;
let lib: {
	play: (player: Player, opponent: Computer|Player) => void;
	winner: Player|Computer|null;
} = { play, winner: null };

// ************************************************************
// Player takes turn playing game
// ************************************************************
function play(player: Player, opponent: Computer | Player) {
	if (playerTurn === undefined) {
		playerTurn = player;
	}

	const opponentBattlefield = document.querySelectorAll('.player2 .spot');

	for (let spot of opponentBattlefield) {
		spot.addEventListener('click', (e) => {
			if (playerTurn === player && lib.winner === null) {
				const spot = e.target as HTMLElement;
				const coord = spot.getAttribute('data-coord')?.split(',');
				let row = 0, col = 0;

				if (coord !== undefined) {
					[row, col] = coord.map((e) => parseInt(e));
				} 

				if (!player.wasAttacked(row, col)) {
					playerTurn = opponent;
					const hasHitShip = opponent.gameboard.receiveAttack(row, col);
					player.recordAttack(row, col);

					if (hasHitShip) {
						spot.classList.add('hit');
					} else {
						spot.classList.add('missed');
					}

					if (opponent.gameboard.allShipsSunk()) {
						lib.winner = player;
						ui.showWinnerBanner(lib.winner.name);
					}

					if (opponent.name === 'Computer') {
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
			const attack = computer.launchAttack()
			const { row, col } = attack;
			const hasHitShip = opponent.gameboard.receiveAttack(row, col);
			const spot = document.querySelector(
				`.player1 .spot[data-coord="${row},${col}"]`
			);

			if (hasHitShip) {
				spot?.classList.add('hit');
			} else {
				spot?.classList.add('missed');
			}

			if (opponent.gameboard.allShipsSunk()) {
				lib.winner = computer;
				ui.showWinnerBanner(lib.winner.name);
			}

			playerTurn = opponent;
		}, 1);
	}
}




// ################################
  export default lib;           //#
// ################################
