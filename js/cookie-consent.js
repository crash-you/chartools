// 简易 Cookie 同意提示（不设置非必要 Cookie，仅用于合规展示）
(() => {
  if (localStorage.getItem('cookieConsentGiven') === 'true') return;

  const bar = document.createElement('div');
  bar.style.position = 'fixed';
  bar.style.left = '0';
  bar.style.right = '0';
  bar.style.bottom = '0';
  bar.style.zIndex = '60';
  bar.style.background = '#111827';
  bar.style.color = 'white';
  bar.style.padding = '12px 16px';
  bar.style.display = 'flex';
  bar.style.flexWrap = 'wrap';
  bar.style.gap = '8px';
  bar.style.alignItems = 'center';
  bar.style.justifyContent = 'center';

  const text = document.createElement('span');
  text.textContent = '本网站使用必要的 Cookie 以确保基本功能运行。详见 隐私政策。';
  text.style.marginRight = '8px';

  const link = document.createElement('a');
  link.href = '/privacy.html';
  link.textContent = '查看';
  link.style.textDecoration = 'underline';
  link.style.color = '#93c5fd';
  link.target = '_self';

  const btn = document.createElement('button');
  btn.textContent = '我知道了';
  btn.style.background = '#2563eb';
  btn.style.color = 'white';
  btn.style.borderRadius = '6px';
  btn.style.padding = '6px 12px';
  btn.style.marginLeft = '8px';

  btn.addEventListener('click', () => {
    localStorage.setItem('cookieConsentGiven', 'true');
    bar.remove();
  });

  bar.appendChild(text);
  bar.appendChild(link);
  bar.appendChild(btn);
  document.body.appendChild(bar);
})();


