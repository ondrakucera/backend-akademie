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

	const departmentRow = checkResult.rows[0];
	console.log(`Aktuální název: ${departmentRow.name}`);
	const newName = promptSync("Zadej nový název oddělení: ");

	// Update the department
	await client.query("UPDATE department SET name = $1 WHERE id = $2", [newName, id]);
	console.log(`Oddělení bylo aktualizováno. ID: ${id}, nový název: ${newName}.`);
} finally {
	await client.end();
}
