select movie_name from movies
where movie_length >= 90
and movie_lang = 'English';

select first_name, last_name from actors
where first_name not in('Bruce', 'John', 'Malin');

select first_name, last_name from actors
where first_name in('Bruce', 'John', 'Malin');

select * from actors
where first_name like 'P%';

select * from actors
where first_name like 'Pe_';

select * from actors
where first_name like '%r';

select * from actors
where first_name not like '%r%';

select movie_name, release_date from movies
where release_date between '1995-01-01' and '2000-01-01';

select movie_name from movies
where movie_length between 90 and 120;

select movie_name, movie_lang from movies
where movie_lang between 'J' and 'Q'
order by movie_name;

select movie_name, movie_lang from movies
where movie_lang in ('English', 'Spanish', 'Korean')
order by movie_lang;

select first_name, last_name from actors
where last_name like 'M%'
and date_of_birth between '1940-01-01' and '1969-12-31';

select first_name, last_name, date_of_birth from directors
where nationality in ('British', 'French', 'German')
and date_of_birth between '1950-01-01' and '1980-12-31'
order by date_of_birth desc;

select * from movie_revenues
order by domestic_takings
limit 3;

select * from movie_revenues
order by domestic_takings
limit 3 offset 3;

select * from movie_revenues
order by domestic_takings
limit 3;

select movie_id, movie_name from movies
fetch first 2 row only;

select movie_id, movie_name from movies
offset 8 row
fetch first 2 row only;

select distinct movie_lang from movies
order by movie_lang;

select * from directors
where nationality = 'American'
order by date_of_birth;

select distinct nationality from directors;

select first_name, last_name, date_of_birth from actors
where gender = 'F'
order by date_of_birth desc
fetch first 10 row only;

select * from actors
where date_of_birth is not null;

select last_name as Sukunimi, first_name as Etunimi from actors
where last_name like 'A%'
order by sukunimi;

select 'concat' || ' ' || 'together' as new_string;

select concat (first_name, last_name) as full_name from directors;

select concat_ws (' ', last_name, first_name) as full_name from actors;

select * from movie_revenues
where international_takings is not null
order by international_takings desc
limit 3;

select concat_ws (' ', first_name, last_name) as full_name from directors;

select * from actors
where first_name is null or date_of_birth is null;

select name, city, country from customer cu
join paper_subscription ps on cu.id = ps.customer_id
where status = 'Inactive';


select customer.name, count(distinct article.id) as unique_reads from article_reads ar
join customer on ar.customer_id = customer.id
join article on article.id = ar.article_id 
group by customer.name
order by unique_reads desc
limit 15;


select first_name, last_name, pet.name as "pet name" from person
join pet on person_id = pet.id;


CREATE DATABASE qeography;

DROP TABLE IF EXISTS nations;

CREATE TABLE nations(
    nation VARCHAR(50),
    continent VARCHAR(30),
    capital VARCHAR(50),
    area NUMERIC,
    number_of_citizens BIGINT
);

INSERT INTO nations(nation, continent, capital, area, number_of_citizens) VALUES
('Sweden', 'Europe', 'Stockholm', 447425.16, 10343403),
('Vatikan City', 'Europe', 'Vatikan City', 0.44, 801),
('Burkina Faso', 'Africa', 'Ouagadougou', 274200, 20244080)
;

ALTER TABLE nations
ADD COLUMN nation_id SERIAL PRIMARY KEY;

ALTER TABLE nations
RENAME TO nation;

ALTER TABLE nation
ALTER COLUMN capital NOT NULL;

ALTER TABLE nation
ALTER COLUMN nation SET DEFAULT 'Sweden',
ALTER COLUMN continent SET DEFAULT 'Europe';

ALTER TABLE nation
ADD CONSTRAINT number_of_citizens CHECK (number_of_citizens >= 0);


CREATE DATABASE ContactsDB1;

CREATE TABLE persons(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(50)NOT NULL,
    birth_year INT ,
    email VARCHAR(50)
);

CREATE TABLE contact(
    id SERIAL PRIMARY KEY,
    contact VARCHAR(50)NOT NULL,
    person_id INT NOT NULL,
    FOREIGN KEY (person_id) REFERENCES persons(id)
);

INSERT INTO persons (first_name, last_name, birth_year, email) VALUES
('Allan', 'Svensson', 1968, 'allans@gmail.com'),
('Gun', 'Persson', 1947, 'gunsan60@gmail.com'),
('Amir', 'Sana', 1990, null),
('Klippoteket', 'Muhammed', null, 'boka@klippoteket.se')
;

INSERT INTO contact(contact, person_id) VALUES
('0709-663300', 2),
('0702-657822', 1),
('076-2658977', 3),
('013-335577', 4),
('+46705889963', 2)
;

SELECT 
persons.first_name, 
persons.last_name, 
contact.contact 
FROM persons
JOIN
contact on persons.id = contact.person_id;

ALTER TABLE book
ADD media_type TEXT NOT NULL;

CREATE TABLE media_types (
    media_type_id SERIAL PRIMARY KEY,
    media_type_name VARCHAR(20) NOT NULL
);

ALTER TABLE book
ADD COLUMN media_type_id INT REFERENCES media_types(media_type_id);

CREATE TABLE book_media_types (
    book_id INT REFERENCES book(id),
    media_type_id INT REFERENCES media_types(media_type_id),
    PRIMARY KEY (book_id, media_type_id) 
);

INSERT INTO media_types(media_type_name) VALUES
('Book'),
('Audiobook'),
('E-book'),
('CD');

/* 
example
INSERT INTO book_media_types(book_id, media_type_id) VALUES
(1,1),
(1,2),
(1,3);
*/

