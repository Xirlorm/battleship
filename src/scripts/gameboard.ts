"use strict";

import { Ship } from "./ship";

export interface Gameboard {
  placeShip: (
    ship: Ship,
    row: number,
    col: number,
    dir: "ver" | "hor",
  ) => boolean;
  receiveAttack: (row: number, col: number) => boolean;
  allShipsSunk: () => boolean;
}

// *********************************************
// Get a Gameboard object
// *********************************************
export function getGameboard(size: number = 10): Gameboard {
  const fleet: Array<Ship> = [];
  const battlefield: Array<Array<Ship | undefined>> = [];

  for (let i = 0; i < size; i++) {
    battlefield.push([]);

    for (let j = 0; j < size; j++) {
      battlefield[i][j] = undefined;
    }
  }

  return {
    placeShip(ship: Ship, row: number, col: number, dir: "ver" | "hor") {
      let rowEnd = row,
        colEnd = col;

      if (dir === "ver") {
        rowEnd += ship.length - 1;
      } else if (dir === "hor") {
        colEnd += ship.length - 1;
      }

      const rowInRange = rowEnd >= 0 && rowEnd < size;
      const colInRange = colEnd >= 0 && colEnd < size;

      if (!(rowInRange && colInRange)) {
        return false;
      }

      for (let i = row; i <= rowEnd; i++) {
        for (let j = col; j <= colEnd; j++) {
          if (battlefield[i][j] !== undefined) {
            return false;
          }
        }
      }

      for (let i = row; i <= rowEnd; i++) {
        for (let j = col; j <= colEnd; j++) {
          battlefield[i][j] = ship;
        }
      }

      fleet.push(ship);

      return true;
    },

    receiveAttack(row: number, col: number) {
      const spot = battlefield[row][col];

      if (spot === undefined) {
        return false;
      }

      spot?.hit();

      return true;
    },

    allShipsSunk() {
      for (let ship of fleet) {
        if (!ship.hasSunk()) {
          return false;
        }
      }

      return true;
    },
  };
}
