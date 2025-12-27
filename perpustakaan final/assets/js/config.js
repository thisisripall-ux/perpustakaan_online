const API_BASE_URL = 'http://localhost/perpustakaan/api';

// Get current user from sessionStorage
function getCurrentUser() {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Get auth token
function getAuthToken() {
    return sessionStorage.getItem('authToken');
}

// Save login session
function saveSession(user, token) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    sessionStorage.setItem('authToken', token);
}

// Clear session
function clearSession() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('authToken');
}

// Check if user is logged in
function checkAuth() {
    const user = getCurrentUser();
    const token = getAuthToken();
    
    if (!user || !token) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Check if user is admin
function isAdmin() {
    const user = getCurrentUser();
    return user && user.role === 'admin';
}

// Logout function
function logout() {
    if (confirm('Yakin ingin logout?')) {
        clearSession();
        window.location.href = 'index.html';
    }
}

// Show alert
function showAlert(message, type, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

// Update user badge
function updateUserBadge() {
    const user = getCurrentUser();
    const badge = document.getElementById('userBadge');
    
    if (badge && user) {
        const roleIcon = user.role === 'admin' ? '👑' : '👤';
        badge.textContent = `${roleIcon} ${user.username}`;
    }
}