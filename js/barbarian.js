class Barbarian extends Character {
  constructor(game, x, y) {
    super(game, x, y, 70, 70);

    this.speed = 2;
    this.strength = 10;
    this.health = 20;
    this.img = new Image();
    this.img.src = "./images/Barbarian_Walking_000.png";
    this.img.onload = () => {
      this.draw();
    };
  }

  move() {
    //console.log("moving");
    this.x = this.x - 2;
  }

  attack() {}
}
