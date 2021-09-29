export type MoveDirection = 'Up' | 'Down' | 'Left' | 'Right';
export type MoveState = MoveDirection | 'Stop';

const PLAYER_SPEED = 100;

const PLAYER_CONFIG = {
  speed: 100,
  startX: 300,
  startY: 300,
  texture: 'dude',
};

const ANGLE_MAPPER: Record<MoveDirection, number> = {
  Up: 0,
  Left: 90,
  Down: 180,
  Right: 270,
};

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private moveState: MoveState = 'Stop';
  constructor(scene: Phaser.Scene) {
    super(
      scene,
      PLAYER_CONFIG.startX,
      PLAYER_CONFIG.startY,
      PLAYER_CONFIG.texture
    );

    scene.add.existing(this);
    scene.physics.add.existing(this);

    scene.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });
    scene.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  public stopMoving() {
    this.setVelocityX(0);
    this.setVelocityY(0);
  }

  moveLeft() {
    this.stopMoving();
    this.anims.play('left', true);
    this.setVelocityX(-PLAYER_SPEED);
  }

  moveRight() {
    this.stopMoving();
    this.anims.play('right', true);
    this.setVelocityX(PLAYER_SPEED);
  }

  moveUp() {
    this.stopMoving();
    this.anims.play('turn', true);
    this.setVelocityY(-PLAYER_SPEED);
  }

  moveDown() {
    this.stopMoving();
    this.anims.play('turn', true);
    this.setVelocityY(PLAYER_SPEED);
  }

  move(direction: MoveState) {
    const DIRECTION_MAPPER: Record<MoveState, () => void> = {
      Up: () => this.moveUp(),
      Down: () => this.moveDown(),
      Left: () => this.moveLeft(),
      Right: () => this.moveRight(),
      Stop: () => this.stopMoving(),
    };
    DIRECTION_MAPPER[direction]();
  }

  set setMoveState(direction: MoveState) {
    this.moveState = direction;
  }

  public update() {
    // console.log(this.x);
    // if (Math.trunc(this.x) % 10 === 0 && Math.trunc(this.y) % 10 === 0)
    this.move(this.moveState);
  }
}
