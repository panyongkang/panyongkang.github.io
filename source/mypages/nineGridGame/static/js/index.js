
const modules = {
  feizi: {
    title: "请陛下翻牌，今晚宠幸哪位妃子？",
    subtitle: "点击'随机开始'按钮，系统将为您挑选今晚侍寝的妃子",
    names: ['慧妃', '婉妃', '静妃', '丽妃', '柔妃', '容妃', '德妃', '贤妃', '淑妃'],
    descs: ['温婉贤淑，深得圣心', '聪慧灵巧，才貌双全', '娴静优雅，气质如兰', '美艳动人，倾国倾城', '柔情似水，善解人意', '雍容华贵，仪态万方', '德才兼备，母仪天下', '贤良淑德，处事得体', '端庄大方，气质非凡'],
    tags: ['康熙专宠', '乾隆最爱', '雍正钦点', '嘉庆恩宠', '道光厚爱', '咸丰宠幸', '同治优选', '光绪之选', '宣统特宠'],
    imgList: [
      'https://pica.zhimg.com/v2-58bfd43bdf2b71d39507a8bb8c1cfe28_r.jpg',
      'https://pic1.zhimg.com/v2-ff48440794ca29d58d35e6f28ad63766_r.jpg',
      'https://pic1.zhimg.com/v2-fba456bb85fd62c6b00e1f1ba2fe5467_r.jpg',
      'https://picx.zhimg.com/v2-81ab73e99dfa21e8fcd20a2b912805de_r.jpg',
      'https://picx.zhimg.com/v2-a39d6dd4910ff0fcc5b5f7f7f173448c_r.jpg',
      'https://picx.zhimg.com/v2-4af49b991eba0a0ff807630bb5bb6275_r.jpg',
      'https://picx.zhimg.com/v2-12f3ccc91a9ae4b8bee6bfcac96c0051_r.jpg',
      'https://pica.zhimg.com/v2-85d8d11c5cd86d8c30fb7267f255fe3e_r.jpg',
      'https://picx.zhimg.com/v2-f42c1d8024de4ffbca21871779cac20b_r.jpg'
    ],
    colors: [
      'linear-gradient(135deg,#a8edea,#fed6e3)',
      'linear-gradient(135deg,#fbc2eb,#a6c1ee)',
      'linear-gradient(135deg,#fceabb,#f8b500)',
      'linear-gradient(135deg,#d4fc79,#96e6a1)',
      'linear-gradient(135deg,#fff1eb,#ace0f9)',
      'linear-gradient(135deg,#f9f586,#ffecd2)',
      'linear-gradient(135deg,#f6d365,#fda085)',
      'linear-gradient(135deg,#fbc2eb,#f7ff00)',
      'linear-gradient(135deg,#c2ffd8,#465efb)'
    ]
  },
  prize: {
    title: "幸运大抽奖",
    subtitle: "点击'随机开始'按钮，赢取丰厚奖品",
    names: ['一等奖', '二等奖', '三等奖', '幸运奖', '参与奖', '特别奖', '惊喜奖', '纪念奖', '鼓励奖'],
    descs: ['豪华大礼包一份', '高端数码产品', '精美家电一台', '品牌美妆套装', '实用生活用品', '特别定制礼品', '惊喜盲盒一个', '精致纪念品', '暖心鼓励奖'],
    tags: ['恭喜中奖', '幸运降临', '手气最佳', '好运连连', '感谢参与', '意外惊喜', '惊喜不断', '值得纪念', '继续加油'],
    imgList: [
      'https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1468436139062-f60a71c5c892?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    ],
    colors: [
      'linear-gradient(135deg,#FF512F,#F09819)',
      'linear-gradient(135deg,#02AAB0,#00CDAC)',
      'linear-gradient(135deg,#FF5E62,#FF9966)',
      'linear-gradient(135deg,#7F00FF,#E100FF)',
      'linear-gradient(135deg,#3a7bd5,#00d2ff)',
      'linear-gradient(135deg,#ff7e5f,#feb47b)',
      'linear-gradient(135deg,#DA4453,#89216B)',
      'linear-gradient(135deg,#2193b0,#6dd5ed)',
      'linear-gradient(135deg,#654ea3,#eaafc8)'
    ]
  },
  redpacket: {
    title: "红包大派送",
    subtitle: "点击'随机开始'按钮，抽取现金红包",
    descs: ['10元红包', '20元红包', '50元红包', '100元红包', '5元红包', '8元红包', '15元红包', '30元红包', '88元红包'],
    names: ['小额惊喜', '中等红包', '丰厚奖励', '超级大包', '小试牛刀', '吉祥如意', '惊喜连连', '幸运降临', '大吉大利'],
    tags: ['10元红包', '20元红包', '50元红包', '100元红包', '5元红包', '8元红包', '15元红包', '30元红包', '88元红包'],
    imgList: [
      'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    ],
    colors: [
      'linear-gradient(135deg,#f85032,#e73827)',
      'linear-gradient(135deg,#FF416C,#FF4B2B)',
      'linear-gradient(135deg,#FF512F,#DD2476)',
      'linear-gradient(135deg,#f857a6,#ff5858)',
      'linear-gradient(135deg,#ee0979,#ff6a00)',
      'linear-gradient(135deg,#f953c6,#b91d73)',
      'linear-gradient(135deg,#f857a6,#ff5858)',
      'linear-gradient(135deg,#ee0979,#ff6a00)',
      'linear-gradient(135deg,#f953c6,#b91d73)'
    ]
  }
};

let currentModule = modules.feizi;
const grid = document.getElementById('grid');
const cards = [];
let animating = false;
let selectedIndex = null;

// 创建卡片 - 增加安全判断
function createCards() {
  // 确保currentModule存在且包含必要属性
  if (!currentModule || !currentModule.colors) {
    console.error('当前模块数据不完整');
    return;
  }

  grid.innerHTML = '';
  cards.length = 0;

  for (let i = 0; i < 9; i++) {
    const scene = document.createElement('div');
    scene.className = 'scene';

    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = i;

    // 正面
    const front = document.createElement('div');
    front.className = 'card-face front';
    front.style.background = currentModule.colors[i];

    const frontContent = document.createElement('div');
    frontContent.className = 'front-content';
    frontContent.textContent = currentModule.names[i];
    front.appendChild(frontContent);

    // 背面
    const back = document.createElement('div');
    back.className = 'card-face back';

    const img = document.createElement('img');
    img.src = currentModule.imgList[i];
    img.alt = currentModule.names[i];

    const tag = document.createElement('span');
    tag.className = 'card-tag';
    tag.textContent = currentModule.tags[i];

    back.appendChild(img);
    back.appendChild(tag);

    card.appendChild(front);
    card.appendChild(back);
    scene.appendChild(card);
    grid.appendChild(scene);
    cards.push(card);

    // 添加点击事件
    card.addEventListener('click', () => {
      if (animating) return;
      card.classList.add('flipped');
      showModal(i);
    });
  }

  // 更新标题
  document.querySelector('.title-container h3').textContent = currentModule.title;
  document.querySelector('.title-container p').textContent = currentModule.subtitle;

  // 确保随机开始按钮在非游戏状态下隐藏
  updateButtonState();
}
// 新增：更新按钮状态
function updateButtonState(isBgChanging = false) {
  const randomBtn = document.getElementById('randomStartBtn');
  if (isBgChanging || !currentModule) {
    randomBtn.style.display = 'none';
  } else {
    randomBtn.style.display = 'block';
  }
}

// 设置选中样式
function setSelected(idx) {
  cards.forEach((c, i) => {
    c.classList.remove('selected');
  });
  const card = cards[idx];
  card.classList.add('selected');
}

// 显示模态框
function showModal(index) {
  selectedIndex = index;
  const overlay = document.getElementById('overlay');
  const modal = document.getElementById('modal');

  document.getElementById('modalTitle').textContent = currentModule.names[index];
  document.getElementById('modalDesc').textContent = currentModule.descs[index];
  document.getElementById('modalImg').src = currentModule.imgList[index];

  overlay.style.display = 'block';
  modal.style.display = 'block';
}

// 关闭模态框
function closeModal() {
  const overlay = document.getElementById('overlay');
  const modal = document.getElementById('modal');

  modal.style.display = 'none';
  overlay.style.display = 'none';

  if (selectedIndex !== null) {
    cards[selectedIndex].classList.add('flipped');
  }
}
// 在全局变量区域添加音频对象
let slotSound = null;

// 初始化时加载音频（放在DOMContentLoaded或某个初始化函数中）
function initSounds() {
  slotSound = new Audio('https://mpimg.cn/view.php/98b51729a02fefe5ad171c2007d0bf18.mp3');
  slotSound.loop = true; // 设置为循环播放
}

// 随机开始按钮事件
document.getElementById('randomStartBtn').addEventListener('click', async () => {
  if (animating) return;
  // 开始播放音效
  if (slotSound) {
    slotSound.currentTime = 0; // 从头开始播放
    slotSound.play().catch(e => console.log("自动播放被阻止:", e));
  }

  animating = true;

  // 重置所有卡片
  cards.forEach(c => {
    c.classList.remove('flipped', 'selected');
  });

  let lastIdx = 0;
  let used = new Set();
  const jumpTimes = 12 + Math.floor(Math.random() * 8);

  for (let i = 0; i < jumpTimes; i++) {
    let available = cards.map((_, idx) => idx).filter(idx => !used.has(idx));
    if (available.length === 0) {
      used.clear();
      available = cards.map((_, idx) => idx);
    }

    const idx = available[Math.floor(Math.random() * available.length)];
    setSelected(idx);
    used.add(idx);
    lastIdx = idx;

    await new Promise(r => setTimeout(r, 80 + i * 8));
  }

  // 最终选择
  cards[lastIdx].classList.remove('selected');
  // 在动画结束时停止音效（找到你的动画结束位置）
  setTimeout(() => {
    if (slotSound) slotSound.pause();
    showModal(lastIdx);
    animating = false;
  }, 300);

});

// 侧边栏按钮事件 - 修改为只处理游戏模块
document.querySelectorAll('#sidebar button[data-module]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#sidebar button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const moduleName = btn.dataset.module;
    if (modules[moduleName]) {
      currentModule = modules[moduleName];
      createCards();
      selectedIndex = null;
    }
  });
});

