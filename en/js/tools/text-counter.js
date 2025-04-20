/**
 * 字符计数工具JavaScript文件
 * 实现文本分析和计数功能
 */

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化字符计数工具
    initTextCounter();
});

/**
 * 初始化字符计数工具
 * 设置事件监听和初始状态
 */
function initTextCounter() {
    // 获取DOM元素
    const textInput = document.getElementById('text-input');
    const clearButton = document.getElementById('clear-button');
    const sampleButton = document.getElementById('sample-button');
    const copyButton = document.getElementById('copy-button');
    
    // 页面加载完成后先运行一次统计（如果有初始文本）
    if (textInput && textInput.value) {
        countText(textInput.value);
    }
    
    // 监听文本输入事件
    if (textInput) {
        textInput.addEventListener('input', function() {
            countText(this.value);
        });
    }
    
    // 清空按钮事件
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            if (textInput) {
                textInput.value = '';
                countText('');
                const lang = document.documentElement.lang || 'zh-CN';
                const message = lang.startsWith('zh') ? '文本已清空' : 'Text cleared';
                const type = 'info';
                showNotification(message, type);
            }
        });
    }
    
    // 插入示例文本按钮事件
    if (sampleButton) {
        sampleButton.addEventListener('click', function() {
            if (textInput) {
                textInput.value = getSampleText();
                countText(textInput.value);
                const lang = document.documentElement.lang || 'zh-CN';
                const message = lang.startsWith('zh') ? '已插入示例文本' : 'Sample text inserted';
                const type = 'info';
                showNotification(message, type);
            }
        });
    }
    
    // 复制文本按钮事件
    if (copyButton) {
        copyButton.addEventListener('click', async function() {
            if (textInput && textInput.value) {
                const lang = document.documentElement.lang || 'zh-CN';
                const success = await copyToClipboard(textInput.value);
                if (success) {
                    const successMsg = lang.startsWith('zh') ? '文本已复制到剪贴板' : 'Text copied to clipboard';
                    showNotification(successMsg, 'success');
                } else {
                    const errorMsg = lang.startsWith('zh') ? '复制失败，请手动选择并复制' : 'Copy failed, please select and copy manually';
                    showNotification(errorMsg, 'error');
                }
            } else {
                const lang = document.documentElement.lang || 'zh-CN';
                const noTextMsg = lang.startsWith('zh') ? '没有可复制的文本' : 'No text to copy';
                showNotification(noTextMsg, 'error');
            }
        });
    }
}

/**
 * 统计文本信息并更新显示
 * @param {string} text - 要统计的文本
 */
function countText(text) {
    // 基本统计
    updateBasicCounts(text);
    
    // 字符分类统计
    updateCharacterTypeCounts(text);
    
    // 阅读时间估算
    updateReadingTime(text);
}

/**
 * 更新基本计数信息
 * @param {string} text - 要统计的文本
 */
function updateBasicCounts(text) {
    // 字符总数（包括空格和换行符）
    document.getElementById('char-count').textContent = text.length;
    
    // 单词数（通过空格分隔）
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    document.getElementById('word-count').textContent = wordCount;
    
    // 句子数（通过常见的句号、问号、感叹号等分隔）
    const sentenceCount = text.trim() === '' ? 0 : text.split(/[.!?。！？]+/).filter(s => s.trim() !== '').length;
    document.getElementById('sentence-count').textContent = sentenceCount;
    
    // 段落数（通过换行符分隔）
    const paragraphCount = text.trim() === '' ? 0 : text.split(/\n+/).filter(p => p.trim() !== '').length;
    document.getElementById('paragraph-count').textContent = paragraphCount;
    
    // 行数
    const lineCount = text.trim() === '' ? 0 : text.split('\n').length;
    document.getElementById('line-count').textContent = lineCount;
}

/**
 * 更新字符类型统计
 * @param {string} text - 要统计的文本
 */
