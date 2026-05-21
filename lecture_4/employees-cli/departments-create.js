import "dotenv/config";
import prompt from "prompt-sync";
import client from "./db-client.js";

const promptSync = prompt();

const departmentName = promptSync("Zadej název oddělení: ");

try {
	await client.connect();
	const result = await client.query("INSERT INTO department (name) VALUES ($1) RETURNING id, name", [departmentName]);
	const newDepartment = result.rows[0];
	console.log(`Oddělení bylo vytvořeno. ID: ${newDepartment.id}, název: ${newDepartment.name}.`);
} finally {
	await client.end();
}
