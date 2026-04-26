import prompt from "prompt-sync";

const promptSync = prompt();

const number1 = Number(promptSync("Enter the first number: "));
const number2 = Number(promptSync("Enter the second number: "));

console.log(`Sum of ${number1} and ${number2} is ${number1 + number2}.`);
