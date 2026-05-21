import "dotenv/config";
import client from "./db-client.js";

try {
	await client.connect();
	const result = await client.query(`
		SELECT employee.id, employee.first_name, employee.last_name, employee.age, department.name as department_name
		FROM employee
		JOIN department ON employee.department_id = department.id
		ORDER BY employee.last_name, employee.first_name
	`);
	result.rows.forEach((employeeRow) => {
		console.log(
			`${employeeRow.id}: ${employeeRow.first_name} ${employeeRow.last_name} (${employeeRow.age}), ${employeeRow.department_name}`,
		);
	});
} finally {
	await client.end();
}
