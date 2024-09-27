-- BEGIN TRANSACTION;

-- PRAGMA foreign_keys = ON;

-- DROP TABLE IF EXISTS tag;
-- DROP TABLE IF EXISTS category;

-- CREATE TABLE IF NOT EXISTS category (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     name TEXT NOT NULL
-- );

-- CREATE TABLE IF NOT EXISTS ads (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     title VARCHAR(100) NOT NULL,
--     description TEXT,
--     owner VARCHAR(100) NOT NULL,
--     price INT,
--     picture VARCHAR(100),
--     location VARCHAR(100),
--     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     category_id INTEGER NOT NULL,
--     FOREIGN KEY (category_id) REFERENCES category(id)
-- );

-- Insert categories
-- Insertion de tags
-- INSERT INTO tag (title) VALUES ('Promotion');
-- INSERT INTO tag (title) VALUES ('Livraison Possible');
-- INSERT INTO tag (title) VALUES ('Urgent');

-- Insertion d'annonces (Ad)
-- INSERT INTO ad (title, description, price) VALUES ('Maison à vendre', 'Belle maison avec jardin', 250000);
-- INSERT INTO ad (title, description, price) VALUES ('Voiture


-- -- Insert ads with category_id
-- INSERT INTO ads (title, description, owner, price, picture, location, category_id) VALUES 
--     ("Blouson", "ceci est un blouson", "robert@dupont.fr", 35, "https://www.camoufletoi.fr/18918-thickbox_default/blouson-de-pilote-en-cuir-noir-et-col-fourrure-modele-classique-.jpg", "Paris", 1),  -- vêtement
--     ("Chaussures de randonnée", "Chaussures résistantes pour terrains difficiles.", "alice@lamy.fr", 50, "https://www.example.com/chaussures1.jpg", "Lyon", 1),  -- vêtement
--     ("Montre connectée", "Montre avec suivi de santé et notifications.", "marc@martin.fr", 80, "https://www.example.com/montre1.jpg", "Bordeaux", 3),  -- autre
--     ("Sac à dos", "Sac à dos en cuir pour ordinateur portable.", "jean@bernard.fr", 60, "https://www.example.com/sacados1.jpg", "Paris", 3),  -- autre
--     ("Vélo de course", "Vélo léger avec cadre en carbone.", "pierre@durand.fr", 300, "https://www.example.com/velo1.jpg", "Lyon", 2),  -- voiture (closely related to vehicles)
--     ("Tablette numérique", "Tablette avec écran tactile 10 pouces.", "lucie@dupuis.fr", 200, "https://www.example.com/tablette1.jpg", "Bordeaux", 3),  -- autre
--     ("Guitare acoustique", "Guitare en bois avec étui inclus.", "sophie@pierre.fr", 120, "https://www.example.com/guitare1.jpg", "Paris", 3),  -- autre
--     ("Blouson en cuir", "Blouson en cuir marron de haute qualité.", "paul@thomas.fr", 150, "https://www.example.com/blouson2.jpg", "Lyon", 1),  -- vêtement
--     ("Lunettes de soleil", "Lunettes de soleil polarisées.", "isabelle@michel.fr", 40, "https://www.example.com/lunettes1.jpg", "Bordeaux", 1),  -- vêtement
--     ("Bureau en bois", "Bureau spacieux avec tiroirs.", "yann@dupont.fr", 250, "https://www.example.com/bureau1.jpg", "Paris", 3),  -- autre
--     ("Imprimante 3D", "Imprimante 3D pour usage domestique.", "carla@gauthier.fr", 500, "https://www.example.com/imprimante1.jpg", "Bordeaux", 3),  -- autre
--     ("Chaise de bureau", "Chaise ergonomique pour bureau.", "vincent@robert.fr", 100, "https://www.example.com/chaise1.jpg", "Lyon", 3),  -- autre
--     ("Tondeuse à gazon", "Tondeuse à gazon électrique.", "julien@ferrand.fr", 150, "https://www.example.com/tondeuse1.jpg", "Paris", 3),  -- autre
--     ("Coffre-fort", "Coffre-fort à combinaison.", "thomas@dupuis.fr", 300, "https://www.example.com/coffre1.jpg", "Lyon", 3),  -- autre
--     ("Machine à café", "Machine à café expresso.", "laura@marc.fr", 80, "https://www.example.com/cafe1.jpg", "Bordeaux", 3),  -- autre
--     ("Aspirateur robot", "Aspirateur robot intelligent.", "nadine@levy.fr", 200, "https://www.example.com/aspirateur1.jpg", "Paris", 3),  -- autre
--     ("Appareil photo", "Appareil photo reflex numérique.", "paul@lucas.fr", 600, "https://www.example.com/photo1.jpg", "Lyon", 3),  -- autre
--     ("Piano numérique", "Piano numérique avec pédale.", "sarah@dupont.fr", 500, "https://www.example.com/piano1.jpg", "Bordeaux", 3);  -- autre

-- COMMIT;

-- SELECT * FROM ads INNER JOIN category ON ad.category_id = category.id;






-- INSERT INTO ad (title, description, owner, price, picture, location, categoryId, createdAt) VALUES 
--     ("Blouson", "ceci est un blouson", "robert@dupont.fr", 35, "https://www.camoufletoi.fr/18918-thickbox_default/blouson-de-pilote-en-cuir-noir-et-col-fourrure-modele-classique-.jpg", "Paris", 1, datetime('now')),  -- vêtement
--     ("Chaussures de randonnée", "Chaussures résistantes pour terrains difficiles.", "alice@lamy.fr", 50, "https://www.example.com/chaussures1.jpg", "Lyon", 1, datetime('now')),  -- vêtement
--     ("Montre connectée", "Montre avec suivi de santé et notifications.", "marc@martin.fr", 80, "https://www.example.com/montre1.jpg", "Bordeaux", 6, datetime('now')),  -- autres
--     ("Sac à dos", "Sac à dos en cuir pour ordinateur portable.", "jean@bernard.fr", 60, "https://www.example.com/sacados1.jpg", "Paris", 6, datetime('now')),  -- autres
--     ("Vélo de course", "Vélo léger avec cadre en carbone.", "pierre@durand.fr", 300, "https://www.example.com/velo1.jpg", "Lyon", 2, datetime('now')),  -- voiture
--     ("Tablette numérique", "Tablette avec écran tactile 10 pouces.", "lucie@dupuis.fr", 200, "https://www.example.com/tablette1.jpg", "Bordeaux", 6, datetime('now')),  -- autres
--     ("Guitare acoustique", "Guitare en bois avec étui inclus.", "sophie@pierre.fr", 120, "https://www.example.com/guitare1.jpg", "Paris", 6, datetime('now')),  -- autres
--     ("Blouson en cuir", "Blouson en cuir marron de haute qualité.", "paul@thomas.fr", 150, "https://www.example.com/blouson2.jpg", "Lyon", 1, datetime('now')),  -- vêtement
--     ("Lunettes de soleil", "Lunettes de soleil polarisées.", "isabelle@michel.fr", 40, "https://www.example.com/lunettes1.jpg", "Bordeaux", 1, datetime('now')),  -- vêtement
--     ("Bureau en bois", "Bureau spacieux avec tiroirs.", "yann@dupont.fr", 250, "https://www.example.com/bureau1.jpg", "Paris", 6, datetime('now')),  -- autres
--     ("Imprimante 3D", "Imprimante 3D pour usage domestique.", "carla@gauthier.fr", 500, "https://www.example.com/imprimante1.jpg", "Bordeaux", 6, datetime('now')),  -- autres
--     ("Chaise de bureau", "Chaise ergonomique pour bureau.", "vincent@robert.fr", 100, "https://www.example.com/chaise1.jpg", "Lyon", 6, datetime('now')),  -- autres
--     ("Tondeuse à gazon", "Tondeuse à gazon électrique.", "julien@ferrand.fr", 150, "https://www.example.com/tondeuse1.jpg", "Paris", 6, datetime('now')),  -- autres
--     ("Coffre-fort", "Coffre-fort à combinaison.", "thomas@dupuis.fr", 300, "https://www.example.com/coffre1.jpg", "Lyon", 6, datetime('now')),  -- autres
--     ("Machine à café", "Machine à café expresso.", "laura@marc.fr", 80, "https://www.example.com/cafe1.jpg", "Bordeaux", 6, datetime('now')),  -- autres
--     ("Aspirateur robot", "Aspirateur robot intelligent.", "nadine@levy.fr", 200, "https://www.example.com/aspirateur1.jpg", "Paris", 6, datetime('now')),  -- autres
--     ("Appareil photo", "Appareil photo reflex numérique.", "paul@lucas.fr", 600, "https://www.example.com/photo1.jpg", "Lyon", 6, datetime('now')),  -- autres
--     ("Piano numérique", "Piano numérique avec pédale.", "sarah@dupuis.fr", 500, "https://www.example.com/piano1.jpg", "Bordeaux", 6, datetime('now'));  -- autres



-- ALTER TABLE tag AUTO_INCREMENT = 1;

-- DELETE FROM tag;


-- UPDATE ads SET categoryId = 6 WHERE categoryId IS NULL;


