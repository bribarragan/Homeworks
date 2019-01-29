USE sakila;

-- 1a
SELECT first_name, last_name
FROM actor;

-- 1b
SELECT concat(first_name, ' ', last_name) AS 'Actor Name'
FROM actor;

-- 2a
select actor_id, first_name, last_name
from actor
WHERE first_name='Joe';

-- 2b
select actor_id, first_name, last_name
from actor
WHERE last_name LIKE'%GEN%';

-- 2c
SELECT actor_id, first_name, last_name
FROM actor
WHERE last_name LIKE'%LI%'
ORDER BY last_name ASC, first_name ASC;
-- 2d
SELECT country_id, country
FROM COUNTRY
WHERE country IN ('Afghanistan', 'Bangladesh', 'China');

-- 3a
ALTER TABLE actor
ADD description BLOB AFTER last_update;
-- 3b
ALTER TABLE actor
DROP COLUMN description;

-- 4a
SELECT last_name, COUNT(*) AS Name_Count
FROM actor
GROUP BY last_name;

-- 4b
SELECT last_name, COUNT(*) AS Name_Count
FROM actor
GROUP BY last_name
HAVING Name_Count >= 2;

-- 4c
UPDATE actor
SET first_name='HARPO'
WHERE first_name='GROUCHO' AND last_name='WILLIAMS';
-- 4d
UPDATE actor
SET first_name='GROUCHO'
WHERE first_name='HARPO' AND last_name='WILLIAMS';

-- 5a
SHOW CREATE TABLE address;

-- 6a
SELECT first_name, last_name, address
FROM staff
LEFT JOIN address 
ON staff.address_id=address.address_id;

-- 6b
SELECT first_name, last_name, sum(amount) AS total_Aug_Sales
FROM staff
JOIN payment 
USING(staff_id)
WHERE payment_date LIKE '2005-08%'
GROUP BY staff.staff_id;
-- 6c
select * FROM film_ACTOR;
SELECT title, count(actor_id) AS actor_count
FROM film_actor
JOIN film
USING(film_id)
GROUP BY title; 
-- 6d
SELECT count(film_id) AS 'No. of Hunchback Impossible Copies'
FROM inventory
WHERE film_id=(
SELECT film_id
FROM FILM
WHERE title='Hunchback Impossible');

-- 6e
SELECT first_name, last_name, sum(amount) AS 'Total Amount Paid'
FROM payment
LEFT JOIN customer
USING (customer_id)
GROUP BY customer_id
ORDER BY last_name ASC;

-- 7a
SELECT title Title, language.name AS 'Language'
FROM film
LEFT JOIN language
ON film.language_id=language.language_id
WHERE name='English' 
AND (title LIKE 'K%' OR title LIKE 'Q%');

-- 7b
SELECT first_name, last_name
FROM actor
RIGHT JOIN film_actor
ON actor.actor_id=film_actor.actor_id
WHERE film_id=(
	SELECT film_id
	FROM film
	WHERE title = 'Alone Trip'
);

-- 7c
SELECT first_name, last_name, email
FROM customer
LEFT JOIN address 
USING(address_id)
LEFT JOIN city
USING(CITY_ID)
WHERE country_id = (
	SELECT country_id
	FROM country
    WHERE country='Canada');

-- 7d
SELECT title 'Family Films'
FROM film
LEFT JOIN film_category
USING(film_id)
WHERE category_id = (
	SELECT category_id
	FROM category
    WHERE name='Family'
);

-- 7e
SELECT title 'Movie Title', COUNT(*) AS 'No. of Rentals'
FROM payment
JOIN rental
USING(rental_id)
JOIN inventory
USING(inventory_id)
JOIN film
USING(film_id)
GROUP BY title
ORDER BY 2 DESC;

-- 7f 
SELECT  store.store_id 'Store No.', sum(amount) 'Store Revenue'
FROM payment
JOIN staff
USING(staff_id)
JOIN store
USING(store_id)
GROUP BY store_id;
-- 7g
SELECT store.store_id 'Store no.', city.city as City, country.country as Country
FROM store 
JOIN address
USING(address_id)
JOIN city
ON address.city_id=city.city_id
JOIN country
USING(country_id);

-- 7h
 
SELECT category.name 'Genre', sum(amount) 'Genre Revenue'
FROM payment
JOIN rental
USING(rental_id)
JOIN inventory
USING(inventory_id)
JOIN film_category
USING(film_id)
JOIN category
USING(category_id)
GROUP BY category.name
ORDER BY 2 DESC
LIMIT 5;

-- 8a
CREATE VIEW Top_5_Genres AS 
SELECT category.name 'Genre', sum(amount) 'Genre Revenue'
FROM payment
JOIN rental
USING(rental_id)
JOIN inventory
USING(inventory_id)
JOIN film_category
USING(film_id)
JOIN category
USING(category_id)
GROUP BY category.name
ORDER BY 2 DESC
LIMIT 5;

-- 8b
SELECT * from Top_5_Genres;

-- 8c 
DROP VIEW Top_5_Genres;