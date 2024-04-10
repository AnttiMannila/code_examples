DROP TABLE IF EXISTS media_type, book_media_type, loan, address, member, item, book, author;
 
CREATE TABLE IF NOT EXISTS author (
	id SERIAL PRIMARY KEY,
	f_name VARCHAR(50),
	l_name VARCHAR(50) NOT NULL
);
 
CREATE TABLE IF NOT EXISTS book (
	id SERIAL PRIMARY KEY,
	title VARCHAR(50),
	isbn_no NUMERIC(13) NOT NULL
		CONSTRAINT positive CHECK (isbn_no > 0),
	author_id int,
		FOREIGN KEY (author_id) REFERENCES author(id)
);
 
CREATE TABLE IF NOT EXISTS item (
	id SERIAL PRIMARY KEY,
	book_id INT,
	copy_no SMALLINT,
	FOREIGN KEY (book_id) REFERENCES book(id)
);

CREATE TABLE IF NOT EXISTS address (
	address_id SERIAL PRIMARY KEY,
	member_id INT,
	address VARCHAR(50) NOT NULL,
	areacode SMALLINT NOT NULL,
	city VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS member (
	id SERIAL PRIMARY KEY,
	f_name VARCHAR(50),
	l_name VARCHAR(50) NOT NULL,
	address_id integer,
	add_id INT REFERENCES address(address_id)
	--PRIMARY KEY(id),
	--FOREIGN KEY (address_id) REFERENCES address(address_id)	
);
 
CREATE TABLE IF NOT EXISTS loan (
	member_id INT,
	item_id INT,
	due_date DATE NOT NULL,
	FOREIGN KEY (member_id) REFERENCES member(id),
	FOREIGN KEY (item_id) REFERENCES item(id)
);
 
CREATE TABLE IF NOT EXISTS media_type (
	id SERIAL PRIMARY KEY,
	media VARCHAR(50) NOT NULL
);
 
CREATE TABLE IF NOT EXISTS book_media_type (
	book_id INT,
	media_id INT,
	FOREIGN KEY (book_id) REFERENCES book(id),
	FOREIGN KEY (media_id) REFERENCES media_type(id),
	PRIMARY KEY (book_id, media_id)
); 
 
INSERT INTO media_type (media) VALUES ('Audiobook'), ('Ebook'), ('CD'), ('DVD');
 
SELECT * FROM author;
 
SELECT * FROM book;
 
SELECT * FROM item;
 
SELECT * FROM member;
 
SELECT * FROM address;
 
SELECT * FROM loan;
 
SELECT * FROM book_media_type;
 
SELECT * FROM media_type;
 
SELECT b.title, m.media from book b
JOIN book_media_type mt ON mt.book_id = b.id
JOIN media_type m ON mt.media_id = m.id;