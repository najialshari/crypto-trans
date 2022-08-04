import chalk from 'chalk';

import { dateRegex, tokensRegex } from './regEx.js';

const warn = chalk.hex('#FFCC00'); // orange color

export const validateToken = token => {
	token = token.toUpperCase();
	if (typeof token !== 'string') {
		console.warn(warn(`invalid token symbol data type`));
		return false;
	} else if (
		!token ||
		!token.match(tokensRegex)[0].length ||
		token.match(tokensRegex)[0] !== token
	) {
		console.log(warn(`Invlid token symbol`));
		return false;
	}

	return true;
};

export const validateDate = date => {
	if (typeof date !== 'string') {
		console.log(warn(`invalid date value type`));
		return false;
	} else if (!date || !date.match(dateRegex)) {
		console.log(
			warn(`invalid date format. The required format: "DD-MM-YYYY"`)
		);
		return false;
	}
	return true;
};