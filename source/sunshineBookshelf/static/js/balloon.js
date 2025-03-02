(function () {
    // 动态创建 HTML 结构
    function createUI() {
        const container = document.createElement('div');
        container.id = 'balloon-container';
        document.body.appendChild(container);

        const panel = document.createElement('div');
        panel.className = 'control-panel';
        panel.innerHTML = `
            <button id="startBtn" class="control-btn">▶️ 开启</button>
            <button id="pauseBtn" class="control-btn">⏸️ 暂停</button>
            <button id="clearBtn" class="control-btn">🧹 清空</button>
        `;
        document.body.appendChild(panel);
        // attachEvents();  // UI 创建后立刻绑定事件
    }

    // 变量定义
    let isGenerating = false;
    let animationInterval;
    const balloons = [];
    const balloonImages = [
        'https://pic1.imgdb.cn/item/67c27a04d0e0a243d4087fd9.png',
        'https://pic1.imgdb.cn/item/67c2d416d0e0a243d4090fce.png',
        'https://pic1.imgdb.cn/item/67c29485d0e0a243d408a3c4.png',
        'https://pic1.imgdb.cn/item/67c29485d0e0a243d408a3c5.png',
        'https://pic1.imgdb.cn/item/67c29486d0e0a243d408a3c6.png',
        'https://pic1.imgdb.cn/item/67c2d416d0e0a243d4090fd1.png',
        'https://pic1.imgdb.cn/item/67c27a3dd0e0a243d4087fdd.png'
    ];

    function updateButtonStates() {
        document.getElementById('startBtn').disabled = isGenerating;
        document.getElementById('pauseBtn').disabled = !isGenerating;
        document.getElementById('clearBtn').disabled = balloons.length === 0;
    }

    function startGeneration() {
        if (!isGenerating) {
            isGenerating = true;
            animationInterval = setInterval(createBalloon, 800);
            updateButtonStates();
        }
    }

    function pauseGeneration() {
        isGenerating = false;
        clearInterval(animationInterval);
        updateButtonStates();
    }

    function clearAll() {
        pauseGeneration();
        balloons.forEach(balloon => {
            balloon.style.transition = 'opacity 0.3s';
            balloon.style.opacity = '0';
            setTimeout(() => balloon.remove(), 300);
        });
        balloons.length = 0;
        updateButtonStates();
    }

    function createBalloon() {
        const wrapper = document.createElement('div');
        wrapper.className = 'balloon';

        const img = new Image();
        img.className = 'balloon-img';
        img.src = balloonImages[Math.floor(Math.random() * balloonImages.length)];

        const width = 60 + Math.random() * 60;
        wrapper.style.width = `${width}px`;
        wrapper.style.height = `${width * 1.2}px`;
        wrapper.style.left = `${Math.random() * (window.innerWidth - width)}px`;
        wrapper.style.bottom = '-150px';

        wrapper.addEventListener('click', () => removeBalloon(wrapper));

        wrapper.appendChild(img);
        document.getElementById('balloon-container').appendChild(wrapper);
        balloons.push(wrapper);
        startBalloonAnimation(wrapper);
        updateButtonStates();
    }

    function startBalloonAnimation(balloon) {
        let yPos = -150;
        const startX = parseFloat(balloon.style.left);
        const amplitude = 80 + Math.random() * 50;
        const speed = 0.8 + Math.random() * 1.2;

        function animate() {
            if (!isGenerating) return;
            yPos += speed;
            const xPos = startX + Math.sin(yPos * 0.02) * amplitude;

            if (yPos > window.innerHeight + 200) {
                removeBalloon(balloon);
                return;
            }

            balloon.style.bottom = `${yPos}px`;
            balloon.style.left = `${xPos}px`;
            requestAnimationFrame(animate);
        }
        animate();
    }

    function removeBalloon(balloon) {
        balloon.style.transition = 'transform 0.5s, opacity 0.5s';
        balloon.style.transform = 'scale(1.5)';
        balloon.style.opacity = '0';
        setTimeout(() => {
            balloon.remove();
            balloons.splice(balloons.indexOf(balloon), 1);
            updateButtonStates();
        }, 500);
    }

    function attachEvents() {
        document.getElementById('startBtn').addEventListener('click', startGeneration);
        document.getElementById('pauseBtn').addEventListener('click', pauseGeneration);
        document.getElementById('clearBtn').addEventListener('click', clearAll);
        window.addEventListener('resize', () => {
            balloons.forEach(balloon => {
                const currentX = parseFloat(balloon.style.left);
                balloon.style.left = `${Math.min(currentX, window.innerWidth - parseFloat(balloon.style.width))}px`;
            });
        });
    }

    // 初始化
    function init() {
        createUI();
        attachEvents();
        updateButtonStates();
    }

    // document.addEventListener("DOMContentLoaded", init);
    document.addEventListener('DOMContentLoaded', function () {
        init();  // 保证 UI 结构创建后再绑定事件
    });
    
})();
