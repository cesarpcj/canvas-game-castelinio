class Archer extends Character {
  constructor(game, x, y) {
    super(game, x, y, 50, 50);

    this.speed = 2;
    this.strength = 5;
    this.health = 20;
    this.img = new Image();
    this.img.src = "./images/archer.png";
    this.img.onload = () => {
      this.draw();
    };
  }

  attack() {}
}
