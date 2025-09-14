// 书籍数据
const bookData = {
  "暮色将尽": {
    "name": "《暮色将尽》",
    "author": "戴安娜・阿西尔",
    "content": "英国作家戴安娜・阿西尔晚年的回忆录,承认 '欲望消失' 的客观存在，比如对爱情、物质的渴望逐渐淡去，甚至连阅读、社交的精力也在衰退；不再追求外界的认可，而是回归内心的平静，用旁观者的理性审视自己的一生，最终与衰老、与生命的不完美达成和解。"
  },
  "2": {
    "name": "活着",
    "author": "余华",
    "content": "讲述了农村人福贵悲惨的人生遭遇。福贵本是个阔少爷，可他嗜赌如命，终于赌光了家业，一贫如洗。他的父亲被他活活气死，母亲则在穷困中患了重病，福贵前去求药，却在途中被国民党抓去当壮丁。经过几番波折回到家里，才知道母亲早已去世，妻子家珍含辛茹苦地养大两个儿女。此后更加悲惨的命运一次又一次降临到福贵身上，他的妻子、儿女和孙子相继死去，最后只剩福贵和一头老牛相依为命，但老人依旧活着，仿佛比往日更加洒脱与坚强。"
  }
};

// 获取DOM元素
const bookTooltip = document.getElementById('bookTooltip');
const tooltipCover = document.getElementById('tooltipCover');
const tooltipTitle = document.getElementById('tooltipTitle');
const tooltipAuthor = document.getElementById('tooltipAuthor');
const tooltipContent = document.getElementById('tooltipContent');

// 所有书籍链接元素
const bookLinks = document.querySelectorAll('.book-link');

// 设置背景图片
bookLinks.forEach(link => {
  const bgImage = getComputedStyle(link).getPropertyValue('--bg-image');
  if (bgImage) {
    link.style.backgroundImage = bgImage;
  }
});

// 为每个书籍链接添加事件监听器
bookLinks.forEach(link => {
  link.addEventListener('mouseenter', function (e) {
    const bookId = this.getAttribute('data-book-id');
    if (bookId && bookData[bookId]) {
      showBookTooltip(e, bookId, this);
    }
  });

  link.addEventListener('mouseleave', hideBookTooltip);
});

// 显示书籍提示框
function showBookTooltip(event, bookId, element) {
  const book = bookData[bookId];

  // 设置内容
  const bgImage = getComputedStyle(element).getPropertyValue('--bg-image');
  if (bgImage && bgImage !== 'none') {
    tooltipCover.style.backgroundImage = bgImage;
    tooltipCover.textContent = '';
    tooltipCover.style.backgroundColor = 'transparent';
    tooltipCover.style.display = 'block';
  } else {
    tooltipCover.style.backgroundImage = 'none';
    tooltipCover.style.backgroundColor = '#6a11cb';
    tooltipCover.style.display = 'flex';
    tooltipCover.style.alignItems = 'center';
    tooltipCover.style.justifyContent = 'center';
    tooltipCover.style.color = 'white';
    tooltipCover.style.fontSize = '12px';
    tooltipCover.textContent = book.name;
  }

  tooltipTitle.textContent = book.name;
  tooltipAuthor.textContent = book.author;

  // 清空并添加内容
  tooltipContent.innerHTML = '';
  const p = document.createElement('p');
  p.textContent = book.content;
  tooltipContent.appendChild(p);

  // 定位提示框
  positionTooltip(event);

  // 显示提示框
  bookTooltip.classList.add('visible');
}

// 隐藏书籍提示框
function hideBookTooltip() {
  bookTooltip.classList.remove('visible');
}

// 定位提示框
function positionTooltip(event) {
  const ttWidth = bookTooltip.offsetWidth;
  const ttHeight = bookTooltip.offsetHeight;

  let left = event.pageX - ttWidth / 2;
  let top = event.pageY - ttHeight - 15;

  // 防止提示框超出视口
  if (left < 10) left = 10;
  if (left + ttWidth > window.innerWidth - 10) {
    left = window.innerWidth - ttWidth - 10;
  }

  if (top < 10) top = event.pageY + 15;

  bookTooltip.style.left = left + 'px';
  bookTooltip.style.top = top + 'px';
}

// 添加mousemove事件监听器，使提示框跟随鼠标
document.addEventListener('mousemove', function (e) {
  if (bookTooltip.classList.contains('visible')) {
    positionTooltip(e);
  }
});