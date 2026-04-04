import "dotenv/config";
import client from "./db-client.js";

try {
	await client.connect();
	const result = await client.query("SELECT * FROM department ORDER BY name");
	result.rows.forEach((departmentRow) => {
		console.log(`${departmentRow.id}: ${departmentRow.name}`);
	});
} finally {
	await client.end();
}
