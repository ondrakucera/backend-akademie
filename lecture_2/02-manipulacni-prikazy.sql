-- Pro vkladani noveho zaznamu se pouziva prikaz INSERT
INSERT INTO enclosures (biome, name, area) VALUES ('Arktida', 'Ledové království', 2500);

-- Overime
SELECT * FROM enclosures;

-- Jednim přikazem muzeme vlozit nekolik zaznamu
INSERT INTO enclosures (name, area, biome) VALUES ('Savanová pláň', 1700, 'Savana'), ('Kříštálová laguna', 900, 'Tropické vody'), ('Zelený divoký les', 750, 'Mírný les'), ('Noční dobrodružství', 1550, 'Džungle');

-- Overime
SELECT * FROM enclosures;

-- Zoo chce vsem vybehum pridat 100 metru navic
UPDATE enclosures SET area = area + 100;

-- Overime
SELECT * FROM enclosures;

-- Zoo chce vybehum, ktere maji area mensi nez 1500 pridat dalsich 50
UPDATE enclosures SET area = area + 50 WHERE area < 1500;

-- Overime
SELECT * FROM enclosures;

-- Zmeni biotyp Laguny na ocean a pridame dalsich 25 do area
UPDATE enclosures SET biome = 'Oceán', area = area + 25 WHERE id = 3;

-- Overime
SELECT * FROM enclosures;

-- Zoo chce nakonec Lagunu zbourat
DELETE FROM enclosures WHERE id = 3;

-- Overime
SELECT * FROM enclosures;


--Zkuste vlozit nejake zviratka do tabulky animals
-- V tomto formatu se vklada datum: '2026-10-25'
-- V tomto formatu se vklada boolean: TRUE/FALSE

-- NOW() pouzije actualni datum cas
INSERT INTO animals (enclosure_id, name, adoption_date) VALUES (1, 'Lední medvěd', NOW());

SELECT * FROM animals;
