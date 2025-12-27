<?php
//delete (ADMIN ONLY)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");

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

if(!empty($data->id)) {
    $book->id = $data->id;

    if($book->delete()) {
        http_response_code(200);
        echo json_encode(array("success" => true, "message" => "Book deleted successfully"));
    } else {
        http_response_code(503);
        echo json_encode(array("success" => false, "message" => "Unable to delete book"));
    }
} else {
    http_response_code(400);
    echo json_encode(array("success" => false, "message" => "Incomplete data"));
}
?>
