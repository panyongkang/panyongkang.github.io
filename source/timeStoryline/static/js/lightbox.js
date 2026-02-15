// 自动初始化弹窗组件
document.addEventListener('DOMContentLoaded', () => {
  // 创建弹窗结构
  const lightboxHTML = `
    <div class="lightbox-overlay">
      <span class="lightbox-close">×</span>
      <div class="lightbox-content">
        <img src="" alt="大图预览">
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', lightboxHTML);

  // 获取组件元素
  const overlay = document.querySelector('.lightbox-overlay');
  const closeBtn = document.querySelector('.lightbox-close');
  const lightboxImg = overlay.querySelector('img');

  // 关闭弹窗函数
  const closeLightbox = () => {
    overlay.classList.remove('active');
    lightboxImg.src = '';
  };

  // 绑定关闭事件
  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });

  // 监听键盘ESC键
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // 为所有缩略图绑定双击事件
  document.querySelectorAll('.thumbnail').forEach(img => {
    if (!img.dataset.lightboxBound) {
      img.addEventListener('dblclick', (e) => {
        e.preventDefault(); // 阻止默认行为
        lightboxImg.src = img.src;
        overlay.classList.add('active');

        // 清除可能存在的选中状态
        if (window.getSelection) {
          window.getSelection().removeAllRanges();
        } else if (document.selection) {
          document.selection.empty();
        }
      });
      img.dataset.lightboxBound = true;
    }
  });
});