<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");

include_once '../../config/database.php';
include_once '../../models/Book.php';
include_once '../../models/User.php';

$headers = getallheaders();
$token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : '';

if(empty($token)) {
    http_response_code(401);
    echo json_encode(array("success" => false, "message" => "Access denied"));
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

if(!$user->isAdmin()) {
    http_response_code(403);
    echo json_encode(array("success" => false, "message" => "Access denied. Admin only"));
    exit();
}

$book = new Book($db);
$data = json_decode(file_get_contents("php://input"));

if(!empty($data->id) && !empty($data->title) && !empty($data->author)) {
    $book->id = $data->id;
    $book->title = $data->title;
    $book->author = $data->author;
    $book->category = $data->category;
    $book->year = $data->year;
    $book->status = $data->status;
    $book->description = $data->description;
    $book->isbn = $data->isbn;
    $book->stock = $data->stock;

    if($book->update()) {
        http_response_code(200);
        echo json_encode(array("success" => true, "message" => "Book updated successfully"));
    } else {
        http_response_code(503);
        echo json_encode(array("success" => false, "message" => "Unable to update book"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("success" => false, "message" => "Incomplete data"));
}
?>