document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('jsContainer');
    const numSegments = 6;
    const segments = [];

    // 使用不同图片路径（示例URL需替换实际路径）
    const imgUrls = [
      'https://pic1.imgdb.cn/item/67baba8cd0e0a243d402729a.png',
      'https://pic1.imgdb.cn/item/67baba8cd0e0a243d402729b.png',
      'https://pic1.imgdb.cn/item/67baba8cd0e0a243d402729c.png',
      'https://pic1.imgdb.cn/item/67baba8dd0e0a243d402729d.png',
      'https://pic1.imgdb.cn/item/67baba8dd0e0a243d402729e.png',
      'https://pic1.imgdb.cn/item/67baba8dd0e0a243d40272a0.png'
    ];

    for (let i = 0; i < numSegments; i++) {
      const seg = document.createElement('div');
      seg.classList.add('snake-segment');
      const img = document.createElement('img');
      img.src = imgUrls[i];
      seg.appendChild(img);
      container.appendChild(seg);
      segments.push(seg);
    }

    let startTime = null;
    const speed = 100;

    function getRotation(direction) {
      const rotationMap = {
        'top': 180,
        'right': 270,
        'bottom': 0,
        'left': 90
      };
      return `rotate(${rotationMap[direction]}deg)`;
    }

    function getPerimeterCoord(t, width, height) {
      const perimeter = 2 * (width + height);
      let pos = t % perimeter;
      pos = Math.max(0, Math.min(pos, perimeter - 1));

      const segWidth = 50; // 固定宽度
      const segHeight = 30; // 固定高度

      if (pos < width) { // Top border
        return { x: pos + segWidth / 2, y: segHeight / 2, direction: 'top' };
      }
      pos -= width;
      if (pos < height) { // Right border
        return { x: width - segWidth / 2, y: pos + segHeight / 2, direction: 'right' };
      }
      pos -= height;
      if (pos < width) { // Bottom border
        return { x: width - pos - segWidth / 2, y: height - segHeight / 2, direction: 'bottom' };
      }
      pos -= width;
      return { x: segWidth / 2, y: height - pos - segHeight / 2, direction: 'left' }; // Left border
    }

    function updateSegmentStyle(segment, direction) {
      if (direction === 'top' || direction === 'bottom') {
        segment.style.marginLeft = '0px'; // 清除可能存在的 margin-left
      } else if (direction === 'right') {
        segment.style.marginLeft = '10px'; // 右边框时
      } else if (direction === 'left') {
        segment.style.marginLeft = '-10px'; // 左边框时
      }
    }

    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      const width = container.clientWidth;
      const height = container.clientHeight;

      for (let i = 0; i < numSegments; i++) {
        const delay = i * 50;
        const tPos = speed * elapsed - delay;
        const pos = getPerimeterCoord(tPos, width, height);
        const seg = segments[i];
        const img = seg.querySelector('img');

        updateSegmentStyle(seg, pos.direction);

        seg.style.left = `${pos.x}px`;
        seg.style.top = `${pos.y}px`;
        seg.style.transform = `translate(-50%, -50%) ${getRotation(pos.direction)}`;
      }
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  });