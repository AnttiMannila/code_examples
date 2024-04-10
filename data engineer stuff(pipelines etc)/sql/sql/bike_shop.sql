DROP TABLE IF EXISTS bicycle_model;

CREATE TABLE IF NOT EXISTS bicycle_model
(
    id SERIAL PRIMARY KEY,
    brand VARCHAR(50),
    model VARCHAR(50),
    num_gears INT,
    price INT
);

INSERT INTO bicycle_model (brand, model, num_gears, price) VALUES
('Monark', 'Emma', 3, 6295),
('Monark', 'Sigvard', 3, 6295);

SELECT * FROM bicycle_model;