var aneObj = function(){

	this.rootx = [];
	this.headx = [];
	this.heady = [];
	this.amp = [];//振幅
	this.alpha = 0; //正弦函数，定义一个角度控制摆动

};

//定义个海葵的数量
aneObj.prototype.num = 50;
aneObj.prototype.init = function(){

	for(var i = 0 ; i < this.num ; i++){
		this.rootx[i] = i * 16 + Math.random() * 20;//[0,1)
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight - 250 + Math.random() * 50;
		this.amp[i] = Math.random() * 50 + 50;
	}
};

aneObj.prototype.draw = function(){

	this.alpha += deltaTime * 0.0008;
	var l = Math.sin(this.alpha);//[-1,1]
	ctx2.save();
	ctx2.globalAlpha = 0.6;//透明度是0.6
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";
	ctx2.strokeStyle = "rgb(35,89,12)";
	for(var i = 0 ; i < this.num ; i++){
		//beginPath,movwTo,lineTo,stroke,strokrStyle,lineWidth,lineCap,globalAlpha
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canHeight);
		
		this.headx[i] = this.rootx[i] + l * this.amp[i];//当前海葵的具体位置
		ctx2.quadraticCurveTo(this.rootx[i],canHeight - 100,this.headx[i],this.heady[i]);
		
		ctx2.stroke();
	}
	ctx2.restore();
};