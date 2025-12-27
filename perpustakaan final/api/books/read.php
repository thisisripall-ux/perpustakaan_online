<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../config/database.php';
include_once '../../models/Book.php';
include_once '../../models/User.php';

$headers = getallheaders();
$token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : '';

if(empty($token)) {
    http_response_code(401);
    echo json_encode(array("success" => false, "message" => "Access denied. No token provided"));
    exit();
}

$database = new Database();
$db = $database->getConnection();

$user = new User($db);
if(!$user->validateToken($token)) {
    http_response_code(401);
    echo json_encode(array("success" => false, "message" => "Invalid token"));
    exit();
}

$book = new Book($db);
$stmt = $book->read();
$num = $stmt->rowCount();

if($num > 0) {
    $books_arr = array();
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        array_push($books_arr, $row);
    }

    http_response_code(200);
    echo json_encode(array("success" => true, "data" => $books_arr));
} else {
    http_response_code(404);
    echo json_encode(array("success" => false, "message" => "No books found"));
}
?>