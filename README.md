<h1 align="center">📚 SELAMAT DATANG DI APLIKASI PERPUSTAKAAN ONLINE</h1>
<h3 align="center">Sistem Informasi Perpustakaan Berbasis Web</h3>

<h2 align="left">📖 Tentang Aplikasi</h2>
<p align="justify">
Perpustakaan Online merupakan sebuah aplikasi berbasis web yang dirancang untuk membantu
pengelolaan data perpustakaan secara digital dan terintegrasi. Aplikasi ini bertujuan
untuk menggantikan proses pencatatan manual yang masih banyak digunakan, sehingga
pengelolaan data buku, pengguna, serta aktivitas peminjaman dan pengembalian dapat dilakukan
secara lebih efektif, akurat, dan terstruktur.
</p>

<p align="justify">
Melalui aplikasi ini, pengelola perpustakaan (admin) dapat dengan mudah melakukan
penginputan, pembaruan, dan penghapusan data buku maupun data pengguna. Selain itu,
sistem juga mencatat setiap transaksi peminjaman dan pengembalian buku, sehingga
riwayat penggunaan buku dapat dipantau dengan lebih baik dan meminimalkan terjadinya
kesalahan data. Bagi pengguna, aplikasi ini memudahkan dalam mengakses
informasi ketersediaan buku, melakukan pencarian buku berdasarkan judul atau kategori,
serta mengetahui status peminjaman buku secara cepat dan real-time melalui antarmuka web.
</p>

<p align="justify">
Perpustakaan Online juga dilengkapi dengan dukungan REST API yang memungkinkan data
perpustakaan diakses oleh aplikasi lain, seperti aplikasi mobile atau frontend berbasis
JavaScript. Dengan adanya REST API ini, sistem menjadi lebih fleksibel, mudah dikembangkan,
dan siap diintegrasikan dengan berbagai platform di masa mendatang.
Secara keseluruhan, aplikasi Perpustakaan Online diharapkan dapat menjadi solusi
pengelolaan perpustakaan yang modern, efisien, dan mudah digunakan, baik untuk skala
kecil maupun menengah, serta mendukung transformasi digital dalam bidang layanan
perpustakaan.
</p>

<h2 align="left">✨ Fitur Utama</h2>
<p align="left">
🔐 Login & autentikasi admin<br>
📘 Manajemen data buku<br>
👤 Manajemen data pengguna<br>
🔄 Peminjaman dan pengembalian buku<br>
📚 Pengelolaan buku<br>
🌐 REST API
</p>

<h2>🖥️ Alur Kerja Sistem</h2>

<ol>
  <li>
    <strong>Admin Login</strong>
    <ul>
      <li>Admin masuk ke sistem menggunakan <em>username</em> dan <em>password</em>.</li>
    </ul>
  </li>

  <li>
    <strong>Pengelolaan Data</strong>
    <ul>
      <li>Admin mengelola data buku dan pengguna melalui dashboard web.</li>
    </ul>
  </li>

  <li>
    <strong>Peminjaman Buku</strong>
    <ul>
      <li>Pengguna meminjam buku yang tersedia.</li>
      <li>Sistem mencatat tanggal peminjaman dan status buku.</li>
    </ul>
  </li>

  <li>
    <strong>Pengembalian Buku</strong>
    <ul>
      <li>Admin mengubah status buku menjadi tersedia kembali.</li>
    </ul>
  </li>

  <li>
    <strong>Akses Data melalui API</strong>
    <ul>
      <li>Data buku, pengguna, dan peminjaman dapat diakses melalui REST API dalam format JSON.</li>
    </ul>
  </li>
</ol>

<h2 align="left">⚙️ Languages and Tools:</h2>
<p align="left">
Frontend: <p align="left"> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> </p>
Backend: <p align="left"> <a href="https://www.php.net" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg" alt="php" width="40" height="40"/> </a> </p>
Database: <p align="left"> <a href="https://www.mysql.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> </p>
Server: <p>
  <img src="https://img.shields.io/badge/Apache-D22128?style=for-the-badge&logo=apache&logoColor=white" />
  <img src="https://img.shields.io/badge/XAMPP-FB7A24?style=for-the-badge&logo=xampp&logoColor=white" />
</p>

<h2 align="left">🔗 Base URL API</h2>
<p align="left">
http://localhost/perpustakaan/api
</p><br>

