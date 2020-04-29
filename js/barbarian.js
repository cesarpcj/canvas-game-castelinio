class Barbarian extends Character {
  constructor(game, x, y) {
    super(game, x, y, 70, 70);
    this.isAlive = true;
    this.speed = 0.23;
    this.health = 20;
    this.strength = 10;
    this.img = new Image();
    this.img.src = "./images/Barbarian_Walking_000.png";
    this.img.onload = () => {
      this.draw();
    };
  }

  move() {
    //console.log("moving");
    this.x = this.x - this.speed;
  }

  attack() {
    this.game.castle.health -= this.strength;
    this.canAttack = false;

    setTimeout(() => {
      this.canAttack = true;
    }, 3000);
  }

  update() {
    if (this.x >= 440) {
      this.move();
    } else {
      if (this.canAttack) {
        this.attack();
      }
    }

    this.draw();

    if (this.health <= 0) this.isAlive = false;
  }
}
