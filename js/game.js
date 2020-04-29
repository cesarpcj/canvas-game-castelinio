class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = $canvas.getContext("2d");
    this.bg = new Background(this);
    this.castle = new Castle(this);
    this.csm = new CharacterSelectionManager(this);
    this.heros = [];
    this.enemies = [];
    this.wave = 1;
    this.state = "pre game"; // pre game ,playing , game over, paused
    this.pause_btn = new Button(this, 940, 15, 40, 40);
    this.upgradeCastle_btn = new Button(this, 248, 490, 65, 65);
    this.addArcher_btn = new Button(this, 370, 490, 65, 65);
    this.play_btn = new Button(this, 400, 280, 220, 70);

    this.createWave();
    this.bindButtons();
  }

  createWave() {
    for (let i = 0; i < 10; i++) {
      this.enemies.push(new Barbarian(this, 1000 + i * Math.random() * 100, 190 + Math.random() * 150));
    }
  }

  drawGame() {
    this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    this.bg.draw();
    this.castle.draw();
    this.pause_btn.draw();
    this.upgradeCastle_btn.draw();
    this.addArcher_btn.draw();

    //this.context.save();
    this.context.font = "bold 20px Times New Roman";
    this.context.fillStyle = "White";
    this.context.fillText(`Wave: ${this.wave}`, 490, 20);
    //this.context.restore();

    if (this.csm.selected) {
      this.csm.drawSlots();
    }
  }

  drawPreGame() {
    this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    this.bg.drawPreGame();
    this.play_btn.draw();
  }

  drawGameOver() {
    this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    this.bg.draw();
    this.castle.draw();
    this.context.font = "bold 80px Times New Roman";
    this.context.fillStyle = "White";
    this.context.fillText("Game Over", this.$canvas.width / 2 - 200, this.$canvas.height / 2 - 100);
    this.context.font = "bold 30px Times New Roman";
    this.context.fillText(`You died at wave ${this.wave}`, 460, this.$canvas.height / 2 - 60);
  }

  pause() {
    console.log("pausou");
    this.state = "paused";
  }

  play() {
    console.log("play");
    this.state = "playing";
    this.playing();
  }

  playing() {
    this.drawGame();

    for (let unit of this.heros) {
      unit.update();
    }

    this.enemies = this.enemies.filter((enemy) => enemy.isAlive);

    for (let unit of this.enemies) {
      unit.update();
    }

    if (this.castle.health <= 0) {
      console.log("game over");
      this.state = "game over";
    }
  }

  // preGame() {
  //   this.drawPreGame();
  // }

  // gameOver() {
  //   this.drawGameOver();
  // }

  bindButtons() {
    window.addEventListener("click", (event) => {
      if (this.isButtonPressed(event, this.pause_btn)) {
        switch (this.state) {
          case "paused":
            this.play();
            break;
          case "playing":
            this.pause();
            break;
        }
      }

      if (this.isButtonPressed(event, this.play_btn) && this.state === "pre game") this.play();

      if (this.isButtonPressed(event, this.upgradeCastle_btn)) this.castle.upgrade();

      if (this.isButtonPressed(event, this.addArcher_btn)) {
        this.csm.selected = "Archer";
      }

      if (this.csm.selected) {
        const availableSlot = this.csm.slots.filter((slot) => slot.isEmpty);
        for (let slot of availableSlot) {
          if (this.isButtonPressed(event, slot)) {
            let newUnit;
            switch (this.csm.selected) {
              case "Archer":
                newUnit = new Archer(this, slot.x, slot.y);
            }

            this.heros.push(newUnit);
            this.csm.selected = "";
          }
        }
      }
    });
  }

  isButtonPressed(a, b) {
    if (a.x > b.x && a.x < b.x + b.w && a.y > b.y && a.y < b.y + b.h) {
      return true;
    }
  }
}
