DROP TABLE IF EXISTS examinations, ongoing_course, students, teacher, registration_date, courses;


CREATE TABLE IF NOT EXISTS courses(
    course_id SERIAL PRIMARY KEY,
    course_code TEXT,
    name TEXT,
    description TEXT,
    creidits NUMERIC
);

CREATE TABLE IF NOT EXISTS registration_date(
    registration_date_id SERIAL PRIMARY KEY,
    registration_date DATE
);

CREATE TABLE IF NOT EXISTS students(
    students_id SERIAL PRIMARY KEY,
    name TEXT, 
    birthdate DATE,
    email TEXT,
    phone_number TEXT,
    loan BOOLEAN,
    membership BOOLEAN,
    registration_date_id INT NOT NULL REFERENCES registration_date(registration_date_id),
    first_course INT NOT NULL REFERENCES courses(course_id)
);

CREATE TABLE IF NOT EXISTS TEACHER(
    teacher_id SERIAL PRIMARY KEY,
    name TEXT,
    title TEXT,
    employee_since DATE
);

CREATE TABLE IF NOT EXISTS ongoing_course(
    ongoing_course_id SERIAL PRIMARY KEY,
    teacher_id INT REFERENCES teacher(teacher_id),
    students_id INT REFERENCES students(students_id),
    course_id INT REFERENCES courses(course_id),
    course_start DATE
);

/*
CREATE TABLE IF NOT EXISTS examinations(
    examination_id PRIMARY KEY(students_id, course_id),
    ongoing_course_id INT REFERENCES ongoing_course(ongoing_course_id),
    students_id INT REFERENCES students(students_id),
    teacher_id INT REFERENCES teacher(teacher_id),
    grade INT,
    grade_date DATE
);*/

CREATE TABLE IF NOT EXISTS examinations(
    ex_id SERIAL PRIMARY KEY,
    ongoing_course_id INT REFERENCES ongoing_course(ongoing_course_id),
    e

)