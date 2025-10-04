/**
 * 文本编码/解码工具JavaScript文件
 * 实现Base64、URL、Unicode、HTML、JWT、进制转换等功能
 */

document.addEventListener('DOMContentLoaded', function() {
    initTextEncoder();
});

/**
 * 初始化文本编码工具
 */
function initTextEncoder() {
    const inputArea = document.getElementById('input-text');
    const outputArea = document.getElementById('output-text');
    
    // 获取当前语言
    function getLangIsZh() {
        return (document.documentElement.lang || 'zh-CN').startsWith('zh');
    }
    
    // 通知函数
    function notify(msgKey, type = 'info') {
        const isZh = getLangIsZh();
        const messages = {
            cleared: isZh ? '已清空' : 'Cleared',
            copied: isZh ? '结果已复制到剪贴板' : 'Result copied to clipboard',
            noText: isZh ? '没有可复制的内容' : 'No content to copy',
            swapped: isZh ? '已交换输入输出' : 'Input and output swapped',
            encoded: isZh ? '编码完成' : 'Encoded',
            decoded: isZh ? '解码完成' : 'Decoded',
            converted: isZh ? '转换完成' : 'Converted',
            error: isZh ? '操作失败' : 'Operation failed'
        };
        if (typeof showNotification === 'function') {
            showNotification(messages[msgKey] || msgKey, type);
        }
    }
    
    // Base64 编码
    document.getElementById('base64-encode')?.addEventListener('click', () => {
        if (!inputArea.value) {
            notify('noText', 'error');
            return;
        }
        outputArea.value = base64Encode(inputArea.value);
        notify('encoded', 'success');
    });
    
    // Base64 解码
    document.getElementById('base64-decode')?.addEventListener('click', () => {
        if (!inputArea.value) {
            notify('noText', 'error');
            return;
        }
        outputArea.value = base64Decode(inputArea.value);
        notify('decoded', 'success');
    });
    
    // URL 编码
    document.getElementById('url-encode')?.addEventListener('click', () => {
        if (!inputArea.value) {
            notify('noText', 'error');
            return;
        }
        outputArea.value = urlEncode(inputArea.value);
        notify('encoded', 'success');
    });
    
    // URL 解码
    document.getElementById('url-decode')?.addEventListener('click', () => {
        if (!inputArea.value) {
            notify('noText', 'error');
            return;
        }
        outputArea.value = urlDecode(inputArea.value);
        notify('decoded', 'success');
    });
    
    // Unicode 转义
    document.getElementById('unicode-escape')?.addEventListener('click', () => {
        if (!inputArea.value) {
            notify('noText', 'error');
            return;
        }
        outputArea.value = unicodeEscape(inputArea.value);
        notify('encoded', 'success');
    });
    
    // Unicode 反转义
    document.getElementById('unicode-unescape')?.addEventListener('click', () => {
        if (!inputArea.value) {
            notify('noText', 'error');
            return;
        }
        outputArea.value = unicodeUnescape(inputArea.value);
        notify('decoded', 'success');
    });
    
    // HTML 编码
    document.getElementById('html-encode')?.addEventListener('click', () => {
        if (!inputArea.value) {
            notify('noText', 'error');
            return;
        }
        outputArea.value = htmlEncode(inputArea.value);
        notify('encoded', 'success');
    });
    
    // HTML 解码
    document.getElementById('html-decode')?.addEventListener('click', () => {
        if (!inputArea.value) {
            notify('noText', 'error');
            return;
        }
        outputArea.value = htmlDecode(inputArea.value);
        notify('decoded', 'success');
    });
    
    // JWT 解析
    document.getElementById('jwt-parse')?.addEventListener('click', () => {
        if (!inputArea.value) {
            notify('noText', 'error');
            return;
        }
        outputArea.value = parseJWT(inputArea.value);
        notify('decoded', 'success');
    });
    
    // 十进制转十六进制
    document.getElementById('dec-to-hex')?.addEventListener('click', () => {
        if (!inputArea.value) {
            notify('noText', 'error');
            return;
        }
        outputArea.value = convertBase(inputArea.value, 10, 16);
        notify('converted', 'success');
    });
    
    // 十六进制转十进制
    document.getElementById('hex-to-dec')?.addEventListener('click', () => {
        if (!inputArea.value) {
            notify('noText', 'error');
            return;
        }
        outputArea.value = convertBase(inputArea.value, 16, 10);
        notify('converted', 'success');
    });
    
    // 十进制转二进制
    document.getElementById('dec-to-bin')?.addEventListener('click', () => {
        if (!inputArea.value) {
            notify('noText', 'error');
            return;
        }
        outputArea.value = convertBase(inputArea.value, 10, 2);
        notify('converted', 'success');
    });
    
    // 二进制转十进制
    document.getElementById('bin-to-dec')?.addEventListener('click', () => {
        if (!inputArea.value) {
            notify('noText', 'error');
            return;
        }
        outputArea.value = convertBase(inputArea.value, 2, 10);
        notify('converted', 'success');
    });
    
    // 清空按钮
    document.getElementById('clear-button')?.addEventListener('click', () => {
        inputArea.value = '';
        outputArea.value = '';
        notify('cleared', 'info');
    });
    
    // 示例按钮
    document.getElementById('sample-button')?.addEventListener('click', () => {
        const isZh = getLangIsZh();
        inputArea.value = isZh 
            ? 'Hello World! 你好世界！\n这是一个测试文本 😊' 
            : 'Hello World! This is a test text 😊\nMultiple lines supported!';
        outputArea.value = '';
        notify('noText', 'info');
    });
    
    // 复制结果按钮
    document.getElementById('copy-button')?.addEventListener('click', async () => {
        if (!outputArea.value) {
            notify('noText', 'error');
            return;
        }
        const success = await copyToClipboard(outputArea.value);
        if (success) {
            notify('copied', 'success');
        } else {
            notify('error', 'error');
        }
    });
    
    // 交换输入输出按钮
    document.getElementById('swap-button')?.addEventListener('click', () => {
        const temp = inputArea.value;
        inputArea.value = outputArea.value;
        outputArea.value = temp;
        notify('swapped', 'info');
    });
}

