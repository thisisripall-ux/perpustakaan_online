<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

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
$stmt = $borrowing->getUserBorrowings($user->id);
$num = $stmt->rowCount();

if($num > 0) {
    $borrowings_arr = array();
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        array_push($borrowings_arr, $row);
    }

    http_response_code(200);
    echo json_encode(array("success" => true, "data" => $borrowings_arr));
} else {
    http_response_code(404);
    echo json_encode(array("success" => false, "message" => "No borrowings found"));
}
?>