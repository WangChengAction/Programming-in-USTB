var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;//上一帧执行时间
var deltaTime;//两帧间隔的时间差

var bgPic = new Image();//定义背景图片

var ane;
var fruit;

var mom;
var baby;

var mx;
var my;

var babyTail = [];//匀速
var babyEye = [];//变速
var babyFade = [];

var bigTail = [];
var bigEye = [];
var bigBodyOrange = [];
var bigBodyBlue = [];

var data;

var wave;//物理池，存放特效
var halo;

var dust;//漂浮物
var dustPic = [];


document.body.onload = game;

function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}
function init(){
	//获得canvas的场景
	can1 = document.getElementById("canvas1");//在前，绘制fishes,dust,UI,circle
	ctx1 = can1.getContext('2d');
	can2 = document.getElementById("canvas2");//在后，绘制background,ane,fruits
	ctx2 = can2.getContext('2d');

	can1.addEventListener('mousemove',onMouseMove,false);//鼠标监听函数

	bgPic.src = "./src/background.jpg";
	//获取canvas的尺寸
	canWidth = can1.width;
	canHeight = can1.height;

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	baby = new babyObj();
	baby.init();

	mx = canWidth * 0.5;
	my = canHeight * 0.5;

	//小鱼动画
	for(var i = 0; i < 8 ; i++){
		babyTail[i] = new Image();
		babyTail[i].src = "./src/babyTail" + i + ".png";
	}
	for(var i = 0; i < 2 ; i++){
		babyEye[i] = new Image();
		babyEye[i].src = "./src/babyEye" + i + ".png";
	}
	for(var i = 0; i < 20 ; i++){
		babyFade[i] = new Image();
		babyFade[i].src = "./src/babyFade" + i + ".png";
	}

	//大鱼动画
	for(var i = 0; i < 8 ; i++){
		bigTail[i] = new Image();
		bigTail[i].src = "./src/bigTail" + i + ".png";
	}
	for(var i = 0; i < 2 ; i++){
		bigEye[i] = new Image();
		bigEye[i].src = "./src/bigEye" + i + ".png";
	}
	data = new dataObj();

	for(var i = 0 ; i < 8 ; i++){
		bigBodyOrange[i] = new Image();
		bigBodyBlue[i] = new Image();
		bigBodyOrange[i].src = "./src/bigSwim" + i + ".png";	
		bigBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
	}

	//分数字体
	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";//文本格式 left center right

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();

	for(var i = 0 ; i < 7 ; i++){

		dustPic[i] = new Image();
		dustPic[i].src = "./src/dust" + i + ".png";
	}
	dust = new dustObj();
	dust.init();


}

//动画需要刷新，这就需要一个
function gameloop(){
	
	window.requestAnimFrame(gameloop);
	
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	if(deltaTime > 40) deltaTime = 40;//解决标签切换下，果实无限长大的bug

	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();

	//canvas是透明的，所以我们每次绘制的时候都要把上一次绘制的清除一下，否则会造成线条特别粗
	ctx1.clearRect(0,0,canWidth,canHeight);

	mom.draw();
	momFruitsCollision();
	momBabyCollision();

	baby.draw();

	data.draw();

	wave.draw();
	halo.draw();

	dust.draw();

}
function onMouseMove(e){
	if(!data.gameOver){
		if(e.offSetX || e.layerX){
			mx = e.offSetX == undefined ? e.layerX : e.offSetX;
			my = e.offSetY == undefined ? e.layerY : e.offSetY;
		}		
	}
	
}