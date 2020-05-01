class Castle {
  constructor(game) {
    this.game = game;
    this.context = game.context;
    this.level = 0;
    this.maxHealth = 100;
    this.health = 100;
    this.upgradeCost = { stone: 8, wood: 5 };
    this.img1 = new Image();
    this.img1.src = "./images/castle/Castle_00.png";
    this.img2 = new Image();
    this.img2.src = "./images/castle/Castle_01.png";
    this.img3 = new Image();
    this.img3.src = "./images/castle/Castle_02.png";
    this.img4 = new Image();
    this.img4.src = "./images/castle/Castle_03.png";
    this.img5 = new Image();
    this.img5.src = "./images/castle/Castle_04.png";
    this.img6 = new Image();
    this.img6.src = "./images/castle/Castle_05.png";
    this.img7 = new Image();
    this.img7.src = "./images/castle/Castle_06.png";
    this.healthImg = new Image();
    this.healthImg.src = "./images/health_bar.png";

    this.imgs = [this.img1, this.img2, this.img3, this.img4, this.img5, this.img6, this.img7];
  }

  draw() {
    let healthBarSize = (170 * this.health) / this.maxHealth;
    let clipX = (380 * this.health) / this.maxHealth;
    if (healthBarSize < 0) healthBarSize = 0;
    this.context.drawImage(this.imgs[this.level], 250, 70, 225, 315);
    //this.context.drawImage(this.healthImg, 45, 0, healthBarSize, 40);
    this.context.drawImage(this.healthImg, 0, 0, clipX, 100, 45, 0, healthBarSize, 40);

    this.context.font = "bold 18px Times New Roman";
    this.context.fillStyle = "white";
    this.context.fillText(`${this.health}/ ${this.maxHealth}`, 100, 26);
  }

  upgrade() {
    if (
      this.level < 6 &&
      this.game.resource.stone >= this.upgradeCost.stone &&
      this.game.resource.wood >= this.upgradeCost.wood
    ) {
      this.level += 1;
      this.maxHealth += 50;
      this.health += 50;
      this.game.csm.slots[this.level + 2].isEmpty = true;
      this.game.resource.stone -= this.upgradeCost.stone;
      this.game.resource.wood -= this.upgradeCost.wood;
      this.upgradeCost.stone += this.level * this.level;
      this.upgradeCost.wood += this.level * this.level;
    }
  }

  reset() {
    this.level = 0;
    this.maxHealth = 100;
    this.health = 100;
    this.upgradeCost = { stone: 8, wood: 5 };
  }
}