<h2>📘 Dokumentasi RESTful API - APLIKASI PERPUSTAKAAN ONLINE</h2>
<h3>Perpustakaan Online dengan Postman</h3>

<hr>

<h2>⚙️ Persiapan</h2>
<ol>
  <li>Pastikan XAMPP Apache & MySQL sudah running</li>
  <li>Database <code>perpustakaan_db</code> sudah dibuat</li>
  <li>API berjalan di:
    <code>http://localhost/perpustakaan/api</code>
  </li>
  <li>Download & install Postman dari:
    <a href="https://www.postman.com/downloads/" target="_blank">
      https://www.postman.com/downloads/
    </a>
  </li>
</ol>

<hr>

<h2>1️⃣ Register User</h2>
<p><strong>Method:</strong> POST</p>
<p><strong>URL:</strong> <code>http://localhost/perpustakaan/api/auth/register.php</code></p>

<p><strong>Headers:</strong></p>
<pre><code>Content-Type: application/json</code></pre>

<p><strong>Body (JSON):</strong></p>
<pre><code>{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}</code></pre>

<p><strong>Response (201 - Success):</strong></p>
<pre><code>{
  "success": true,
  "message": "User registered successfully"
}</code></pre>

<p><strong>Response (400 - Error):</strong></p>
<pre><code>{
  "success": false,
  "message": "Incomplete data"
}</code></pre>

<hr>

<h2>2️⃣ Login User</h2>
<p><strong>Method:</strong> POST</p>
<p><strong>URL:</strong> <code>http://localhost/perpustakaan/api/auth/login.php</code></p>

<p><strong>Body (JSON):</strong></p>
<pre><code>{
  "username": "admin",
  "password": "admin123"
}</code></pre>

<p><strong>Response (200 - Success):</strong></p>
<pre><code>{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": 1,
    "username": "admin",
    "email": "admin@perpustakaan.com",
    "role": "admin",
    "token": "token_abc123def456ghi789jkl012mno345pqr678stu901vwx234yz"
  }
}</code></pre>

<p><strong>⚠️ PENTING: COPY TOKEN INI! Gunakan untuk request selanjutnya.</p>

<p><strong>Response (Error - 401):</strong></p>
<pre><code>{
  "success": false,
  "message": "Login failed. Invalid credentials",
}</code></pre>

<hr>

<h2>3️⃣ Get All Books</h2>
<p><strong>Method:</strong> GET</p>
<p><strong>URL:</strong> <code>http://localhost/perpustakaan/api/books/read.php</code></p>

<p><strong>Headers:</strong></p>
<pre><code>Authorization: Bearer token_abc123def456ghi789jkl012mno345pqr678stu901vwx234yz</code></pre>

⚠️ GANTI "token_abc..." dengan token Anda dari response login!

<p><strong>Body:</strong></p>
<pre><code>"(kosong/none)"</code></pre>

<p><strong>Response (200):</strong></p>
<pre><code>{
  "success": true,
    "data": [
        {
            "id": 1,
            "title": "Laskar Pelangi",
            "author": "Andrea Hirata",
            "category": "Fiksi",
            "year": 2005,
            "status": "available",
            "description": "Novel tentang perjuangan anak-anak di Belitung",
            "isbn": "9789793062792",
            "stock": 3,
            "created_at": "2024-12-27 10:00:00",
            "updated_at": "2024-12-27 10:00:00"
        },
        {
            "id": 2,
            "title": "Bumi Manusia",
            "author": "Pramoedya Ananta Toer",
            "category": "Fiksi",
            "year": 1980,
            "status": "available",
            "description": "Kisah di masa kolonial Belanda",
            "isbn": "9789799731542",
            "stock": 2,
            "created_at": "2024-12-27 10:00:00",
            "updated_at": "2024-12-27 10:00:00"
        }
    ]
}</code></pre>

<p><strong>Response (Error - 401):</strong></p>
<pre><code>{
  "success": false,
  "message": "Invalid token",
}</code></pre>

<hr>

<h2>4️⃣ Create Book (Admin Only)</h2>
<p><strong>Method:</strong> POST</p>
<p><strong>URL:</strong> <code>http://localhost/perpustakaan/api/books/create.php</code></p>

<p><strong>Headers:</strong></p>
<pre><code>Content-Type: application/json</code>
<code>Authorization: Bearer YOUR_ADMIN_TOKEN_HERE</code></pre>

