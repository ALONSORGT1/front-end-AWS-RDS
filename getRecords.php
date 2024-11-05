<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

require 'connect.php';
$table = $_GET['table'] ?? null;
$continent = $_GET['continent'] ?? null;
$country = $_GET['country'] ?? null;

if (!$table) {
    echo json_encode(['error' => 'Table parameter is missing']);
    exit;
}

try {
    if ($continent) {
        // Consulta por continente en la tabla `country`
        $stmt = $pdo->prepare("SELECT * FROM country WHERE Continent = :continent");
        $stmt->bindParam(':continent', $continent);
    } elseif ($country) {
        // Consulta por país en la tabla `city` usando `CountryCode`
        $stmt = $pdo->prepare("SELECT * FROM city WHERE CountryCode = (SELECT Code FROM country WHERE Name = :country)");
        $stmt->bindParam(':country', $country);
    } else {
        echo json_encode(['error' => 'Continent or country parameter is missing']);
        exit;
    }

    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results);

} catch (PDOException $e) {
    echo json_encode(['error' => 'Query failed: ' . $e->getMessage()]);
}
