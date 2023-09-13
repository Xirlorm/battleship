'use strict';

import { describe, expect, it } from "@jest/globals";
import { getPlayer, getComputer } from '../src/scripts/player';

describe('Player object tests', () => {
	const player = getPlayer('Joe');

	it('Create Player', () => {
		expect(player.name).toBe('Joe');
		expect(player).toHaveProperty('gameboard');
	});

	it('Records attacks made', () => {
		player.recordAttack(3, 3);
		expect(player.wasAttacked(3,3)).toBeTruthy();
	});
});

describe('Computer player', () => {
	const computer = getComputer();

	it('Create Computer player', () => {
		expect(computer.name).toBe('Computer');
	});

	it('Records attacks made', () => {
		computer.recordAttack(3, 3);
		expect(computer.wasAttacked(3,3)).toBeTruthy();
	});

	it('Get an attack', () => {
		const { row, col } = computer.launchAttack();
		expect(row).toBeLessThanOrEqual(9);
		expect(col).toBeLessThanOrEqual(9);
		expect(col).toBeGreaterThanOrEqual(0);
		expect(col).toBeGreaterThanOrEqual(0);
	});
});
