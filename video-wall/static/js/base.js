let currentVideoInfo = {};
const videoUrls = [
  {
    url: "https://mpimg.cn/view.php/b276d550ee09d7b83054abff4489c534.mp4",
    poster: "https://mpimg.cn/view.php/9b3a38f7ec07818525d175c5ec014141.jpg",
    name: "《爱的供养》-杨幂",
    description: "我用尽一生一世来将你供养，只期盼你停住流转的目光"
  },
  {
    url: "https://cccimg.com/view.php/f6a517f57da57a7c9e822f23f5ee2eb7.mp4",
    poster: "https://pic1.imgdb.cn/item/6638e02d0ea9cb140326954c.png",
    name: "《你一定要幸福》-何洁",
    description: "有些爱却不得不各安天涯，在夜深人静的时候想起他，送的那些花，还说过一些撕心裂肺的情话"
  },
  {
    url: "https://cccimg.com/view.php/e1e5abaaab6cde9d4d325e9b157d1269.mp4",
    // poster: "https://mpimg.cn/view.php/9b3a38f7ec07818525d175c5ec014141.jpg",
    name: "回避型人格",
    description: "混得不好的人往往都是回避型人格..."
  },
  {
    url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    poster: "",
    name: "花开富贵",
  },
  {
    url: "https://cccimg.com/view.php/feb37553d9fda40b3b739e30fe060f2f.mp4",
    poster: "https://mpimg.cn/view.php/9b3a38f7ec07818525d175c5ec014141.jpg",
    name: "《认真的雪》-薛之谦",
    description: "雪下得那么深下得那么认真，倒映出我躺在雪中的伤痕"
  },
  {
    url: "https://mpimg.cn/view.php/ec646e37456de0ac11a31c366ae97902.mp4",
    poster: "https://mpimg.cn/view.php/9b3a38f7ec07818525d175c5ec014141.jpg",
    name: "《记事本》-陈慧琳",
    description: "童年只记住了旋律，长大后更多是关于生活、爱情以及成长的故事~"
  },
  {
    url: "https://mpimg.cn/view.php/d7cf77dc0f88ea61157bd1b09d3cc38b.mp4",
    poster: "https://pic1.imgdb.cn/item/605b04d78322e6675ce815f6.gif",
    name: "内心世界",
    description: "从小缺爱的人内心是没有力量的，唯有把心激活，生命才能恢复活力~"
  },
  {
    url: "https://mpimg.cn/view.php/f505f14486cf94f070e2e2def7872c65.mp4",
    name: "来日方长",
    description: "欲买桂花同载酒，终不似，少年游..."
  },
];

const gridContainer = document.getElementById("gridContainer");
const fullscreenContainer = document.getElementById("fullscreenContainer");
const fullscreenVideo = document.getElementById("fullscreenVideo");

// 为每个视频创建一个 grid-item
videoUrls.forEach(videoData => {
  const div = document.createElement("div");
  div.className = "grid-item";

  // 添加标题
  let title = null;
  if (videoData.name) {
    title = document.createElement("div");
    title.className = "video-title";
    title.textContent = videoData.name;
    div.appendChild(title);
  }

  // 创建 video 元素，但不设置 src（懒加载）
  const video = document.createElement("video");
  // 将真实视频 URL 存入 data-src 属性
  video.dataset.src = videoData.url;
  // 设置 preload 为 "none"，确保不会自动下载
  video.preload = "none";
  // 使用默认封面（poster）——可以根据需求自定义，这里简单替换 .mp4 为指定的缩略图 URL
  video.poster = videoData.poster || "https://mpimg.cn/view.php/9b3a38f7ec07818525d175c5ec014141.jpg";
  video.onerror = () => {
    video.poster = "https://mpimg.cn/view.php/2982f73b9d2223a23a85e0a6686b7bdd.jpg";
    video.removeAttribute("src");
  };

  // 添加描述
  let desc = null;
  if (videoData.description) {
    desc = document.createElement("div");
    desc.className = "video-description";
    desc.textContent = videoData.description;
    div.appendChild(desc);
  }

  // 控制标题和描述显示状态
  function toggleTextVisibility() {
    if (title) title.style.display = video.paused ? 'block' : 'none';
    if (desc) desc.style.display = video.paused ? 'block' : 'none';
  }
  toggleTextVisibility();

  // 播放和暂停时切换文字显示
  video.addEventListener('play', toggleTextVisibility);
  video.addEventListener('pause', toggleTextVisibility);

  // 点击事件：第一次点击时设置 src 并开始播放；后续点击则切换播放/暂停
  video.onclick = () => {
    // 如果还没有加载视频数据，则开始懒加载
    if (!video.src) {
      video.src = video.dataset.src;
      video.load();  // 通知浏览器加载资源
      video.play();
    } else {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  };

  // 双击进入全屏：同样确保 video.src 已加载
  video.ondblclick = () => {
    if (!video.src) {
      video.src = video.dataset.src;
      video.load();
    }
    const wasPlaying = !video.paused;
    const currentTime = video.currentTime;
    video.pause();
    openFullscreen(video.src, currentTime, wasPlaying, video);
  };

  div.appendChild(video);
  gridContainer.appendChild(div);
});

// 全屏播放函数
function openFullscreen(url, currentTime, wasPlaying, gridVideo) {
  fullscreenVideo.src = url;
  fullscreenVideo.currentTime = currentTime;
  fullscreenVideo.play();
  fullscreenContainer.style.display = "flex";
  document.body.style.overflow = "hidden";
  currentVideoInfo = { wasPlaying, gridVideo };
}

function closeFullscreen() {
  const { wasPlaying, gridVideo } = currentVideoInfo;
  const currentTime = fullscreenVideo.currentTime;
  fullscreenVideo.pause();
  fullscreenContainer.style.display = "none";
  document.body.style.overflow = "auto";
  if (gridVideo) {
    gridVideo.currentTime = currentTime;
    if (wasPlaying) gridVideo.play();
  }
  currentVideoInfo = {};
}

fullscreenContainer.addEventListener("click", (e) => {
  if (e.target === fullscreenContainer) closeFullscreen();
});

// 标签页切换时暂停/恢复播放
const playStates = new Map();
document.addEventListener('visibilitychange', handleVisibilityChange);
function handleVisibilityChange() {
  const videos = document.querySelectorAll('video');
  if (document.hidden) {
    videos.forEach(video => {
      playStates.set(video, !video.paused);
      video.pause();
    });
  } else {
    playStates.forEach((wasPlaying, video) => {
      if (wasPlaying) video.play();
    });
    playStates.clear();
  }
}