import prompt from "prompt-sync";

const promptSync = prompt();

const isPrime = (number) => {
	for (let i = 2; i <= Math.floor(Math.sqrt(number)); i++) {
		if (number % i === 0) {
			return false;
		}
	}
	return true;
};

const number = Number(promptSync("Enter a number: "));
if (isPrime(number)) {
	console.log(`${number} is a prime number.`);
} else {
	console.log(`${number} is not a prime number.`);
}
