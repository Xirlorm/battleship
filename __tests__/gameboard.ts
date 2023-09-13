"use strict";

import { describe, expect, it } from "@jest/globals";
import { Gameboard, getGameboard } from "../src/scripts/gameboard";
import { getShip, shipKind } from "../src/scripts/ship";

let gameboard: Gameboard = getGameboard(10);
const ship = getShip(shipKind.cruiser);

describe("Working with player gameboards", () => {
	it('Create a gameboard', () => {
		expect(gameboard).toHaveProperty('placeShip');
		expect(gameboard).toHaveProperty('receiveAttack');
		expect(gameboard).toHaveProperty('allShipsSunk');
	});

	it('Place ships', () => {
		const result = gameboard.placeShip(ship, 3, 3, 'ver');
		expect(result).toBeTruthy();
	});

	it('Successfully attack ship', () => {
		expect(gameboard.receiveAttack(4, 3)).toBeTruthy();
	});

	it('Miss an attack', () => {
		expect(gameboard.receiveAttack(6, 3)).toBeFalsy();
	});

	it('Sink all ships', () => {
		for (let i = 3; i < 3 + ship.length; i++) {
			gameboard.receiveAttack(i, 3);
		}

		expect(gameboard.allShipsSunk).toBeTruthy();
	});
});
