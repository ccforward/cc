
document.ontouchmove = function(ev){
	ev.preventDefault(); 
};

$(function(){
	
	var bBtn = true;
	
	var Game = {
		colNum : 7,
		wH : 104,
		timeBtn : true,
		dir : 0,
		dirThis : null,
		init : function(){
			this.oUl = $('#wrap');
			this.addSound();
			this.createMap();
			
		},
		createMap : function(){
			
			this.oUl.css({width : this.colNum*this.wH , height : this.colNum*this.wH});
			var numX = 0;
			var numY = 0;
			
			for(var i=0;i<Math.pow(this.colNum,2);i++){
				var oLi = $('<li>');
				oLi.attr('class','box'+ Math.floor(Math.random()*6));
				
				oLi.data({x : numX , y : numY});
				
				numX++;
				
				if( numX == this.colNum ){
					numX = 0;
					numY++;
				}
				
				this.oUl.append( oLi );
			}
			
			this.positionShow();
			
			this.removeShow();
			
			this.bindTouch();
			
		},
		positionShow : function(){
			
			this.aLi = this.oUl[0].getElementsByTagName('li');
		
			var arr = [];
			$(this.aLi).each(function(i,elem){
				arr.push( [ elem.offsetLeft , elem.offsetTop ] );
			});
			$(this.aLi).each(function(i,elem){
				$(elem).css({position : 'absolute',left : arr[i][0] , top : arr[i][1]});
				
			});
			
			this.arr = arr;
			
		},
		bindTouch : function(){
			
			var startX = 0;
			var startY = 0;
			var This = this;
			var izIndex = 2;
			var startThis = null;
			
			this.oUl.delegate('li','touchstart mousedown',function(event){
				
				 var data = event.originalEvent.changedTouches ? event.originalEvent.changedTouches[ 0 ] : event;
				 startX = data.clientX;
				 startY = data.clientY;
				 
				 startThis = this;
				 
				 return false;
			});
			
			this.oUl.delegate('li','touchend mouseup',function(event){
				
				var data = event.originalEvent.changedTouches ? event.originalEvent.changedTouches[ 0 ] : event;
				
				if(This.timeBtn && ( Math.abs(startX - data.clientX)>10 || Math.abs(startY - data.clientY) > 10 )){
					
				$(startThis).css('zIndex',izIndex++);
				
				if( Math.abs(startX - data.clientX) > Math.abs(startY - data.clientY) ){//  左右
					if(startX < data.clientX){ //→
						
						if( $(startThis).data('x') != This.colNum-1 ){
							
							This.dir = 1;
						
							var index = $(startThis).data('x')+1 + $(startThis).data('y')*This.colNum;
							
							var nextLi = $(This.oUl).find('li').eq(index);
							
							$(startThis).insertAfter( nextLi );	
							
							$(startThis).animate({left : This.arr[index][0]},300);		
							nextLi.animate({left : This.arr[index-1][0]},300);		
							
							$(startThis).data('x',$(startThis).data('x')+1);
							nextLi.data('x',nextLi.data('x')-1);
							
							This.dirThis = nextLi;
							
						}
					
					}
					else{  //←
					
						if( $(startThis).data('x') != 0 ){
						
							This.dir = 2;
						
							var index = $(startThis).data('x')-1 + $(startThis).data('y')*This.colNum;
						
							var prevLi = $(This.oUl).find('li').eq(index);
							
							$(startThis).insertBefore( prevLi );	
							$(startThis).animate({left : This.arr[index][0]},300);		
							prevLi.animate({left : This.arr[index+1][0]},300);		
							
							$(startThis).data('x',$(startThis).data('x')-1);
							prevLi.data('x',prevLi.data('x')+1);
							
							This.dirThis = prevLi;
						
						}
					
					}
				}
				else{  //上下
				
					if(startY < data.clientY){ //↓
					
						if( $(startThis).data('y') != This.colNum-1 ){
							
							This.dir = 3;
							
							var index = $(startThis).data('x') + ($(startThis).data('y')+1)*This.colNum;	
								
							var downLi = $(This.oUl).find('li').eq(index);
							
							var prevThis = $(startThis).prev();
							
							$(startThis).insertAfter( downLi );	
							downLi.insertAfter( prevThis );
							
							$(startThis).animate({top : This.arr[index][1]},300);		
							downLi.animate({top : This.arr[index-This.colNum][1]},300);		
							
							$(startThis).data('y',$(startThis).data('y')+1);
							downLi.data('y',downLi.data('y')-1);
							
							This.dirThis = downLi;
							
						}
					
					}
					else{  //↑
			
						if( $(startThis).data('y') != 0 ){
							
							This.dir = 4;
							
							var index = $(startThis).data('x') + ($(startThis).data('y')-1)*This.colNum;	
								
							var upLi = $(This.oUl).find('li').eq(index);
							
							var prevThis = $(startThis).prev();
							
							$(startThis).insertAfter( upLi );	
							upLi.insertAfter( prevThis );
							
							$(startThis).animate({top : This.arr[index][1]},300);		
							upLi.animate({top : This.arr[index+This.colNum][1]},300);		
							
							$(startThis).data('y',$(startThis).data('y')-1);
							upLi.data('y',upLi.data('y')+1);
							
							This.dirThis = upLi;
							
						}
					
					}
				
				}
					This.oA.src = 'sound/b.mp3';
					This.oA.play();
					
					This.removeShow();
				}
				
				return false;
				
			});
		},
		removeShow : function(){
			
			var arr = [];
			var This = this;
			
			function addArr(aLi){
				
				var prevLi = aLi[0];
				var iNum = 0;
				
				for(var i=0;i<aLi.length;i++){
					if( aLi[i].className == prevLi.className && i%7!=0 ){
						iNum++;
					}
					else{
						
						if(iNum >= 2){
							for(var j=0;j<=iNum;j++){
								arr.unshift( aLi[(i-1)-j] );
							}
							
						}
						
						iNum = 0;
					}
					prevLi = aLi[i];	
				}
				
				if(iNum >= 2){
					for(var j=0;j<=iNum;j++){
						arr.unshift( aLi[(i-1)-j] );
					}
					
				}
				
			}
			
			addArr(this.aLi);
			addArr(this.xyChange(this.aLi));
			
			for(var i=0;i<arr.length;i++){
				
				for(var j=0;j<this.aLi.length;j++){
					if( arr[i] == this.aLi[j] ){
						this.aLi[j].bBtn = true;
					}
				}
			}
			
			var removeNum = 0;
			var removeY = [];
			var changeArr = [];
			
			for(var i=0;i<this.aLi.length;i++){
				if( this.aLi[i].bBtn ){
					removeNum++;
					removeY.push( this.aLi[i] );
				}
			}
			
			if(removeY.length){
				this.timeBtn = false;
				this.dir = 0;
			}
			else{
				this.toReset();
				return;
			}
			
			for(var i=0;i<removeY.length;i++){
				for(var j=0;j<this.arrY[ $(removeY[i]).data('x') ].length;j++ ){
					
					if( removeY[i] == this.arrY[ $(removeY[i]).data('x') ][j] ){
						this.arrY[ $(removeY[i]).data('x') ].iNum++;
						this.arrY[ $(removeY[i]).data('x') ].splice(j,1);
						this.arrY[ $(removeY[i]).data('x') ].unshift( this.oneLi( $(removeY[i]).data('x') , this.arrY[ $(removeY[i]).data('x') ].iNum ) );
						
					}
				}
			}
			
			for(var i=0;i<this.colNum;i++){
				changeArr = changeArr.concat( this.arrY[i] );
			}
			
			var c = this.xyChange( changeArr );
			var removeYnum = 0;
			
			for(var i=0;i<removeY.length;i++){
				
				$(removeY[i]).animate({opacity:0},function(){
					$(this).remove();
					
					removeYnum++;
					
					if(removeYnum == removeY.length){
						
						
						for(var i=0;i<c.length;i++){
							This.oUl.append( c[i] );
						}
						
						var numX = 0;
						var numY = 0;
						
						for(var i=0;i<This.aLi.length;i++){
							
							$(This.aLi).eq(i).data({x : numX , y : numY});
							
							numX++;
							
							if( numX == This.colNum ){
								numX = 0;
								numY++;
							}
							
						}
						
						This.movePos();
					}
					
				});
			}
			
		},
		xyChange : function(aLi){
			
			var arr = [];
			var This = this;
			this.arrY = {};
			iNum = 0;
			
			for(var i=0;i<this.colNum;i++){
				this.arrY[i] = [];
				this.arrY[i].iNum = 0;
			}
			
			(function(){
				
				if(iNum==This.colNum){
					return;
				}
				
				for(var i=0;i<aLi.length;i++){
					if(i%This.colNum == iNum){
						arr.push( aLi[i] );
						This.arrY[iNum].push( aLi[i] );
					}
				}
				iNum++;
				arguments.callee();
				
			})();
			
			return arr;
			
		},
		oneLi : function(x,iNum){
			
			var oLi = $('<li>');
			oLi.attr('class','box'+ Math.floor(Math.random()*6));
			oLi.css({ position : 'absolute' , left : x*this.wH , top : -iNum*this.wH });
			this.oUl.append( oLi );
			
			return oLi.get(0);
			
		},
		movePos : function(){
			
			var bBtn = true;
			var This = this;
			
			for(var i=0;i<this.aLi.length;i++){
				$(this.aLi[i]).animate({top : this.arr[i][1] },function(){
					if(bBtn){
						bBtn = false;
						
						This.timeBtn = true;
						
						This.removeShow();
						
						This.oA.src = 'sound/a.mp3';
						This.oA.play();
						
					}
				});
			}
			
		},
		toReset : function(){
			
			switch(this.dir){
				case 1:
					
					var index = $(this.dirThis).data('x')+1 + $(this.dirThis).data('y')*this.colNum;
							
					var nextLi = $(this.oUl).find('li').eq(index);
					
					$(this.dirThis).insertAfter( nextLi );	
					
					$(this.dirThis).animate({left : this.arr[index][0]},300);		
					nextLi.animate({left : this.arr[index-1][0]},300);		
					
					$(this.dirThis).data('x',$(this.dirThis).data('x')+1);
					nextLi.data('x',nextLi.data('x')-1);
					
				break;
				case 2:
				
					var index = $(this.dirThis).data('x')-1 + $(this.dirThis).data('y')*this.colNum;
						
					var prevLi = $(this.oUl).find('li').eq(index);
					
					$(this.dirThis).insertBefore( prevLi );	
					$(this.dirThis).animate({left : this.arr[index][0]},300);		
					prevLi.animate({left : this.arr[index+1][0]},300);		
					
					$(this.dirThis).data('x',$(this.dirThis).data('x')-1);
					prevLi.data('x',prevLi.data('x')+1);
				
				break;
				case 3:
				
					var index = $(this.dirThis).data('x') + ($(this.dirThis).data('y')+1)*this.colNum;	
								
					var downLi = $(this.oUl).find('li').eq(index);
					
					var prevThis = $(this.dirThis).prev();
					
					$(this.dirThis).insertAfter( downLi );	
					downLi.insertAfter( prevThis );
					
					$(this.dirThis).animate({top : this.arr[index][1]},300);		
					downLi.animate({top : this.arr[index-this.colNum][1]},300);		
					
					$(this.dirThis).data('y',$(this.dirThis).data('y')+1);
					downLi.data('y',downLi.data('y')-1);
				
				break;
				case 4:
				
					var index = $(this.dirThis).data('x') + ($(this.dirThis).data('y')-1)*this.colNum;	
								
					var upLi = $(this.oUl).find('li').eq(index);
					
					var prevThis = $(this.dirThis).prev();
					
					$(this.dirThis).insertAfter( upLi );	
					upLi.insertAfter( prevThis );
					
					$(this.dirThis).animate({top : this.arr[index][1]},300);		
					upLi.animate({top : this.arr[index+this.colNum][1]},300);		
					
					$(this.dirThis).data('y',$(this.dirThis).data('y')-1);
					upLi.data('y',upLi.data('y')+1);
				
				break;
			}
			
			
		},
		addSound : function(){
			
			this.oA = document.createElement('audio');
			document.body.appendChild( this.oA );
			
		}
		
	};

	Game.init();
	
});