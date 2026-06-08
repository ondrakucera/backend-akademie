import prompt from "prompt-sync";

const promptSync = prompt();

const arithmeticMean = (number1, number2) => (number1 + number2) / 2;

const number1 = Number(promptSync("Enter the first number: "));
const number2 = Number(promptSync("Enter the second number: "));

console.log(`Arithmetic mean of ${number1} and ${number2} is ${arithmeticMean(number1, number2)}.`);
