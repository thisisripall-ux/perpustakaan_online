<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

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

// Check if user is admin
if(!$user->isAdmin()) {
    http_response_code(403);
    echo json_encode(array("success" => false, "message" => "Access denied. Admin only"));
    exit();
}

$book = new Book($db);
$data = json_decode(file_get_contents("php://input"));

if(!empty($data->title) && !empty($data->author)) {
    $book->title = $data->title;
    $book->author = $data->author;
    $book->category = $data->category;
    $book->year = $data->year;
    $book->status = $data->status;
    $book->description = $data->description;
    $book->isbn = $data->isbn;
    $book->stock = isset($data->stock) ? $data->stock : 1;

    if($book->create()) {
        http_response_code(201);
        echo json_encode(array("success" => true, "message" => "Book created successfully"));
    } else {
        http_response_code(503);
        echo json_encode(array("success" => false, "message" => "Unable to create book"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("success" => false, "message" => "Incomplete data"));
}
?>