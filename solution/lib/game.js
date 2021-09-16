// Define your variables here
var anims;
var player;
var stars;
var platforms;
var keys;
var score = 0;
var scoreText;

// Load your images here
function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground_tiny', 'assets/platform_tiny.png');
    this.load.image('ground_small', 'assets/platform_small.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('ground_large', 'assets/platform_large.png');
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 32 });
}

// This runs at startup to initialize the scene
function create ()
{
    anims = this.anims;
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(300, 568, 'ground_large').setScale(3).refreshBody();
    platforms.create(600, 400, 'ground_large');
    platforms.create(50, 250, 'ground_large');
    platforms.create(750, 220, 'ground_large');

    player = this.physics.add.sprite(100, 450, 'player');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 12, end: 14 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'forward',
        frames: [ { key: 'player', frame: 1 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 24, end: 26 }),
        frameRate: 10,
        repeat: -1
    });

    keys = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group();
    createStar(this.physics, 150, 450);

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);

    this.physics.add.overlap(player, stars, collectStar, null, this);
}

// This function is run every frame
// Put your player controls here
function update ()
{
    if (keys.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (keys.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('forward');
    }

    if (keys.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}


function createStar(physics, x, y) {
    var newStar = physics.add.sprite(x, y, 'star');
    newStar.setBounce(0.5);
    stars.add(newStar);
}

function collectStar (player, star)
{
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
}

