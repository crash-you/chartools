/**
 * Main JavaScript File
 * Contains website common functionality
 */

// Execute when page is loaded
document.addEventListener('DOMContentLoaded', async function() {
    // Only try to load Stagewise toolbar in local dev environment, no dev dependencies in production
    try {
        const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
        if (isLocal) {
            const mod = await import('../../js/stagewise-setup.js');
            mod.setupStagewise?.();
        }
    } catch (_) {
        // Ignore dev tool loading failures
    }
});

/**
 * Display notification message
 * @param {string} message - Message to display
 * @param {string} type - Message type (success, error, info)
 * @param {number} duration - Display duration (milliseconds)
 */
function showNotification(message, type = 'info', duration = 3000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg transition-all transform translate-y-0 opacity-100 z-50`;
    
    // Set color based on type
    switch (type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    // Set message content
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Set auto-disappear
    setTimeout(() => {
        notification.classList.add('opacity-0', 'translate-y-2');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} - Whether copy was successful
 */
async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            // Use clipboard API
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback method
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            const success = document.execCommand('copy');
            textArea.remove();
            return success;
        }
    } catch (err) {
        console.error('Copy failed:', err);
        return false;
    }
}

// Mobile menu toggle
document.getElementById('mobile-menu-button')?.addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
    }
});

// Language switch dropdown menu
document.getElementById('language-button')?.addEventListener('click', function() {
    const dropdown = document.getElementById('language-dropdown');
    if (dropdown.classList.contains('hidden')) {
        dropdown.classList.remove('hidden');
    } else {
        dropdown.classList.add('hidden');
    }
});

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const languageButton = document.getElementById('language-button');
    const languageDropdown = document.getElementById('language-dropdown');
    
    if (languageButton && languageDropdown && !languageButton.contains(event.target) && !languageDropdown.contains(event.target)) {
        languageDropdown.classList.add('hidden');
    }
}); 