import { client } from "../db/client.js";

/**
 * @typedef {Object} StudentWithoutId
 * @property {string} firstName
 * @property {string} lastName
 * @property {"male"|"female"} gender
 * @property {number} year
 * @property {"Gryffindor"|"Hufflepuff"|"Ravenclaw"|"Slytherin"} house
 */

/**
 * @typedef {StudentWithoutId} Student
 * @property {number} id
 */

/**
 * Converts a database row representing a student into a `Student` object.
 *
 * @param {Object} row
 * @returns {Student}
 */
const mapRowToStudentDto = (row) => {
	return {
		id: row.id,
		firstName: row.first_name,
		lastName: row.last_name,
		gender: row.gender,
		year: row.year,
		house: row.house,
	};
};

export const studentRepository = {
	/**
	 * Obtains all students, ordered by ID.
	 *
	 * @returns {Promise<Student>[]}
	 */
	async listStudents() {
		const result = await client.query("SELECT * FROM student ORDER BY id");
		return result.rows.map(mapRowToStudentDto);
	},

	/**
	 * Obtains a student by its ID. If no student with the given ID exists, returns `null`.
	 *
	 * @param {number} id
	 * @returns {Promise<Student|null>}
	 */
	async getStudentById(id) {
		const result = await client.query("SELECT * FROM student WHERE id = $1", [id]);
		if (result.rows.length === 0) {
			return null;
		}
		return mapRowToStudentDto(result.rows[0]);
	},

	/**
	 * Creates a new student and returns its ID.
	 *
	 * @param {StudentWithoutId} student
	 * @returns {Promise<number>}
	 */
	async createStudent(student) {
		const result = await client.query(
			"INSERT INTO student (first_name, last_name, gender, year, house) VALUES ($1, $2, $3, $4, $5) RETURNING id",
			[student.firstName, student.lastName, student.gender, student.year, student.house],
		);
		return result.rows[0].id;
	},

	/**
	 * Updates a student by its ID. If no student with the given ID exists, returns `false`. Otherwise, updates the student and returns `true`.
	 *
	 * @param {number} id
	 * @param {StudentWithoutId} student
	 * @returns {Promise<boolean>}
	 */
	async updateStudentById(id, student) {
		const result = await client.query(
			"UPDATE student SET first_name = $2, last_name = $3, gender = $4, year = $5, house = $6 WHERE id = $1",
			[id, student.firstName, student.lastName, student.gender, student.year, student.house],
		);
		return result.rowCount > 0;
	},

	/**
	 * Deletes a student by its ID. If no student with the given ID exists, returns `false`. Otherwise, deletes the student and returns `true`.
	 *
	 * @param {number} id
	 * @returns {Promise<boolean>}
	 */
	async deleteStudentById(id) {
		const result = await client.query("DELETE FROM student WHERE id = $1", [id]);
		return result.rowCount > 0;
	},
};