// 背景切换功能 - 独立处理
const bgPanel = document.getElementById('bgPanel');
const changeBgBtn = document.getElementById('changeBgBtn');
const closePanelBtn = document.getElementById('closePanelBtn');
const bgOptions = document.querySelectorAll('.bg-option');
const colorPicker1 = document.getElementById('colorPicker1');
const colorPicker2 = document.getElementById('colorPicker2');
const applyCustomBg = document.getElementById('applyCustomBg');

changeBgBtn.addEventListener('click', () => {
  // 隐藏随机开始按钮
  updateButtonState(true);

  // 显示背景面板
  bgPanel.style.display = 'block';
});

// 关闭背景面板时恢复按钮状态
closePanelBtn.addEventListener('click', () => {
  bgPanel.style.display = 'none';
  updateButtonState(false);
});

// 预设背景选择
bgOptions.forEach(option => {
  option.addEventListener('click', () => {
    bgOptions.forEach(opt => opt.classList.remove('active'));
    option.classList.add('active');
    document.body.style.background = option.dataset.bg;
  });
});

// 初始化时确保按钮状态正确
document.addEventListener('DOMContentLoaded', () => {
  initSounds();
  createCards();
  updateButtonState();
});

// 自定义背景应用
applyCustomBg.addEventListener('click', () => {
  const color1 = colorPicker1.value;
  const color2 = colorPicker2.value;
  document.body.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;
});

// 关闭模态框按钮
document.getElementById('closeModalBtn').addEventListener('click', closeModal);

// 初始化
createCards();