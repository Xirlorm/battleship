"use strict";

import { fleet, getShip, shipKind } from "./scripts/ship";
import { getComputer, getPlayer } from "./scripts/player";
import logic from "./scripts/logic";
import ui from "./scripts/ui";
import "./scss/main.scss";

// Initialize players and game variables
let player = getPlayer('You');
let computer = getComputer();
let dir: 'ver'|'hor' = 'ver';
let index = 0;

// Reset/Replay game
function reset() {
	index = 0;
	player = getPlayer('You');
	computer = getComputer();
	logic.winner = null;
	ui.showShipInput();
	ui.hidePlayground();
	ui.hideWinnerBanner();
	ui.resetShipInput();
	ui.resetPlayground();
	ui.showControls();
	ui.showInfo(`Tap spot to place ${shipKind[fleet[index]]}`);
}

// Display player names
const playerName = document.querySelector('.player1 .player-name');
const opponentName = document.querySelector('.player2 .player-name');

if (playerName !== null && opponentName !== null) {
	playerName.textContent = player.name;
	opponentName.textContent = computer.name;
}

// Initialize All battlefields
ui.setBattlefield()
ui.showInfo(`Tap spot to place ${shipKind[fleet[index]]}`)

// Let player position ships
const shipInput = document.querySelectorAll('.ship-input .spot');

for (let spot of shipInput) {
	spot.addEventListener('click', (e) => {
		if (index < fleet.length) {
			const coord = (e.target as HTMLElement).getAttribute('data-coord');
			let row = 0, col = 0;

			if (coord !== null) {
				[row, col] = coord.split(',').map(s => parseInt(s));
			}

			const ship = getShip(fleet[index]);
			const result = player.gameboard.placeShip(
				ship, row, col, dir
			);

			if (result) {
				index++;

				if (index < fleet.length) {
					ui.showInfo(`Tap spot to place ${shipKind[fleet[index]]}`)
				} else {
					ui.showInfo('All set!');
				}

				ui.showShip(ship.length - 1, dir, row, col);
			}
		}
	});
}

// Reset the game session
const resetBtn = document.querySelector('.reset');
resetBtn?.addEventListener('click', reset);

// Replay game
const replay = document.querySelector('.replay');
replay?.addEventListener('click', reset);

// Change the direction for ship placement layouts
const dirBtn = document.querySelector('.dir');
dirBtn?.addEventListener('click', (e) => {
	const dirBtn = e.target as HTMLButtonElement;
	const currentDir = dirBtn.getAttribute('data-dir');

	if (currentDir === 'ver') {
		dirBtn.setAttribute('data-dir', 'hor');
		dirBtn.innerText = 'Horizontal';
		dir = 'hor';
	} else {
		dirBtn.setAttribute('data-dir', 'ver');
		dirBtn.innerText = 'Vertical';
		dir = 'ver'
	}
});

// Start a new game session when player places all ships
const doneBtn = document.querySelector('.done');
doneBtn?.addEventListener('click', () => {
	if (index === fleet.length) {
		ui.showPlayground();
		ui.hideShipInput();
		ui.hideControls();
		ui.showInfo('Tap spot on computer board to destroy ships')
		computer.placeShips();
		logic.play(player, computer);
		logic.winner = null;
	}
})
