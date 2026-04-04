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
 *
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
	 * Obtains a dinosaur by its ID. If no dinosaur with the given ID exists, returns `null`.
	 *
	 * @param {number} id
	 * @returns {Promise<Dinosaur|null>}
	 */
	async getDinosaurById(id) {
		const result = await client.query("SELECT * FROM dinosaur WHERE id = $1", [id]);
		if (result.rows.length === 0) {
			return null;
		}
		return mapRowToDinosaurDto(result.rows[0]);
	},

	/**
	 * Creates a new dinosaur and returns its ID.
	 *
	 * @param {DinosaurWithoutId} dinosaur
	 * @returns {Promise<number>}
	 */
	async createDinosaur(dinosaur) {
		const result = await client.query(
			"INSERT INTO dinosaur (name, description, period, wikipedia_address) VALUES ($1, $2, $3, $4) RETURNING id",
			[dinosaur.name, dinosaur.description, dinosaur.period, dinosaur.wikipediaAddress],
		);
		return result.rows[0].id;
	},

	/**
	 * Updates a dinosaur by its ID. Returns `true` if the dinosaur was updated, or `false` if no dinosaur with the given ID exists.
	 *
	 * @param {number} id
	 * @param {DinosaurWithoutId} dinosaur
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
	 * Deletes a dinosaur by its ID. Returns `true` if the dinosaur was deleted, or `false` if no dinosaur with the given ID exists.
	 *
	 * @param {number} id
	 * @returns {Promise<boolean>}
	 */
	async deleteDinosaurById(id) {
		const result = await client.query("DELETE FROM dinosaur WHERE id = $1", [id]);
		return result.rowCount > 0;
	},
};
