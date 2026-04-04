import client from "./db-client.js";

try {
	await client.connect();
	const result = await client.query("SELECT * FROM department order by department.id");
	result.rows.forEach((departmentRow) => {
		console.log(`${departmentRow.id}: ${departmentRow.name}`);
	});
} finally {
	await client.end();
}
