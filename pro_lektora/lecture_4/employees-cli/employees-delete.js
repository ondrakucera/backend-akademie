import prompt from "prompt-sync";
import client from "./db-client.js";

const promptSync = prompt();

try {
	const id = promptSync("Zadej ID zaměstnance: ");

	await client.connect();

	// Check if employee exists
	const checkResult = await client.query("SELECT id, first_name, last_name FROM employee WHERE id = $1", [id]);

	if (checkResult.rows.length === 0) {
		console.error("Zaměstnanec s tímto ID neexistuje.");
		process.exit(1);
	}

	const employeeRow = checkResult.rows[0];
	const employeeName = `${employeeRow.first_name} ${employeeRow.last_name}`;

	// Delete the employee
	await client.query("DELETE FROM employee WHERE id = $1", [id]);
	console.log(`Zaměstnanec ${employeeName} byl smazán.`);
} finally {
	await client.end();
}
