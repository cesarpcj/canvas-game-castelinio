class Greek extends Barbarian {
  constructor(game, x, y) {
    super(game, x, y);
    this.speed = 0.17;
    this.strength = 25;
    this.health = 30;
    this.img = new Image();
    this.img.src = "./images/greek.png";
    this.img.onload = () => {
      this.draw();
    };
  }
}
