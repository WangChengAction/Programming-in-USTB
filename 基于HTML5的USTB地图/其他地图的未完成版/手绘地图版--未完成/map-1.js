window.onload=function(){
	var mapCanvas = document.getElementById("mapCanvas");
	var mapCanvasContext = mapCanvas.getContext("2d");
	

	var img = document.getElementById("map");
	mapCanvasContext.drawImage(img,10,10);

	var button_area = document.getElementById("area");
	var button_education = document.getElementById("education");
	var button_dormitory = document.getElementById("dormitory");
	var button_logistic = document.getElementById("logistic");
	var button_family = document.getElementById("family");
	var button_business = document.getElementById("business");
	var button_sports = document.getElementById("sports");
	var button_pathWest = document.getElementById("pathWest");
	var button_pathNorth = document.getElementById("pathNorth");
	var button_pathSouth = document.getElementById("pathSouth");
	var button_pathEast = document.getElementById("pathEast");


	button_area.onclick=areaDraw;
	button_education.onclick=areaDraw;
	button_dormitory.onclick=areaDraw;
	button_logistic.onclick=areaDraw;
	button_family.onclick=areaDraw;
	button_business.onclick=areaDraw;
	button_sports.onclick=areaDraw;
	button_pathWest.onclick=areaDraw;
	button_pathNorth.onclick=areaDraw;
	button_pathSouth.onclick=areaDraw;
	button_pathEast.onclick=areaDraw;
}

function areaDraw(){
	var canvas = document.getElementById("mapCanvas");
	var context = canvas.getContext("2d");

	if (area.checked){
		var areaImg = document.getElementById("map-1");
		context.drawImage(areaImg,10,10);
	}else if(education.checked){
		var eduImg = document.getElementById("map-2");
		context.drawImage(eduImg,10,10);
	}else if(dormitory.checked){
		var dorImg = document.getElementById("map-3");
		context.drawImage(dorImg,10,10);
	}else if(logistic.checked){
		var logImg = document.getElementById("map-4");
		context.drawImage(logImg,10,10);
	}else if (family.checked){
		var familyImg = document.getElementById("map-5");
		context.drawImage(familyImg,10,10);
	}else if (business.checked){
		var businessImg = document.getElementById("map-6");
		context.drawImage(businessImg,10,10);
	}else if (sports.checked){
		var sportsImg = document.getElementById("map-7");
		context.drawImage(sportsImg,10,10);
	}else if(pathWest.checked){
		context.beginPath();
		context.moveTo(60,250);
		context.lineTo(60,350);
		context.lineTo(480,350);
		context.lineTo(480,380);
		context.lineTo(540,380);
		context.lineWidth = 5;
		context.stroke();
	}else if(pathNorth.checked){
		context.beginPath();
		context.moveTo(385,20);
		context.lineTo(385,350);
		context.lineTo(480,350);
		context.lineTo(480,380);
		context.lineTo(540,380);
		context.lineWidth = 5;
		context.stroke();
	}else if(pathSouth.checked){
		context.beginPath();
		context.moveTo(680,480);
		context.lineTo(680,350);
		context.lineTo(480,350);
		context.lineTo(480,380);
		context.lineTo(540,380);
		context.lineWidth = 5;
		context.stroke();
	}else if(pathEast.checked){
		context.beginPath();
		context.moveTo(980,350);
		context.lineTo(980,350);
		context.lineTo(480,350);
		context.lineTo(480,380);
		context.lineTo(540,380);
		context.lineWidth = 5;
		context.stroke();
	}else{
		var img = document.getElementById("map");
		context.drawImage(img,10,10);
	}
}
