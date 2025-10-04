/**
 * 正则表达式测试工具JavaScript文件
 * 实现实时匹配、高亮显示、捕获组、替换等功能
 */

// 常用正则模式库
const commonPatterns = {
    email: {
        pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
        name_zh: '邮箱地址',
        name_en: 'Email Address',
        example_zh: 'user@example.com',
        example_en: 'user@example.com'
    },
    url: {
        pattern: 'https?://[^\\s]+',
        name_zh: 'URL链接',
        name_en: 'URL',
        example_zh: 'https://example.com',
        example_en: 'https://example.com'
    },
    phone: {
        pattern: '1[3-9]\\d{9}',
        name_zh: '手机号码（中国）',
        name_en: 'Phone Number (China)',
        example_zh: '13812345678',
        example_en: '13812345678'
    },
    ip: {
        pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b',
        name_zh: 'IP地址',
        name_en: 'IP Address',
        example_zh: '192.168.1.1',
        example_en: '192.168.1.1'
    },
    date: {
        pattern: '\\d{4}-\\d{2}-\\d{2}',
        name_zh: '日期(YYYY-MM-DD)',
        name_en: 'Date (YYYY-MM-DD)',
        example_zh: '2025-10-04',
        example_en: '2025-10-04'
    },
    chineseChar: {
        pattern: '[\\u4e00-\\u9fa5]+',
        name_zh: '中文字符',
        name_en: 'Chinese Characters',
        example_zh: '你好世界',
        example_en: '你好世界'
    },
    number: {
        pattern: '-?\\d+(\\.\\d+)?',
        name_zh: '数字（整数或小数）',
        name_en: 'Number (Int or Float)',
        example_zh: '123.45 或 -67',
        example_en: '123.45 or -67'
    },
    hexColor: {
        pattern: '#[0-9A-Fa-f]{6}',
        name_zh: '十六进制颜色',
        name_en: 'Hex Color',
        example_zh: '#FF5733',
        example_en: '#FF5733'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    initRegexTester();
});

/**
 * 初始化正则表达式测试工具
 */
