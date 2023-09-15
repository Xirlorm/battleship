"use strict";

export enum shipKind {
  submarine = 1,
  destroyer = 2,
  cruiser = 3,
  battleship = 4,
  carrier = 5,
}

export const fleet = [
  shipKind.submarine,
  shipKind.submarine,
  shipKind.destroyer,
  shipKind.destroyer,
  shipKind.cruiser,
  shipKind.battleship,
  shipKind.carrier,
];

export interface Ship {
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
