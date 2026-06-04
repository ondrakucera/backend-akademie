-- Tento prikaz nam zjisti v jake DB zrovna jsme
SELECT CURRENT_DATABASE();

-- Zacneme od tabulek, ktere maji nejmensi pocet FK
CREATE TABLE enclosures (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    area INTEGER,
    biome VARCHAR(20)
);

-- Zahozeni tabulky
DROP TABLE enclosures;

-- Nyni vytvorime tabulku keepers
CREATE TABLE keepers (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    salary NUMERIC(10, 3)
);

-- Nyni si vytvorime prvni tabulku s cizim klicem
CREATE TABLE animals (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    enclosure_id INT,
    name VARCHAR NOT NULL,
    is_healthy BOOLEAN DEFAULT TRUE,
    adoption_date DATE,
    note TEXT,
    FOREIGN KEY (enclosure_id) REFERENCES enclosures(id)
);

-- Nyni vytvorime spojovaci tabulku pro vazbu M:N
CREATE TABLE animals_keepers (
    animal_id INT NOT NULL,
    keeper_id INT NOT NULL,
    PRIMARY KEY (animal_id, keeper_id),
    FOREIGN KEY (animal_id) REFERENCES animals(id),
    FOREIGN KEY (keeper_id) REFERENCES keepers(id)
);

-- Prikaz pro zmenu struktury tabulky se jmenuje ALTER TABLE
-- Pridame sloupecek
-- Pridame tabulce keepers sloupecek role
ALTER TABLE keepers ADD COLUMN role VARCHAR(255) DEFAULT 'caretaker'; 
-- Prejmenujeme sloupecek
ALTER TABLE keepers RENAME COLUMN role TO position;
-- Pretypujeme sloupecek
ALTER TABLE keepers ALTER COLUMN position TYPE TEXT;
-- Smazeme sloupecek
ALTER TABLE keepers DROP COLUMN position;