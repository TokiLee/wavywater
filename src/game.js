// Tile size is 63p x 35p

import player from './assets/player.png';
import water from './assets/tiles/water.png';
import grass from './assets/tiles/grass.png';
import sand from './assets/tiles/sand.png';
import sandStone from './assets/tiles/sand_stone.png';
import rock from './assets/tiles/rock.png';
import wood from './assets/tiles/wood.png';

const game = new Phaser.Game(800, 400, Phaser.AUTO, '', {preload: preload, create: create, update: update, render: render});

let player1;
let cursors;
let isoGroup;
let tile;
let waterArray = [];

function preload() {
    game.time.advancedTiming = true;
    game.debug.renderShadow = false;
    // disableVisibilityChange makes it so it wont pause if browser/window is not active
    game.stage.disableVisibilityChange = true;

    game.plugins.add(new Phaser.Plugin.Isometric(game));

    game.world.setBounds(0, 0, 640, 2560);

    // load tile sprites
    game.load.image('water', water);
    game.load.image('grass', grass);
    game.load.image('sand', sand);
    game.load.image('sand_stone', sandStone);
    game.load.image('rock', rock);
    game.load.image('wood', wood);

    game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
    game.iso.anchor.setTo(0.5, 0);

    game.load.image('player', player);
}

function create() {
    isoGroup = game.add.group();

    // isoGroup.enableBody = true;
    // isoGroup.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;

    const tileArray = [];
    tileArray[0] = 'water';
    tileArray[1] = 'grass';
    tileArray[2] = 'sand';
    tileArray[3] = 'sand_stone';
    tileArray[4] = 'rock';
    tileArray[5] = 'wood';


    const tiles = [
        // [1, 1, 2, 0, 0, 0, 0, 0, 4, 4, 2], 
        // [1, 2, 2, 0, 0, 0, 0, 0, 4, 4, 2],
        // [2, 2, 0, 0, 0, 0, 0, 0, 4, 3, 2],
        // [2, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4],
        // [5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4],
        // [5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 3],
        // [2, 0, 0, 0, 0, 0, 0, 0, 4, 4, 3],
        // [1, 1, 1, 0, 0, 0, 0, 0, 4, 3, 2],
        // [1, 1, 1, 1, 0, 0, 0, 0, 4, 4, 2],
        // [1, 1, 1, 1, 0, 0, 0, 0, 4, 4, 3]

        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,   1, 1, 1, 1, 1, 1, 1, 1, 1, 1,   1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,   1, 1, 1, 2, 1, 1, 1, 1, 1, 1,   1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,   1, 2, 2, 2, 2, 2, 2, 1, 1, 1,   1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 2,   2, 2, 0, 0, 0, 0, 0, 2, 1, 1,   1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  1, 1, 1, 1, 1, 1, 2, 2, 2, 2,   2, 2, 0, 0, 0, 0, 0, 2, 2, 1,   1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  1, 1, 1, 1, 2, 2, 2, 2, 2, 2,   2, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  1, 2, 2, 2, 2, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  2, 2, 2, 2, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  2, 2, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 2,  2, 2, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 2,  2, 2, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

        // [],
        // [],
        // [],
        // [],
        // [],
        // [],
        // [],
        // [],
        // [],
        // [],
        
        // [],
        // [],
        // [],
        // [],
        // [],
        // [],
        // [],
        // [],
        // [],
        // [],      
    ];

    let size = 32;

    let i = 0, xPos = 0, yPos = 0;

    for (let y = 0; y < tiles[i].length; y++) {
        for (let x = 0; x < tiles.length; x++) {
            tile = game.add.isoSprite(xPos, yPos, tileArray[tiles[x][y]].match('water') ? 0 : 3, tileArray[tiles[x][y]], 0, isoGroup);
            tile.anchor.set(0.5, 1);
            tile.smoothed = false;
            //tile.body.moves = false;
            xPos += size;
            if (tiles[x][y] === 0) {
                waterArray.push(tile);
            }
        }
        yPos += size;
        xPos = 0;
    }

    console.log(tile);

    console.log(isoGroup);
    //game.add.sprite(0,0, 'water');

    game.physics.startSystem(Phaser.Physics.P2JS);

    player1 = game.add.sprite(game.world.centerX, game.world.centerY, 'player');

    game.physics.p2.enable(player1);

    player1.body.collideWorldBounds = true;

    this.cursors = game.input.keyboard.createCursorKeys();

    this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN
    ]);

    game.camera.follow(player1);
}

function update() {
    var speed = 100;

    if (this.cursors.up.isDown) {
        player1.body.velocity.y = -speed;
    }
    else if (this.cursors.down.isDown) {
        player1.body.velocity.y = speed;
    }
    else {
        player1.body.velocity.y = 0;
    }

    if (this.cursors.left.isDown) {
        player1.body.velocity.x = -speed;
    }
    else if (this.cursors.right.isDown) {
        player1.body.velocity.x = speed;
    }
    else {
        player1.body.velocity.x = 0;
    }

    waterArray.forEach(function (w) {
        w.isoZ = (-2 * Math.sin((game.time.now + (w.isoX * 7)) * 0.004)) + (-1 * Math.sin((game.time.now + (w.isoY * 8)) * 0.005));
        w.alpha = Phaser.Math.clamp(1 + (w.isoZ * 0.1), 0.2, 1);
    });

}

function render() {
    isoGroup.forEach(function (tile) {
        game.debug.body(tile, 'rgba(189, 221, 235, 0.6)', false);
    });
    game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
    game.debug.text(Phaser.VERSION, 2, game.world.height - 2, "#ffff00");
}