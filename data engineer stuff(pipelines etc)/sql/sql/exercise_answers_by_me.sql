--Subquery using WHERE
--1
SELECT first_name, last_name 
FROM customer
JOIN address on customer.address_id = address.address_id
JOIN city on address.city_id = city.city_id
WHERE city.city = 'York';

--2
SELECT film.title
FROM category
JOIN film_category ON category.category_id = film_category.category_id
JOIN film ON film_category.film_id = film.film_id
WHERE category.name = 'Comedy'
;

-- cross join
--3
SELECT * 
FROM payment
CROSS JOIN rental;


--5
SELECT film.title, actor.first_name 
FROM film
CROSS JOIN actor;


-- inner join
--6
SELECT customer.first_name, customer.last_name, address.address, address.district
FROM address
INNER JOIN customer on address.address_id = customer.address_id;

--7
SELECT film.title, category.name
FROM category
INNER JOIN film_category ON category.category_id = film_category.category_id
INNER JOIN film ON film_category.film_id = film.film_id;

--8
--not sure if works right
SELECT film.title, actor.first_name, actor.last_name
FROM actor
INNER JOIN film_actor ON actor.actor_id = film_actor.actor_id
INNER JOIN film ON film_actor.film_id = film.film_id
;

--9

SELECT DISTINCT actor.first_name, actor.last_name, category.name
FROM actor
INNER JOIN film_actor ON actor.actor_id = film_actor.actor_id
INNER JOIN film ON film_actor.film_id = film.film_id
INNER JOIN film_category ON film.film_id = film_category.film_id
INNER JOIN category On film_category.category_id = category.category_id;


--Left/Right join
--10

SELECT city.city, address.address
FROM address
LEFT JOIN city ON address.city_id = city.city_id
;

--11
SELECT city.city, address.address
FROM address
RIGHT JOIN city ON address.city_id = city.city_id
ORDER BY desc
; --london


--12

SELECT inventory.inventory_id, film.film_id, film.title
FROM film
RIGHT JOIN inventory ON film.film_id = inventory.film_id;

--13

SELECT inventory.inventory_id, film.film_id, film.title
FROM inventory
RIGHT JOIN film ON inventory.film_id = film.film_id
order by inventory.inventory_id desc;
-- 42 movies


--FULL JOINS

--14

SELECT *
FROM inventory
FULL JOIN film ON inventory.film_id = film.film_id;

--15
-- It takes all the rows from film table. 

--16

SELECT rental.rental_date, customer.customer_id
FROM rental
FULL JOIN customer ON rental.customer_id = customer.customer_id
ORDER BY rental.rental_date asc
LIMIT 1;

--18

SELECT film.title, category.name
FROM category
FULL JOIN film_category ON category.category_id = film_category.category_id
FULL JOIN film ON film_category.film_id = film.film_id
WHERE LENGTH(category.name) > 8;


--Exercise 8
---task 3 -WHERE

--1
SELECT first_name, last_name
from actor
WHERE first_name = 'Christian';

---2
SELECT *
FROM payment
WHERE amount > 8;

--3
SELECT *
FROM payment
WHERE amount BETWEEN 5 AND 6;

--4
SELECT * 
FROM payment
WHERE amount < 1 OR amount > 10;

--5

SELECT *
FROM actor
JOIN film_actor ON actor.actor_id = film_actor.actor_id
JOIN film ON film_actor.film_id = film.film_id
WHERE film.replacement_cost > 25;

--6
SELECT *
FROM payment
ORDER BY amount
LIMIT 10;

--7 
SELECT customer.*, payment.amount
FROM payment
JOIN customer ON payment.customer_id = customer.customer_id
WHERE EXISTS(
    SELECT 1
    FROM payment
    WHERE payment.customer_id = customer.customer_id
    AND payment.amount = 0
)
;

--8

SELECT *
FROM customer
WHERE customer_id IN (
    SELECT DISTINCT customer_id
    FROM payment
    WHERE amount = 0
)
;

--9

select *
from customer c
where EXISTS (
    SELECT 1
    FROM payment p
    WHERE p.customer_id = c.customer_id
    AND p.amount = ANY (
        SELECT DISTINCT amount
        FROM payment p1
        WHERE p1.customer_id != p.customer_id
    )
);


-- 10

SELECT * FROM film
WHERE film_id IN (
    SELECT film_id
    FROM inventory
    INNER JOIN rental USING(inventory_id)
    WHERE rental_date BETWEEN '2005-05-27' AND '2005-05-29'
)
ORDER BY title;

--11
SELECT title FROM film
WHERE film_id IN (
    SELECT film_id
    FROM inventory
    INNER JOIN rental USING(inventory_id)
    WHERE rental_date BETWEEN '2005-05-27' AND '2005-05-29'
)
ORDER BY title;

