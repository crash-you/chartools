/**
 * 文本转换工具脚本
 * 功能：大小写转换、简繁体互转、行处理（排序/去重/去空）、空白处理、全角半角转换
 */

document.addEventListener('DOMContentLoaded', function() {
  const textArea = document.getElementById('text-input');
  const clearBtn = document.getElementById('clear-button');
  const sampleBtn = document.getElementById('sample-button');
  const copyBtn = document.getElementById('copy-button');

  // Case buttons
  const toUpperBtn = document.getElementById('to-upper');
  const toLowerBtn = document.getElementById('to-lower');
  const toTitleBtn = document.getElementById('to-title');
  const toggleCaseBtn = document.getElementById('toggle-case');

  // Chinese conversion
  const toSimplifiedBtn = document.getElementById('to-simplified');
  const toTraditionalBtn = document.getElementById('to-traditional');

  // Line operations
  const sortAscBtn = document.getElementById('sort-asc');
  const sortDescBtn = document.getElementById('sort-desc');
  const uniqueLinesBtn = document.getElementById('unique-lines');
  const reverseLinesBtn = document.getElementById('reverse-lines');
  const trimLinesBtn = document.getElementById('trim-lines');
  const removeEmptyLinesBtn = document.getElementById('remove-empty-lines');

  // Whitespace ops
  const trimAllBtn = document.getElementById('trim-all');
  const collapseSpacesBtn = document.getElementById('collapse-spaces');
  const tabsToSpacesBtn = document.getElementById('tabs-to-spaces');
  const removeExtraBlankLinesBtn = document.getElementById('remove-extra-blank-lines');

  // Width conversion
  const toHalfWidthBtn = document.getElementById('to-halfwidth');
  const toFullWidthBtn = document.getElementById('to-fullwidth');

  function getLangIsZh() {
    return (document.documentElement.lang || 'zh-CN').startsWith('zh');
  }

  function getText() {
    return textArea?.value || '';
  }

  function setText(val) {
    if (textArea) textArea.value = val;
  }

  function notify(msgKey, type = 'info') {
    const isZh = getLangIsZh();
    const map = {
      cleared: isZh ? '文本已清空' : 'Text cleared',
      copied: isZh ? '文本已复制到剪贴板' : 'Text copied to clipboard',
      noText: isZh ? '没有可处理的文本' : 'No text to process',
      converted: isZh ? '转换完成' : 'Conversion completed',
      sorted: isZh ? '排序完成' : 'Sorted',
      unique: isZh ? '已去重' : 'Duplicates removed',
      reversed: isZh ? '已反转行顺序' : 'Lines reversed',
      trimmedLines: isZh ? '已裁剪每行首尾空白' : 'Lines trimmed',
      removedEmpty: isZh ? '已移除空行' : 'Empty lines removed',
      collapsed: isZh ? '已合并多余空格' : 'Collapsed extra spaces',
      tabsToSpaces: isZh ? '已将制表符替换为空格' : 'Tabs converted to spaces',
      removedExtraBlank: isZh ? '已移除多余的空白行' : 'Extra blank lines removed',
      widthDone: isZh ? '全角/半角转换完成' : 'Full/Half width conversion done',
      s2tLoaded: isZh ? '简繁体转换库加载成功' : 'OpenCC loaded',
      s2tFailed: isZh ? '简繁体转换库加载失败' : 'Failed to load OpenCC',
    };
    if (typeof showNotification === 'function') {
      showNotification(map[msgKey] || msgKey, type);
    }
  }

  // Utilities
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
  }

  function toggleCase(str) {
    return str.replace(/[a-zA-Z\u00C0-\u024F]/g, ch => {
      const up = ch.toUpperCase();
      return ch === up ? ch.toLowerCase() : up;
    });
  }

  function sortLines(str, desc = false) {
    const lines = str.split('\n');
    lines.sort((a, b) => a.localeCompare(b));
    if (desc) lines.reverse();
    return lines.join('\n');
  }

  function uniqueLines(str) {
    const seen = new Set();
    const out = [];
    str.split('\n').forEach(line => {
      if (!seen.has(line)) {
        seen.add(line);
        out.push(line);
      }
    });
    return out.join('\n');
  }

  function reverseLines(str) {
    return str.split('\n').reverse().join('\n');
  }

  function trimEachLine(str) {
    return str.split('\n').map(l => l.trim()).join('\n');
  }

  function removeEmptyLines(str) {
    return str.split('\n').filter(l => l.trim() !== '').join('\n');
  }

  function trimAll(str) {
    return str.trim();
  }

  function collapseSpaces(str) {
    return str.replace(/\s+/g, ' ').replace(/ *\n */g, '\n');
  }

  function tabsToSpaces(str, spaces = 2) {
    return str.replace(/\t/g, ' '.repeat(spaces));
  }

  function removeExtraBlankLines(str) {
    return str.replace(/\n{3,}/g, '\n\n');
  }

  // 全角半角转换
  function toHalfWidth(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      if (code === 12288) {
        result += String.fromCharCode(32);
      } else if (code >= 65281 && code <= 65374) {
        result += String.fromCharCode(code - 65248);
      } else {
        result += str[i];
      }
    }
    return result;
  }

  function toFullWidth(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      if (code === 32) {
        result += String.fromCharCode(12288);
      } else if (code >= 33 && code <= 126) {
        result += String.fromCharCode(code + 65248);
      } else {
        result += str[i];
      }
    }
    return result;
  }

  // 简繁体转换（使用 opencc-js，如果可用）
  let openccLoaded = typeof OpenCC !== 'undefined';
  function ensureOpenCCLoaded(callback) {
    if (openccLoaded) return callback();
    // 动态加载
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/opencc-js@1.0.5/dist/umd/full.min.js';
    script.onload = () => {
      openccLoaded = typeof OpenCC !== 'undefined';
      notify('s2tLoaded', 'success');
      callback();
    };
    script.onerror = () => notify('s2tFailed', 'error');
    document.head.appendChild(script);
  }

  function convertSimplified(str, done) {
    ensureOpenCCLoaded(() => {
      try {
        const converter = OpenCC.Converter({ from: 'twp', to: 'cn' });
        done(converter(str));
      } catch (e) {
        done(str);
      }
    });
  }

  function convertTraditional(str, done) {
    ensureOpenCCLoaded(() => {
      try {
        const converter = OpenCC.Converter({ from: 'cn', to: 'twp' });
        done(converter(str));
      } catch (e) {
        done(str);
      }
    });
  }

  // Wire up buttons
  clearBtn?.addEventListener('click', () => {
    setText('');
    notify('cleared', 'info');
  });

  sampleBtn?.addEventListener('click', () => {
    const isZh = getLangIsZh();
    const sample = isZh
      ? '这是 Mixed 文本：Abc 123，简體與繁體；ＡＢＣ１２３（全角）。\n第二行：需要 排序 与 去重。\n第三行：    有 多 余 空 格。\n第三行：    有 多 余 空 格。'
      : 'This is a Mixed text: Abc 123; ＡＢＣ１２３ (full-width).\nLine two: needs sorting and dedup.\nLine three:    contains   extra    spaces.\nLine three:    contains   extra    spaces.';
    setText(sample);
  });

  copyBtn?.addEventListener('click', async () => {
    const text = getText();
    if (!text) return notify('noText', 'error');
    const ok = await (typeof copyToClipboard === 'function' ? copyToClipboard(text) : Promise.resolve(false));
    notify(ok ? 'copied' : 'noText', ok ? 'success' : 'error');
  });

  toUpperBtn?.addEventListener('click', () => {
    const t = getText();
    if (!t) return notify('noText', 'error');
    setText(t.toUpperCase());
    notify('converted', 'success');
  });

  toLowerBtn?.addEventListener('click', () => {
    const t = getText();
    if (!t) return notify('noText', 'error');
    setText(t.toLowerCase());
    notify('converted', 'success');
  });

  toTitleBtn?.addEventListener('click', () => {
    const t = getText();
    if (!t) return notify('noText', 'error');
    setText(toTitleCase(t));
    notify('converted', 'success');
  });

  toggleCaseBtn?.addEventListener('click', () => {
    const t = getText();
    if (!t) return notify('noText', 'error');
    setText(toggleCase(t));
    notify('converted', 'success');
  });

  toSimplifiedBtn?.addEventListener('click', () => {
    const t = getText();
    if (!t) return notify('noText', 'error');
    convertSimplified(t, (res) => {
      setText(res);
      notify('converted', 'success');
    });
  });

  toTraditionalBtn?.addEventListener('click', () => {
    const t = getText();
    if (!t) return notify('noText', 'error');
    convertTraditional(t, (res) => {
      setText(res);
      notify('converted', 'success');
    });
  });

  sortAscBtn?.addEventListener('click', () => {
    const t = getText();
    if (!t) return notify('noText', 'error');
    setText(sortLines(t));
    notify('sorted', 'success');
  });

  sortDescBtn?.addEventListener('click', () => {
    const t = getText();
    if (!t) return notify('noText', 'error');
    setText(sortLines(t, true));
    notify('sorted', 'success');
  });

  uniqueLinesBtn?.addEventListener('click', () => {
    const t = getText();
    if (!t) return notify('noText', 'error');
    setText(uniqueLines(t));
    notify('unique', 'success');
  });

  reverseLinesBtn?.addEventListener('click', () => {
    const t = getText();
    if (!t) return notify('noText', 'error');
    setText(reverseLines(t));
    notify('reversed', 'success');
  });

  trimLinesBtn?.addEventListener('click', () => {
    const t = getText();
    if (!t) return notify('noText', 'error');
    setText(trimEachLine(t));
    notify('trimmedLines', 'success');
  });

  removeEmptyLinesBtn?.addEventListener('click', () => {
    const t = getText();
    if (!t) return notify('noText', 'error');
    setText(removeEmptyLines(t));
    notify('removedEmpty', 'success');
  });

  trimAllBtn?.addEventListener('click', () => {
    const t = getText();
    if (!t) return notify('noText', 'error');
    setText(trimAll(t));
    notify('converted', 'success');
  });

  collapseSpacesBtn?.addEventListener('click', () => {
    const t = getText();
    if (!t) return notify('noText', 'error');
    setText(collapseSpaces(t));
    notify('collapsed', 'success');
  });

  tabsToSpacesBtn?.addEventListener('click', () => {
    const t = getText();
    if (!t) return notify('noText', 'error');
    setText(tabsToSpaces(t));
    notify('tabsToSpaces', 'success');
  });

  removeExtraBlankLinesBtn?.addEventListener('click', () => {
    const t = getText();
    if (!t) return notify('noText', 'error');
    setText(removeExtraBlankLines(t));
    notify('removedExtraBlank', 'success');
  });

  toHalfWidthBtn?.addEventListener('click', () => {
    const t = getText();
    if (!t) return notify('noText', 'error');
    setText(toHalfWidth(t));
    notify('widthDone', 'success');
  });

  toFullWidthBtn?.addEventListener('click', () => {
    const t = getText();
    if (!t) return notify('noText', 'error');
    setText(toFullWidth(t));
    notify('widthDone', 'success');
  });
});