/**
 * Base64 编码
 * @param {string} text - 要编码的文本
 * @returns {string} 编码后的结果
 */
function base64Encode(text) {
    try {
        // 处理Unicode字符
        return btoa(unescape(encodeURIComponent(text)));
    } catch (e) {
        const isZh = (document.documentElement.lang || 'zh-CN').startsWith('zh');
        return isZh ? '[错误] 编码失败' : '[Error] Encoding failed';
    }
}

/**
 * Base64 解码
 * @param {string} text - 要解码的Base64文本
 * @returns {string} 解码后的结果
 */
function base64Decode(text) {
    try {
        // 处理Unicode字符
        return decodeURIComponent(escape(atob(text)));
    } catch (e) {
        const isZh = (document.documentElement.lang || 'zh-CN').startsWith('zh');
        return isZh ? '[错误] 解码失败：可能不是有效的Base64' : '[Error] Decoding failed: Invalid Base64';
    }
}

/**
 * URL 编码
 * @param {string} text - 要编码的文本
 * @returns {string} 编码后的结果
 */
function urlEncode(text) {
    try {
        return encodeURIComponent(text);
    } catch (e) {
        const isZh = (document.documentElement.lang || 'zh-CN').startsWith('zh');
        return isZh ? '[错误] 编码失败' : '[Error] Encoding failed';
    }
}

/**
 * URL 解码
 * @param {string} text - 要解码的URL文本
 * @returns {string} 解码后的结果
 */
function urlDecode(text) {
    try {
        return decodeURIComponent(text);
    } catch (e) {
        const isZh = (document.documentElement.lang || 'zh-CN').startsWith('zh');
        return isZh ? '[错误] 解码失败' : '[Error] Decoding failed';
    }
}

