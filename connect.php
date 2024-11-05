<?php
$servername = "db-world.cqo2ocg3ibxq.us-east-1.rds.amazonaws.com";
$username = "admin";
$password = "Admin12345#!";
$database = "world";

try {
    // Cambiamos la variable a $pdo para mantener consistencia
    $pdo = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
    // Establecemos el modo de errores de PDO como excepción
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //echo "Connected successfully";
} catch (PDOException $e) {
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
    exit; // Salimos para evitar ejecutar más código si falla la conexión
}
?>

