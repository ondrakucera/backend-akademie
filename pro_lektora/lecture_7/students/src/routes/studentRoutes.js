import express from "express";
import { studentRepository } from "../repositories/studentRepository.js";
import { studentBodySchema, studentIdParamSchema } from "../validation/studentSchemas.js";

export const studentRouter = express.Router();

// Obtains all students.
studentRouter.get("/students", async (request, response) => {
	const students = await studentRepository.listStudents();
	response.json(students);
});

// Obtains a student by its ID.
studentRouter.get("/students/:id", async (request, response) => {
	const { id } = studentIdParamSchema.parse(request.params);
	const student = await studentRepository.getStudentById(id);
	if (!student) {
		// If the student wasn't found, we set the HTTP response's status to 404.
		response.status(404).send();
		return;
	}
	response.json(student);
});

// Creates a new student.
studentRouter.post("/students", async (request, response) => {
	const student = studentBodySchema.parse(request.body);
	const id = await studentRepository.createStudent(student);
	response.status(201).json(id);
});

// Updates a student.
studentRouter.put("/students/:id", async (request, response) => {
	const { id } = studentIdParamSchema.parse(request.params);
	const student = studentBodySchema.parse(request.body);
	const updated = await studentRepository.updateStudentById(id, student);
	if (!updated) {
		// If the student to be updated wasn't found, we set the HTTP response's status to 404.
		response.status(404).send();
		return;
	}
	response.status(204).send();
});

// Deletes a student.
studentRouter.delete("/students/:id", async (request, response) => {
	const { id } = studentIdParamSchema.parse(request.params);
	const deleted = await studentRepository.deleteStudentById(id);
	if (!deleted) {
		// If the student to be deleted wasn't found, we set the HTTP response's status to 404.
		response.status(404).send();
		return;
	}
	response.status(204).send();
});
