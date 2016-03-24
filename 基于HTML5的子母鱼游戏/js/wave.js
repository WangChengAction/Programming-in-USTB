var waveObj = function(){
	this.x = [];
	this.y = [];
	this.alive = [];//是否闲置,false是闲着，true是忙着
	this.r = [];//半径
}

waveObj.prototype.num = 10;

waveObj.prototype.init = function(){

	for(var i = 0 ; i < this.num ; i++){
		this.alive[i] = false;
		this.r[i] = 0;
	}
}
waveObj.prototype.draw = function(){

	ctx1.save();
	ctx1.lineWidth = 2;
	ctx1.shadowBlue = 10;

	for(var i = 0; i < this.num ; i++){
		if(this.alive[i]){
			//draw
			this.r[i] += deltaTime * 0.02;
			if(this.r[i] > 50){
				this.alive[i] = false;
				break;
			}
			var alpha = 1 - this.r[i] / 50; //颜色与半径成反比，半径越大，颜色越浅，达到最大值100时，完全透明

			ctx1.beginPath();
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,2 * Math.PI);
			ctx1.strokeStyle = "rgba(255,255,255," + alpha + ")";
			ctx1.stroke();
		}
	}
	ctx1.restore();
}
//判断是否闲着的方法
waveObj.prototype.born = function(x,y){
	for(var i = 0; i < this.num ; i++){
		if(!this.alive[i]){
			this.alive[i] = true;
			this.r[i] = 10;
			this.x[i] = x;//出生时就获取到圆心的位置
			this.y[i] = y;
			//born

			return;
		}
	}
}