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
		async getDinosaurById(id) {
			const result = await client.query("SELECT * FROM dinosaur WHERE id = $1", [id]);
			if (result.rows.length === 0) {
				return null;
			}
			return mapRowToDinosaurDto(result.rows[0]);
		},
		async deleteDinosaurById(id) {
			const result = await client.query("DELETE FROM dinosaur WHERE id = $1", [id]);
			return result.rowCount > 0;
		},
	};
}
