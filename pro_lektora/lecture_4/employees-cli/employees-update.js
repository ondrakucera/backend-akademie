import prompt from "prompt-sync";
import client from "./db-client.js";

const promptSync = prompt();

try {
	const id = promptSync("Zadej ID zaměstnance: ");

	await client.connect();

	const checkResult = await client.query(
		"SELECT id, first_name, last_name, age, department_id FROM employee WHERE id = $1",
		[id],
	);

	if (checkResult.rows.length === 0) {
		console.error("Zaměstnanec s tímto ID neexistuje.");
		process.exit(1);
	}

	const employeeRow = checkResult.rows[0];
	console.log(
		`Aktuální údaje: ${employeeRow.first_name} ${employeeRow.last_name}, věk: ${employeeRow.age}, ID oddělení: ${employeeRow.department_id}`,
	);

	const newFirstName = promptSync("Zadej nové křestní jméno: ");
	const newLastName = promptSync("Zadej nové příjmení: ");
	const newAge = Number(promptSync("Zadej nový věk: "));
	const newDepartmentId = Number(promptSync("Zadej nové ID oddělení: "));

	// Check if the new department exists
	const departmentResult = await client.query("SELECT id FROM department WHERE id = $1", [newDepartmentId]);

	if (departmentResult.rows.length === 0) {
		console.error(`Oddělení s ID ${newDepartmentId} neexistuje.`);
		process.exit(1);
	}

	await client.query(
		"UPDATE employee SET first_name = $1, last_name = $2, age = $3, department_id = $4 WHERE id = $5",
		[newFirstName, newLastName, newAge, newDepartmentId, id],
	);
	console.log(
		`Zaměstnanec byl aktualizován. ID: ${id}, jméno: ${newFirstName} ${newLastName}, věk: ${newAge}, ID oddělení: ${newDepartmentId}.`,
	);
} finally {
	await client.end();
}
