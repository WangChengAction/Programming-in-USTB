var babyObj = function(){
	this.x;
	this.y;
	this.angle;

	this.babyTailTimer = 0;	
	this.babyTailCount = 0;//记录当前执行的图片序号

	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;//时间间隔的变量(表示当前这张图片需要持续多长时间)，每隔1000个单位眨一次眼

	this.babyFadeTimer = 0;
	this.babyFadeCount = 0;

}

babyObj.prototype.init = function(){
	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;

	this.angle = 0;

}

babyObj.prototype.draw = function(){

	//lerp x , y
	this.x = lerpDistance(mom.x,this.x,0.98);
	this.y = lerpDistance(mom.y,this.y,0.98);

	//lerp angle
	var deltaY = mom.y - this.y;
	var deltaX = mom.x - this.x;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;

	this.angle = lerpAngle(beta,this.angle,0.6);

	//babytail count
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer > 50){
		this.babyTailCount = (this.babyTailCount + 1 ) % 8;
		this.babyTailTimer %= 50;//每加一帧，需要对计时器复原
	}

	//babyEye 
	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval){
		this.babyEyeCount = (this.babyEyeCount + 1 ) % 2;
		this.babyEyeTimer %= this.babyEyeInterval;

		if(this.babyEyeCount == 0){
			this.babyEyeInterval = Math.random() * 1500 + 2000;//睁眼的时间比较长
		}else{
			this.babyEyeInterval = 200;
		}
	}

	//babyFade
	this.babyFadeTimer += deltaTime;
	if(this.babyFadeTimer > 300){
		this.babyFadeCount = this.babyFadeCount + 1;
		this.babyFadeTimer %= 300;
		if(this.babyFadeCount > 19){
			this.babyFadeCount = 19;
			//game over
			data.gameOver = true;
		}
	}
	//ctx1
	ctx1.save();
	//translate
	ctx1.translate(this.x,this.y);//translate把圆点移到this.x和this.y的位置
	ctx1.rotate(this.angle);//旋转画布，把当前画布以上一行的位置为圆点，this.angle为角度进行旋转

	var babyTailCount = this.babyTailCount;
	var babyEyeCount = this.babyEyeCount;
	var babyFadeCount = this.babyFadeCount;
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width * 0.5 + 25, -babyTail[babyTailCount].height * 0.5);
	ctx1.drawImage(babyFade[babyFadeCount],-babyFade[babyFadeCount].width * 0.5 , -babyFade[babyFadeCount].height * 0.5);
	ctx1.drawImage(babyEye[babyEyeCount], -babyEye[babyEyeCount].width * 0.5 ,  -babyEye[babyEyeCount].height * 0.5 );
	ctx1.restore();
}