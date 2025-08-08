/**
 * 格式化工具脚本
 * 支持：JSON / XML / HTML / CSS 的格式化与最小化
 */

document.addEventListener('DOMContentLoaded', function () {
  const inputEl = document.getElementById('text-input');
  const outputEl = document.getElementById('text-output');

  const clearBtn = document.getElementById('clear-button');
  const sampleBtn = document.getElementById('sample-button');
  const copyBtn = document.getElementById('copy-output');
  const formatBtn = document.getElementById('format-button');
  const minifyBtn = document.getElementById('minify-button');

  const typeSelect = document.getElementById('format-type');
  const indentSelect = document.getElementById('indent-size');

  function notify(message, type = 'info') {
    try {
      if (typeof showNotification === 'function') {
        showNotification(message, type);
      }
    } catch (_) {
      // 忽略
    }
  }

  function getIndent() {
    const size = parseInt(indentSelect?.value || '2', 10);
    return Number.isFinite(size) && size > 0 ? size : 2;
  }

  function getInput() {
    return inputEl?.value || '';
  }

  function setOutput(val) {
    if (outputEl) outputEl.value = val;
  }

  // ---------------- JSON ----------------
  function formatJson(text, indent) {
    const obj = JSON.parse(text);
    return JSON.stringify(obj, null, indent);
  }

  function minifyJson(text) {
    const obj = JSON.parse(text);
    return JSON.stringify(obj);
  }

  // ---------------- XML / HTML ----------------
  function normalizeTagSpacing(text) {
    return text
      .replace(/\r/g, '')
      .replace(/>\s+</g, '><') // 先压紧相邻标签之间的空白
      .replace(/></g, '>\n<'); // 再按标签换行
  }

  function isClosingTag(line) {
    return /^\s*<\/.+>\s*$/.test(line);
  }

  function isSelfClosing(line) {
    return /^\s*<[^>]+\/>\s*$/.test(line);
  }

  function isOpeningTag(line) {
    // 排除声明、注释、DOCTYPE
    if (/^\s*<\?/.test(line) || /^\s*<!--/.test(line) || /^\s*<!/.test(line)) return false;
    if (isClosingTag(line) || isSelfClosing(line)) return false;
    return /^\s*<[^>]+>\s*$/.test(line);
  }

  function prettyByIndentLines(text, indentSize) {
    const lines = normalizeTagSpacing(text).split(/\n/);
    let level = 0;
    const indentStr = ' '.repeat(indentSize);
    const out = [];
    for (let raw of lines) {
      const line = raw.trim();
      if (!line) continue;

      if (isClosingTag(line)) {
        level = Math.max(0, level - 1);
      }

      out.push(indentStr.repeat(level) + line);

      if (isOpeningTag(line)) {
        level += 1;
      }
    }
    return out.join('\n');
  }

  function formatXml(text, indent) {
    return prettyByIndentLines(text, indent);
  }

  function minifyXml(text) {
    return text
      .replace(/<!--([\s\S]*?)-->/g, '') // 去注释
      .replace(/\s+</g, '<')
      .replace(/>\s+/g, '>')
      .replace(/>\s+</g, '><')
      .trim();
  }

  function formatHtml(text, indent) {
    // 简单通用的标签缩进；不处理 <pre>/<code> 的特殊保留（基础版）
    return prettyByIndentLines(text, indent);
  }

  function minifyHtml(text) {
    return text
      .replace(/<!--([\s\S]*?)-->/g, '')
      .replace(/\s+</g, '<')
      .replace(/>\s+/g, '>')
      .replace(/>\s+</g, '><')
      .trim();
  }

  // ---------------- CSS ----------------
  function formatCss(text, indent) {
    const indentStr = ' '.repeat(indent);
    // 去除多余空白，保留注释
    let src = text.replace(/\r/g, '').replace(/\t/g, '    ');
    // 在 { } ; 周围插入换行
    src = src
      .replace(/\s*{\s*/g, ' {\n')
      .replace(/\s*}\s*/g, '\n}\n')
      .replace(/\s*;\s*/g, ';\n');

    const lines = src.split(/\n/);
    let level = 0;
    const out = [];
    for (let raw of lines) {
      const line = raw.trim();
      if (line === '') continue;
      if (line === '}') level = Math.max(0, level - 1);
      out.push((line === '}' ? indentStr.repeat(level) : indentStr.repeat(level)) + line);
      if (line.endsWith('{')) level += 1;
    }
    return out.join('\n');
  }

  function minifyCss(text) {
    return text
      .replace(/\/\*[\s\S]*?\*\//g, '') // 注释
      .replace(/\s+/g, ' ') // 多空白为单空格
      .replace(/\s*{\s*/g, '{')
      .replace(/\s*}\s*/g, '}')
      .replace(/\s*;\s*/g, ';')
      .replace(/\s*:\s*/g, ':')
      .replace(/;}/g, '}')
      .trim();
  }

  // ---------------- UI 事件 ----------------
  clearBtn?.addEventListener('click', () => {
    if (inputEl) inputEl.value = '';
    setOutput('');
    notify('已清空', 'info');
  });

  sampleBtn?.addEventListener('click', () => {
    const type = typeSelect?.value || 'json';
    let sample = '';
    switch (type) {
      case 'json':
        sample = '{"name":"OutSea","tools":["counter","conversion","format"],"active":true,"stats":{"items":3}}';
        break;
      case 'xml':
        sample = '<note>\n  <to>User</to>\n  <from>OutSea</from>\n  <heading>Reminder</heading>\n  <body>Use our formatting tool!</body>\n</note>';
        break;
      case 'html':
        sample = '<div class="card"><h1>Title</h1><p>Hello <strong>World</strong>!</p></div>';
        break;
      case 'css':
        sample = '/* sample */\n.card{color:#333;background:#f7f7f7;border:1px solid #ddd} .card h1{font-size:20px;margin:0}';
        break;
    }
    if (inputEl) inputEl.value = sample;
  });

  formatBtn?.addEventListener('click', () => {
    const type = typeSelect?.value || 'json';
    const indent = getIndent();
    const text = getInput();
    if (!text.trim()) {
      setOutput('');
      notify('请输入待处理文本', 'info');
      return;
    }
    try {
      let result = '';
      if (type === 'json') result = formatJson(text, indent);
      else if (type === 'xml') result = formatXml(text, indent);
      else if (type === 'html') result = formatHtml(text, indent);
      else if (type === 'css') result = formatCss(text, indent);
      setOutput(result);
      notify('格式化完成', 'success');
    } catch (e) {
      setOutput('');
      notify('格式化失败：' + (e?.message || e), 'error');
    }
  });

  minifyBtn?.addEventListener('click', () => {
    const type = typeSelect?.value || 'json';
    const text = getInput();
    if (!text.trim()) {
      setOutput('');
      notify('请输入待处理文本', 'info');
      return;
    }
    try {
      let result = '';
      if (type === 'json') result = minifyJson(text);
      else if (type === 'xml') result = minifyXml(text);
      else if (type === 'html') result = minifyHtml(text);
      else if (type === 'css') result = minifyCss(text);
      setOutput(result);
      notify('最小化完成', 'success');
    } catch (e) {
      setOutput('');
      notify('最小化失败：' + (e?.message || e), 'error');
    }
  });

  copyBtn?.addEventListener('click', async () => {
    const val = outputEl?.value || '';
    if (!val) {
      notify('没有可复制的内容', 'info');
      return;
    }
    try {
      if (typeof copyToClipboard === 'function') {
        const ok = await copyToClipboard(val);
        notify(ok ? '已复制到剪贴板' : '复制失败', ok ? 'success' : 'error');
      } else {
        await navigator.clipboard.writeText(val);
        notify('已复制到剪贴板', 'success');
      }
    } catch (e) {
      notify('复制失败：' + (e?.message || e), 'error');
    }
  });
});


