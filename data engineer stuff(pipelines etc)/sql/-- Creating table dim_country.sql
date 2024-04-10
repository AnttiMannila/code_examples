-- Creating table dim_country
CREATE TABLE "staging".dim_country
	(country_code TEXT,
	 short_name TEXT,
	 table_name TEXT,
	 currency_unit TEXT,
	 region TEXT,
	 income_group TEXT,
	 other_groups TEXT
	);
 
 
-- With this code you can import country_clean.csv file into table. You have to only change
-- the file path to the one where
-- you have country_clean.csv file on your computer
 
 
COPY "staging".dim_country
FROM 'C:\Code\Clean Data\country_clean.csv'
DELIMITER ','
CSV HEADER;
 
 
--Dropping and renaming columns according to schema
ALTER TABLE "staging".dim_country DROP COLUMN short_name;
ALTER TABLE "staging".dim_country DROP COLUMN other_groups;
ALTER TABLE "staging".dim_country RENAME COLUMN table_name TO country_name;
ALTER TABLE "staging".dim_country RENAME COLUMN region TO region_name;
 
-- Separating Country & Region dimensions
 
SELECT * INTO "staging".dim_region FROM "staging".dim_country
WHERE region IS NULL;
 
DELETE FROM "staging".dim_country
WHERE region IS NULL;
 
ALTER TABLE "staging".dim_region RENAME COLUMN country_id TO region_id;
ALTER TABLE "staging".dim_region RENAME COLUMN country_name TO region_name;
 
-- Adding serial primary key
ALTER TABLE "staging".dim_country ADD COLUMN country_id SERIAL PRIMARY KEY;
ALTER TABLE "staging".dim_region ADD COLUMN region_id SERIAL PRIMARY KEY;
 
 
--Copying table from staging into core
SELECT * INTO "core".dim_country FROM "staging".dim_country;
 
SELECT * INTO "core".dim_region FROM "staging".dim_region;
 
 
--Adding primary key to the table in core
ALTER TABLE "core".dim_country ADD PRIMARY KEY(country_id);
ALTER TABLE "core".dim_region ADD PRIMARY KEY(region_id);
 
 
-- DIM_INDICATOR
 
CREATE TABLE "staging".dim_indicator
	(indicator_code TEXT,
	 topic TEXT,
	 indicator_name TEXT,
	 short_definition TEXT,
	 long_definition TEXT,
	 periodicity TEXT
);
 
-- With this code you can import series_clean.csv file into table. You have to only change
-- the file path to the one where
-- you have series_clean.csv file on your computer
 
COPY "staging".dim_indicator
FROM 'C:\Code\Clean Data\series_clean.csv'
DELIMITER ';'
CSV HEADER;
 
 
--Creating indicator_id primary keys
ALTER TABLE "staging".dim_indicator ADD COLUMN indicator_id SERIAL PRIMARY KEY;
 
 
--Copying table from staging into core
SELECT * INTO "core".dim_indicator FROM "staging".dim_indicator;
 
--Adding primary key to the table in core
ALTER TABLE "core".dim_indicator ADD PRIMARY KEY(indicator_id);
 
 
-- DIM_WHR_ATTRIBUTE, FACT_WHR
 
 
-- Creating a table for importing WHR data
drop table if exists "staging".whr;
 
create table "staging".whr (
	country_name VARCHAR,
	year INT,
	attribute VARCHAR,
	value NUMERIC
);
 
	-- IMPORT 'WHR2023_clean.csv' into "staging".whr table
COPY "staging".whr
FROM 'C:\Code\Clean Data\WHR2023_clean.csv'
DELIMITER ','
CSV HEADER;
 
 
-- Creating fact table with an auto-generated log_id for each value input
create table "staging".whr_fact (
	log_id SERIAL PRIMARY KEY,
	country_name VARCHAR,
	year INT,
	attribute VARCHAR,
	value NUMERIC
);
 
-- Inserting data into fact table from whr table
INSERT INTO "staging".whr_fact (country_name, year, attribute, value)
SELECT country_name, year, attribute, value FROM "staging".whr;
 
 
-- Creating dimension table for WHR attribute
create table "staging".dim_whr_attribute (
	attribute_id SERIAL PRIMARY KEY,
	attribute VARCHAR
);
 
-- Inserting distinct attribute from fact table
INSERT INTO "staging".dim_whr_attribute (attribute)
SELECT DISTINCT attribute FROM "staging".whr_fact;
 
-- Adding attribute_id column into fact table
ALTER TABLE "staging".whr_fact
ADD COLUMN attribute_id INT REFERENCES "staging".dim_whr_attribute (attribute_id);
 
-- Updating whr_product_fact table with attribute_id values from dim_whr_attribute
UPDATE "staging".whr_fact wf
SET attribute_id = dwa.attribute_id FROM "staging".dim_whr_attribute dwa
WHERE wf.attribute = dwa.attribute;
 
-- Dropping attribute column
ALTER TABLE "staging".whr_fact
DROP COLUMN attribute;
 
 
	-- ADD DIM_COUNTRY TABLE INTO STAGING AT THIS POINT
 
 
-- Adding country_id column into "Staging".fact table
ALTER TABLE "staging".whr_fact
ADD COLUMN country_id INT REFERENCES "staging".dim_country (country_id);
 
-- Updating "Staging".whr_fact table with country_id values from "Staging".dim_country
UPDATE "staging".whr_fact wf
SET country_id = dc.country_id FROM "staging".dim_country dc
WHERE wf.country_name = dc.country_name;
 
-- Dropping country_name column
ALTER TABLE "staging".whr_fact
DROP COLUMN country_name;
 
 
	-- AFTER COUNTRY ID SET
 
 
-- Creating "core".dim_whr_attribute table
SELECT * INTO "core".dim_whr_attribute
FROM "staging".dim_whr_attribute;
 
ALTER TABLE "core".dim_whr_attribute ADD PRIMARY KEY(attribute_id);
 
 
-- Creating "core".fact_whr
SELECT * INTO "core".fact_whr
FROM "staging".whr_fact;
 
ALTER TABLE "core".fact_whr ADD PRIMARY KEY(log_id);
ALTER TABLE "core".fact_whr ADD FOREIGN KEY (country_id) REFERENCES "core".dim_country(country_id);
ALTER TABLE "core".fact_whr ADD FOREIGN KEY (attribute_id) REFERENCES "core".dim_whr_attibute(attribute_id)