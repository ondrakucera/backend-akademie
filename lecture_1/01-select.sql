-- Active: 1780337323706@@127.0.0.1@5432@reactgirls_backend_akademie

-- Zde se budeme ucit prikazy pro cteni zaznamu

-- Nejprve je potreba zaznamy do DB naimportovat
-- Stahnete si tento soubor: https://drive.google.com/file/d/1tKPJsT9mbK6twGM_1bBc1oBZIOWn2X5a/view?usp=drive_link

-- Tento prikaz nam vypise vsechny zaznamy a vsechny sloupecky tabulky
SELECT * FROM accounts;

-- Sloupecky muzeme misto * explicitne definovat
SELECT account_number, bank_id FROM accounts;

-- Pomoci podminky WHERE muzeme vyfiltrovat urcite zaznamy
SELECT * FROM accounts WHERE currency = 'CZK';

-- Chceme vypsat ucty, ktere maji stav konta vyssi nez 1000
SELECT * FROM accounts WHERE balance > 1000;

-- Chci vypsat ucty, ktere jsou EUR a maji blanace mensi nez 1000
SELECT * FROM accounts WHERE balance < 1000 AND currency = 'EUR';

-- Chci vypsat ucty, ktere jsou EUR a USD a zaroven je blanace mensi nez 1000
-- AND ma vyssi prioritu nez OR, da se vsak poradi operatoru vynutit () zavorkama
SELECT * FROM accounts WHERE (currency = 'USD' OR currency = 'EUR') AND balance < 1000;

-- Abychom nemuseli opakovane psat sloupecek currency, tak pouzijeme operator IN
SELECT * FROM accounts WHERE currency IN ('CZK', 'USD');

-- Chceme vypsat vsechny ucty, ktere nejsou USD a CZK
SELECT * FROM accounts WHERE currency NOT IN ('CZK', 'USD');

-- Toto by vypsalo uzivatele, kteri nemaji email
SELECT * FROM clients WHERE email IS NULL;

-- Vyhledani zaznamu podle casti hodnoty
SELECT * FROM clients WHERE name LIKE 'Ja%';