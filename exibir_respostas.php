<?php
include 'conexao.php';

$sql = "SELECT * FROM respostas_forum";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<h2>Respostas Anteriores:</h2>";
    while ($row = $result->fetch_assoc()) {
        echo "<p><strong>Usuário:</strong> " . $row["usuario"] . "</p>";
        echo "<p><strong>Resposta:</strong> " . $row["resposta"] . "</p>";
        echo "<hr>";
    }
} else {
    echo "<p>Nenhuma resposta encontrada.</p>";
}

$conn->close();
?>
