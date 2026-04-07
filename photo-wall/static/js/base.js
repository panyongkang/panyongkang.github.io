const imageUrls = [
  "https://pic1.imgdb.cn/item/605c2e578322e6675c843a81.gif",
  "https://pic1.imgdb.cn/item/67a33c76d0e0a243d4fbf5fe.jpg",
  "https://pic1.imgdb.cn/item/6638eb130ea9cb14034f1c90.jpg",
  "https://pic1.imgdb.cn/item/6638e1f20ea9cb14032d9a40.webp",
  "https://pic1.imgdb.cn/item/61485d682ab3f51d911450e3.gif",

  "https://pic1.imgdb.cn/item/605ae1b18322e6675cd3179e.gif",
  "https://pic1.imgdb.cn/item/6640bf550ea9cb14036cafb8.png",
  "https://pic1.imgdb.cn/item/60681dc28322e6675cfa7fc2.png",
  "https://pic1.imgdb.cn/item/605c2e578322e6675c843a81.gif",
  "https://pic1.imgdb.cn/item/6638e1f20ea9cb14032d9a40.webp",

  "https://pic1.imgdb.cn/item/6640bf550ea9cb14036caf9b.png",
  "https://mpimg.cn/view.php/2982f73b9d2223a23a85e0a6686b7bdd.jpg",
  "https://pic1.imgdb.cn/item/6638eb130ea9cb14034f1c90.jpg",
  "https://pic1.imgdb.cn/item/67a33c76d0e0a243d4fbf5fe.jpg",
  "https://pic1.imgdb.cn/item/61485d682ab3f51d911450e3.gif",

  "https://pic1.imgdb.cn/item/61485d682ab3f51d911450e3.gif",
  "https://pic1.imgdb.cn/item/6640bf550ea9cb14036caf9b.png",
  "https://pic1.imgdb.cn/item/6640bf550ea9cb14036cafb8.png",
  "https://pic1.imgdb.cn/item/60681dc28322e6675cfa7fc2.png",
  "https://pic1.imgdb.cn/item/604822065aedab222c05036f.png",

  "https://pic1.imgdb.cn/item/6638e1f20ea9cb14032d9a40.webp",
  "https://pic1.imgdb.cn/item/61485d682ab3f51d911450e3.gif",
  "https://pic1.imgdb.cn/item/6640bf550ea9cb14036caf9b.png",
  "https://pic1.imgdb.cn/item/605c2e578322e6675c843a81.gif",
  "https://pic1.imgdb.cn/item/60681dc28322e6675cfa7fc2.png",
];

const gridContainer = document.getElementById("gridContainer");
const fullscreenContainer = document.getElementById("fullscreenContainer");

// 使用 Intersection Observer 实现懒加载
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      // 当图片进入视口时设置 src 属性
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
}, { rootMargin: '300px' });

imageUrls.forEach(url => {
  const div = document.createElement("div");
  div.className = 'grid-item';

  const img = document.createElement("img");
  // 使用 data-src 属性保存真实的图片 URL
  img.dataset.src = url;
  img.alt = '图片加载失败';
  // 固定高度确保容器与图片一致
  img.style.height = '250px';
  // 原生懒加载属性，现代浏览器支持
  img.setAttribute("loading", "lazy");
  // 加载失败时替换为备用图片
  img.onerror = function () {
    this.src = 'https://mpimg.cn/view.php/2982f73b9d2223a23a85e0a6686b7bdd.jpg';
  };
  // 使用 Intersection Observer 观察图片加载时机
  observer.observe(img);

  // 双击放大图片
  img.ondblclick = () => openFullscreen(url);

  div.appendChild(img);
  gridContainer.appendChild(div);
});

function openFullscreen(url) {
  const fullscreenImage = document.getElementById("fullscreenImage");
  fullscreenImage.src = url;
  fullscreenContainer.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeFullscreen() {
  fullscreenContainer.style.display = "none";
  document.body.style.overflow = "auto";
}

// 点击全屏容器空白区域关闭全屏
fullscreenContainer.addEventListener('click', function (e) {
  if (e.target === fullscreenContainer) {
    closeFullscreen();
  }
});