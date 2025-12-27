// Check auth on page load
window.addEventListener('DOMContentLoaded', function() {
    if (!checkAuth()) return;
    
    updateUserBadge();
    
    // Load data based on current page
    const path = window.location.pathname;
    if (path.includes('user-dashboard.html')) {
        loadBooks();
    } else if (path.includes('user-borrowings.html')) {
        loadMyBorrowings();
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
            displayBooksUser(data.data);
        } else {
            showAlert('❌ ' + data.message, 'error', 'booksAlert');
        }
    } catch (error) {
        showAlert('❌ Error: ' + error.message, 'error', 'booksAlert');
    }
}

// Display books for user
function displayBooksUser(books) {
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
                <button class="btn-success" onclick="borrowBook(${book.id})" ${book.stock <= 0 ? 'disabled' : ''}>
                    📚 ${book.stock > 0 ? 'Pinjam Buku' : 'Tidak Tersedia'}
                </button>
            </div>
        </div>
    `).join('');
}

// Borrow book
async function borrowBook(bookId) {
    if (!confirm('Pinjam buku ini? Batas pengembalian 14 hari.')) return;

    const token = getAuthToken();
    
    try {
        const response = await fetch(`${API_BASE_URL}/borrowings/borrow.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ book_id: bookId })
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

// Load my borrowings
async function loadMyBorrowings() {
    const token = getAuthToken();
    
    try {
        const response = await fetch(`${API_BASE_URL}/borrowings/my_borrowings.php`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();

        if (data.success) {
            displayMyBorrowings(data.data);
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

// Display my borrowings
function displayMyBorrowings(borrowings) {
    const table = document.getElementById('borrowingsTable');
    if (!table) return;
    
    if (borrowings.length === 0) {
        table.innerHTML = '<p style="text-align: center; color: #666;">Belum ada peminjaman</p>';
        return;
    }

    let html = '<table><thead><tr>';
    html += '<th>Judul Buku</th><th>Penulis</th><th>Tgl Pinjam</th><th>Batas Kembali</th><th>Status</th><th>Aksi</th>';
    html += '</tr></thead><tbody>';

    borrowings.forEach(b => {
        const borrowDate = new Date(b.borrow_date).toLocaleDateString('id-ID');
        const dueDate = new Date(b.due_date).toLocaleDateString('id-ID');
        const statusBadge = b.status === 'returned' ? 
            '<span class="badge badge-stock">✅ Dikembalikan</span>' : 
            '<span class="badge" style="background: #fff3cd; color: #856404;">📚 Dipinjam</span>';
        
        html += '<tr>';
        html += `<td>${b.title}</td>`;
        html += `<td>${b.author}</td>`;
        html += `<td>${borrowDate}</td>`;
        html += `<td>${dueDate}</td>`;
        html += `<td>${statusBadge}</td>`;
        
        if (b.status === 'borrowed') {
            html += `<td><button class="btn-success" style="width: auto; padding: 8px 15px; margin: 0;" onclick="returnBook(${b.id})">↩️ Kembalikan</button></td>`;
        } else {
            html += '<td>-</td>';
        }
        
        html += '</tr>';
    });

    html += '</tbody></table>';
    table.innerHTML = html;
}

// Return book
async function returnBook(borrowingId) {
    if (!confirm('Kembalikan buku ini?')) return;

    const token = getAuthToken();
    
    try {
        const response = await fetch(`${API_BASE_URL}/borrowings/return.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ borrowing_id: borrowingId })
        });

        const data = await response.json();

        if (data.success) {
            showAlert('✅ ' + data.message, 'success', 'borrowingsAlert');
            loadMyBorrowings();
        } else {
            showAlert('❌ ' + data.message, 'error', 'borrowingsAlert');
        }
    } catch (error) {
        showAlert('❌ Error: ' + error.message, 'error', 'borrowingsAlert');
    }
}