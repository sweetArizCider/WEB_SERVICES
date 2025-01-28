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


show tables;
drop table autor


select * from autor;
select * from libro;