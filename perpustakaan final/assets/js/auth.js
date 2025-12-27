// Login function
async function login(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/login.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            // Save session
            saveSession(data.data, data.data.token);
            
            // Redirect based on role
            if (data.data.role === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else {
                window.location.href = 'user-dashboard.html';
            }
        } else {
            showAlert('❌ ' + data.message, 'error', 'loginAlert');
        }
    } catch (error) {
        showAlert('❌ Error: Pastikan API sudah berjalan di ' + API_BASE_URL, 'error', 'loginAlert');
    }
}

// Register function
async function register(e) {
    e.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    try {
        const response = await fetch(`${API_BASE_URL}/auth/register.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (data.success) {
            showAlert('✅ Registrasi berhasil! Silakan login.', 'success', 'registerAlert');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            showAlert('❌ ' + data.message, 'error', 'registerAlert');
        }
    } catch (error) {
        showAlert('❌ Error: Pastikan server PHP sudah berjalan', 'error', 'registerAlert');
    }
}