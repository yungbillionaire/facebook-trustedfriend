// Simple router - handles navigation between pages
function navigateTo(path) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    
    // Update URL without reload
    window.location.hash = path === '/' ? '' : '#' + path;
    
    // Show target page
    let pageId = 'page-' + (path === '/' ? 'login' : path.replace(/\//g, '-'));
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
    }
}

// Handle browser back/forward buttons
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1) || '/';
    navigateTo(hash);
});

// Initial page load
window.addEventListener('DOMContentLoaded', function() {
    const hash = window.location.hash.substring(1) || '/';
    navigateTo(hash);
});

// Make function globally available
window.navigateTo = navigateTo;