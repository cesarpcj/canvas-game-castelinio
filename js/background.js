class Background {
  constructor(game) {
    this.game = game;
    this.context = game.context;
    this.img = new Image();
    this.img.src = "./images/background_03.png";
    this.preGameImg = new Image();
    this.preGameImg.src = "./images/pre_game_bg.png";

    this.woodImg = new Image();
    this.stoneImg = new Image();
    this.foodImg = new Image();
    this.woodImg.src = "./images/wood.png";
    this.stoneImg.src = "./images/mine.png";
    this.foodImg.src = "./images/wheat.png";
    this.preGameImg.onload = () => {
      this.context.drawImage(this.preGameImg, 0, 0);
    };
  }

  draw() {
    this.context.drawImage(this.img, 0, 0);

    this.context.drawImage(this.stoneImg, 220, 0, 40, 40);
    this.context.drawImage(this.woodImg, 300, 0, 40, 40);
    this.context.drawImage(this.foodImg, 380, 0, 40, 40);
  }

  drawPreGame() {
    this.context.drawImage(this.preGameImg, 0, 0);
  }
}
