var Level2 = {

		preload:function(){

        //  We need this because the assets are on github pages
        //  Remove the next 2 lines if running locally
        game.load.baseURL = 'https://dhmhtrhsd.github.io/Shooter/';
        game.load.crossOrigin = 'anonymous';

        game.load.image('starfield', 'assets/starfield2.png');
        game.load.image('ship5lifes', 'assets/ship5lifes.png');
        game.load.image('ship3lifes', 'assets/ship3lifes.png');
        game.load.image('ship1life', 'assets/ship1life.png');
        game.load.image('bullet', 'assets/bullets/bullet.png');
				game.load.image('bullet1', 'assets/bullets/bullet1.png');
				game.load.image('enemiesTier1', 'assets/enemies/enemy2.png');
				game.load.image('enemiesTier2', 'assets/enemies/enemy3.png');
        game.load.image('ship_lifes_img', '/assets/ship_lifes.png');
        game.load.image('enemiesTier2Bullet', '/assets/bullets/blue-enemy-bullet.png');
        game.load.spritesheet('explosion', '/assets/explode.png', 128, 128);
				game.load.image('weapon_upgrade3', '/assets/weapons/weapon_upgrade3.png');
				game.load.image('boss2', '/assets/enemies/green-enemy.png');

        game.load.audio('theme', 'assets/sounds/theme.ogg');
        game.load.audio('laser1', 'assets/sounds/laser1.ogg');
        game.load.audio('explosion1', 'assets/sounds/explosion1.ogg');
        game.load.audio('explosionGameover', 'assets/sounds/explosionGameover.ogg');
        game.load.audio('explosionSpaceship', 'assets/sounds/explosionSpaceship.ogg');
        game.load.audio('weapon_upgrade_sound', 'assets/sounds/weapon_upgrade_sound.ogg');
        game.load.bitmapFont('spacefont', '/assets/spacefont/font.png', '/assets/spacefont/font.xml');

      },

      create: function(){

				game.scale.setGameSize(800, 600);
				weapon_upgradeExists = false;
        game.camera.flash(000000, 5000);
        //sounds
        laser1 = game.add.audio('laser1');
        theme = game.add.audio('theme');
        explosion1 = game.add.audio('explosion1');
        explosionSpaceship = game.add.audio('explosionSpaceship');
        explosionGameover = game.add.audio('explosionGameover');
        weapon_upgrade_sound = game.add.audio('weapon_upgrade_sound');

        theme.loopFull(0.08);
        laser1.volume = 0.2;
        explosion1.volume = 0.2;
        explosionSpaceship.volume = 0.7;
        explosionGameover.volume = 0.25;

        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //scaling options
        //have the game centered horizontally

        this.scale.pageAlignHorizontally = true;

        //this.scale.pageAlignVertically = true;

        //screen size will be set automatically

          //  The scrolling starfield background
          starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

          //  Our bullet group
          bullets = game.add.group();
          bullets.enableBody = true;
          bullets.physicsBodyType = Phaser.Physics.ARCADE;
					bullets.createMultiple(30, 'bullet');
          bullets.setAll('anchor.x', 0.5);
          bullets.setAll('anchor.y', 1);
          bullets.setAll('outOfBoundsKill', true);
          bullets.setAll('checkWorldBounds', true);

          //  The hero!
          player = game.add.sprite(100, game.height / 2, 'ship5lifes');
          player.anchor.setTo(0.5, 0.5);
          game.physics.enable(player, Phaser.Physics.ARCADE);
          player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
          player.body.drag.setTo(DRAG, DRAG);
          player.weaponLevel = 1;
          player.events.onKilled.add(function(){
          shipTrail.kill();
          });

          //  And some controls to play the game with
          cursors = game.input.keyboard.createCursorKeys();
          fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

          //  Add an emitter for the ship's trail
          shipTrail = game.add.emitter(player.x - 20, player.y, 400);
          shipTrail.height = 10;
          shipTrail.makeParticles('bullet');
          shipTrail.setYSpeed(20, -20);
          shipTrail.setXSpeed(-140, -120);
          shipTrail.setRotation(50, -50);
          shipTrail.setAlpha(1, 0.01, 800);
          shipTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000,
              Phaser.Easing.Quintic.Out);
          shipTrail.start(false, 5000, 10);


        //  Blue enemy's bullets
        blueEnemyBullets = game.add.group();
        blueEnemyBullets.enableBody = true;
        blueEnemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        blueEnemyBullets.createMultiple(30, 'enemiesTier2Bullet');
        blueEnemyBullets.callAll('crop', null, {x: 90, y: 0, width: 90, height: 70});
        blueEnemyBullets.setAll('alpha', 0.9);
        blueEnemyBullets.setAll('anchor.x', 0.5);
        blueEnemyBullets.setAll('anchor.y', 0.5);
        blueEnemyBullets.setAll('outOfBoundsKill', true);
        blueEnemyBullets.setAll('checkWorldBounds', true);
        blueEnemyBullets.forEach(function(enemy){
            enemy.body.setSize(20, 40);
        });

        boss2 = game.add.group();
        boss2.enableBody = true;
        boss2.physicsBodyType = Phaser.Physics.ARCADE;
        boss2.createMultiple(30, 'boss2');
        boss2.setAll('anchor.x', 0.5);
        boss2.setAll('anchor.y', 0.5);
        boss2.setAll('scale.x', 1.5);
        boss2.setAll('scale.y', 1.5);
        boss2.setAll('angle', 0);
				boss2.forEach(function(enemy){
				addEnemyEmitterTrail(enemy);
				enemy.body.setSize(enemy.width * 3 / 4, enemy.height * 3 / 4);
				enemy.events.onKilled.add(function(){
				enemy.trail.kill();
					});
				});
				game.physics.arcade.enable(boss2);
				launchBoss2();

				enemiesTier2 = game.add.group();
        enemiesTier2.enableBody = true;
        enemiesTier2.physicsBodyType = Phaser.Physics.ARCADE;
        enemiesTier2.createMultiple(30, 'enemiesTier2');
        enemiesTier2.setAll('anchor.x', 0.5);
        enemiesTier2.setAll('anchor.y', 0.5);
        enemiesTier2.setAll('scale.x', 1);
        enemiesTier2.setAll('scale.y', 1);
        enemiesTier2.setAll('angle', 0);
				launchEnemyTier2();

          //  An explosion pool
        explosions = game.add.group();
        explosions.enableBody = true;
        explosions.physicsBodyType = Phaser.Physics.ARCADE;
        explosions.createMultiple(30, 'explosion');
        explosions.setAll('anchor.x', 0.5);
        explosions.setAll('anchor.y', 0.5);
        explosions.forEach( function(explosion) {
        explosion.animations.add('explosion');
        });

        //  Big explosion
        playerDeath = game.add.emitter(player.x, player.y);
        playerDeath.width = 50;
        playerDeath.height = 50;
        playerDeath.makeParticles('explosion', [0,1,2,3,4,5,6,7], 10);
        playerDeath.setAlpha(0.9, 0, 800);
        playerDeath.setScale(0.1, 0.6, 0.1, 0.6, 1000, Phaser.Easing.Quintic.Out);

				weapon_upgrade3 = game.add.group();
        weapon_upgrade3.enableBody = true;
        weapon_upgrade3.physicsBodyType = Phaser.Physics.ARCADE;
        weapon_upgrade3.setAll('body.immovable',true);

         //  Lifes stats
        ship_lifes_img = game.add.image(game.world.width - 170, 20, 'ship_lifes_img');
        ship_lifes_img.scale.setTo(1.9);
        ship_lifes_text = game.add.bitmapText(game.world.width - 80, 30, 'spacefont', 'x'+ ship_lifes, 40);

        enemiesTier1_img = game.add.image(60, 10, 'enemiesTier1');
        enemiesTier1_img.angle = 90;
        score_text = game.add.bitmapText(70, 20, 'spacefont', 'x'+ score, 40);
      },

      update: function(){
        //  Scroll the background
  			starfield.tilePosition.x -= 2;

  			//  Reset the player, then check for movement keys
  			player.body.acceleration.y = 0;
  			player.body.acceleration.x = 0;

  			//  Check collisions
  			game.physics.arcade.overlap(player, boss2, shipCollide, null, this);
      	game.physics.arcade.overlap(bullets, boss2, hitEnemy, null, this);
  			game.physics.arcade.overlap(blueEnemyBullets, player, enemyHitsPlayer, null, this);
  			game.physics.arcade.overlap(player, weapon_upgrade3, weapon_upgrade3Collide, null, this);
				game.physics.arcade.overlap(player, enemiesTier2, shipCollide, null, this);

  			game.physics.arcade.enable(weapon_upgrade3);


  			if (cursors.up.isDown) {
  				player.body.acceleration.y = -ACCLERATION;
  			} else if (cursors.down.isDown) {
  				player.body.acceleration.y = ACCLERATION;
  			} else if (cursors.left.isDown) {
  				player.body.acceleration.x = -ACCLERATION;
  			} else if (cursors.right.isDown) {
  				player.body.acceleration.x = ACCLERATION;
  			}

  			//  Stop at screen edges
  			if (player.x > game.width - 30) {
  				player.x = game.width - 30;
  				player.body.acceleration.x = 0;
  			}
  			if (player.x < 30) {
  				player.x = 30;
  				player.body.acceleration.x = 0;
  			}
  			if (player.y > game.height - 15) {
  				player.y = game.height - 15;
  				player.body.acceleration.y = 0;
  			}
  			if (player.y < 15) {
  				player.y = 15;
  				player.body.acceleration.y = 0;
  			}

  			//  Fire bullet
  			if (player.alive && ship_lifes >= 1 && (fireButton.isDown || game.input.activePointer.isDown)) {
  				fireBullet();
  			}

  			//  Keep the shipTrail lined up with the ship
  			shipTrail.y = player.y;
  			shipTrail.x = player.x - 20;

  			if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
  				game.camera.fade(000000, 1000);
  				theme.stop();
  				game.state.start('Level1');
  				resetAll();
  				blueEnemyBullets.callAll('kill');
  			}

				weapon_upgrade3.scale.x = 0.5;
				weapon_upgrade3.scale.y = 0.5;


      }

  }
	function render() {
	}
