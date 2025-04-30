document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const originalTextArea = document.getElementById('text-original');
    const modifiedTextArea = document.getElementById('text-modified');
    const compareButton = document.getElementById('compare-button');
    const resultContainer = document.getElementById('result-container');
    const diffSummary = document.getElementById('diff-summary');
    const diffOriginal = document.getElementById('diff-original');
    const diffModified = document.getElementById('diff-modified');
    const ignoreCase = document.getElementById('ignore-case');
    const ignoreWhitespace = document.getElementById('ignore-whitespace');
    const wordLevel = document.getElementById('word-level');
    const lineLevel = document.getElementById('line-level');
    const clearOriginal = document.getElementById('clear-original');
    const clearModified = document.getElementById('clear-modified');
    const sampleOriginal = document.getElementById('sample-original');
    const sampleModified = document.getElementById('sample-modified');
    const mergeLeft = document.getElementById('merge-left');
    const mergeRight = document.getElementById('merge-right');
    const mergeBoth = document.getElementById('merge-both');
    const mergedTextContainer = document.getElementById('merged-text-container');
    const mergedText = document.getElementById('merged-text');
    const copyMerged = document.getElementById('copy-merged');

    // 点击事件 - 比较按钮
    compareButton.addEventListener('click', function() {
        compareTexts();
    });

    // 点击事件 - 清空按钮
    clearOriginal.addEventListener('click', function() {
        originalTextArea.value = '';
    });
    
    clearModified.addEventListener('click', function() {
        modifiedTextArea.value = '';
    });

    // 点击事件 - 示例按钮
    sampleOriginal.addEventListener('click', function() {
        // 检测语言
        const isEnglish = document.documentElement.lang === 'en';
        
        if (isEnglish) {
            originalTextArea.value = 
`This is a sample text.
Used to demonstrate the text comparison feature.
This line is exactly the same.
This line will be deleted.
This line has some small modifications.
The last line is exactly the same.`;
        } else {
            originalTextArea.value = 
`这是一个示例文本。
用于演示文本比较功能。
这一行完全相同。
这一行将被删除。
这一行有一些小的修改。
最后一行是完全相同的。`;
        }
    });

    sampleModified.addEventListener('click', function() {
        // 检测语言
        const isEnglish = document.documentElement.lang === 'en';
        
        if (isEnglish) {
            modifiedTextArea.value = 
`This is a sample text.
Used to demonstrate the text comparison and difference feature.
This line is exactly the same.
This line will be added.
This line has some subtle changes.
The last line is exactly the same.`;
        } else {
            modifiedTextArea.value = 
`这是一个示例文本。
用于演示文本比较与差异的功能。
这一行完全相同。
这一行将被添加进来。
这一行有一些细微的变化。
最后一行是完全相同的。`;
        }
    });

    // 点击事件 - 合并按钮
    mergeLeft.addEventListener('click', function() {
        // 合并到原始文本
        mergeTexts('left');
    });

    mergeRight.addEventListener('click', function() {
        // 合并到修改后文本
        mergeTexts('right');
    });

    mergeBoth.addEventListener('click', function() {
        // 创建新的合并文本
        mergeTexts('both');
    });

    // 点击事件 - 复制合并文本
    copyMerged.addEventListener('click', function() {
        mergedText.select();
        document.execCommand('copy');
        
        // 根据语言显示提示
        const isEnglish = document.documentElement.lang === 'en';
        if (isEnglish) {
            alert('Copied to clipboard');
        } else {
            alert('已复制到剪贴板');
        }
    });

    // 单选框事件 - 互斥选择
    wordLevel.addEventListener('change', function() {
        if (this.checked) {
            lineLevel.checked = false;
        }
    });

    lineLevel.addEventListener('change', function() {
        if (this.checked) {
            wordLevel.checked = false;
        }
    });

    // 比较文本函数
    function compareTexts() {
        let original = originalTextArea.value;
        let modified = modifiedTextArea.value;

        // 应用选项
        if (ignoreCase.checked) {
            original = original.toLowerCase();
            modified = modified.toLowerCase();
        }

        if (ignoreWhitespace.checked) {
            original = original.replace(/\s+/g, ' ').trim();
            modified = modified.replace(/\s+/g, ' ').trim();
        }

        // 处理比较级别
        let diffResult;
        if (wordLevel.checked) {
            diffResult = compareByWords(original, modified);
        } else {
            // 默认使用行级别比较
            diffResult = compareByLines(original, modified);
        }

        // 显示结果
        displayResults(diffResult);
    }

    // 按行比较
    function compareByLines(original, modified) {
        const originalLines = original.split('\n');
        const modifiedLines = modified.split('\n');
        
        let summary = {
            added: 0,
            removed: 0,
            modified: 0,
            unchanged: 0
        };

        let originalDiff = [];
        let modifiedDiff = [];

        // 使用最长公共子序列算法找出差异
        const lcs = findLCS(originalLines, modifiedLines);
        let i = 0, j = 0;

        while (i < originalLines.length || j < modifiedLines.length) {
            if (i < originalLines.length && j < modifiedLines.length && originalLines[i] === modifiedLines[j] && lcs.includes(originalLines[i])) {
                // 相同行
                originalDiff.push({ type: 'unchanged', text: originalLines[i] });
                modifiedDiff.push({ type: 'unchanged', text: modifiedLines[j] });
                summary.unchanged++;
                i++;
                j++;
            } else if (j < modifiedLines.length && (i >= originalLines.length || !lcs.includes(modifiedLines[j]))) {
                // 添加的行
                modifiedDiff.push({ type: 'added', text: modifiedLines[j] });
                summary.added++;
                j++;
            } else if (i < originalLines.length && (j >= modifiedLines.length || !lcs.includes(originalLines[i]))) {
                // 删除的行
                originalDiff.push({ type: 'removed', text: originalLines[i] });
                summary.removed++;
                i++;
            } else {
                // 修改的行
                originalDiff.push({ type: 'modified', text: originalLines[i] });
                modifiedDiff.push({ type: 'modified', text: modifiedLines[j] });
                summary.modified++;
                i++;
                j++;
            }
        }

        return {
            summary: summary,
            originalDiff: originalDiff,
            modifiedDiff: modifiedDiff
        };
    }

    // 按词比较
    function compareByWords(original, modified) {
        const originalWords = original.split(/\s+/);
        const modifiedWords = modified.split(/\s+/);
        
        let summary = {
            added: 0,
            removed: 0,
            modified: 0,
            unchanged: 0
        };

        let originalDiff = [];
        let modifiedDiff = [];

        // 使用最长公共子序列算法找出差异
        const lcs = findLCS(originalWords, modifiedWords);
        let i = 0, j = 0;

        while (i < originalWords.length || j < modifiedWords.length) {
            if (i < originalWords.length && j < modifiedWords.length && originalWords[i] === modifiedWords[j] && lcs.includes(originalWords[i])) {
                // 相同词
                originalDiff.push({ type: 'unchanged', text: originalWords[i] });
                modifiedDiff.push({ type: 'unchanged', text: modifiedWords[j] });
                summary.unchanged++;
                i++;
                j++;
            } else if (j < modifiedWords.length && (i >= originalWords.length || !lcs.includes(modifiedWords[j]))) {
                // 添加的词
                modifiedDiff.push({ type: 'added', text: modifiedWords[j] });
                summary.added++;
                j++;
            } else if (i < originalWords.length && (j >= modifiedWords.length || !lcs.includes(originalWords[i]))) {
                // 删除的词
                originalDiff.push({ type: 'removed', text: originalWords[i] });
                summary.removed++;
                i++;
            } else {
                // 修改的词
                originalDiff.push({ type: 'modified', text: originalWords[i] });
                modifiedDiff.push({ type: 'modified', text: modifiedWords[j] });
                summary.modified++;
                i++;
                j++;
            }
        }

        return {
            summary: summary,
            originalDiff: originalDiff.map(item => ({ ...item, text: item.text + ' ' })),
            modifiedDiff: modifiedDiff.map(item => ({ ...item, text: item.text + ' ' }))
        };
    }

    // 最长公共子序列算法
    function findLCS(a, b) {
        const m = a.length;
        const n = b.length;
        const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
        
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (a[i - 1] === b[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        
        // 回溯找出LCS
        const lcs = [];
        let i = m, j = n;
        while (i > 0 && j > 0) {
            if (a[i - 1] === b[j - 1]) {
                lcs.unshift(a[i - 1]);
                i--;
                j--;
            } else if (dp[i - 1][j] > dp[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }
        
        return lcs;
    }

    // 显示比较结果
    function displayResults(diffResult) {
        // 显示差异摘要
        const { summary, originalDiff, modifiedDiff } = diffResult;
        diffSummary.innerHTML = `
            <p>总共发现 <strong>${summary.added + summary.removed + summary.modified}</strong> 处差异：</p>
            <ul class="list-disc pl-5 mt-2">
                <li>添加: <span class="text-green-600 font-medium">${summary.added}</span> 处</li>
                <li>删除: <span class="text-red-600 font-medium">${summary.removed}</span> 处</li>
                <li>修改: <span class="text-yellow-600 font-medium">${summary.modified}</span> 处</li>
                <li>未变: <span class="text-gray-600 font-medium">${summary.unchanged}</span> 处</li>
            </ul>
        `;

        // 显示原始文本差异
        diffOriginal.innerHTML = '';
        originalDiff.forEach(item => {
            const span = document.createElement('span');
            span.textContent = item.text;
            
            if (item.type === 'removed') {
                span.className = 'bg-red-100 text-red-800';
            } else if (item.type === 'modified') {
                span.className = 'bg-yellow-100 text-yellow-800';
            }
            
            diffOriginal.appendChild(span);
            
            if (wordLevel.checked) {
                // 对于单词级别，不添加换行
            } else {
                // 对于行级别，添加换行
                diffOriginal.appendChild(document.createElement('br'));
            }
        });

        // 显示修改后文本差异
        diffModified.innerHTML = '';
        modifiedDiff.forEach(item => {
            const span = document.createElement('span');
            span.textContent = item.text;
            
            if (item.type === 'added') {
                span.className = 'bg-green-100 text-green-800';
            } else if (item.type === 'modified') {
                span.className = 'bg-yellow-100 text-yellow-800';
            }
            
            diffModified.appendChild(span);
            
            if (wordLevel.checked) {
                // 对于单词级别，不添加换行
            } else {
                // 对于行级别，添加换行
                diffModified.appendChild(document.createElement('br'));
            }
        });

        // 显示结果容器
        resultContainer.classList.remove('hidden');
    }

    // 合并文本函数
    function mergeTexts(direction) {
        let result = '';
        
        if (direction === 'left') {
            // 合并到原始文本
            const original = originalTextArea.value.split('\n');
            const modified = modifiedTextArea.value.split('\n');
            const lcs = findLCS(original, modified);
            
            let i = 0, j = 0;
            const merged = [];
            
            while (i < original.length || j < modified.length) {
                if (i < original.length && j < modified.length && original[i] === modified[j] && lcs.includes(original[i])) {
                    // 相同行
                    merged.push(original[i]);
                    i++;
                    j++;
                } else if (j < modified.length && (i >= original.length || !lcs.includes(modified[j]))) {
                    // 添加的行
                    merged.push(modified[j]);
                    j++;
                } else if (i < original.length && (j >= modified.length || !lcs.includes(original[i]))) {
                    // 保留原始文本中的行
                    merged.push(original[i]);
                    i++;
                } else {
                    // 两边都有修改，默认使用原始
                    merged.push(original[i]);
                    i++;
                    j++;
                }
            }
            
            result = merged.join('\n');
            originalTextArea.value = result;
        } else if (direction === 'right') {
            // 合并到修改后文本
            const original = originalTextArea.value.split('\n');
            const modified = modifiedTextArea.value.split('\n');
            const lcs = findLCS(original, modified);
            
            let i = 0, j = 0;
            const merged = [];
            
            while (i < original.length || j < modified.length) {
                if (i < original.length && j < modified.length && original[i] === modified[j] && lcs.includes(original[i])) {
                    // 相同行
                    merged.push(modified[j]);
                    i++;
                    j++;
                } else if (j < modified.length && (i >= original.length || !lcs.includes(modified[j]))) {
                    // 保留修改后文本中的行
                    merged.push(modified[j]);
                    j++;
                } else if (i < original.length && (j >= modified.length || !lcs.includes(original[i]))) {
                    // 添加原始中的行
                    merged.push(original[i]);
                    i++;
                } else {
                    // 两边都有修改，默认使用修改后
                    merged.push(modified[j]);
                    i++;
                    j++;
                }
            }
            
            result = merged.join('\n');
            modifiedTextArea.value = result;
        } else if (direction === 'both') {
            // 创建新的合并文本
            const original = originalTextArea.value.split('\n');
            const modified = modifiedTextArea.value.split('\n');
            const lcs = findLCS(original, modified);
            
            let i = 0, j = 0;
            const merged = [];
            
            while (i < original.length || j < modified.length) {
                if (i < original.length && j < modified.length && original[i] === modified[j] && lcs.includes(original[i])) {
                    // 相同行
                    merged.push(original[i]);
                    i++;
                    j++;
                } else if (j < modified.length && (i >= original.length || !lcs.includes(modified[j]))) {
                    // 添加的行
                    merged.push(`[+] ${modified[j]}`);
                    j++;
                } else if (i < original.length && (j >= modified.length || !lcs.includes(original[i]))) {
                    // 删除的行
                    merged.push(`[-] ${original[i]}`);
                    i++;
                } else {
                    // 两边都有修改
                    merged.push(`[-] ${original[i]}`);
                    merged.push(`[+] ${modified[j]}`);
                    i++;
                    j++;
                }
            }
            
            result = merged.join('\n');
            
            // 显示合并文本
            mergedText.value = result;
            mergedTextContainer.classList.remove('hidden');
        }
    }
}); 