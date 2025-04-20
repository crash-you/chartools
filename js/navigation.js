/**
 * 导航栏功能JavaScript文件
 * 处理导航栏的交互行为
 */

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化移动端菜单功能
    initMobileMenu();
    
    // 添加导航栏滚动效果
    initScrollEffect();
});

/**
 * 初始化移动端菜单
 * 控制汉堡菜单的开关行为
 */
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        // 点击汉堡按钮切换菜单显示状态
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // 点击页面其他区域关闭菜单
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                // 如果点击的不是菜单按钮也不是菜单内容，则关闭菜单
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    }
}

/**
 * 初始化导航栏滚动效果
 * 实现滚动时导航栏样式变化
 */
function initScrollEffect() {
    const navigation = document.getElementById('navigation');
    
    if (navigation) {
        // 监听窗口滚动事件
        window.addEventListener('scroll', function() {
            if (window.scrollY > 20) {
                // 滚动超过特定距离，增加阴影
                navigation.classList.add('shadow-md');
                navigation.classList.remove('shadow-sm');
            } else {
                // 回到顶部，恢复原样式
                navigation.classList.remove('shadow-md');
                navigation.classList.add('shadow-sm');
            }
        });
    }
}

/**
 * 高亮当前活跃菜单项
 * 基于当前URL路径匹配对应的导航项
 */
function highlightActiveMenuItem() {
    // 获取当前页面URL路径
    const currentPath = window.location.pathname;
    
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('#navigation a');
    
    // 遍历链接并检查匹配
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // 检查链接路径是否与当前页面路径匹配
        if (linkPath && currentPath.includes(linkPath) && linkPath !== '/' && linkPath !== '#') {
            link.classList.add('text-blue-600');
            link.classList.remove('text-gray-700');
        }
    });
} 