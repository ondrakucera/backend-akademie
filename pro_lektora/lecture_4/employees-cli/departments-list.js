import pkg from "pg";

const { Client } = pkg;

const client = new Client({
	host: "localhost",
	port: 5432,
	database: "reactgirls_backend_akademie",
	user: "ondra",
});

try {
	await client.connect();
	const result = await client.query("SELECT * FROM department order by department.id");
	result.rows.forEach((departmentRow) => {
		console.log(`${departmentRow.id}: ${departmentRow.name}`);
	});
} finally {
	await client.end();
}