/**
 * Unicode 转义
 * @param {string} text - 要转义的文本
 * @returns {string} 转义后的结果
 */
function unicodeEscape(text) {
    try {
        return text.split('').map(char => {
            const code = char.charCodeAt(0);
            // 只转义非ASCII字符
            if (code > 127) {
                return '\\u' + code.toString(16).padStart(4, '0');
            }
            return char;
        }).join('');
    } catch (e) {
        const isZh = (document.documentElement.lang || 'zh-CN').startsWith('zh');
        return isZh ? '[错误] 转义失败' : '[Error] Escape failed';
    }
}

/**
 * Unicode 反转义
 * @param {string} text - 要反转义的文本
 * @returns {string} 反转义后的结果
 */
function unicodeUnescape(text) {
    try {
        return text.replace(/\\u([\dA-Fa-f]{4})/g, (match, grp) => {
            return String.fromCharCode(parseInt(grp, 16));
        });
    } catch (e) {
        const isZh = (document.documentElement.lang || 'zh-CN').startsWith('zh');
        return isZh ? '[错误] 反转义失败' : '[Error] Unescape failed';
    }
}

/**
 * HTML 实体编码
 * @param {string} text - 要编码的文本
 * @returns {string} 编码后的结果
 */
function htmlEncode(text) {
    try {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    } catch (e) {
        const isZh = (document.documentElement.lang || 'zh-CN').startsWith('zh');
        return isZh ? '[错误] 编码失败' : '[Error] Encoding failed';
    }
}

/**
 * HTML 实体解码
 * @param {string} text - 要解码的HTML实体文本
 * @returns {string} 解码后的结果
 */
function htmlDecode(text) {
    try {
        const div = document.createElement('div');
        div.innerHTML = text;
        return div.textContent || div.innerText || '';
    } catch (e) {
        const isZh = (document.documentElement.lang || 'zh-CN').startsWith('zh');
        return isZh ? '[错误] 解码失败' : '[Error] Decoding failed';
    }
}

/**
 * JWT Token 解析
 * @param {string} token - JWT Token
 * @returns {string} 解析后的JSON字符串
 */
function parseJWT(token) {
    try {
        const parts = token.trim().split('.');
        if (parts.length !== 3) {
            const isZh = (document.documentElement.lang || 'zh-CN').startsWith('zh');
            return isZh ? '[错误] 不是有效的JWT格式（应包含3个部分）' : '[Error] Invalid JWT format (should have 3 parts)';
        }
        
        const header = JSON.parse(base64Decode(parts[0]));
        const payload = JSON.parse(base64Decode(parts[1]));
        
        return JSON.stringify({ 
            header, 
            payload,
            signature: parts[2]
        }, null, 2);
    } catch (e) {
        const isZh = (document.documentElement.lang || 'zh-CN').startsWith('zh');
        return isZh ? '[错误] JWT解析失败：' + e.message : '[Error] JWT parsing failed: ' + e.message;
    }
}

/**
 * 进制转换
 * @param {string} text - 要转换的数字
 * @param {number} fromBase - 源进制（2、10、16）
 * @param {number} toBase - 目标进制（2、10、16）
 * @returns {string} 转换后的结果
 */
function convertBase(text, fromBase, toBase) {
    try {
        const trimmed = text.trim();
        if (!trimmed) {
            const isZh = (document.documentElement.lang || 'zh-CN').startsWith('zh');
            return isZh ? '[错误] 输入为空' : '[Error] Empty input';
        }
        
        const num = parseInt(trimmed, fromBase);
        if (isNaN(num)) {
            const isZh = (document.documentElement.lang || 'zh-CN').startsWith('zh');
            return isZh ? '[错误] 无效的数字' : '[Error] Invalid number';
        }
        
        return num.toString(toBase).toUpperCase();
    } catch (e) {
        const isZh = (document.documentElement.lang || 'zh-CN').startsWith('zh');
        return isZh ? '[错误] 转换失败' : '[Error] Conversion failed';
    }
}

