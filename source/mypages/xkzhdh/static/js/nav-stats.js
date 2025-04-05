(function () {
  // 配置项
  const MAX_COUNT = 20; // 最大点击次数限制
  const MAX_DISPLAY = 6; // 最多显示常用项
  const MAX_ITEMS = 12; // 本地存储最多保留条数
  const DATA_RETENTION_DAYS = 1; // 数据保留天数

  // 初始化数据
  let clickData = JSON.parse(localStorage.getItem('navClickStats')) || {};
  let cachedSorted = [];

  // 防抖保存
  const debounce = (fn, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };
  const saveToLocalStorage = debounce(() => {
    localStorage.setItem('navClickStats', JSON.stringify(clickData));
  }, 300);

  // 数据裁剪与清理
  function trimAndCleanData() {
    const now = Date.now();
    Object.keys(clickData).forEach(href => {
      if (now - clickData[href].lastClicked > DATA_RETENTION_DAYS * 86400000) {
        delete clickData[href];
      }
    });

    // 排序：count 降序，lastClicked 降序
    cachedSorted = Object.entries(clickData).sort(([, a], [, b]) => {
      if (b.count !== a.count) return b.count - a.count;
      return b.lastClicked - a.lastClicked;
    });
  }

  // 处理点击事件
  function handleClick(e) {
    const link = e.currentTarget;
    const href = link.getAttribute('href');
    const title = link.textContent.trim();

    // 如果记录已满，移除最不活跃的记录
    if (Object.keys(clickData).length >= MAX_ITEMS && !clickData[href]) {
      trimAndCleanData();
      const leastActive = cachedSorted[MAX_ITEMS - 1][0]; // 最后一条是最不活跃的
      delete clickData[leastActive];
    }

    // 初始化或更新记录
    if (!clickData[href]) {
      clickData[href] = {
        title,
        count: 0,
        attributes: {
          rel: link.getAttribute('rel') || '302',
          target: link.getAttribute('target') || '_blank',
          nofollow: link.getAttribute('nofollow') || '',
          title: link.getAttribute('title') || ''
        },
        lastClicked: Date.now()
      };
    }

    clickData[href].count = Math.min(clickData[href].count + 1, MAX_COUNT);
    clickData[href].lastClicked = Date.now();

    // 更新排序和显示
    trimAndCleanData();
    updateFrequentLinks();
    saveToLocalStorage();
  }

  // 更新 DOM
  function updateFrequentLinks() {
    document.querySelectorAll('.frequent-links-list').forEach(container => {
      container.innerHTML = '';
      const fragment = document.createDocumentFragment();

      if (cachedSorted.length === 0) {
        const li = document.createElement('li');
        li.textContent = '暂无常用链接，点击导航栏开始记录';
        fragment.appendChild(li);
        container.classList.remove('pure-g');
      } else {
        container.classList.add('pure-g');
        cachedSorted.slice(0, MAX_DISPLAY).forEach(([href, data]) => {
          const li = document.createElement('li');
          li.className = 'pure-u-1-2 pure-u-md-1-6 frequent-item';

          const link = document.createElement('a');
          link.className = 'frequent-link';
          link.href = href;
          link.innerHTML = `${data.title} <span class="count">(${data.count})</span>`;

          ['rel', 'target', 'nofollow', 'title'].forEach(attr => {
            const value = data.attributes[attr] ||
              (attr === 'rel' ? '302' : attr === 'target' ? '_blank' : '');
            if (value) link.setAttribute(attr, value);
          });

          const closeBtn = document.createElement('button');
          closeBtn.className = 'close-btn';
          closeBtn.innerHTML = '×';
          closeBtn.onclick = (e) => {
            e.preventDefault();
            if (confirm(`确定删除 ${data.title} 吗？`)) {
              delete clickData[href];
              trimAndCleanData();
              updateFrequentLinks();
              saveToLocalStorage();
            }
          };

          li.appendChild(link);
          li.appendChild(closeBtn);
          fragment.appendChild(li);
        });
      }

      container.appendChild(fragment);
    });
  }

  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
    Object.values(clickData).forEach(item => {
      item.lastClicked = item.lastClicked || Date.now();
    });

    document.querySelectorAll('.pure-g a').forEach(link => {
      link.addEventListener('click', handleClick);
    });

    trimAndCleanData();
    updateFrequentLinks();
  });
})();