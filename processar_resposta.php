<?php
include 'conexao.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST["usuario"];
    $resposta = $_POST["resposta"];

    $sql = "INSERT INTO respostas_forum (usuario, resposta) VALUES ('$usuario', '$resposta')";

    if ($conn->query($sql) === TRUE) {
        echo "Resposta enviada com sucesso!";
    } else {
        echo "Erro ao enviar resposta: " . $conn->error;
    }
}
?>
