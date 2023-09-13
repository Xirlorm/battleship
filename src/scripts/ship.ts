"use strict";

export enum shipKind {
	submarine = 0,
	destroyer = 1,
	cruiser = 2,
	battleship = 3,
	carrier = 4,
};

export const fleet = [
	shipKind.submarine,
	shipKind.submarine,
	shipKind.destroyer,
	shipKind.destroyer,
	shipKind.cruiser,
	shipKind.battleship,
	shipKind.carrier,
]

export interface Ship {
	type: string,
  hits: number;
  length: number;
  hit: () => void;
  hasSunk: () => boolean;
}

// *********************************************
// Returns a new Ship instance
// *********************************************
export function getShip(length: number): Ship {
  return {
		type: shipKind[length],
    hits: 0,
    length,

    hit() {
      if (this.hits < this.length) {
        this.hits++;
      }
    },

    hasSunk() {
      return this.hits === this.length;
    },
  };
}
