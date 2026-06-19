-- Student table
CREATE TABLE student (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(256) NOT NULL,
	last_name VARCHAR(256) NOT NULL,
	gender VARCHAR(16) NOT NULL,
	year SMALLINT NOT NULL,
	house VARCHAR(16) NOT NULL
);

-- Insert sample data into student table
INSERT INTO student (first_name, last_name, gender, year, house)
VALUES ('Harry', 'Potter', 'male', 2, 'Gryffindor');
INSERT INTO student (first_name, last_name, gender, year, house)
VALUES ('Hermione', 'Granger', 'female', 2, 'Gryffindor');
INSERT INTO student (first_name, last_name, gender, year, house)
VALUES ('Ron', 'Weasley', 'male', 2, 'Gryffindor');
INSERT INTO student (first_name, last_name, gender, year, house)
VALUES ('Ginny', 'Weasley', 'female', 1, 'Gryffindor');
INSERT INTO student (first_name, last_name, gender, year, house)
VALUES ('Luna', 'Lovegood', 'female', 1, 'Ravenclaw');
INSERT INTO student (first_name, last_name, gender, year, house)
VALUES ('Draco', 'Malfoy', 'male', 2, 'Slytherin');
