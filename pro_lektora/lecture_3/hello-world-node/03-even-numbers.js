import prompt from "prompt-sync";

const promptSync = prompt();

const number1 = Number(promptSync("Enter the first number: "));
const number2 = Number(promptSync("Enter the second number: "));

const minimum = number1 <= number2 ? number1 : number2;
const maximum = number1 <= number2 ? number2 : number1;

console.log(`All even numbers between ${minimum} and ${maximum}:`);
for (let currentNumber = minimum; currentNumber <= maximum; currentNumber++) {
	if (currentNumber % 2 === 0) {
		console.log(currentNumber);
	}
}
