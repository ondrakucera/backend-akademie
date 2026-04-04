function mapRowToDinosaurDto(row) {
	return {
		id: row.id,
		name: row.name,
		description: row.description,
		period: row.period,
		wikipediaAddress: row.wikipedia_address,
	};
}

export function createDinosaurRepository({ client }) {
	return {
		async listDinosaurs() {
			const result = await client.query("SELECT * FROM dinosaur ORDER BY id");
			return result.rows.map(mapRowToDinosaurDto);
		},
	};
}
