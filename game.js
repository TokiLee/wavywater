// Tile size is 63 x 35

/// <reference path="phaser.js" />

const game = new Phaser.Game(800, 400, Phaser.AUTO, '', {preload: preload, create: create, update: update});

let water = [];

function preload() {
    game.time.advancedTiming = true;
    game.debug.renderShadow = false;
    // disableVisibilityChange makes it so it wont pause if browser/window is not active
    game.stage.disableVisibilityChange = true;

    game.plugins.add(new Phaser.Plugin.Isometric(game));

    // Add tile sprites here
    game.load.image('water', 'assets/tiles/water.png');
    game.load.image('grass', 'assets/tiles/grass.png');
    game.load.image('sand', 'assets/tiles/sand.png');
    game.load.image('sand_stone', 'assets/tiles/sand_stone.png');
    game.load.image('rock', 'assets/tiles/rock.png');
    game.load.image('wood', 'assets/tiles/wood.png');

    game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
    game.iso.anchor.setTo(0.5, 0.1);
}

function create() {
    isoGroup = game.add.group();

    isoGroup.enableBody = true;
    isoGroup.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;

    const tileArray = [];
    tileArray[0] = 'water';
    tileArray[1] = 'grass';
    tileArray[2] = 'sand';
    tileArray[3] = 'sand_stone';
    tileArray[4] = 'rock';
    tileArray[5] = 'wood';


    const tiles = [
        [1, 1, 2, 0, 0, 0, 0, 0, 4, 4, 2], 
        [1, 2, 2, 0, 0, 0, 0, 0, 4, 4, 2],
        [2, 2, 0, 0, 0, 0, 0, 0, 4, 3, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4],
        [5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 4],
        [5, 5, 5, 5, 5, 5, 5, 5, 4, 4, 3],
        [2, 0, 0, 0, 0, 0, 0, 0, 4, 4, 3],
        [1, 1, 1, 0, 0, 0, 0, 0, 4, 3, 2],
        [1, 1, 1, 1, 0, 0, 0, 0, 4, 4, 2],
        [1, 1, 1, 1, 0, 0, 0, 0, 4, 4, 3]
    ];

    let size = 32;

    let i = 0, xPos = 0, yPos = 0, tile;

    console.log(tileArray.length + ' ' + tileArray[0].length);

    for (let y = 0; y < tiles[i].length; y++) {
        for (let x = 0; x < tiles.length; x++) {
            console.log(game.add.isoSprite);
            tile = game.add.isoSprite(xPos, yPos, tileArray[tiles[x][y]].match('water') ? 0 : 3, tileArray[tiles[x][y]]);
            xPos += size;
            if (tiles[x][y] === 0) {
                water.push(tile);
            }
        }
        yPos += size;
        xPos = 0;
    }

    //game.add.sprite(0,0, 'water');
}

function update() {
    water.forEach(function (w) {
        w.isoZ = (-2 * Math.sin((game.time.now + (w.isoX * 7)) * 0.004)) + (-1 * Math.sin((game.time.now + (w.isoY * 8)) * 0.005));
        w.alpha = Phaser.Math.clamp(1 + (w.isoZ * 0.1), 0.2, 1);
    });
}

function render() {
    isoGroup.forEach(function (tile) {
        game.debug.body(tile, 'rgba(189, 221, 235, 0.6)', false);
    });
    game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
    // game.debug.text(Phaser.VERSION, 2, game.world.height - 2, "#ffff00");
}