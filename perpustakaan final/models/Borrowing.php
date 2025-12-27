<?php
class Borrowing {
    private $conn;
    private $table = "borrowings";

    public $id;
    public $user_id;
    public $book_id;
    public $borrow_date;
    public $return_date;
    public $due_date;
    public $status;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function borrow() {
        // Check if book available
        $query = "SELECT stock FROM books WHERE id = :book_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":book_id", $this->book_id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if($row['stock'] <= 0) {
            return false;
        }

        // Create borrowing record
        $query = "INSERT INTO " . $this->table . " 
                  SET user_id=:user_id, book_id=:book_id, 
                      due_date=DATE_ADD(NOW(), INTERVAL 14 DAY), status='borrowed'";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":book_id", $this->book_id);
        
        if($stmt->execute()) {
            // Update book stock
            $query = "UPDATE books SET stock = stock - 1 WHERE id = :book_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":book_id", $this->book_id);
            $stmt->execute();
            return true;
        }
        return false;
    }

    public function returnBook() {
        $query = "UPDATE " . $this->table . " 
                  SET return_date=NOW(), status='returned' 
                  WHERE id=:id AND user_id=:user_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":user_id", $this->user_id);
        
        if($stmt->execute()) {
            // Get book_id
            $query = "SELECT book_id FROM " . $this->table . " WHERE id = :id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":id", $this->id);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Update book stock
            $query = "UPDATE books SET stock = stock + 1 WHERE id = :book_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":book_id", $row['book_id']);
            $stmt->execute();
            return true;
        }
        return false;
    }

    public function getUserBorrowings($user_id) {
        $query = "SELECT b.*, bk.title, bk.author 
                  FROM " . $this->table . " b
                  JOIN books bk ON b.book_id = bk.id
                  WHERE b.user_id = :user_id
                  ORDER BY b.borrow_date DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $user_id);
        $stmt->execute();
        return $stmt;
    }

    public function getAllBorrowings() {
        $query = "SELECT b.*, u.username, bk.title, bk.author 
                  FROM " . $this->table . " b
                  JOIN users u ON b.user_id = u.id
                  JOIN books bk ON b.book_id = bk.id
                  ORDER BY b.borrow_date DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
}
?>