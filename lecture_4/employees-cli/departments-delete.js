import "dotenv/config";
import prompt from "prompt-sync";
import client from "./db-client.js";

const promptSync = prompt();

try {
	const id = promptSync("Zadej ID oddělení: ");

	await client.connect();

	// Check if department exists
	const checkResult = await client.query("SELECT id, name FROM department WHERE id = $1", [id]);

	if (checkResult.rows.length === 0) {
		console.error("Oddělení s tímto ID neexistuje.");
		process.exit(1);
	}

	const departmentName = checkResult.rows[0].name;

	// Check if there are any employees in this department
	const employeeCheckResult = await client.query("SELECT COUNT(*) FROM employee WHERE department_id = $1", [id]);
	const employeeCount = Number(employeeCheckResult.rows[0].count);

	if (employeeCount > 0) {
		console.error(`Není možné smazat oddělení ${departmentName}, protože obsahuje zaměstnance.`);
		process.exit(1);
	}

	// Delete the department
	await client.query("DELETE FROM department WHERE id = $1", [id]);
	console.log(`Oddělení ${departmentName} bylo smazáno.`);
} finally {
	await client.end();
}