function initRegexTester() {
    const patternInput = document.getElementById('regex-pattern');
    const flagCheckboxes = document.querySelectorAll('.flag-checkbox');
    const testTextArea = document.getElementById('test-text');
    const replaceButton = document.getElementById('replace-button');
    const replaceTextInput = document.getElementById('replace-text');
    const copyReplaceButton = document.getElementById('copy-replace-button');
    
    // 获取当前语言
    function getLangIsZh() {
        return (document.documentElement.lang || 'zh-CN').startsWith('zh');
    }
    
    // 运行测试
    function runTest() {
        const pattern = patternInput.value;
        const flags = getFlags();
        const text = testTextArea.value;
        
        // 清除之前的错误提示
        hideError();
        
        if (!pattern) {
            clearResults();
            return;
        }
        
        const result = testRegex(pattern, flags, text);
        
        if (result.success) {
            displayResults(result.matches);
        } else {
            showError(result.error);
            clearResults();
        }
    }
    
    // 获取标志
    function getFlags() {
        return Array.from(flagCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value)
            .join('');
    }
    
    // 显示错误
    function showError(error) {
        const errorDiv = document.getElementById('regex-error');
        const isZh = getLangIsZh();
        errorDiv.textContent = (isZh ? '正则表达式错误：' : 'Regex Error: ') + error;
        errorDiv.classList.remove('hidden');
    }
    
    // 隐藏错误
    function hideError() {
        const errorDiv = document.getElementById('regex-error');
        errorDiv.classList.add('hidden');
    }
    
    // 清空结果
    function clearResults() {
        const isZh = getLangIsZh();
        document.getElementById('match-count').textContent = '0';
        document.getElementById('group-count').textContent = '0';
        document.getElementById('match-details').innerHTML = `<p class="text-gray-500 text-center py-8">${isZh ? '暂无匹配结果' : 'No matches yet'}</p>`;
    }
    
    // 显示结果
    function displayResults(matches) {
        const isZh = getLangIsZh();
        
        // 更新统计
        document.getElementById('match-count').textContent = matches.length;
        const groupCount = matches.length > 0 ? matches[0].groups.length : 0;
        document.getElementById('group-count').textContent = groupCount;
        
        // 显示匹配详情
        const detailsDiv = document.getElementById('match-details');
        
        if (matches.length === 0) {
            detailsDiv.innerHTML = `<p class="text-gray-500 text-center py-8">${isZh ? '没有找到匹配项' : 'No matches found'}</p>`;
            return;
        }
        
        let html = '';
        matches.forEach((match, index) => {
            html += `
                <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-semibold text-gray-700">${isZh ? '匹配' : 'Match'} #${index + 1}</span>
                        <span class="text-xs text-gray-500">${isZh ? '位置' : 'Position'}: ${match.index}</span>
                    </div>
                    <div class="mb-2">
                        <span class="text-sm text-gray-600">${isZh ? '完整匹配' : 'Full Match'}:</span>
                        <code class="ml-2 px-2 py-1 bg-yellow-100 rounded text-sm font-mono">${escapeHtml(match.fullMatch)}</code>
                    </div>
                    ${match.groups.length > 0 ? `
                        <div class="mt-2">
                            <span class="text-sm text-gray-600">${isZh ? '捕获组' : 'Capture Groups'}:</span>
                            <div class="mt-1 space-y-1">
                                ${match.groups.map((group, i) => `
                                    <div>
                                        <span class="text-xs text-gray-500">$${i + 1}:</span>
                                        <code class="ml-2 px-2 py-1 bg-blue-100 rounded text-sm font-mono">${escapeHtml(group)}</code>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        });
        
        detailsDiv.innerHTML = html;
    }
    
    // 事件监听
    patternInput.addEventListener('input', runTest);
    testTextArea.addEventListener('input', runTest);
    flagCheckboxes.forEach(cb => cb.addEventListener('change', runTest));
    
    // 替换功能
    replaceButton.addEventListener('click', () => {
        const pattern = patternInput.value;
        const flags = getFlags();
        const text = testTextArea.value;
        const replacement = replaceTextInput.value;
        
        if (!pattern) {
            const isZh = getLangIsZh();
            if (typeof showNotification === 'function') {
                showNotification(isZh ? '请先输入正则表达式' : 'Please enter a regex pattern', 'error');
            }
            return;
        }
        
        const result = replaceWithRegex(text, pattern, flags, replacement);
        
        if (result.success) {
            document.getElementById('replace-output').value = result.text;
            document.getElementById('replace-result').classList.remove('hidden');
            const isZh = getLangIsZh();
            if (typeof showNotification === 'function') {
                showNotification(isZh ? '替换完成' : 'Replacement completed', 'success');
            }
        } else {
            const isZh = getLangIsZh();
            if (typeof showNotification === 'function') {
                showNotification(isZh ? '替换失败：' + result.error : 'Replacement failed: ' + result.error, 'error');
            }
        }
    });
    
    // 复制替换结果
    copyReplaceButton?.addEventListener('click', async () => {
        const output = document.getElementById('replace-output').value;
        const success = await copyToClipboard(output);
        const isZh = getLangIsZh();
        if (success) {
            if (typeof showNotification === 'function') {
                showNotification(isZh ? '已复制到剪贴板' : 'Copied to clipboard', 'success');
            }
        } else {
            if (typeof showNotification === 'function') {
                showNotification(isZh ? '复制失败' : 'Copy failed', 'error');
            }
        }
    });
    
    // 生成常用模式库
    generatePatternLibrary();
    
    // 初始运行一次
    runTest();
}

/**
 * 测试正则表达式
 * @param {string} pattern - 正则表达式模式
 * @param {string} flags - 标志
 * @param {string} text - 测试文本
 * @returns {Object} 测试结果
 */
function testRegex(pattern, flags, text) {
    try {
        const regex = new RegExp(pattern, flags);
        const matches = [];
        
        if (flags.includes('g')) {
            let match;
            while ((match = regex.exec(text)) !== null) {
                matches.push({
                    fullMatch: match[0],
                    groups: match.slice(1),
                    index: match.index
                });
                // 防止无限循环
                if (match.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
            }
        } else {
            const match = regex.exec(text);
            if (match) {
                matches.push({
                    fullMatch: match[0],
                    groups: match.slice(1),
                    index: match.index
                });
            }
        }
        
        return { success: true, matches };
    } catch (e) {
        return { success: false, error: e.message };
    }
}

/**
 * 正则替换
 * @param {string} text - 原始文本
 * @param {string} pattern - 正则表达式模式
 * @param {string} flags - 标志
 * @param {string} replacement - 替换文本
 * @returns {Object} 替换结果
 */
function replaceWithRegex(text, pattern, flags, replacement) {
    try {
        const regex = new RegExp(pattern, flags);
        const result = text.replace(regex, replacement);
        return { success: true, text: result };
    } catch (e) {
        return { success: false, error: e.message };
    }
}

/**
 * HTML转义
 * @param {string} text - 要转义的文本
 * @returns {string} 转义后的文本
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * 生成常用模式库
 */
function generatePatternLibrary() {
    const isZh = (document.documentElement.lang || 'zh-CN').startsWith('zh');
    const libraryDiv = document.getElementById('pattern-library');
    
    let html = '';
    Object.keys(commonPatterns).forEach(key => {
        const p = commonPatterns[key];
        const name = isZh ? p.name_zh : p.name_en;
        const example = isZh ? p.example_zh : p.example_en;
        
        html += `
            <div class="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer pattern-card" data-pattern="${escapeHtml(p.pattern)}">
                <h4 class="font-semibold text-gray-900 mb-2">${name}</h4>
                <code class="text-xs bg-white px-2 py-1 rounded block mb-2 text-gray-700 break-all">${escapeHtml(p.pattern)}</code>
                <p class="text-xs text-gray-500">${isZh ? '示例' : 'Example'}: ${example}</p>
            </div>
        `;
    });
    
    libraryDiv.innerHTML = html;
    
    // 添加点击事件
    document.querySelectorAll('.pattern-card').forEach(card => {
        card.addEventListener('click', () => {
            const pattern = card.getAttribute('data-pattern');
            document.getElementById('regex-pattern').value = pattern;
            
            // 触发测试
            const event = new Event('input');
            document.getElementById('regex-pattern').dispatchEvent(event);
            
            // 滚动到顶部
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            const isZh = (document.documentElement.lang || 'zh-CN').startsWith('zh');
            if (typeof showNotification === 'function') {
                showNotification(isZh ? '已应用模式' : 'Pattern applied', 'info');
            }
        });
    });
}