--12

SELECT staff_id, AVG(amount) FROM payment
WHERE staff_id IN (
    SELECT staff_id
    FROM rental
)
GROUP BY staff_id;

--13
SELECT amount FROM payment
WHERE amount > (
    select AVG(amount)
    FROM payment
)
;

--14

SELECT first_name, last_name FROM actor
WHERE first_name LIKE 'E%'; 


--15
SELECT first_name, last_name FROM actor
WHERE first_name LIKE '%E%'; 


--16
SELECT film.title, actor.last_name, actor.first_name 
FROM actor
INNER JOIN film_actor fa ON actor.actor_id = fa.actor_id
INNER JOIN film ON fa.film_id = film.film_id
WHERE film.description LIKE '%cro%' OR film.title LIKE '%cro%';

--17

SELECT * FROM staff
WHERE picture IS NULL;


--18
 SELECT * FROM rental
 WHERE return_date IS NULL;

--19
SELECT * FROM customer
WHERE last_name = 'Kim' OR first_name = 'Kim';

--20
SELECT film.* from film
INNER JOIN film_category fc ON film.film_id = fc.film_id
INNER JOIN category ON fc.category_id = category.category_id
WHERE category.name = 'Action' OR category.name = 'Drama';

--TASK 4

--1
SELECT count(*), rental_rate, rating FROM film
GROUP BY rental_rate, rating;

--2
SELECT count(*), rental_rate, rating FROM film
GROUP BY
    GROUPING SETS (
        (rental_rate, rating),
        (rental_rate)
    );
--Exercise 10
--task 1
--1

SELECT SUM(amount) AS total_amount, customer.last_name, customer.customer_id FROM payment
JOIN customer ON customer.customer_id = payment.customer_id
GROUP BY customer.last_name, customer.customer_id
HAVING SUM(amount) > 180
UNION
SELECT SUM(amount) AS total_amount, customer.last_name, customer.customer_id FROM payment
JOIN customer ON customer.customer_id = payment.customer_id
GROUP BY customer.last_name, customer.customer_id
HAVING SUM(amount) < 30;
;


--2
SELECT SUM(amount) AS total_amount, customer.last_name, customer.customer_id FROM payment
JOIN customer ON customer.customer_id = payment.customer_id
GROUP BY customer.last_name, customer.customer_id
HAVING SUM(amount) > 180
INTERSECT
SELECT SUM(amount) AS total_amount, customer.last_name, customer.customer_id FROM payment
JOIN customer ON customer.customer_id = payment.customer_id
GROUP BY customer.last_name, customer.customer_id
HAVING SUM(amount) < 190;
;



--3

SELECT SUM(amount) AS total_amount, customer.last_name, customer.customer_id FROM payment
JOIN customer ON customer.customer_id = payment.customer_id
GROUP BY customer.last_name, customer.customer_id
HAVING SUM(amount) > 180
EXCEPT
SELECT SUM(amount) AS total_amount, customer.last_name, customer.customer_id FROM payment
JOIN customer ON customer.customer_id = payment.customer_id
GROUP BY customer.last_name, customer.customer_id
HAVING SUM(amount) < 190;



--TASK2
--1
SELECT * FROM rental
WHERE return_date IS NOT NULL
ORDER BY return_date desc;

--2
SELECT * FROM rental
WHERE return_date IS NOT NULL
ORDER BY return_date asc
LIMIT 1;

--3
SELECT * FROM rental
WHERE return_date IS NOT NULL
ORDER BY return_date asc
OFFSET 1
LIMIT 3;


--TASK3 
--1
WITH big_doggo AS (
    SELECT
    c.first_name,
    c.last_name,
    SUM(p.amount)
    FROM
    customer c
    INNER JOIN payment p USING(customer_id)
    GROUP BY c.first_name, c.last_name
    HAVING SUM(amount) > 120
)
SELECT * FROM big_doggo;
--2

CREATE TABLE deleted_payments(
    payment_id INT PRIMARY KEY
)


--3 

WITH move_payments AS (
    DELETE FROM payment
    WHERE payment_date <= '2007-2-14'
    RETURNING payment_id
)
INSERT INTO deleted_payments
SELECT * FROM move_payments;


/*

*/




SELECT c.first_name, c.last_name, SUM(p.amount) FROM customer c
JOIN payment p USING (customer_id)
GROUP BY c.first_name, c.last_name
HAVING SUM(p.amount) > 180;


CREATE ROLE teamleader

GRANT SUPERUSER TO teamleader;

REVOKE teamleader FROM supermen;

GRANT SELECT
ON person
TO sara;