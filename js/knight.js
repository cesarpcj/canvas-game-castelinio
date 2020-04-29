class Knight extends Barbarian {
  constructor(game, x, y) {
    super(game, x, y);
    this.speed = 0.18;
    this.strength = 30;
    this.health = 30;
    this.img = new Image();
    this.img.src = "./images/knight.png";
    this.img.onload = () => {
      this.draw();
    };
  }
}
