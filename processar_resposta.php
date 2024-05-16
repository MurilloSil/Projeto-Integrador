<?php
$servername = "mae-solidaria.cb8wo6yuydmd.us-east-2.rds.amazonaws.com"; // endereço do servidor MySQL
$username = "admin"; // nome de usuário do MySQL
$password = "univesp123"; // senha do MySQL
$dbname = "mae_solo"; // nome do banco de dados
$port = 3306; // porta do MySQL

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Verificar conexão
if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " . $conn->connect_error);
} else {
    echo "Conexão bem-sucedida!";
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST["usuario"];
    $resposta = $_POST["resposta"];

    // Usar prepared statements para prevenir SQL injection
    $stmt = $conn->prepare("INSERT INTO respostas_forum (usuario, resposta) VALUES (?, ?)");
    $stmt->bind_param("ss", $usuario, $resposta);

    if ($stmt->execute() === TRUE) {
        echo "Resposta enviada com sucesso!";
    } else {
        echo "Erro ao enviar resposta: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>

