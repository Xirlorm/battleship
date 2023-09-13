"use strict";

import { describe, expect, test } from "@jest/globals";
import { getShip, shipKind, Ship } from "../src/scripts/ship";

describe("Working with ship objects", () => {
	let ship: Ship;

	test("Create cruiser ship", () => {
		ship = getShip(shipKind.cruiser);
		expect(ship.type).toEqual('cruiser');
	})

	test("Takes a hit", () => {
		ship.hit()
		expect(ship.hits).toEqual(1)
	})

	test("Sink ship", () => {
		for (let i = ship.hits; i < ship.length; i++) {
			ship.hit()
		}

		expect(ship.hasSunk()).toEqual(true)
	})
})