function updateCharacterTypeCounts(text) {
    // 中文字符数量
    const chineseCount = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    document.getElementById('chinese-count').textContent = chineseCount;
    
    // 英文字母数量
    const alphaCount = (text.match(/[a-zA-Z]/g) || []).length;
    document.getElementById('alpha-count').textContent = alphaCount;
    
    // 数字数量
    const digitCount = (text.match(/\d/g) || []).length;
    document.getElementById('digit-count').textContent = digitCount;
    
    // 标点符号数量（常见中英文标点）
    const punctuationCount = (text.match(/[.,\/#!$%\^&\*;:{}=\-_`~()。，、；：？！……—·《》「」『』【】（）]/g) || []).length;
    document.getElementById('punctuation-count').textContent = punctuationCount;
    
    // 空格数量
    const spaceCount = (text.match(/\s/g) || []).length;
    document.getElementById('space-count').textContent = spaceCount;
}

/**
 * 更新阅读时间估算
 * @param {string} text - 要估算的文本
 */
function updateReadingTime(text) {
    // 中文和英文的阅读速度不同，需要分开计算
    // 假设中文阅读速度: 300字/分钟，英文阅读速度: 200词/分钟
    
    // 计算中文字符
    const chineseCount = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    const chineseTime = chineseCount / 300;
    
    // 计算英文单词（简化处理，按空格分词）
    const words = text.replace(/[\u4e00-\u9fa5]/g, '').trim().split(/\s+/);
    const wordCount = words.length && words[0] !== '' ? words.length : 0;
    const englishTime = wordCount / 200;
    
    // 总阅读时间（分钟）
    let totalMinutes = chineseTime + englishTime;
    
    // 当前页面语言
    const lang = document.documentElement.lang || 'zh-CN';
    const isChineseLang = lang.startsWith('zh');
    
    // 如果阅读时间太短，按秒显示；否则按分钟显示
    let readingTimeText;
    if (totalMinutes < 1/60) {
        readingTimeText = isChineseLang ? '不到1秒' : 'less than 1 second';
    } else if (totalMinutes < 1) {
        const seconds = Math.ceil(totalMinutes * 60);
        readingTimeText = isChineseLang ? (seconds + ' 秒') : (seconds + ' seconds');
    } else {
        // 如果超过1分钟，显示分和秒
        const minutes = Math.floor(totalMinutes);
        const seconds = Math.ceil((totalMinutes - minutes) * 60);
        
        if (seconds > 0) {
            readingTimeText = isChineseLang 
                ? (minutes + ' 分 ' + seconds + ' 秒')
                : (minutes + ' min ' + seconds + ' sec');
        } else {
            readingTimeText = isChineseLang 
                ? (minutes + ' 分钟')
                : (minutes + (minutes === 1 ? ' minute' : ' minutes'));
        }
    }
    
    // 更新显示
    document.getElementById('reading-time').textContent = readingTimeText;
}

/**
 * 获取示例文本
 * @returns {string} 示例文本
 */
function getSampleText() {
    // 根据当前页面语言返回对应示例文本
    const lang = document.documentElement.lang || 'zh-CN';
    
    if (lang.startsWith('zh')) {
        // 中文示例
        return `文字处理工具网站

核心功能
1. 字符计数
   - 实时计数（边输入边显示）
   - 分类计数（字母、数字、标点符号、空格、中文字符等）
   - 计算阅读时间估算
   - 提供字数统计报告

2. 文本转换
   - 大小写转换
   - 简繁体中文转换
   - 文本排序（按行/按字母顺序）
   - 移除重复行

这是一个用于演示的中文示例文本，包含了各种不同类型的字符：
数字如123、456，英文字母如abc、XYZ，以及中文标点符号，如：。，、；：""''？！等。

该工具支持对以上所有内容进行统计和分析，帮助用户快速了解文本的组成和结构。`;
    } else {
        // 英文示例
        return `Text Processing Tools Website

Core Features
1. Character Counter
   - Real-time counting (count as you type)
   - Categorized counting (letters, numbers, punctuation, spaces, Chinese characters, etc.)
   - Reading time estimation
   - Provides word count reports

2. Text Conversion
   - Case conversion
   - Simplified/Traditional Chinese conversion
   - Text sorting (by line/alphabetical order)
   - Remove duplicate lines

This is an English sample text for demonstration, containing various character types:
Numbers like 123, 456, English letters like abc, XYZ, and punctuation marks, such as: .,;:""''?! etc.

This tool supports statistics and analysis of all the above content, helping users quickly understand the composition and structure of the text.`;
    }
}