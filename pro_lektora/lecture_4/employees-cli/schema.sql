-- Department table
CREATE TABLE department (
	id SERIAL PRIMARY KEY,
	name VARCHAR(256) NOT NULL
);

-- Employee table
CREATE TABLE employee (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(256) NOT NULL,
	last_name VARCHAR(256) NOT NULL,
	age INTEGER NOT NULL,
	department_id INTEGER NOT NULL,
	FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Insert sample data into department table
INSERT INTO department (name) VALUES ('Vývoj');
INSERT INTO department (name) VALUES ('Obchod');
INSERT INTO department (name) VALUES ('Marketing');

-- Insert sample data into employee table
INSERT INTO employee (first_name, last_name, age, department_id)
VALUES ('Patrik', 'Moravec', 56, (SELECT id FROM department WHERE name = 'Obchod'));
INSERT INTO employee (first_name, last_name, age, department_id)
VALUES ('David', 'Sedláček', 29, (SELECT id FROM department WHERE name = 'Obchod'));
INSERT INTO employee (first_name, last_name, age, department_id)
VALUES ('Johana', 'Beranová', 52, (SELECT id FROM department WHERE name = 'Vývoj'));
