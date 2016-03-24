//碰撞检测功能,判断大鱼和果实的距离
function momFruitsCollision(){
	if(!data.gameOver){
		for(var i=0 ; i < fruit.num ; i++ ){
			if(fruit.alive[i]){
				var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
				if(l < 900){
					//fruit eaten
					fruit.dead(i);
					data.fruitNum++;
					mom.bigBodyCount++;//大鱼的计数器
					if(mom.bigBodyCount > 7){
						mom.bigBodyCount = 7;
					}
					if(fruit.fruittype[i] == "blue"){
						data.double = 2;
					}
					wave.born(fruit.x[i],fruit.y[i]);
				}

			}
		}		
	}
	
}

//mom baby  collision
function momBabyCollision(){
	if(data.fruitNum > 0 && !data.gameOver){
		var l = calLength2(mom.x,mom.y,baby.x,baby.y);
		if(l < 900){
			//baby recover
			baby.babyFadeCount = 0;
			//大鱼碰撞完小鱼后应该恢复原来的颜色
			mom.bigBodyCount = 0;
			//score 更新
			data.addScore();
			//draw halo
			halo.born(baby.x,baby.y);
		}
	}
	
}