<p><strong>Body (JSON):</strong></p>
<pre><code>{
  "title": "Buku Test dari Postman",
  "author": "Penulis Test",
  "category": "Teknologi",
  "year": 2024,
  "status": "available",
  "description": "Deskripsi buku test dari Postman",
  "isbn": "1234567890123",
  "stock": 5
}</code></pre>

<p><strong>Response (Success - 201):</strong></p>
<pre><code>{
  "success": true,
  "message": "Book created successfully",
}</code></pre>

<p><strong>Response (Error - 403 Forbidden):</strong></p>
<pre><code>{
  "success": false,
  "message": "Access denied. Admin only",
}</code></pre>

<p><strong>Response (Error - 400):</strong></p>
<pre><code>{
  "success": false,
  "message": "Incomplete data",
}</code></pre>

<hr>

<h2>5️⃣ Update Book (Admin Only)</h2>
<p><strong>Method:</strong> PUT</p>
<p><strong>URL:</strong> <code>http://localhost/perpustakaan/api/books/update.php</code></p>

<p><strong>Headers:</strong></p>
<pre><code>Content-Type: application/json</code>
<code>Authorization: Bearer YOUR_ADMIN_TOKEN_HERE</code></pre>

<p><strong>Body (JSON):</strong></p>
<pre><code>{
  "id": 1,
  "title": "Laskar Pelangi - Edisi Revisi",
  "author": "Andrea Hirata",
  "category": "Fiksi",
  "year": 2005,
  "status": "available",
  "description": "Novel tentang perjuangan anak-anak - Updated",
  "isbn": "9789793062792",
  "stock": 10
}</code></pre>

⚠️ CATATAN: "id" harus ada dan sesuai dengan ID buku yang ingin diupdate

<p><strong>Response (Success - 200):</strong></p>
<pre><code>{
  "success": true,
  "message": "Book updated successfully",
}</code></pre>

<p><strong>Response (Error - 403 Forbidden):</strong></p>
<pre><code>{
  "success": false,
  "message": "Access denied. Admin only",
}</code></pre>

<p><strong>Response (Error - 400):</strong></p>
<pre><code>{
  "success": false,
  "message": "Incomplete data",
}</code></pre>

<hr>

<h2>6️⃣ Delete Book (Admin Only)</h2>
<p><strong>Method:</strong> DELETE</p>
<p><strong>URL:</strong> <code>http://localhost/perpustakaan/api/books/delete.php</code></p>

<p><strong>Headers:</strong></p>
<pre><code>Content-Type: application/json</code>
<code>Authorization: Bearer YOUR_ADMIN_TOKEN_HERE</code></pre>

<p><strong>Body (JSON):</strong></p>
<pre><code>{
  "id": 6
}</code></pre>

⚠️ CATATAN: Sesuaikan "id" dengan buku yang ingin dihapus

<p><strong>Response (Success - 200):</strong></p>
<pre><code>{
  "success": true,
  "message": "Book deleted successfully",
}</code></pre>

<p><strong>Response (Error - 403):</strong></p>
<pre><code>{
  "success": false,
  "message": "Access denied. Admin only",
}</code></pre>

<p><strong>Response (Error - 503):</strong></p>
<pre><code>{
  "success": false,
  "message": "Unable to delete book",
}</code></pre>

<hr>

<h2>7️⃣ Borrow Book (User)</h2>
<p><strong>Method:</strong> POST</p>
<p><strong>URL:</strong> <code>http://localhost/perpustakaan/api/borrowings/borrow.php
</code></p>

<p><strong>Headers:</strong></p>
<pre><code>Content-Type: application/json</code>
<code>Authorization: Bearer YOUR_USER_TOKEN_HERE</code></pre>

⚠️ Gunakan token dari user biasa (bukan admin)

<p><strong>Body (JSON):</strong></p>
<pre><code>{
  "book_id": 1
}</code></pre>

⚠️ CATATAN: "book_id" adalah ID buku yang ingin dipinjam

<p><strong>Response (Success - 201):</strong></p>
<pre><code>{
  "success": true,
  "message": "Book borrowed successfully. Due date: 14 days",
}</code></pre>

<p><strong>Response (Error - 503):</strong></p>
<pre><code>{
  "success": false,
  "message": "Unable to borrow book. Book may not be available",
}</code></pre>

<p><strong>Response (Error - 400):</strong></p>
<pre><code>{
  "success": false,
  "message": "Book ID required",
}</code></pre>

