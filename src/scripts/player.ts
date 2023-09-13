"use strict";

import { Gameboard, getGameboard } from "./gameboard";
import { fleet, getShip } from "./ship";

let boardSize = 10;

export interface Player {
  name: string;
  gameboard: Gameboard;
	wasAttacked: (row: number, col: number) => boolean;
	recordAttack: (row: number, col: number) => void,
}

export interface Computer {
  name: string;
  gameboard: Gameboard;
	wasAttacked: (row: number, col: number) => boolean;
	recordAttack: (row: number, col: number) => void,
	launchAttack: () => { row: number, col: number };
	placeShips: () => void;
}

// ***********************************************************
// Get a new Player instance
// ***********************************************************
export function getPlayer(name: string): Player {
	const history: boolean[][] = [];

	for (let i = 0; i < boardSize; i++) {
		history.push([]);

		for (let j = 0; j < boardSize; j++) {
			history[i][j] = false;
		}
	}

  return {
    name: name,
    gameboard: getGameboard(boardSize),

		wasAttacked(row, col) {
			return history[row][col];
		},

		recordAttack (row: number, col: number) {
			history[row][col] = true;
		},
	}
}

// ***********************************************************
// get Computer player instance
// ***********************************************************
export function getComputer(): Computer {
	const history: boolean[][] = [];

	for (let i = 0; i < boardSize; i++) {
		history.push([]);

		for (let j = 0; j < boardSize; j++) {
			history[i][j] = false;
		}
	}

  return {
    name: 'Computer',
    gameboard: getGameboard(boardSize),

		wasAttacked(row: number, col: number) {
			return history[row][col];
		},

		recordAttack (row: number, col: number) {
			history[row][col] = true;
		},

		launchAttack() {
			let row = Math.floor(Math.random() * boardSize);
			let col = Math.floor(Math.random() * boardSize);

			while (this.wasAttacked(row, col)) {
				row = Math.floor(Math.random() * boardSize);
				col = Math.floor(Math.random() * boardSize);
			}

			this.recordAttack(row, col);

			return { row, col };
		},

		// Automatically position ships on battlefield
		placeShips() {
			for (let shipType of fleet) {
				const ship = getShip(shipType);
				let successful = false;

				while (!successful) {
					const row =  Math.floor(Math.random() * boardSize);
					const col =  Math.floor(Math.random() * boardSize);
					const dir = ['ver', 'hor'][Math.floor(Math.random() * 2)] as 'hor'|'ver';

					successful = this.gameboard.placeShip(ship, row, col, dir);
				}
				alert(ship.length)
			}
		},
	}
}
