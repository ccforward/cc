(function($){

	function log(text){
		console.log(text);
	}

	var defaultConf = {
		row: 10,
		width: 30,
		gameResult: '.game-result'
	}

	var Base = function(){
		// 写入总体的桌布的宽高
		this.board.width(this.row * this.width);

		// 开始 结束
		this.isStart = false
		this.isOver = false;

		// 存放棋子位置
		this.chessArr = [];

		// 轮到玩家回合
		this.isPlayerRound = true;

		// 最后棋子位置
		this.playerLastLocation = [];
		this.AILastLocation = [];

		// 颜色
		this.player = 'black';
		this.AI = 'white';

		// 代号 没有棋子则为0
		this.blackChess = -1;
		this.whiteChess = 1;

	};


	// 棋盘
	var Board = function(){}

	Board.prototype = {
		// 渲染正方形棋盘
		render: function(){
			var self = this,
				// 行数
				row = self.row;

			var i,
				k,
				boardArr = [];
			for(i=0; i<row; i++){
				self.chessArr[i] = [];
				for(k=0; k<row; k++){
					// 棋盘所有位置
					self.chessArr[i][k] = 0;
					boardArr.push('<div class="chess" style="float: left;width:'+self.width+'px;height:'+self.width+'px"></div>');
				}

			}

			self.board.html(boardArr.join(''));
		},
		// 重置棋子 
		// TODO render方法重复太多，短时间内不改了，先这样用
		clearBoard: function(){
			this.isOver = false;
			this.gameResult.empty();
			this.render();
		}
	}

	// 横向棋子个数 X轴
	var chessNumX = function(r, c, color){
		var self = this;
		var num = 1;
		var _color;
		var x,
			before = 0,
			after = 0;

		// 左侧个数
		for(x = c-1; x>=0; x--){
			_color = self.chessArr[r][x];
			if( _color == color){
				num++;
			} else {
				if(_color == 0) before = 1;
				break;
			}
		}
		// 右侧个数
		for(x = c+1; x<self.row; x++){
			_color = self.chessArr[r][x];
			if(_color == color){
				num++;
			} else{
				if(_color == 0) after = 1;
				break
			}
		}

		return {
			num: num,
			b: before,
			a: after
		}
	}

	// 竖向个数 Y轴
	var chessNumY = function(r, c, color){
		var self = this;
		var num = 1;
		var _color;
		var y,
			before = 0,
			after = 0;

		// 上面个数
		for(y = r-1; y>=0; y--){
			_color = self.chessArr[y][c];
			if(_color == color){
				num++;
			} else {
				if(_color == 0) before = 1;
				break;
			}
		}

		// 下面个数
		for(y = r+1; y<self.row; y++){
			_color = self.chessArr[y][c];
			if(_color == color){
				num++;
			} else{
				if(_color == 0) after = 1;
				break
			}
		}

		return {
			num: num,
			b: before,
			a: after
		}
	}

	//  \ 方向
	var chessNumXY = function(r, c, color){
		var self = this;
		var num = 1;
		var _color;
		var x, y,
			before = 0,
			after = 0;

		// \ 左上方
		for(x = r-1, y = c-1; x>=0 && y>=0; x--, y--){
			_color = self.chessArr[x][y];
			if(_color == color){
				num++;
			} else{
				if(_color == 0) before = 1;
				break
			}
		}

		// \ 右下方
		for(x = r + 1, y = c + 1; x < self.row && y < self.row; x++, y++){
			_color = self.chessArr[x][y];
			if(_color == color){
				num++;
			} else{
				if(_color == 0) after = 1;
				break
			}
		}

		return {
			num: num,
			b: before,
			a: after
		}
	}

	//  / 方向
	var chessNumYX = function(r, c, color){
		var self = this;
		var num = 1;
		var _color;
		var x, y,
			before = 0,
			after = 0;

		// / 右上方
		for(x = r-1, y = c+1; x>=0 && y<self.row; x--, y++){
			_color = self.chessArr[x][y];
			if(_color == color){
				num++;
			} else{
				if(_color == 0) before = 1;
				break
			}
		}

		// / 左下方
		for(x = r + 1, y = c - 1; x < self.row && y >=0; x++, y--){
			_color = self.chessArr[x][y];
			if(_color == color){
				num++;
			} else{
				if(_color == 0) after = 1;
				break
			}
		}

		return {
			num: num,
			b: before,
			a: after
		}
	}

	// 判断四个方向同色棋子个数
	var chessNum =  function(r, c, color){
		var self = this;
		var num = chessNumX.call(self, r, c, color).num;
		// 如果够5个子，直接返回当前个数
		if(num >=5) return num;
		num = chessNumY.call(self, r, c, color).num;
		if(num >=5) return num;
		num = chessNumXY.call(self, r, c, color).num;
		if(num >=5) return num;
		num = chessNumYX.call(self, r, c, color).num;
		if(num >=5) return num;

		return 1;

	}

	// 棋子
	var Chess = function(){}

	Chess.prototype = {
		start: function(){
			var self = this;

			self.clearBoard();

			// 点击开始下棋
			self.board.on('click', '.chess', function(){
				
				if(!self.isPlayerRound || self.isOver) return

				// 第一个棋子直接开始
				if(!self.isStart){
					self.gameStart.call(self);
				}

				// 获取当前索引下的 行和列
				var index = $(this).index();
				// 浮点数变整数
				var r = ~~(index/self.row);
				var c = index%self.row;


				if(self.chessArr[r][c] === 0){

					self.play.call(self, r, c, self.player);

					// 每次点击都为最后落子位置
					self.playerLastLocation = [r,c];
					log(self.playerLastLocation);

					self.isWin.call(self, r, c);
				}

			});
		},
		// 开始
		gameStart: function(){
			var self = this;

			if(!self.isPlayerRound){
				self.AIPlay();
			}

			self.isStart = true;

			self.startBtn.text('重玩');

		},
		// 落子
		play: function(row, cell, color){
			var self = this;

			self.chessArr[row][cell] = color == 'black' ? self.blackChess: self.whiteChess;

			var lastClass = color+'_last'

			// AI落子
			if(color == self.AI){
				self.board.find('div.'+lastClass).removeClass(lastClass).addClass(color);
				self.board.find('div:eq('+(row * self.row + cell)+')').addClass(lastClass);
				return
			}

			self.board.find('div:eq('+(row * self.row + cell)+')').addClass(color);

		},
		isWin: function(r, c){
			var self = this;
			var chessColor = self.player == 'black' ? self.blackChess : self.whiteChess;


			var n = chessNum.call(self, r, c, chessColor);


			if(n >=5){
				self.playerWin();
				return;
			}

			self.AIPlay();

		},
		AIPlay: function(){
			var self = this;

			self.isPlayerRound = false;

			var maxX = 0,
				maxY = 0,
				maxWeight = 0,
				x, y, tem;
			for (x = self.row-1; x >= 0; x--) {
				for (y = self.row-1; y >= 0; y--) {
					var _color = self.chessArr[x][y];
					if (_color !== 0) {
						continue;
					}
					tem = this.AIAutoPlay(x, y);
					if (tem > maxWeight) {
						maxWeight = tem;
						maxX = x;
						maxY = y;
					}
				}
			}
			this.play(maxX, maxY, this.AI);
			this.AILastLocation = [maxX, maxY];

			log(maxWeight);

			// 最大权重 5个棋子
			if (maxWeight >= 500000) {
				this.showResult(false);
				this.gameOver();
			}
			else {
				this.isPlayerRound = true;
			}


		},
		// AI 权重算法  
		// TODO 优化
		AIAutoPlay: function(r, c){
			var that = this;
			var AIRow = that.row-1;
			// 棋盘上的权重
			var w = AIRow - Math.abs(r - AIRow/2) - Math.abs(c - AIRow/2);
			var color = that.AI == 'black' ? that.blackChess : that.whiteChess;

			var obj = chessNumX.call(that, r, c, color);
			// 机器人权重
			w += that.calcWeight(obj, 1);
			
			// 玩家权重
			obj = chessNumX.call(that, r, c, -color);
			w += that.calcWeight(obj);

			obj = chessNumY.call(that, r, c, color);
			// 机器人权重
			w += that.calcWeight(obj, 1);
			
			// 玩家权重
			obj = chessNumY.call(that, r, c, -color);
			w += that.calcWeight(obj);

			obj = chessNumXY.call(that, r, c, color);
			// 机器人权重
			w += that.calcWeight(obj, 1);
			
			// 玩家权重
			obj = chessNumXY.call(that, r, c, -color);
			w += that.calcWeight(obj);

			obj = chessNumYX.call(that, r, c, color);
			// 机器人权重
			w += that.calcWeight(obj, 1);
			
			// 玩家权重
			obj = chessNumYX.call(that, r, c, -color);
			w += that.calcWeight(obj);
			return w;
		},
		// 算权重
		calcWeight: function(info, isRobot){
			var w = 0

			var b = info.b,
				a = info.a
			// 通过落子数量来区分权重
			switch (info.num){
				case 1:
					a && b && (w = isRobot ? 15 : 10);
					break;
				case 2:
					if(a && b){
						w = isRobot ? 100 : 50;
					} else if(a || b) {
						w = isRobot ? 10 : 5;
					}
					break;
				case 3:
					if(a && b){
						w = isRobot ? 500 : 200;
					} else if(a || b) {
						w = isRobot ? 30 : 20;
					}
					break;
				case 4:
					if(a && b){
						w = isRobot ? 5000 : 2000;
					} else if(a || b) {
						w = isRobot ? 300 : 200;
					}
					break;
				case 5:
					w = isRobot ? 500000 : 200000;
					break;

			}

			return w;

		},
		showResult: function(isWin){
			this.isOver = true;

			if(isWin){
				this.gameResult.text('win.');
				return
			}

			this.gameResult.text('lose.')

		},
		playerWin: function(){
			this.showResult(true);
			this.gameOver();

			log('Player win.')
		},
		gameOver: function(){
			this.isStart = false;
		}
	}



	var FiveChess = function(clazz, config){
		this.setConfig(config);
		this.board = $(clazz);
		this.gameResult = $(this.gameResult);
		Base.call(this);
		this.init();
	}
	// 继承这2个类
	$.extend(FiveChess.prototype, new Board(), new Chess());

	$.extend(FiveChess.prototype, {
		init: function(){

			this.bind();

			this.render();
			this.clearBoard();
			this.start();
		},
		bind: function(){
			var self = this;
			self.startBtn = $('#J_Start');
			self.startBtn.on('click', function(){
				self.clearBoard();
				var type = $(this).attr('data-type');
				if(!type){
					$(this).attr('data-type', 'restart');
					$(this).text('重新开始');
					// TODO 这里有点小bug
					self.start();
					return;
				}
				self.gameOver();

			})
		},
		setConfig: function(config){
			config = config || {};
			for(var i in defaultConf){
				this[i] = config[i] || defaultConf[i];
			}
		}
	});

	new FiveChess('.board');

})(jQuery);