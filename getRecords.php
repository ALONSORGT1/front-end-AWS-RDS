<?php
// getRecords.php
header('Content-Type: application/json');

// Incluye el archivo de conexión
require 'connect.php';

// Obtiene la tabla solicitada del parámetro GET
$table = isset($_GET['table']) ? $_GET['table'] : 'country';
$offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0; // Por defecto el offset es 0

// Validar si la tabla es una de las permitidas
$allowedTables = ['city', 'country', 'countrylanguage'];

if (!in_array($table, $allowedTables)) {
    echo json_encode(['error' => 'Tabla no permitida']);
    exit;
}

try {
    // Prepara la consulta SQL con un límite de 15 registros
    $stmt = $conn->query("SELECT * FROM $table LIMIT 15 OFFSET $offset");

    // Obtén todos los registros como un arreglo asociativo
    $records = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Devuelve los registros en formato JSON
    echo json_encode($records);

} catch (PDOException $e) {
    // En caso de error, devuelve un mensaje en JSON
    echo json_encode(['error' => $e->getMessage()]);
}
?>
