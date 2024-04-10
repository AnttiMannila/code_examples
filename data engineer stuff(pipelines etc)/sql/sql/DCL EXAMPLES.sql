SELECT rolname FROM pg_roles;

CREATE ROLE sara;

CREATE ROLE amber WITH
LOGIN
PASSWORD 'secpwd01';

CREATE DATABASE amberDB;

CREATE ROLE superman
SUPERUSER
LOGIN
PASSWORD 'supermies';

CREATE ROLE teamleader
LOGIN
PASSWORD 'teamleader';

CREATE ROLE development
LOGIN
PASSWORD 'devep'
CONNECTION LIMIT 500;


ALTER ROLE sara
CREATEDB
LOGIN
PASSWORD 'sara';

GRANT SELECT
ON person
TO sara;

GRANT superman TO teamleader;

REVOKE INSERT, UPDATE, DELETE ON TABLE person FROM teamleader;

INSERT INTO person VALUES(1,'pekka', 'PAKKANA');

REVOKE teamleader FROM superman;

SELECT * from nation;

