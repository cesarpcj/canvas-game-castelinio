class Background {
  constructor(game) {
    this.game = game;
    this.context = game.context;
    this.img = new Image();
    this.img.src = "./images/background_02.png";
    this.img.onload = () => {
      this.context.drawImage(this.img, 0, 0);
    };
  }

  draw() {
    this.context.drawImage(this.img, 0, 0);
  }
}
