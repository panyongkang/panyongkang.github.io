const cursor = document.querySelector('.cursor');
const leaves = [];// 存储所有叶子的DOM元素
const leafCount = 6;// 叶子数量
// 叶子图片地址数组
const leafImages = [
  'https://pic1.imgdb.cn/item/67ab6507d0e0a243d4fe6d95.gif',
  'https://pic1.imgdb.cn/item/67ab6507d0e0a243d4fe6d96.gif',
  'https://pic1.imgdb.cn/item/67ab6507d0e0a243d4fe6d97.gif',
  'https://pic1.imgdb.cn/item/67ab6506d0e0a243d4fe6d91.gif',
  'https://pic1.imgdb.cn/item/67ab6507d0e0a243d4fe6d96.gif',
  'https://pic1.imgdb.cn/item/67ab6507d0e0a243d4fe6d95.gif'
];
// 叶子状态数组，每片叶子都存储其当前坐标、目标坐标和速度
const leafStates = [];

// 初始化叶子
for (let i = 0; i < leafCount; i++) {
  const leaf = document.createElement('div');
  leaf.classList.add('leaf');// 创建叶子元素
  // 设置叶子的尺寸，后面的叶子逐渐变小
  const size = 40 - i * 5;
  leaf.style.width = `${size}px`;
  leaf.style.height = `${size}px`;
  // 设置叶子的背景图片
  leaf.style.background = `url('${leafImages[i]}') no-repeat center`;
  leaf.style.backgroundSize = 'contain';
  // 将叶子添加到页面
  document.body.appendChild(leaf);
  leaves.push(leaf);

  // 记录每片叶子的初始状态
  leafStates.push({
    current: { x: window.innerWidth / 2, y: window.innerHeight / 2 },// 当前坐标
    target: { x: window.innerWidth / 2, y: window.innerHeight / 2 + i * 8 }, // 目标坐标，默认向下偏移
    velocity: { x: 0, y: 0 } // 速度
  });
}
// 记录鼠标位置，默认居中
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
// 初始光标位置（居中）
cursor.style.left = `${mouseX - 15}px`;
cursor.style.top = `${mouseY - 15}px`;

// 监听鼠标移动事件
document.addEventListener('mousemove', (e) => {
  // 更新鼠标位置，考虑滚动偏移量
  mouseX = e.clientX + window.scrollX;
  mouseY = e.clientY + window.scrollY;

  // 更新自定义光标位置（默认隐藏原鼠标）
  cursor.style.left = `${mouseX - 15}px`;
  cursor.style.top = `${mouseY - 15}px`;
});

// 物理动画参数
const stiffness = 0.15;  // 弹性系数，值越大叶子跟随鼠标越快
const damping = 0.75;    // 阻尼系数，决定叶子的惯性拖尾
const delayFactor = 0.2; // 叶子之间的延迟感（未使用，但可用于增加时间差）

// 动画循环
function animate() {
  for (let i = 0; i < leafCount; i++) {
    const state = leafStates[i];

    if (i === 0) {
      // 第一片叶子直接跟随鼠标，但向下偏移 15px，使其看起来挂在鼠标下面
      state.target.x = mouseX + 12;
      state.target.y = mouseY + 15;
    } else {
      // 其余叶子跟随前一片叶子的“过去位置”，并添加一定的默认偏移
      const prevState = leafStates[i - 1];
      state.target.x = prevState.current.x - (i * (-2));// 水平位置略微右偏移
      state.target.y = prevState.current.y + (i * 6); // 竖直方向形成拖尾
    }

    // 计算加速度（弹簧模型）
    const dx = state.target.x - state.current.x;
    const dy = state.target.y - state.current.y;
    const ax = dx * stiffness;
    const ay = dy * stiffness;

    // 更新速度，并加入阻尼效果
    state.velocity.x = (state.velocity.x + ax) * damping;
    state.velocity.y = (state.velocity.y + ay) * damping;

    // 更新当前位置
    state.current.x += state.velocity.x;
    state.current.y += state.velocity.y;

    // 应用位置到叶子元素，考虑滚动偏移量
    leaves[i].style.left = `${state.current.x}px`;
    leaves[i].style.top = `${state.current.y}px`;
  }
  // 继续下一帧动画
  requestAnimationFrame(animate);
}
// 启动动画
animate();