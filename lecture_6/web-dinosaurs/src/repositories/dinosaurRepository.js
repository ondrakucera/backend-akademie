import { client } from "../db/client.js";

/**
 * @typedef {Object} DinosaurWithoutId
 * @property {string} name
 * @property {string} description
 * @property {string} period
 * @property {string} wikipediaAddress
 */

/**
 * @typedef {DinosaurWithoutId} Dinosaur
 * @property {number} id
 */

/**
 * Converts a database row representing a dinosaur into a `Dinosaur` object.
 * @param {Object} row
 * @returns {Dinosaur}
 */
const mapRowToDinosaurDto = (row) => {
	return {
		id: row.id,
		name: row.name,
		description: row.description,
		period: row.period,
		wikipediaAddress: row.wikipedia_address,
	};
};

export const dinosaurRepository = {
	/**
	 * Obtains all dinosaurs, ordered by ID.
	 *
	 * @returns {Promise<Dinosaur[]>}
	 */
	async listDinosaurs() {
		const result = await client.query("SELECT * FROM dinosaur ORDER BY id");
		return result.rows.map(mapRowToDinosaurDto);
	},

	/**
	 * Obtains one dinosaur by ID.
	 *
	 * @param {number} id
	 *
	 * @returns {Promise<Dinosaur | null>}
	 */
	async getDinosaurById(id) {
		const result = await client.query("SELECT * FROM dinosaur WHERE id = $1", [id]);
		if (result.rowCount === 0) {
			return null;
		}
		return result.rows.map(mapRowToDinosaurDto)[0];
	},

	/**
	 * Create new dinosaur.
	 *
	 * @param {Dinosaur} dinosaur
	 *
	 * @returns {Promise<number>}
	 */
	async createDinosaur(dinosaur) {
		const result = await client.query(
			"INSERT INTO dinosaur (name, description, period, wikipedia_address) VALUES($1, $2, $3, $4) RETURNING id",
			[dinosaur.name, dinosaur.description, dinosaur.period, dinosaur.wikipediaAddress],
		);
		return result.rows[0].id;
	},

	/**
	 * Update dinosaur by id.
	 *
	 * @param {number} id
	 * @param {Dinosaur} dinosaur
	 *
	 * @returns {Promise<boolean>}
	 */
	async updateDinosaurById(id, dinosaur) {
		const result = await client.query(
			"UPDATE dinosaur SET name = $2, description = $3, period = $4, wikipedia_address = $5 WHERE id = $1",
			[id, dinosaur.name, dinosaur.description, dinosaur.period, dinosaur.wikipediaAddress],
		);
		return result.rowCount > 0;
	},

	/**
	 * Delete dinosaur by id.
	 *
	 * @param {number} id
	 *
	 * @returns {Promise<boolean>}
	 */
	async deleteDinosaurById(id) {
		const result = await client.query(
			"DELETE FROM dinosaur WHERE id = $1",
			[id],
		);
		return result.rowCount > 0;
	},
};
