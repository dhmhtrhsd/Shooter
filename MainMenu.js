		var MainMenu = {

	preload: function() {

		game.load.image('cabinet', 'assets/MainMenu/cabinet.png' )
		game.load.image('background', 'assets/MainMenu/background.png');
		game.load.image('cabinet_screen', 'assets/MainMenu/cabinet_screen.png');
    game.load.image('title', 'assets/MainMenu/title.png')
		game.load.image('lvl1', 'assets/MainMenu/Level1.jpg');
		game.load.image('lvl2', 'assets/MainMenu/Level2.png');
		game.load.image('about', 'assets/MainMenu/about.png');
		game.load.audio('theme', 'assets/sounds/theme.ogg');

	},

	create: function() {

		var b1;
		var b2;
		var about;
		game.scale.setGameSize(window.innerWidth, window.innerHeight);
		background = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'background');
		cabinet_screen = game.add.tileSprite(460, 160, 1000, 700, 'cabinet_screen');
		cabinet = game.add.image(0, 0, 'cabinet');
    title = game.add.image((game.width / 2) - 280, 300, 'title');
		game.add.tween(title).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

		game.scale.pageAlignHorizontally = true;
		//game.scale.pageAlignVertically = true;
		//game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.physics.startSystem(Phaser.Physics.ARCADE);

		about = game.add.button((game.width / 2) - 25, 700, "about", actionOnClickAbout, listener2, this, function(){
			lives = 3;
		});
		about.alpha = 0.4;
		about.scale.x = 0.8;
		about.scale.y = 0.8;
		about.anchor.set(0.5, 0.5);
		about.onInputOver.add(listener, this);
		about.onInputOut.add(listener2, this);

		b1 = game.add.button((game.width / 2) - 20 , 500, "lvl1", actionOnClick1, listener, this, function(){
			lives = 3;
		});
		b1.alpha = 0.4;
		b1.scale.x = 0.8;
		b1.scale.y = 0.8;
		b1.anchor.set(0.5, 0.5);
		b1.onInputOver.add(listener, this);
		b1.onInputOut.add(listener1, this);

		b2 = game.add.button((game.width / 2) - 20, 600, "lvl2", actionOnClick2, listener, this, function(){
			lives = 3;
		});
		b2.alpha = 0.4;
		b2.scale.x = 0.8;
		b2.scale.y = 0.8;
		b2.anchor.set(0.5, 0.5);
		b2.onInputOver.add(listener, this);
		b2.onInputOut.add(listener1, this);



		function actionOnClick1 () {
    		game.state.start('Level1');
		}

		function actionOnClick2 () {
    		game.state.start('Level2');
		}

		function actionOnClickAbout () {
		}

		function listener (b1, b2) {
			b1.alpha = 1;
			b2.alpha = 1;
		}

		function listener1 (b1, b2) {
			b1.alpha = 0.4;
			b2.alpha = 0.4;
		}

		function listener2(about){
			about.alpha = 0.4;
			about.alpha = 0.4;
		}
		//ascent = 0;
		//score = 0;
		//lives = 3;
		//finishcheck = 0;
	},

	update: function(){
		//  Scroll the background
  	cabinet_screen.tilePosition.x -= 1;
	}
}
