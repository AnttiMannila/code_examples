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


 --Group comparison (subquery)

--9
/*;
9. List all customers who have made at least one payment with amount 0. Using the
ANY operator
10. List all the movies that was rented between May 27th 05 and May 29th 05

11. Get the movie title of movies that was rented between May 27th 05 and May 29th
05.
12. List the average payment amount of each staff member.
13. List all payments where the payment amount is greater than the average amount
of each staff member

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