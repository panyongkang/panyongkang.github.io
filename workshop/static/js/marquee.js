
const data = [
  { img: "https://www.chuangkit.com/distweb/img/product13.cb01faad.png", title: "AI 商品图" },
  { img: "https://img.imgdb.cn/item/6069a1bc8322e6675c82698f.gif", title: "每个人都是一本书", link: "https://xyyum.icu/mybook/" },
  { img: "https://img.imgdb.cn/item/6064539b8322e6675c8f8d20.png", title: "动态简历设计", link: "https://xyyum.icu/anires/" },
  { img: "https://img.imgdb.cn/item/608ab487d1a9ae528fc5e451.png", title: "独立音乐在线网站", link: "https://xyyum.icu/music/" },
  { img: "https://img.imgdb.cn/item/6064539b8322e6675c8f8d37.png", title: "海报设计", link: "https://xyyum.icu/mypages/OnlyI.html" },
  { img: "https://www.chuangkit.com/distweb/img/product6.a3c25bc6.png", title: "智能抠图", link: "#" }
];

const data1 = [
  { img: "https://www.chuangkit.com/distweb/img/product13.cb01faad.png", title: "AI 商品图", link: "#" },
  { img: "https://img.imgdb.cn/item/6069a1bc8322e6675c82698f.gif", title: "每个人都是一本书", link: "https://xyyum.icu/mybook/" },
  { img: "https://img.imgdb.cn/item/6064539b8322e6675c8f8d20.png", title: "动态简历设计", link: "https://xyyum.icu/anires/" },
  { img: "https://img.imgdb.cn/item/608ab487d1a9ae528fc5e451.png", title: "独立音乐在线网站", link: "https://xyyum.icu/music/" },
  { img: "https://img.imgdb.cn/item/6069a1bc8322e6675c82698f.gif", title: "每个人都是一本书", link: "https://xyyum.icu/mybook/" },
  { img: "https://img.imgdb.cn/item/6064539b8322e6675c8f8d20.png", title: "动态简历设计", link: "https://xyyum.icu/anires/" },
  { img: "https://img.imgdb.cn/item/608ab487d1a9ae528fc5e451.png", title: "公众号首页", link: "https://xyyum.icu/music/" },
  { img: "https://img.imgdb.cn/item/6064539b8322e6675c8f8d20.png", title: "动态简历设计", link: "https://xyyum.icu/anires/" },
  { img: "https://img.imgdb.cn/item/608ab487d1a9ae528fc5e451.png", title: "独立音乐在线网站", link: "https://xyyum.icu/music/" },
  { img: "https://img.imgdb.cn/item/6064539b8322e6675c8f8d37.png", title: "海报设计", link: "https://xyyum.icu/mypages/OnlyI.html" },
  { img: "https://www.chuangkit.com/distweb/img/product6.a3c25bc6.png", title: "智能抠图", link: "#" }
];

