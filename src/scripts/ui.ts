'use strict';

export default {
	// Show field for taking player ship positions
	showShipInput() {
		const shipInput = document.querySelector('.ship-input');
		shipInput?.classList.remove('hide');
	},

	// Hide field for taking player ship positions
	hideShipInput() {
		const shipInput = document.querySelector('.ship-input');
		shipInput?.classList.add('hide');
	},

	// Display ships placed on gameboard
	showShip(size: number, dir: 'ver'|'hor', row: number, col: number) {
			let rowEnd = row, colEnd = col;

			if (dir === 'ver') {
				rowEnd += size;
			} else if (dir === 'hor') {
				colEnd += size;
			}

			for (let i = row; i <= rowEnd; i++) {
				for (let j = col; j <= colEnd; j++) {
					document.querySelector(`.ship-input .spot[data-coord="${i},${j}"]`)?.classList.add('ship');
				}
			}
	},

	// Reset field for taking player ship positions
	resetShipInput() {
		const shipInput = document.querySelectorAll('.ship');

		for (let spot of shipInput) {
			spot.classList.remove('ship');
		}
	},

	// Set battlefield field
	setBattlefield(boardSize = 10) {
		const battlefields = document.querySelectorAll('.battlefield');

		for (let field of battlefields) {
			field.textContent = '';

			for (let row = 0; row < boardSize; row++) {
				for (let col = 0; col < boardSize; col++) {
					const spot = document.createElement('div');
					spot.classList.toggle('spot');
					spot.setAttribute('data-coord', `${row},${col}`);
					field.appendChild(spot);
				}
			}
		}
	},

	// Display message to the player
	showInfo(info: string) {
		const infoBox = document.querySelector('.info-display');

		if (infoBox !== null) {
			infoBox.textContent = info;
		}
	},

	// Hide game control buttons
	hideControls() {
		document.querySelector('.dir')?.classList.add('hide');
		document.querySelector('.done')?.classList.add('hide');
	},

	// Show game control buttons
	showControls() {
		document.querySelector('.dir')?.classList.remove('hide');
		document.querySelector('.done')?.classList.remove('hide');
	},

	// Show the playground
	showPlayground() {
		const playground = document.querySelector('.playground');
		playground?.classList.remove('hide');
	},

	// Reset the battlefield
	resetPlayground(boardSize = 10) {
		let battlefields = document.querySelectorAll('.playground .battlefield');

		for (let field of battlefields) {
			field.textContent = '';

			for (let row = 0; row < boardSize; row++) {
				for (let col = 0; col < boardSize; col++) {
					const spot = document.createElement('div');
					spot.classList.toggle('spot');
					spot.setAttribute('data-coord', `${row},${col}`);
					field.appendChild(spot);
				}
			}
		}
	},

	// Show the playground
	hidePlayground() {
		const playground = document.querySelector('.playground');
		playground?.classList.add('hide');
	},

	// Declare game winner
	showWinnerBanner(winner: string) {
		const winnerBanner = document.querySelector('.winner-banner');

		if (winnerBanner !== null) {
			const message = winnerBanner.querySelector('.message');

			if (message !== null) {
				message.textContent = `${ winner }\nwon!`;
			}
		}

		winnerBanner?.classList.remove('hide');
	},

	// Remove win message
	hideWinnerBanner() {
		const winnerBanner = document.querySelector('.winner-banner');

		if (winnerBanner !== null) {
			const message = winnerBanner.querySelector('.message');

			if (message !== null) {
				message.textContent = '';
			}
		}

		winnerBanner?.classList.add('hide');
	},
};
