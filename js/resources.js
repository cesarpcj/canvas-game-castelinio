class Resources {
  constructor(game) {
    this.game = game;
    this.context = game.context;
    this.wood = 10;
    this.stone = 10;
    this.food = 10;
    this.woodProductionRate = 1;
    this.stoneProductionRate = 1;
    this.foodProductionRate = 2;
    this.foodSiteLevel = 1;
    this.woodSiteLevel = 1;
    this.stoneSiteLevel = 1;
    this.hasFoodToGather = false;
    this.hasWoodToGather = false;
    this.hasStoneToGather = false;
    this.imgFoodToGather = new Image();
    this.imgWoodToGather = new Image();
    this.imgStoneToGather = new Image();
    this.imgFoodToGather.src = "./images/wheat_gather.png";
    this.imgWoodToGather.src = "./images/wood_gather.png";
    this.imgStoneToGather.src = "./images/mine_gather.png";
    this.gatherFood_btn = new Button(this.game, 160, 240, 80, 80);
    this.gatherWood_btn = new Button(this.game, 70, 170, 70, 70);
    this.gatherStone_btn = new Button(this.game, 170, 390, 70, 70);

    this.upgradeStone_btn = new Button(this.game, 60, 525, 80, 20);
    this.upgradeWood_btn = new Button(this.game, 195, 525, 80, 20);
    this.upgradeFood_btn = new Button(this.game, 327, 525, 80, 20);

    this.upgradeFoodCost = { stone: 1, wood: 3, food: 4 };
    this.upgradeWoodCost = { stone: 3, wood: 1, food: 6 };
    this.upgradeStoneCost = { stone: 2, wood: 3, food: 6 };

    this.foodTime = 0;
    this.woodTime = 0;
    this.stoneTime = 0;

    this.farmerImg = new Image();
    this.farmerImg.src = "./images/farmer.png";
    this.minerImg = new Image();
    this.minerImg.src = "./images/cutter.png";
    this.cutterImg = new Image();
    this.cutterImg.src = "./images/cutter.png";

    this.gatherResourcesClick();
  }

  draw() {
    this.drawOwenedResources();
    this.drawSettlersAndPickup();

    this.upgradeFood_btn.draw();
    this.upgradeStone_btn.draw();
    this.upgradeWood_btn.draw();

    this.drawText();
  }

  drawOwenedResources() {
    this.context.font = "bold 20px Times New Roman";
    this.context.fillStyle = "White";
    this.context.fillText(`${this.stone}`, 260, 25);
    this.context.fillText(`${this.wood}`, 340, 25);
    this.context.fillText(`${this.food}`, 415, 25);
  }

  drawText() {
    this.context.font = "bold 14px Times New Roman";
    this.context.fillStyle = "black";
    this.context.fillText(`${this.upgradeStoneCost.stone}`, 70, 515);
    this.context.fillText(`${this.upgradeStoneCost.wood}`, 97, 515);
    this.context.fillText(`${this.upgradeStoneCost.food}`, 124, 515);

    this.context.fillText(`${this.upgradeWoodCost.stone}`, 202, 515);
    this.context.fillText(`${this.upgradeWoodCost.wood}`, 229, 515);
    this.context.fillText(`${this.upgradeWoodCost.food}`, 256, 515);

    this.context.fillText(`${this.upgradeFoodCost.stone}`, 334, 515);
    this.context.fillText(`${this.upgradeFoodCost.wood}`, 361, 515);
    this.context.fillText(`${this.upgradeFoodCost.food}`, 388, 515);

    this.context.fillText(`${this.game.castle.upgradeCost.stone}`, 469, 515);
    this.context.fillText(`${this.game.castle.upgradeCost.wood}`, 496, 515);
    this.context.fillText(`0`, 523, 515);

    this.context.fillText(`0`, 605, 515);
    this.context.fillText(`2`, 632, 515);
    this.context.fillText(`6`, 659, 515);
  }

  drawSettlersAndPickup() {
    if (this.hasFoodToGather) this.context.drawImage(this.imgFoodToGather, 160, 240, 80, 80);
    if (this.hasWoodToGather) this.context.drawImage(this.imgWoodToGather, 70, 170, 70, 70);
    if (this.hasStoneToGather) this.context.drawImage(this.imgStoneToGather, 170, 390, 70, 70);

    this.context.drawImage(this.farmerImg, 100, 220, 70, 70);
    if (this.foodSiteLevel > 1) this.context.drawImage(this.farmerImg, 100, 260, 70, 70);
    if (this.foodSiteLevel > 2) this.context.drawImage(this.farmerImg, 100, 300, 70, 70);

    this.context.drawImage(this.cutterImg, 30, 120, 70, 70);
    if (this.woodSiteLevel > 1) this.context.drawImage(this.cutterImg, 80, 120, 70, 70);
    if (this.woodSiteLevel > 2) this.context.drawImage(this.cutterImg, 130, 120, 70, 70);

    this.context.drawImage(this.minerImg, 110, 380, 70, 70);
    if (this.stoneSiteLevel > 1) this.context.drawImage(this.minerImg, 60, 380, 70, 70);
    if (this.stoneSiteLevel > 2) this.context.drawImage(this.minerImg, 10, 380, 70, 70);
  }

  addStone(qntd) {
    this.stone += qntd;
  }
  addFood(qntd) {
    this.food += qntd;
  }
  addWood(qntd) {
    this.wood += qntd;
  }

  removeStone(qntd) {
    this.stone -= qntd;
  }
  removeFood(qntd) {
    this.food -= qntd;
  }
  removeWood(qntd) {
    this.wood -= qntd;
  }

  generateResources() {
    this.generateFood();
    this.generateWood();
    this.generateStone();
  }

  generateFood() {
    if (!this.hasFoodToGather) {
      this.foodTime += 1 / 120;

      if (this.foodTime >= 6) {
        this.foodTime = 0;
        this.hasFoodToGather = true;
      }
    }
  }

  generateWood() {
    if (!this.hasWoodToGather) {
      this.woodTime += 1 / 120;

      if (this.woodTime >= 6) {
        this.woodTime = 0;
        this.hasWoodToGather = true;
      }
    }
  }

  generateStone() {
    if (!this.hasStoneToGather) {
      this.stoneTime += 1 / 120;

      if (this.stoneTime >= 7) {
        this.stoneTime = 0;
        this.hasStoneToGather = true;
      }
    }
  }

  gatherResourcesClick() {
    window.addEventListener("click", (event) => {
      if (this.game.isButtonPressed(event, this.gatherFood_btn) && this.hasFoodToGather === true) {
        this.addFood(this.foodProductionRate);
        this.hasFoodToGather = false;
      }

      if (this.game.isButtonPressed(event, this.gatherWood_btn) && this.hasWoodToGather === true) {
        this.addWood(this.woodProductionRate);
        this.hasWoodToGather = false;
      }

      if (this.game.isButtonPressed(event, this.gatherStone_btn) && this.hasStoneToGather === true) {
        this.addStone(this.stoneProductionRate);
        this.hasStoneToGather = false;
      }

      if (
        this.game.isButtonPressed(event, this.upgradeFood_btn) &&
        this.food >= this.upgradeFoodCost.food &&
        this.wood >= this.upgradeFoodCost.wood &&
        this.stone >= this.upgradeFoodCost.stone
      ) {
        this.removeFood(this.upgradeFoodCost.food);
        this.removeStone(this.upgradeFoodCost.stone);
        this.removeWood(this.upgradeFoodCost.wood);
        this.foodProductionRate += this.foodSiteLevel;
        this.foodSiteLevel++;

        this.upgradeFoodCost = {
          stone: 3,
          wood: 5,
          food: 8,
        };
      }

      if (
        this.game.isButtonPressed(event, this.upgradeWood_btn) &&
        this.food >= this.upgradeWoodCost.food &&
        this.wood >= this.upgradeWoodCost.wood &&
        this.stone >= this.upgradeWoodCost.stone
      ) {
        this.removeFood(this.upgradeWoodCost.food);
        this.removeStone(this.upgradeWoodCost.stone);
        this.removeWood(this.upgradeWoodCost.wood);
        this.woodProductionRate += this.woodSiteLevel;
        this.woodSiteLevel++;

        this.upgradeWoodCost = {
          stone: 5,
          wood: 5,
          food: 7,
        };
      }

      if (
        this.game.isButtonPressed(event, this.upgradeStone_btn) &&
        this.food >= this.upgradeStoneCost.food &&
        this.wood >= this.upgradeStoneCost.wood &&
        this.stone >= this.upgradeStoneCost.stone
      ) {
        this.removeFood(this.upgradeStoneCost.food);
        this.removeStone(this.upgradeStoneCost.stone);
        this.removeWood(this.upgradeStoneCost.wood);
        this.stoneProductionRate += this.stoneSiteLevel;
        this.stoneSiteLevel++;

        this.upgradeStoneCost = {
          stone: 7,
          wood: 7,
          food: 8,
        };
      }
    });
  }
}