<hr>

<h2>8️⃣ My Borrowings (User)</h2>
<p><strong>Method:</strong> GET</p>
<p><strong>URL:</strong> <code>http://localhost/perpustakaan/api/borrowings/my_borrowings.php</code></p>

<p><strong>Headers:</strong></p>
<pre><code>Authorization: Bearer YOUR_USER_TOKEN_HERE</code></pre>

<p><strong>Body:</strong></p>
<pre><code>"(kosong/none)"</code></pre>

<p><strong>Response (Success - 200):</strong></p>
<pre><code>{
  "success": true,
  "data": [
        {
            "id": 1,
            "book_id": 1,
            "title": "Laskar Pelangi",
            "author": "Andrea Hirata",
            "borrow_date": "2024-12-27 10:00:00",
            "due_date": "2025-01-10 10:00:00",
            "return_date": null,
            "status": "borrowed"
        },
        {
            "id": 2,
            "book_id": 2,
            "title": "Bumi Manusia",
            "author": "Pramoedya Ananta Toer",
            "borrow_date": "2024-12-26 15:30:00",
            "due_date": "2025-01-09 15:30:00",
            "return_date": "2024-12-28 10:00:00",
            "status": "returned"
        }
    ]
}</code></pre>

<p><strong>Response (Error - 404):</strong></p>
<pre><code>{
  "success": false,
  "message": "No borrowings found",
}</code></pre>

<hr>

<h2>9️⃣ Return Book (User)</h2>
<p><strong>Method:</strong> POST</p>
<p><strong>URL:</strong> <code>http://localhost/perpustakaan/api/borrowings/return.php</code></p>

<p><strong>Headers:</strong></p>
<pre><code>Content-Type: application/json</code>
<code>Authorization: Bearer YOUR_USER_TOKEN_HERE</code></pre>

<p><strong>Body (JSON):</strong></p>
<pre><code>{
  "borrowing_id": 1
}</code></pre>

⚠️ CATATAN: "borrowing_id" adalah ID dari tabel borrowings (bukan book_id)
           Dapatkan ID ini dari endpoint "My Borrowings"

<p><strong>Response (Success - 200):</strong></p>
<pre><code>{
  "success": true,
  "message": "Book returned successfully",
}</code></pre>

<p><strong>Response (Error - 503):</strong></p>
<pre><code>{
  "success": false,
  "message": "Unable to return book",
}</code></pre>

<p><strong>Response (Error - 400):</strong></p>
<pre><code>{
  "success": false,
  "message": "Borrowing ID required",
}</code></pre>

<hr>

<h2>🔟 All Borrowings (Admin Only)</h2>
<p><strong>Method:</strong> GET</p>
<p><strong>URL:</strong> <code>http://localhost/perpustakaan/api/borrowings/all.php</code></p>

<p><strong>Headers:</strong></p>
<pre><code>Authorization: Bearer YOUR_ADMIN_TOKEN_HERE</code></pre>

<p><strong>Body:</strong></p>
<pre><code>"(kosong/none)"</code></pre>

<p><strong>Response (Success - 200):</strong></p>
<pre><code>{
  "success": true,
  "data": [
        {
            "id": 1,
            "user_id": 2,
            "username": "user1",
            "book_id": 1,
            "title": "Laskar Pelangi",
            "author": "Andrea Hirata",
            "borrow_date": "2024-12-27 10:00:00",
            "due_date": "2025-01-10 10:00:00",
            "return_date": null,
            "status": "borrowed"
        },
        {
            "id": 2,
            "user_id": 2,
            "username": "user1",
            "book_id": 2,
            "title": "Bumi Manusia",
            "author": "Pramoedya Ananta Toer",
            "borrow_date": "2024-12-26 15:30:00",
            "due_date": "2025-01-09 15:30:00",
            "return_date": "2024-12-28 10:00:00",
            "status": "returned"
        }
    ]
}</code></pre>

<p><strong>Response (Error - 403):</strong></p>
<pre><code>{
  "success": false,
  "message": "Access denied. Admin only",
}</code></pre>

<p><strong>Response (Error - 404):</strong></p>
<pre><code>{
  "success": false,
  "message": "No borrowings found",
}</code></pre>

<h2 align="left">🤝 Connect with me:</h2>
<p align="left">
<a href="https://github.com/username">GitHub</a>
</p>
