class Resources {
  constructor(game) {
    this.game = game;
    this.context = game.context;
    this.wood = 33;
    this.stone = 30;
    this.food = 41;
    this.generateResources();
  }

  draw() {
    this.context.font = "bold 20px Times New Roman";
    this.context.fillStyle = "White";
    this.context.fillText(`${this.stone}`, 260, 25);
    this.context.fillText(`${this.wood}`, 340, 25);
    this.context.fillText(`${this.food}`, 415, 25);
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
    this.Food -= qntd;
  }
  removeWood(qntd) {
    this.Wood -= qntd;
  }

  generateResources() {
    if (this.game.state === "playing") {
      this.addFood(4);
      this.addStone(2);
      this.addWood(3);
    }

    setTimeout(() => {
      this.generateResources();
    }, 3000);
  }
}
