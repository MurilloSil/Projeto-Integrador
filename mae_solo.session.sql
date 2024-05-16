create database mae_solo;

USE mae_solo;

CREATE TABLE dicas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL,
    dica TEXT NOT NULL,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);