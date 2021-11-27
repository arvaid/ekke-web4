INSERT INTO `Authors`
VALUES (1, "Douglas Adams");

INSERT INTO `Authors`
VALUES (2, "Frank Herbert");

INSERT INTO `Books`
VALUES ("9780441172719", "Dune", 2);

INSERT INTO `Books`
VALUES ("9780345391803", "The Hitchhiker's Guide to The Galaxy", 1);

INSERT INTO `Readers`
VALUES (1, "Teszt Elek", "2021-11-12");

INSERT INTO `Readers`
VALUES (2, "Jó Áron", "2021-11-10");

INSERT INTO `Readers_Books`
VALUES ("9780441172719", 2, "2021-11-19 11:01:23", null);

INSERT INTO `Readers_Books`
VALUES ("9780441172719", 1, "2021-11-12 13:24:48", "2021-11-11 14:32:51");
