// Check auth and admin role on page load
window.addEventListener('DOMContentLoaded', function() {
    if (!checkAuth()) return;
    
    if (!isAdmin()) {
        alert('Akses ditolak! Hanya admin yang bisa mengakses halaman ini.');
        window.location.href = 'user-dashboard.html';
        return;
    }
    
    updateUserBadge();
    
    // Load data based on current page
    const path = window.location.pathname;
    if (path.includes('admin-dashboard.html')) {
        loadBooks();
    } else if (path.includes('admin-books.html')) {
        loadEditForm();
    } else if (path.includes('admin-borrowings.html')) {
        loadAllBorrowings();
    }
});

// Load books
async function loadBooks() {
    const token = getAuthToken();
    
    try {
        const response = await fetch(`${API_BASE_URL}/books/read.php`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();

        if (data.success) {
            displayBooksAdmin(data.data);
        } else {
            showAlert('❌ ' + data.message, 'error', 'booksAlert');
        }
    } catch (error) {
        showAlert('❌ Error: ' + error.message, 'error', 'booksAlert');
    }
}

// Display books for admin
function displayBooksAdmin(books) {
    const grid = document.getElementById('booksGrid');
    
    if (!grid) return;
    
    if (books.length === 0) {
        grid.innerHTML = '<p style="text-align: center; color: #666;">Belum ada buku</p>';
        return;
    }

    grid.innerHTML = books.map(book => `
        <div class="book-card">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <div class="book-title">${book.title}</div>
                <span style="font-size: 0.9em; color: #999;">#${book.id}</span>
            </div>
            <div class="book-author">oleh ${book.author}</div>
            <div class="book-meta">
                <span class="badge badge-category">${book.category}</span>
                <span class="badge ${book.stock > 0 ? 'badge-stock' : 'badge-out'}">
                    📦 Stok: ${book.stock}
                </span>
                <span class="badge" style="background: #e0e0e0; color: #333;">${book.year}</span>
            </div>
            ${book.isbn ? `<p style="font-size: 0.85em; color: #999; margin-top: 5px;">ISBN: ${book.isbn}</p>` : ''}
            <p style="color: #666; font-size: 0.9em; margin-top: 10px;">${book.description || 'Tidak ada deskripsi'}</p>
            <div class="book-actions">
                <button class="btn-warning" onclick="editBook(${book.id})">✏️ Edit</button>
                <button class="btn-danger" onclick="deleteBook(${book.id})">🗑️ Hapus</button>
            </div>
        </div>
    `).join('');
}

// Save book (Create or Update)
async function saveBook(e) {
    e.preventDefault();
    
    const token = getAuthToken();
    const bookData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        category: document.getElementById('category').value,
        year: parseInt(document.getElementById('year').value),
        status: document.getElementById('status').value,
        description: document.getElementById('description').value,
        isbn: document.getElementById('isbn').value,
        stock: parseInt(document.getElementById('stock').value)
    };

    const bookId = document.getElementById('bookId').value;
    let url = `${API_BASE_URL}/books/create.php`;
    let method = 'POST';

    if (bookId) {
        url = `${API_BASE_URL}/books/update.php`;
        method = 'PUT';
        bookData.id = parseInt(bookId);
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bookData)
        });

        const data = await response.json();

        if (data.success) {
            showAlert('✅ ' + data.message, 'success', 'formAlert');
            resetForm();
            setTimeout(() => {
                window.location.href = 'admin-dashboard.html';
            }, 1500);
        } else {
            showAlert('❌ ' + data.message, 'error', 'formAlert');
        }
    } catch (error) {
        showAlert('❌ Error: ' + error.message, 'error', 'formAlert');
    }
}

// Edit book
async function editBook(id) {
    // Save book ID to sessionStorage
    sessionStorage.setItem('editBookId', id);
    window.location.href = 'admin-books.html';
}

// Load edit form
async function loadEditForm() {
    const bookId = sessionStorage.getItem('editBookId');
    if (!bookId) return;
    
    const token = getAuthToken();
    
    try {
        const response = await fetch(`${API_BASE_URL}/books/read.php`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();

        if (data.success) {
            const book = data.data.find(b => b.id == bookId);
            if (book) {
                document.getElementById('bookId').value = book.id;
                document.getElementById('title').value = book.title;
                document.getElementById('author').value = book.author;
                document.getElementById('category').value = book.category;
                document.getElementById('year').value = book.year;
                document.getElementById('status').value = book.status;
                document.getElementById('description').value = book.description || '';
                document.getElementById('isbn').value = book.isbn || '';
                document.getElementById('stock').value = book.stock;
                
                // Clear session
                sessionStorage.removeItem('editBookId');
            }
        }
    } catch (error) {
        console.error('Error loading book:', error);
    }
}

// Delete book
async function deleteBook(id) {
    if (!confirm('Yakin ingin menghapus buku ini?')) return;

    const token = getAuthToken();
    
    try {
        const response = await fetch(`${API_BASE_URL}/books/delete.php`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id: id })
        });

        const data = await response.json();

        if (data.success) {
            showAlert('✅ ' + data.message, 'success', 'booksAlert');
            loadBooks();
        } else {
            showAlert('❌ ' + data.message, 'error', 'booksAlert');
        }
    } catch (error) {
        showAlert('❌ Error: ' + error.message, 'error', 'booksAlert');
    }
}

// Reset form
function resetForm() {
    const form = document.getElementById('bookForm');
    if (form) {
        form.reset();
        document.getElementById('bookId').value = '';
    }
}

// Load all borrowings
async function loadAllBorrowings() {
    const token = getAuthToken();
    
    try {
        const response = await fetch(`${API_BASE_URL}/borrowings/all.php`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();

        if (data.success) {
            displayBorrowingsTable(data.data, false);
        } else {
            const table = document.getElementById('borrowingsTable');
            if (table) {
                table.innerHTML = '<p style="text-align: center; color: #666;">Belum ada peminjaman</p>';
            }
        }
    } catch (error) {
        showAlert('❌ Error: ' + error.message, 'error', 'borrowingsAlert');
    }
}

// Display borrowings table
function displayBorrowingsTable(borrowings, showReturnBtn = false) {
    const table = document.getElementById('borrowingsTable');
    if (!table) return;
    
    if (borrowings.length === 0) {
        table.innerHTML = '<p style="text-align: center; color: #666;">Belum ada data</p>';
        return;
    }

    let html = '<table><thead><tr>';
    html += '<th>User</th>';
    html += '<th>Judul Buku</th><th>Penulis</th><th>Tgl Pinjam</th><th>Batas Kembali</th><th>Status</th>';
    html += '</tr></thead><tbody>';

    borrowings.forEach(b => {
        const borrowDate = new Date(b.borrow_date).toLocaleDateString('id-ID');
        const dueDate = new Date(b.due_date).toLocaleDateString('id-ID');
        const statusBadge = b.status === 'returned' ? 
            '<span class="badge badge-stock">✅ Dikembalikan</span>' : 
            '<span class="badge" style="background: #fff3cd; color: #856404;">📚 Dipinjam</span>';
        
        html += '<tr>';
        html += `<td>${b.username}</td>`;
        html += `<td>${b.title}</td>`;
        html += `<td>${b.author}</td>`;
        html += `<td>${borrowDate}</td>`;
        html += `<td>${dueDate}</td>`;
        html += `<td>${statusBadge}</td>`;
        html += '</tr>';
    });

    html += '</tbody></table>';
    table.innerHTML = html;
}