<?php
$servername = "localhost";
$username = "seu_usuario";
$password = "sua_senha";
$dbname = "mamae_solidaria_db";

// Criação da conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificação da conexão
if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
}
?>