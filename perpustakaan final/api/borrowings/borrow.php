<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once '../../config/database.php';
include_once '../../models/Borrowing.php';
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

$borrowing = new Borrowing($db);
$data = json_decode(file_get_contents("php://input"));

if(!empty($data->book_id)) {
    $borrowing->user_id = $user->id;
    $borrowing->book_id = $data->book_id;

    if($borrowing->borrow()) {
        http_response_code(201);
        echo json_encode(array("success" => true, "message" => "Book borrowed successfully. Due date: 14 days"));
    } else {
        http_response_code(503);
        echo json_encode(array("success" => false, "message" => "Unable to borrow book. Book may not be available"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("success" => false, "message" => "Book ID required"));
}
?>