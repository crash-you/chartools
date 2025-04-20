/**
 * 语言切换功能JavaScript文件
 * 处理多语言切换功能
 */

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化语言切换功能
    initLanguageSelector();
    
    // 自动检测浏览器语言并切换
    detectBrowserLanguage();
});

/**
 * 初始化语言选择器功能
 */
function initLanguageSelector() {
    const languageButton = document.getElementById('language-button');
    const languageDropdown = document.getElementById('language-dropdown');
    
    if (languageButton && languageDropdown) {
        // 点击语言按钮切换下拉菜单显示状态
        languageButton.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.classList.toggle('hidden');
        });
        
        // 点击页面其他区域关闭下拉菜单
        document.addEventListener('click', function(event) {
            if (!languageButton.contains(event.target) && !languageDropdown.contains(event.target)) {
                languageDropdown.classList.add('hidden');
            }
        });
        
        // 为语言选项添加点击事件
        const languageOptions = languageDropdown.querySelectorAll('a');
        languageOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                // 不阻止默认行为，允许链接导航
                const lang = this.getAttribute('data-lang');
                localStorage.setItem('userLanguage', lang);
            });
        });
    }
}

/**
 * 检测浏览器语言并自动切换
 */
function detectBrowserLanguage() {
    // 检查用户是否已经选择了语言
    const savedLanguage = localStorage.getItem('userLanguage');
    if (savedLanguage) {
        // 如果用户已选择语言，则使用该语言
        return;
    }
    
    // 检测浏览器语言
    const browserLang = navigator.language || navigator.userLanguage;
    
    // 根据浏览器语言重定向到对应版本
    if (browserLang.startsWith('zh')) {
        // 如果已经在中文页面，不需要重定向
        if (!window.location.pathname.includes('/en/')) {
            return;
        }
        window.location.href = window.location.href.replace('/en/', '/');
    } else {
        // 如果浏览器语言不是中文，且用户不在英文页面，则重定向到英文版
        if (!window.location.pathname.includes('/en/') && !window.location.pathname.endsWith('/')) {
            const path = window.location.pathname;
            const baseUrl = window.location.origin;
            const newPath = path.replace(/^\//, '/en/');
            window.location.href = baseUrl + newPath;
        }
    }
}

/**
 * 更新当前显示的语言标签
 * @param {string} lang - 语言代码
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