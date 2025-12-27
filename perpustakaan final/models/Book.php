<?php
class Book {
    private $conn;
    private $table = "books";

    public $id;
    public $title;
    public $author;
    public $category;
    public $year;
    public $status;
    public $description;
    public $isbn;
    public $stock;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read() {
        $query = "SELECT * FROM " . $this->table . " ORDER BY created_at DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readOne() {
        $query = "SELECT * FROM " . $this->table . " WHERE id = :id LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);
        $stmt->execute();

        if($stmt->rowCount() > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->title = $row['title'];
            $this->author = $row['author'];
            $this->category = $row['category'];
            $this->year = $row['year'];
            $this->status = $row['status'];
            $this->description = $row['description'];
            $this->isbn = $row['isbn'];
            $this->stock = $row['stock'];
            return true;
        }
        return false;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table . " 
                  SET title=:title, author=:author, category=:category, 
                      year=:year, status=:status, description=:description, 
                      isbn=:isbn, stock=:stock";
        
        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->author = htmlspecialchars(strip_tags($this->author));
        $this->category = htmlspecialchars(strip_tags($this->category));
        $this->status = isset($this->status) ? $this->status : 'available';
        $this->stock = isset($this->stock) ? $this->stock : 1;

        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":author", $this->author);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":year", $this->year);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":isbn", $this->isbn);
        $stmt->bindParam(":stock", $this->stock);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function update() {
        $query = "UPDATE " . $this->table . " 
                  SET title=:title, author=:author, category=:category, 
                      year=:year, status=:status, description=:description, 
                      isbn=:isbn, stock=:stock
                  WHERE id=:id";
        
        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->author = htmlspecialchars(strip_tags($this->author));
        $this->category = htmlspecialchars(strip_tags($this->category));

        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":author", $this->author);
        $stmt->bindParam(":category", $this->category);
        $stmt->bindParam(":year", $this->year);
        $stmt->bindParam(":status", $this->status);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":isbn", $this->isbn);
        $stmt->bindParam(":stock", $this->stock);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function delete() {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $this->id);

        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function search($keyword) {
        $query = "SELECT * FROM " . $this->table . " 
                  WHERE title LIKE :keyword OR author LIKE :keyword OR category LIKE :keyword
                  ORDER BY created_at DESC";
        
        $stmt = $this->conn->prepare($query);
        $keyword = "%{$keyword}%";
        $stmt->bindParam(":keyword", $keyword);
        $stmt->execute();
        return $stmt;
    }
}
?>