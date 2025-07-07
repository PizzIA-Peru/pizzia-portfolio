// Inicialización de la escena
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

// Variables globales
let player;
let cursors;
let pc;

function preload() {
    // Carga de assets
    this.load.image('tiles', 'assets/tiles.png');
    this.load.tilemapTiledJSON('map', 'maps/centro_pokemon.json');
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 32 });
}

function create() {
    // Carga del mapa
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('tiles');
    const layer = map.createLayer('Tile Layer 1', tileset, 0, 0);
    
    // Creación del jugador
    player = this.physics.add.sprite(100, 100, 'player');
    player.setCollideWorldBounds(true);

    // Configuración de las teclas de movimiento
    cursors = this.input.keyboard.createCursorKeys();

    // Interacción con la PC (muestra un mensaje)
    pc = this.add.zone(300, 200, 32, 32).setOrigin(0);
    pc.setInteractive();
    pc.on('pointerdown', () => {
        alert('¡Bienvenido a mi portafolio! Aquí van mis proyectos y contacto.');
    });

    // Colisiones
    this.physics.add.collider(player, layer);
}

function update() {
    // Movimiento del jugador
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-160);
    } else if (cursors.down.isDown) {
        player.setVelocityY(160);
    } else {
        player.setVelocityY(0);
    }
}
