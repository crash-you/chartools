/**
 * Navigation Bar JavaScript File
 * Handling navigation bar interaction behavior
 */

// Execute when page is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu functionality
    initMobileMenu();
    
    // Add navigation bar scroll effect
    initScrollEffect();
});

/**
 * Initialize mobile menu
 * Control hamburger menu toggle behavior
 */
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        // Toggle menu display status when hamburger button is clicked
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu when clicking elsewhere on the page
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                // If clicking outside the menu button and menu content, close the menu
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    }
}

/**
 * Initialize navigation bar scroll effect
 * Implement navigation bar style change when scrolling
 */
function initScrollEffect() {
    const navigation = document.getElementById('navigation');
    
    if (navigation) {
        // Listen for window scroll event
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                // Add shadow when scrolled beyond specific distance
                navigation.classList.add('shadow-md');
                navigation.classList.remove('shadow-sm');
            } else {
                // Return to original style when back at top
                navigation.classList.remove('shadow-md');
                navigation.classList.add('shadow-sm');
            }
        });
    }
}

/**
 * Highlight active menu item
 * Match corresponding navigation item based on current URL path
 */
function highlightActiveMenuItem() {
    // Get current page URL path
    const currentPath = window.location.pathname;
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('#navigation a');
    
    // Iterate through links and check for matches
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Check if link path matches current page path
        if (linkPath && currentPath.includes(linkPath) && linkPath !== '/' && linkPath !== '#') {
            link.classList.add('text-blue-600');
            link.classList.remove('text-gray-700');
        }
    });
} 