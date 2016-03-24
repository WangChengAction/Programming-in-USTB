var momObj = function(){
	this.x;
	this.y;
	this.angle;  

	this.bigTailTimer = 0;
	this.bigTailCount = 0;

	this.bigEyeTimer = 0;
	this.bigEyeCount = 0;
	this.bigEyeInterval = 1000;

	this.bigBodyCount = 0;//计数器，当吃到果实的时候发生变化
}
momObj.prototype.init = function(){
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
	
}
momObj.prototype.draw = function(){

	//lerp x,y
	this.x = lerpDistance(mx,this.x,0.95);//目标是鼠标的x,y
	this.y = lerpDistance(my,this.y,0.95);
	//Math.atan2(y,x)计算，y是大鱼跟鼠标的坐标差
	var deltaY = my - this.y;
	var deltaX = mx - this.x;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;

	//lerp angle让大鱼坐标
	this.angle = lerpAngle(beta,this.angle,0.6);

	//bigTail
	this.bigTailTimer += deltaTime;
	if(this.bigTailTimer > 50){
		this.bigTailCount = (this.bigTailCount + 1) % 8;
		this.bigTailTimer %= 50;
	}
	//bigEye
	this.bigEyeTimer += deltaTime;
	
	if(this.bigEyeTimer > this.bigEyeInterval){
		this.bigEyeCount = (this.bigEyeCount + 1) % 2;
		this.bigEyeTimer %= this.bigEyeInterval;
		
		if(this.bigEyeCount == 0){
			this.bigEyeInterval = Math.random() * 1500 + 2000;
		}else{
			this.bigEyeInterval = 200;
		}
	}
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);//大鱼旋转

	var bigTailCount = this.bigTailCount;
	var bigEyeCount = this.bigEyeCount;
	ctx1.drawImage(bigTail[bigTailCount],-bigTail[bigTailCount].width * 0.5 + 30,-bigTail[bigTailCount].height * 0.5);	
	var bigBodyCount = this.bigBodyCount;
	if(data.double == 2){//判断是否是蓝色，是蓝色变蓝，用double的值就可以判断
		ctx1.drawImage(bigBodyBlue[bigBodyCount],-bigBodyBlue[bigBodyCount].width * 0.5,-bigBodyBlue[bigBodyCount].height * 0.5);
	}else{
		ctx1.drawImage(bigBodyOrange[bigBodyCount],-bigBodyOrange[bigBodyCount].width * 0.5,-bigBodyOrange[bigBodyCount].height * 0.5);
	}
	ctx1.drawImage(bigEye[bigEyeCount],-bigEye[bigEyeCount].width * 0.5,-bigEye[bigEyeCount].height * 0.5);

	ctx1.restore();
}