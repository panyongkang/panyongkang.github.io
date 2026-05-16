//获取变量
var pingmu = document.getElementById('pingmu');
var btn = document.getElementById("btn");
var snakeMove = null;
var fenshuBox = document.getElementById("fenshu");
//游戏初始化
init();
//初始化方法
function init() {
    //获取地图宽度和高度
    this.mapW = parseInt(getComputedStyle(pingmu).width);
    this.mapH = parseInt(getComputedStyle(pingmu).height);

    //食物的宽度和高度
    this.foodW = 20;
    this.foodH = 20;

    //蛇的宽度和高度
    this.snakeW = 20;
    this.snakeH = 20;

    //初始化食物的位置
    this.foodX = 0;
    this.foodY = 0;

    //初始化蛇身数据
    this.snakeBody = [
        [2, 0, 'head'],
        [1, 0, 'body'],
        [0, 0, 'body']
    ]; //第一个参数 代表水平位置，第二个代表垂直位置，第三个代表位置
    //this.snakeBody=[[3,0,'head'],[2,0,'body'],[1,0,'body']];

    //初始化方向
    this.fangxiang = "right";
    this.left = false;
    this.right = false;
    this.tops = true;
    this.bottom = true;

    //初始化成绩变量
    this.chengji = 0;

    //生成初始化的一个食物
    food();

    //生成蛇身
    snake();
}
//点击按钮操作游戏开始和暂停
btn.onclick = function() {

    //判断
    if(this.innerHTML == "开始") {
        //开始游戏
        startGame();
        //内容修改
        this.innerHTML = "暂停";
    } else if(this.innerHTML == "暂停") {
        //暂停游戏
        pauseGame();
        //内容修改
        this.innerHTML = "开始";
    }
}

//开始游戏的方法
function startGame() {

    //定时器
    snakeMove = setInterval(move, 100);
	//开始时播放音乐
	document.getElementById("audio").play();
    //绑定按键事件
    bindKeyDown();

}

//键盘按键事件
function bindKeyDown() {
    window.onkeydown = function(event) {
        //获取按键
        code = event.keyCode;
        //根据不同的按键进行处理
        switch(code) {
            case 37:
                if(this.left) {
                    this.fangxiang = "left";
                    this.left = false;
                    this.right = false;
                    this.tops = true;
                    this.bottom = true;
                }
                break;
            case 38:
                if(this.tops) {
                    this.fangxiang = "tops";
                    this.left = true;
                    this.right = true;
                    this.tops = false;
                    this.bottom = false;
                }
                break;
            case 39:
                if(this.right) {
                    this.fangxiang = "right";
                    this.left = false;
                    this.right = false;
                    this.tops = true;
                    this.bottom = true;
                }
                break;
            case 40:
                if(this.bottom) {
                    this.fangxiang = "bottom";
                    this.left = true;
                    this.right = true;
                    this.tops = false;
                    this.bottom = false;
                }
                break;
        }

    }
}

//暂停游戏的方法
function pauseGame() {
    clearInterval(snakeMove);
	//暂停时音乐也暂时
	document.getElementById("audio").pause();
}

//蛇移动的方法
function move() {
    //修改snakeBody中的数据
    for(var i = this.snakeBody.length - 1; i > 0; i--) {
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];

    }
    //根据方向操作
    switch(this.fangxiang) {
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        case 'right':
            this.snakeBody[0][0] += 1;
            break;
        case 'tops':
            this.snakeBody[0][1] -= 1;
            break;
        case 'bottom':
            this.snakeBody[0][1] += 1;
            break;
    }

    //先移除原有的蛇身
    clearBox("snake");
    //绘制新的蛇身
    snake();

    //进行吃食物
    if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {

        //先移除被吃掉的食物
        clearBox("food");

        //生成新的食物
        food();

        //成绩增加
        this.chengji += 1;

        fenshuBox.innerHTML = this.chengji;

        //蛇长度增加
        //获取最后一个值得x和y
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];

        //根据不同的方向增加最后一个值
        switch(this.fangxiang) {
            case 'left':
                this.snakeBody.push([snakeEndX + 1, snakeEndY, 'body']);
                break;
            case 'right':
                this.snakeBody.push([snakeEndX - 1, snakeEndY, 'body']);
                break;
            case 'tops':
                this.snakeBody.push([snakeEndX, snakeEndY - 1, 'body']);
                break;
            case 'bottom':
                this.snakeBody.push([snakeEndX, snakeEndY + 1, 'body']);
                break;
        }
    }

    //判断蛇是否超出左右边界
    if(this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= this.mapW / this.foodW) {

        //调用游戏结束方法
        gameOver();
    }
    //判断蛇是否超出上下边界
    if(this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= this.mapH / this.foodH) {

        //调用游戏结束方法
        gameOver();
    }

    //判断蛇碰到自己的身体
    for(var i = 1; i < this.snakeBody.length; i++) {
        if(this.snakeBody[i][0] == this.snakeBody[0][0] && this.snakeBody[i][1] == this.snakeBody[0][1]) {
            gameOver();
        }
    }

} //游戏结束方法
function gameOver() {
    alert("游戏失败！当前得分：" + this.chengji);

    //清空定时器
    clearInterval(snakeMove);
    //移除蛇的位置
    clearBox("snake");

    //初始化蛇身数据
    this.snakeBody = [
        [2, 0, 'head'],
        [1, 0, 'body'],
        [0, 0, 'body']
    ]; //第一个参数 代表水平位置，第二个代表垂直位置，第三个代表位置

    //初始化方向
    this.fangxiang = "right";
    this.left = false;
    this.right = false;
    this.tops = true;
    this.bottom = true;

    //初始化成绩变量
    this.chengji = 0;

    snake();
    //开始按钮的文字
    btn.innerHTML = "开始";
    //分数清零
    fenshuBox.innerHTML = 0;
	//结束时重新加载音乐
	document.getElementById("audio").load();
}

//清除盒子
function clearBox(className) {
    //获取类名为
    var snakes = document.getElementsByClassName(className);
    //移除蛇身
    while(snakes.length) {
        snakes[0].parentNode.removeChild(snakes[0]);
    }
}

//生成蛇身
function snake() {
    //for循环遍历数组
    for(var i = 0; i < this.snakeBody.length; i++) {
        //创建蛇身
        var snakeBox = document.createElement("div");
        //设置宽度和高度
        snakeBox.style.width = snakeW + "px";
        snakeBox.style.height = snakeH + "px";
        //定位
        snakeBox.style.position = "absolute";
        //位置计算
        snakeBox.style.top = this.snakeBody[i][1] * this.snakeW + "px";
        snakeBox.style.left = this.snakeBody[i][0] * this.snakeH + "px";
        //设置类名
        snakeBox.className = "snake";
        //追加到屏幕中
        pingmu.appendChild(snakeBox);

    }
}

//生成食物
function food() {
    //计算随机的位置
    this.foodX = Math.floor(Math.random() * this.mapW / this.foodW);
    this.foodY = Math.floor(Math.random() * this.mapH / this.foodH);

    //创建一个盒子
    var foodBox = document.createElement('div');
    //初始化宽度和高度
    foodBox.style.width = this.foodW + "px";
    foodBox.style.height = this.foodH + "px";

    //需要设置绝对定位
    foodBox.style.position = "absolute";
    foodBox.style.top = this.foodY * this.foodW + "px";
    foodBox.style.left = this.foodX * this.foodH + "px";

    //设置类名
    foodBox.className = "food";

    //将食物追加到屏幕中
    pingmu.appendChild(foodBox);
}

