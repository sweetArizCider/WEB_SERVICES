use libros;
CREATE TABLE autor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidoPaterno VARCHAR(100) NOT NULL,
    apellidoMaterno VARCHAR(100) NOT NULL
);

CREATE TABLE libro (

    ISBN CHAR(13) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autorID INT not null ,
    numPag INT not null ,
    editorial VARCHAR(100) not null ,
    FOREIGN KEY (autorID) REFERENCES autor(id)
);

CREATE TABLE `user` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(24)  NOT NULL,
    password VARCHAR(16) NOT NULL,
    name TINYTEXT NOT NULL,
    lastName TINYTEXT,
    secondLastName TINYTEXT,
    email varchar(128) NOT NULL,
    enabled BOOLEAN
);




show tables;
drop table autor


select * from autor;
select * from libro;