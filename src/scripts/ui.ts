'use strict';

export default {
	// ********************************************************
	// Initialize game UI
	// ********************************************************
	initialize() {
		this.setBattlefield();
	},

	// ********************************************************
	// Show field for taking player ship positions
	// ********************************************************
	showShipInput() {
		const shipInput = document.querySelector('.ship-input');
		shipInput?.classList.remove('hide');
	},

	// ********************************************************
	// Hide field for taking player ship positions
	// ********************************************************
	hideShipInput() {
		const shipInput = document.querySelector('.ship-input');
		shipInput?.classList.add('hide');
	},

	placeShip(size: number, dir: 'ver'|'hor', row: number, col: number) {
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

	// ********************************************************
	// Reset field for taking player ship positions
	// ********************************************************
	resetShipInput() {
		const shipInput = document.querySelectorAll('.ship');

		for (let spot of shipInput) {
			spot.classList.remove('ship');
		}
	},

	// ********************************************************
	// Set battlefield field
	// ********************************************************
	setBattlefield(boardSize = 10) {
		const battlefields = document.querySelectorAll('.battlefield');

		for (let field of battlefields) {
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

	// ********************************************************
	// Reset the battlefield
	// ********************************************************
	resetBattlefield() {
		let spots = document.querySelectorAll('.playground .battlefield .hit');

		for (let spot of spots) {
			spot.classList.remove('hit')
		}

		spots = document.querySelectorAll('.playground .battlefield .missed');

		for (let spot of spots) {
			spot.classList.remove('missed')
		}
	},

	// ********************************************************
	// Display message to the player
	// ********************************************************
	showInfo(info: string) {
		const infoBox = document.querySelector('.info-display');

		if (infoBox !== null) infoBox.textContent = info;

		infoBox?.classList.remove('hide');
	},

	// ********************************************************
	// Remove message popup
	// ********************************************************
	hideLogBox() {
		const infoBox = document.querySelector('.info-display');

		if (infoBox !== null) infoBox.textContent = '';

		infoBox?.classList.add('hide');
	},

	hideControls() {
		document.querySelector('.dir')?.classList.add('hide');
		document.querySelector('.done')?.classList.add('hide');
	},

	showControls() {
		document.querySelector('.dir')?.classList.remove('hide');
		document.querySelector('.done')?.classList.remove('hide');
	},
	// ********************************************************
	// Show the playground
	// ********************************************************
	showPlayground() {
		const playground = document.querySelector('.playground');
		playground?.classList.remove('hide');
	},

	// ********************************************************
	// Show the playground
	// ********************************************************
	hidePlayground() {
		const playground = document.querySelector('.playground');
		playground?.classList.add('hide');
	},

	// ********************************************************
	// Declare game winner
	// ********************************************************
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

	// ********************************************************
	// Remove win message
	// ********************************************************
	hidewinnerBaner() {
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
