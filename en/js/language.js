/**
 * Language Switching JavaScript File
 * Handling multi-language switching functionality
 */

// Execute when page is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Language switching JS loading...');
    
    // Initialize language selector
    initLanguageSelector();
    
    // Auto-detect browser language and switch
    detectBrowserLanguage();
    
    console.log('Language switching JS loaded');
});

/**
 * Initialize language selector functionality
 */
function initLanguageSelector() {
    console.log('Initializing language selector...');
    
    const languageButton = document.getElementById('language-button');
    const languageDropdown = document.getElementById('language-dropdown');
    
    console.log('Language button element:', languageButton);
    console.log('Language dropdown element:', languageDropdown);
    
    if (languageButton && languageDropdown) {
        console.log('Starting to bind language switch event...');
        
        // Toggle dropdown when language button is clicked
        languageButton.addEventListener('click', function(e) {
            console.log('Language button clicked!');
            e.stopPropagation();
            languageDropdown.classList.toggle('hidden');
            console.log('Dropdown state toggle completed');
        });
        
        // Close dropdown when clicking elsewhere
        document.addEventListener('click', function(event) {
            if (!languageButton.contains(event.target) && !languageDropdown.contains(event.target)) {
                languageDropdown.classList.add('hidden');
            }
        });
        
        // Add click events to language options
        const languageOptions = languageDropdown.querySelectorAll('a');
        languageOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                // Don't prevent default behavior, allow link navigation
                const lang = this.getAttribute('data-lang');
                localStorage.setItem('userLanguage', lang);
            });
        });
    }
}

/**
 * Detect browser language and auto switch
 */
function detectBrowserLanguage() {
    // Check if user has already selected a language
    const savedLanguage = localStorage.getItem('userLanguage');
    if (savedLanguage) {
        // If user has selected a language, use that language
        return;
    }
    
    // Bot and one-time redirect protection
    const userAgent = navigator.userAgent || '';
    const isBot = /Googlebot|Bingbot|DuckDuckBot|Yandex|Baiduspider|Sogou|Slurp|SemrushBot|AhrefsBot|MJ12bot|DotBot|PetalBot/i.test(userAgent);
    if (isBot) {
        return;
    }
    if (sessionStorage.getItem('autoLangRedirectDone') === '1') {
        return;
    }
    // Detect browser language
    const browserLang = navigator.language || navigator.userLanguage;
    
    // Redirect to corresponding version based on browser language
    if (browserLang.startsWith('zh')) {
        // If browser language is Chinese and not on Chinese page, redirect to Chinese version
        if (window.location.pathname.includes('/en/')) {
            const path = window.location.pathname;
            const redirectPath = path.replace('/en/', '/');
            sessionStorage.setItem('autoLangRedirectDone', '1');
            window.location.href = redirectPath;
        }
    } else {
        // If browser language is not Chinese and not on English page, redirect to English version
        if (!window.location.pathname.includes('/en/')) {
            const currentPath = window.location.pathname;
            // Add '/en' to the beginning of the path, but after the domain
            const enPath = currentPath.replace(/^\//, '/en/');
            sessionStorage.setItem('autoLangRedirectDone', '1');
            window.location.href = window.location.origin + enPath;
        }
    }
}

/**
 * Update displayed language label
 * @param {string} lang - Language code
 */
function updateLanguageDisplay(lang) {
    const currentLanguageElement = document.getElementById('current-language');
    if (currentLanguageElement) {
        if (lang === 'zh-CN') {
            currentLanguageElement.textContent = '中文';
        } else if (lang === 'en') {
            currentLanguageElement.textContent = 'English';
        }
    }
} 