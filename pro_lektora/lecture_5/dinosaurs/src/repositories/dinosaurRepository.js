import { pgClient } from "../db/client.js";

function mapRowToDinosaurDto(row) {
	return {
		id: row.id,
		name: row.name,
		description: row.description,
		period: row.period,
		wikipediaAddress: row.wikipedia_address,
	};
}

export const dinosaurRepository = {
	async listDinosaurs() {
		const result = await pgClient.query("SELECT * FROM dinosaur ORDER BY id");
		return result.rows.map(mapRowToDinosaurDto);
	},
	async createDinosaur(dinosaur) {
		const result = await pgClient.query(
			"INSERT INTO dinosaur (name, description, period, wikipedia_address) VALUES ($1, $2, $3, $4) RETURNING id",
			[dinosaur.name, dinosaur.description, dinosaur.period, dinosaur.wikipediaAddress],
		);
		return result.rows[0].id;
	},
	async getDinosaurById(id) {
		const result = await pgClient.query("SELECT * FROM dinosaur WHERE id = $1", [id]);
		if (result.rows.length === 0) {
			return null;
		}
		return mapRowToDinosaurDto(result.rows[0]);
	},
	async updateDinosaurById(id, dinosaur) {
		const result = await pgClient.query(
			"UPDATE dinosaur SET name = $2, description = $3, period = $4, wikipedia_address = $5 WHERE id = $1",
			[id, dinosaur.name, dinosaur.description, dinosaur.period, dinosaur.wikipediaAddress],
		);
		return result.rowCount > 0;
	},
	async deleteDinosaurById(id) {
		const result = await pgClient.query("DELETE FROM dinosaur WHERE id = $1", [id]);
		return result.rowCount > 0;
	},
};
