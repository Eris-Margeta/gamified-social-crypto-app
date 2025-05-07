export const generateValidCode = (codeLength: number): string => {
	let lettersCount = 0;
	let numbersCount = 0;
	let code = "";

	while (code.length < codeLength) {
		if (
			lettersCount < 2 ||
			(lettersCount >= 2 && numbersCount >= 2 && Math.random() > 0.5)
		) {
			const letter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
			code += letter;
			lettersCount++;
		} else {
			const number = Math.floor(Math.random() * 10);
			code += number.toString();
			numbersCount++;
		}
	}

	return code;
};