function initMarquee(containerId, cardsData = [], direction = "right-to-left") {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID ${containerId} not found`);
    return;
  }

  if (!cardsData || cardsData.length === 0) {
    console.error("No data provided for marquee");
    return;
  }

  const track = document.createElement("div");
  track.className = "marquee-track";

  const isVertical = direction === "vertical-dual";
  if (isVertical) {
    track.classList.add("vertical");

    const trackLeft = document.createElement("div");
    trackLeft.className = "track-column";
    const trackRight = document.createElement("div");
    trackRight.className = "track-column";

    let isPausedLeft = false;
    let isPausedRight = false;

    cardsData.forEach(card => {
      const cardDivLeft = document.createElement("div");
      cardDivLeft.className = "marquee-card";
      const cardDivRight = document.createElement("div");
      cardDivRight.className = "marquee-card";

      if (card.link) {
        cardDivLeft.addEventListener("click", () => window.open(card.link, "_blank"));
        cardDivRight.addEventListener("click", () => window.open(card.link, "_blank"));
      }

      const imgLeft = document.createElement("img");
      imgLeft.setAttribute("loading", "lazy");
      imgLeft.src = card.img;
      imgLeft.alt = card.title || "";
      const imgRight = document.createElement("img");
      imgRight.setAttribute("loading", "lazy");
      imgRight.src = card.img;
      imgRight.alt = card.title || "";

      const titleLeft = document.createElement("p");
      titleLeft.textContent = card.title || "";
      const titleRight = document.createElement("p");
      titleRight.textContent = card.title || "";

      cardDivLeft.appendChild(imgLeft);
      cardDivLeft.appendChild(titleLeft);
      cardDivRight.appendChild(imgRight);
      cardDivRight.appendChild(titleRight);

      cardDivLeft.addEventListener("mouseenter", () => {
        isPausedLeft = true;
      });
      cardDivLeft.addEventListener("mouseleave", () => {
        isPausedLeft = false;
      });
      cardDivRight.addEventListener("mouseenter", () => {
        isPausedRight = true;
      });
      cardDivRight.addEventListener("mouseleave", () => {
        isPausedRight = false;
      });

      trackLeft.appendChild(cardDivLeft);
      trackRight.appendChild(cardDivRight);
    });

    track.appendChild(trackLeft);
    track.appendChild(trackRight);
    container.appendChild(track);

    let scrollPosLeft = 0;
    let scrollPosRight = 0;
    const cardHeight = 160; // 卡片高度
    const gap = 20; // 间距
    const cardSize = cardHeight + gap; // 包含间距的总高度

    function scroll() {
      if (!isPausedLeft) {
        scrollPosLeft -= 1;
        if (scrollPosLeft <= -cardSize) {
          const firstCard = trackLeft.firstElementChild;
          trackLeft.appendChild(firstCard);
          scrollPosLeft += cardSize;
        }
        trackLeft.style.transform = `translateY(${scrollPosLeft}px)`;
      }

      if (!isPausedRight) {
        scrollPosRight += 1;
        if (scrollPosRight >= 0) {
          const lastCard = trackRight.lastElementChild;
          trackRight.prepend(lastCard);
          scrollPosRight -= cardSize;
        }
        trackRight.style.transform = `translateY(${scrollPosRight}px)`;
      }

      requestAnimationFrame(scroll);
    }
    requestAnimationFrame(scroll);
  } else {
    track.classList.add("horizontal");

    let isPaused = false;

    cardsData.forEach(card => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "marquee-card";
      if (card.link) {
        cardDiv.addEventListener("click", () => window.open(card.link, "_blank"));
      }

      const img = document.createElement("img");
      img.setAttribute("loading", "lazy");
      img.src = card.img;
      img.alt = card.title || "";

      const title = document.createElement("p");
      title.textContent = card.title || "";

      cardDiv.appendChild(img);
      cardDiv.appendChild(title);

      cardDiv.addEventListener("mouseenter", () => {
        isPaused = true;
      });
      cardDiv.addEventListener("mouseleave", () => {
        isPaused = false;
      });

      track.appendChild(cardDiv);
    });

    container.appendChild(track);

    let scrollPos = 0;
    const cardSize = 160;

    function scroll() {
      if (!isPaused) {
        if (direction === "right-to-left") {
          scrollPos -= 1;
          if (scrollPos <= -cardSize) {
            const firstCard = track.firstElementChild;
            track.appendChild(firstCard);
            scrollPos += cardSize;
          }
          track.style.transform = `translateX(${scrollPos}px)`;
        } else if (direction === "left-to-right") {
          scrollPos += 1;
          if (scrollPos >= 0) {
            const lastCard = track.lastElementChild;
            track.prepend(lastCard);
            scrollPos -= cardSize;
          }
          track.style.transform = `translateX(${scrollPos}px)`;
        }
      }
      requestAnimationFrame(scroll);
    }
    requestAnimationFrame(scroll);
  }
}

initMarquee("marquee1", data, "right-to-left");
initMarquee("marquee2", data1, "left-to-right");
// initMarquee("marquee3", data1, "vertical-dual");//上下滚动