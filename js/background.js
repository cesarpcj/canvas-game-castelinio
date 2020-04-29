class Background {
  constructor(game) {
    this.game = game;
    this.context = game.context;
    this.img = new Image();
    this.img.src = "./images/background_03.png";
    this.preGameImg = new Image();
    this.preGameImg.src = "./images/pre_game_bg.png";
    this.preGameImg.onload = () => {
      this.context.drawImage(this.preGameImg, 0, 0);
    };
  }

  draw() {
    this.context.drawImage(this.img, 0, 0);
  }

  drawPreGame() {
    this.context.drawImage(this.preGameImg, 0, 0);
  }
}
