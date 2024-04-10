DROP TABLE IF EXISTS employees;

CREATE TABLE IF NOT EXISTS employees (
    emp_id SERIAL PRIMARY KEY,
    emp_name VARCHAR(40) NOT NULL,
    emp_salary INT NOT NULL CHECK (emp_salary >= 0),
    hire_date DATE NOT NULL,
    emp_address VARCHAR (60)
);

INSERT INTO employees (emp_name, emp_salary,hire_date, emp_address) VALUES
('Antti Mannila', 5000, '2023-01-20', 'Sateenkaari 1 Espoo'),
('Pekka Pekkanen', 4000, '2022-03-11', 'retiisikuja 2 Helsinki'),
('Jussi Isotalo', 3000, '2021-12-20', 'halikkotie 3 Vantaa');

INSERT INTO employees (emp_name, emp_salary,hire_date, emp_address) VALUES
('Ville Tapani', 500, '2023-01-20', 'Sateenkaari 3 Espoo');

INSERT INTO employees (emp_name, emp_salary, hire_date) VALUES
('Jaajo Linna', 2000, '2023-01-01'),
('Nelli Roine', 6000, '2023-02-02');

--check
INSERT INTO employees(emp_salary,hire_date) VALUES 
(2000, '2023-01-01');

--check
INSERT INTO employees(emp_name, emp_salary, hire_date) VALUES 
('Antti', -2000, '2023-01-01');

--check
INSERT INTO employees(emp_name, emp_salary) VALUES 
('Antti', 2000);

SELECT * FROM employees;

CREATE VIEW employees_list_all AS
SELECT emp_name, emp_salary, hire_date, emp_address
FROM employees;

SELECT * FROM employees_list_all;

SELECT * FROM employees
WHERE emp_address IS NULL;

SELECT * FROM employees
WHERE emp_salary > 1000;

SELECT * FROM employees
WHERE emp_address IS NOT NULL;

SELECT * FROM employees
WHERE emp_salary > 3000
ORDER BY hire_date desc;

SELECT EXTRACT(YEAR FROM hire_date) AS hire_year, COUNT(*) as hire_count
FROM employees
GROUP BY hire_year
order by hire_year;

SELECT * FROM employees
WHERE emp_salary > (SELECT AVG(emp_salary) FROM employees);

SELECT
EXTRACT(YEAR FROM hire_date) AS hire_year,
EXTRACT(MONTH FROM hire_date) AS hire_month,
SUM(emp_salary) AS total_salary
FROM employees
GROUP BY hire_year, hire_month
ORDER BY hire_year, hire_month
;

DELETE FROM employees
WHERE emp_address IS NULL;