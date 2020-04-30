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
    this.resource = new Resources(this);
    //this.food = 50; //******* */
    //this.stone = 50; //******* */
    //this.wood = 50; //******* */
    this.state = "pre game"; // pre game ,playing , game over, paused
    this.pause_btn = new Button(this, 940, 5, 40, 40);
    this.upgradeCastle_btn = new Button(this, 460, 525, 80, 20);
    this.addArcher_btn = new Button(this, 595, 525, 80, 20);
    this.play_btn = new Button(this, 400, 280, 220, 80);

    this.createWave();
    this.bindButtons();
  }

  createWave() {
    for (let i = 0; i < 5; i++) {
      const rnd = 40 + Math.random() * 10;
      this.enemies.push(new Barbarian(this, 1000 + i * rnd * 2, 190 + Math.random() * 150));
    }

    for (let i = 0; i < 3; i++) {
      const rnd = 40 + Math.random() * 10;
      this.enemies.push(new Greek(this, 1300 + i * rnd, 190 + Math.random() * 150));
      this.enemies.push(new Knight(this, 1500 + i * rnd * 3, 190 + Math.random() * 150));
    }

    for (let i = 0; i < 5; i++) {
      const rnd = 40 + Math.random() * 10;
      this.enemies.push(new Knight(this, 2300 + i * rnd * 3, 190 + Math.random() * 150));
    }

    for (let i = 0; i < 3; i++) {
      const rnd = 40 + Math.random() * 10;
      this.enemies.push(new Greek(this, 2300 + i * rnd, 190 + Math.random() * 150));
      this.enemies.push(new Knight(this, 2300 + i * rnd * 3, 190 + Math.random() * 150));
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
    this.resource.draw();
    //this.context.fillText(`${this.stone}`, 260, 25); //******* */
    //this.context.fillText(`${this.wood}`, 340, 25); //******* */
    //this.context.fillText(`${this.food}`, 415, 25); //******* */
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
    this.resource.generateResources();

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
        if (this.resource.food >= 6 && this.resource.wood >= 2) {
          ///////**** */

          this.csm.selected = "Archer";
        }

        //this.csm.selected = "Archer";
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

            const indexToRemove = this.heros.findIndex((hero, index, arr) => hero.x === slot.x && hero.y === slot.y);
            console.log(indexToRemove);
            if (indexToRemove >= 0) {
              this.heros.splice(indexToRemove, 1, newUnit);
            } else {
              this.heros.push(newUnit);
            }

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
