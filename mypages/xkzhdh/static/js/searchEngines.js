// 定义搜索引擎列表
const searchEngines = [
  { name: 'Bing', url: 'https://www.bing.com/search?q=', icon: 'https://www.bing.com/favicon.ico' },
  { name: '纳米AI搜索', url: 'https://www.n.cn/search?q=', icon: 'https://www.n.cn/favicon.ico' },
  { name: 'Baidu', url: 'https://www.baidu.com/s?wd=', icon: 'https://www.baidu.com/favicon.ico' },
  { name: 'Sogou', url: 'https://www.sogou.com/sogou?query=', icon: 'https://www.sogou.com/favicon.ico' },
  { name: '360搜索', url: 'https://www.so.com/s?q=', icon: 'https://www.so.com/favicon.ico' },
  { name: '搜狗微信搜索', url: 'https://weixin.sogou.com/weixin?type=2&query=', icon: 'https://weixin.sogou.com/favicon.ico' },
  { name: 'Google', url: 'https://www.google.com/search?q=', icon: 'https://www.google.com/favicon.ico' },
  { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=', icon: 'https://duckduckgo.com/favicon.ico' },
  { name: 'Yahoo', url: 'https://search.yahoo.com/search?p=', icon: 'https://www.yahoo.com/favicon.ico' },
  { name: 'Yandex', url: 'https://yandex.com/search/?text=', icon: 'https://yandex.com/favicon.ico' },
  { name: 'Felo AI', url: 'https://www.felo.ai/search?q=', icon: 'https://www.felo.ai/favicon.ico' },
  { name: 'Swisscows', url: 'https://swisscows.com/en/web?query=', icon: 'https://swisscows.com/favicon.ico' },
  { name: 'Startpage', url: 'https://www.startpage.com/do/search?q=', icon: 'https://www.startpage.com/favicon.ico' },
  { name: 'SearXNG(1)', url: 'https://priv.au/search?q=', icon: 'https://priv.au/favicon.ico' },
  { name: 'SearXNG(2)', url: 'https://searx.tiekoetter.com/search?q=', icon: 'https://searx.tiekoetter.com/favicon.ico' }
];

// 当前选中的搜索引擎
let currentEngine = searchEngines[0]; // 默认选中第一个搜索引擎

// 初始化下拉菜单
function initDropdown() {
  const dropdownContent = document.getElementById('myDropdown');
  dropdownContent.innerHTML = ''; // 清空内容

  // 动态生成下拉菜单项
  searchEngines.forEach(engine => {
      const link = document.createElement('a');
      link.href = '#';
      link.innerHTML = `
          <img class="engine-icon" src="${engine.icon}" alt="${engine.name}">
          <span>${engine.name}</span>
      `;
      link.onclick = () => selectEngine(engine);
      link.tabIndex = 0; // 确保链接可以接收焦点
      dropdownContent.appendChild(link);
  });

  // 设置默认选中的搜索引擎
  updateCurrentEngine(currentEngine);

  // 添加键盘导航支持
  dropdownContent.addEventListener('keydown', (event) => {
      const links = dropdownContent.querySelectorAll('a');
      const currentIndex = Array.from(links).indexOf(document.activeElement);

      if (event.key === 'ArrowDown') {
          event.preventDefault(); // 阻止默认滚动行为
          const nextIndex = (currentIndex + 1) % links.length;
          links[nextIndex].focus();
      } else if (event.key === 'ArrowUp') {
          event.preventDefault(); // 阻止默认滚动行为
          const prevIndex = (currentIndex - 1 + links.length) % links.length;
          links[prevIndex].focus();
      } else if (event.key === 'Enter') {
          event.preventDefault();
          if (document.activeElement) {
              document.activeElement.click(); // 触发点击事件
          }
      }
  });
}

// 更新当前选中的搜索引擎
function updateCurrentEngine(engine) {
  document.getElementById('currentEngineIcon').src = engine.icon;
  document.getElementById('currentEngineName').textContent = engine.name;
}

// 切换下拉菜单的显示与隐藏
function toggleDropdown() {
  const dropdown = document.getElementById('myDropdown');
  const button = document.querySelector('.dropbtn');
  dropdown.classList.toggle('show');

  if (dropdown.classList.contains('show')) {
    // 菜单展开时，设置焦点到第一个选项
    const firstLink = dropdown.querySelector('a');
    firstLink.focus();
}

  // 动态调整下拉菜单的位置
  const buttonRect = button.getBoundingClientRect();
  const dropdownHeight = dropdown.offsetHeight;
  const spaceBelow = window.innerHeight - buttonRect.bottom;

  if (spaceBelow < dropdownHeight && buttonRect.top > dropdownHeight) {
      // 如果下方空间不足且上方空间足够，向上展开
      dropdown.style.top = 'auto';
      dropdown.style.bottom = '100%';
  } else {
      // 否则向下展开
      dropdown.style.top = '100%';
      dropdown.style.bottom = 'auto';
  }
}

// 选择搜索引擎
function selectEngine(engine) {
  currentEngine = engine;
  updateCurrentEngine(engine);
  toggleDropdown(); // 选择后隐藏下拉菜单

  // 将焦点设置到搜索框
  document.getElementById('searchInput').focus();
}

// 执行搜索
function performSearch() {
  const query = document.getElementById('searchInput').value;
  if (!query) {
      alert('请输入搜索内容');
      return;
  }

  // 构造搜索URL
  const url = currentEngine.url + encodeURIComponent(query);

  // 在新窗口中打开搜索页面
  window.open(url, '_blank');
}

// 处理回车键
function handleKeyPress(event) {
  if (event.key === 'Enter') {
      performSearch();
  }
}

// 点击页面其他地方时隐藏下拉菜单
window.onclick = function(event) {
  const dropdown = document.getElementById('myDropdown');
  const button = document.querySelector('.dropbtn');

  // 如果点击的不是按钮或下拉菜单内的内容，则关闭下拉菜单
  if (!button.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.classList.remove('show');
  }
}

// 初始化页面
initDropdown();