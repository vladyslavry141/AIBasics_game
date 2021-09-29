import Player from '../objects/player';

export default class MainScene extends Phaser.Scene {
  platforms!: Phaser.Physics.Arcade.StaticGroup;
  player!: Player;
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  stars!: Phaser.Physics.Arcade.Group;
  layer!: Phaser.Tilemaps.TilemapLayer;
  marker!: Phaser.Geom.Point;
  turnPoint!: Phaser.Geom.Point;
  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tiles = map.addTilesetImage('chompermazetiles', 'tiles');
    const nonBlock = map.createLayer(0, tiles, 0, 0);
    this.layer = map.createLayer(1, tiles, 0, 0);
    console.log(this.layer);
    this.layer.setCollision([1, 2, 3, 11, 13, 21, 22, 23, 17, 9]);

    this.marker = new Phaser.Geom.Point();
    this.turnPoint = new Phaser.Geom.Point();

    this.player = new Player(this);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(this.player, this.layer);
  }

  update() {
    const { cursors, player } = this;
    if (cursors.left.isDown) {
      player.setMoveState = 'Left';
    } else if (cursors.right.isDown) {
      player.setMoveState = 'Right';
    } else if (cursors.up.isDown) {
      player.setMoveState = 'Up';
    } else if (cursors.down.isDown) {
      player.setMoveState = 'Down';
    }
    player.update();
    // else{
    // if (cursors.up.isDown && player.body.touching.down) {
    //   player.setVelocityY(-330);
    // }
  }
}
