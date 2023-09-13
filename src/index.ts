"use strict";

import lib from "./scripts/lib";
import { getComputer, getPlayer } from "./scripts/player";
import { fleet, getShip } from "./scripts/ship";
import ui from "./scripts/ui";
import "./scss/main.scss";

// ************************************************************
// Reset/Replay game
// ************************************************************
function reset() {
	ui.showShipInput();
	ui.hidePlayground();
	ui.hidewinnerBaner();
	ui.resetShipInput();
	ui.resetBattlefield();
	ui.showControls();
	index = 0;
	player = getPlayer('You');
	computer = getComputer();
	lib.winner = null;
}

// Initialize players
let player = getPlayer('You');
let computer = getComputer();
let dir: 'ver'|'hor' = 'ver';

// Show player names in UI
const playerName = document.querySelector('.player1 .player-name');
const opponentName = document.querySelector('.player2 .player-name');

if (playerName !== null && opponentName !== null) {
	playerName.textContent = player.name;
	opponentName.textContent = computer.name;
}

// Initialize All battlefields
ui.setBattlefield()

// Let player position ships
const shipInput = document.querySelectorAll('.ship-input .spot');
let index = 0;

for (let spot of shipInput) {
	spot.addEventListener('click', (e) => {
		if (index < fleet.length) {
			const coord = (e.target as HTMLElement).getAttribute('data-coord');
			let row = 0, col = 0;
			const ship = getShip(fleet[index]);
			if (coord !== null) [row, col] = coord.split(',').map(e => parseInt(e));
			const result = player.gameboard.placeShip(
				ship, row, col, dir
			);

			if (result) {
				index++;
				ui.placeShip(ship.length, dir, row, col);
			}
		}
	})
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
		ui.hidewinnerBaner();
		ui.resetShipInput();
		ui.hideControls();
		computer.placeShips();
		lib.play(player, computer);
		lib.winner = null;
	}
})
