import "dotenv/config";
import prompt from "prompt-sync";
import client from "./db-client.js";

const promptSync = prompt();

const firstName = promptSync("Zadej křestní jméno: ");
const lastName = promptSync("Zadej příjmení: ");
const age = Number(promptSync("Zadej věk: "));
const departmentId = Number(promptSync("Zadej ID oddělení: "));

try {
	await client.connect();

	// Check if the department exists
	const departmentResult = await client.query("SELECT id FROM department WHERE id = $1", [departmentId]);

	if (departmentResult.rows.length === 0) {
		console.error(`Oddělení s ID ${departmentId} neexistuje.`);
		process.exit(1);
	}

	// Create the employee
	const result = await client.query(
		"INSERT INTO employee (first_name, last_name, age, department_id) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, age, department_id",
		[firstName, lastName, age, departmentId],
	);

	const newEmployee = result.rows[0];
	console.log(
		`Zaměstnanec byl vytvořen. ID: ${newEmployee.id}, jméno: ${newEmployee.first_name} ${newEmployee.last_name}, věk: ${newEmployee.age}, ID oddělení: ${newEmployee.department_id}.`,
	);
} finally {
	await client.end();
}
