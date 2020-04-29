class Background {
  constructor(game) {
    this.game = game;
    this.context = game.context;
    this.img = new Image();
    this.img.src = "./images/background_03.png";
    this.preGameImg = new Image();
    this.preGameImg.src = "./images/pre_game_bg.png";
    this.farmerImg = new Image();
    this.farmerImg.src = "./images/farmer.png";
    this.minerImg = new Image();
    this.minerImg.src = "./images/cutter.png";
    this.cutterImg = new Image();
    this.cutterImg.src = "./images/cutter.png";
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
    this.context.drawImage(this.farmerImg, 100, 230, 70, 70);
    this.context.drawImage(this.cutterImg, 30, 120, 70, 70);
    this.context.drawImage(this.minerImg, 10, 380, 70, 70);
    this.context.drawImage(this.stoneImg, 220, 0, 40, 40);
    this.context.drawImage(this.woodImg, 300, 0, 40, 40);
    this.context.drawImage(this.foodImg, 380, 0, 40, 40);
  }

  drawPreGame() {
    this.context.drawImage(this.preGameImg, 0, 0);
  }
}
