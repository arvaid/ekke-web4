CREATE TABLE `Books` (
  `isbn` char(13) PRIMARY KEY NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` int NOT NULL
);

CREATE TABLE `Authors` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL
);

CREATE TABLE `Readers` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `registration_date` datetime NOT NULL
);

CREATE TABLE `Readers_Books` (
  `isbn` char(13),
  `reader_id` int,
  `borrowed_date` datetime NOT NULL,
  `returned_date` datetime,
  PRIMARY KEY (`isbn`, `reader_id`, `borrowed_date`)
);

ALTER TABLE `Books` ADD FOREIGN KEY (`author`) REFERENCES `Authors` (`id`);

ALTER TABLE `Readers_Books` ADD FOREIGN KEY (`isbn`) REFERENCES `Books` (`isbn`);

ALTER TABLE `Readers_Books` ADD FOREIGN KEY (`reader_id`) REFERENCES `Readers` (`id`);

