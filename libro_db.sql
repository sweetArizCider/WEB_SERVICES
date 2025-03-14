create database Libros;

CREATE TABLE User (id INT , username VARCHAR(24) PRIMARY KEY NOT NULL, password VARCHAR(16) NOT NULL, name TINYTEXT NOT NULL, lastName TINYTEXT, secondLastName TINYTEXT, email varchar(128) NOT NULL, enabled BOOLEAN, token VARCHAR(512), FOREIGN KEY(token) REFERENCES Token(token));

CREATE TABLE Autor (id INT , license VARCHAR(12) PRIMARY KEY NOT NULL, name TINYTEXT NOT NULL, lastName TINYTEXT, secondLastName TINYTEXT, year SMALLINT);

CREATE TABLE Libro (id INT , ISBN VARCHAR(16) PRIMARY KEY NOT NULL, title VARCHAR(512) NOT NULL, autor_license VARCHAR(12), FOREIGN KEY (autor_license) REFERENCES Autor(license), editorial TINYTEXT, pages SMALLINT, year SMALLINT NOT NULL, genre TINYTEXT, language TINYTEXT NOT NULL, format TINYTEXT, sinopsis TEXT, content text);

CREATE TABLE Token (id INT, token VARCHAR(512) PRIMARY KEY NOT NULL, used BOOLEAN, expiration DATE);

CREATE TABLE Examen (id INT primary key auto_increment, Nombre VARCHAR(16) not null, test VARCHAR(512) NOT NULL, user VARCHAR(12), message TINYTEXT, year SMALLINT NOT NULL);

DROP TABLE IF EXISTS `token`;

CREATE TABLE `token` (
                         `id` int NOT NULL AUTO_INCREMENT,
                         `token` varchar(512) NOT NULL,
                         `used` tinyint(1) DEFAULT NULL,
                         `expiration` date DEFAULT NULL,
                         PRIMARY KEY (`id`)
);

create table datos(
    id int auto_increment primary key,
    x int not null ,
    y int not null ,
    z varchar(50) not null
);
CREATE TABLE Examen2(id int auto_increment primary key , latitud real, longitud real, altitud real, nombre text, direccion varchar(128));


select * from libro;
