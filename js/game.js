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
    this.waveTime = 0;
    this.resource = new Resources(this);
    this.state = "pre game"; // pre game ,playing , game over, paused
    this.pause_btn = new Button(this, 940, 5, 40, 40);
    this.upgradeCastle_btn = new Button(this, 460, 525, 80, 20);
    this.addArcher_btn = new Button(this, 595, 525, 80, 20);
    this.play_btn = new Button(this, 400, 280, 220, 80);
    this.restart_btn = new Button(this, 400, 280, 220, 80);
    this.restart_btn_img = new Image();
    this.restart_btn_img.src = "./images/restart.png";

    this.createWave1();
    this.bindButtons();
  }

  createWave1() {
    for (let i = 0; i < 8; i++) {
      const rnd = 60 + Math.random() * 10;
      this.enemies.push(new Barbarian(this, 1100 + i * rnd, 190 + Math.random() * 150));
    }

    this.enemies.push(new Knight(this, 1300, 190 + Math.random() * 150));

    for (let i = 0; i < 10; i++) {
      const rnd = 60 + Math.random() * 10;
      this.enemies.push(new Greek(this, 1800 + i * rnd, 190 + Math.random() * 150));
    }

    this.enemies.push(new Knight(this, 2000, 190 + Math.random() * 150));

    for (let i = 0; i < 5; i++) {
      const rnd = 60 + Math.random() * 10;
      this.enemies.push(new Greek(this, 2550 + i * rnd, 190 + Math.random() * 150));
      this.enemies.push(new Knight(this, 2800 + i * rnd, 190 + Math.random() * 150));
    }

    for (let i = 0; i < 5; i++) {
      const rnd = 60 + Math.random() * 10;
      this.enemies.push(new Barbarian(this, 4000 + i * rnd, 190 + Math.random() * 150));
      this.enemies.push(new Greek(this, 3300 + i * rnd, 190 + Math.random() * 150));
      this.enemies.push(new Knight(this, 3300 + i * rnd, 190 + Math.random() * 150));
    }

    for (let i = 0; i < 6; i++) {
      const rnd = 60 + Math.random() * 10;
      this.enemies.push(new Barbarian(this, 5200 + i * rnd, 190 + Math.random() * 150));
      this.enemies.push(new Greek(this, 4000 + i * rnd, 190 + Math.random() * 150));
      this.enemies.push(new Knight(this, 4300 + i * rnd, 190 + Math.random() * 150));
    }

    //this.createWave2();
  }

  createWave2() {
    console.log("create 2");
    for (let i = 0; i < 3; i++) {
      const rnd = 40 + Math.random() * 10;
      this.enemies.push(new Greek(this, 2000 + i * rnd, 190 + Math.random() * 150));
      this.enemies.push(new Knight(this, 1200 + i * rnd * 3, 190 + Math.random() * 150));
    }

    this.enemies.push(new Knight(this, 2200 + 190 + Math.random() * 150));

    for (let i = 0; i < 5; i++) {
      const rnd = 40 + Math.random() * 10;
      this.enemies.push(new Knight(this, 3300 + i * rnd * 30, 190 + Math.random() * 150));
    }

    for (let i = 0; i < 3; i++) {
      const rnd = 40 + Math.random() * 10;
      this.enemies.push(new Greek(this, 3000 + i * rnd, 190 + Math.random() * 150));
      this.enemies.push(new Knight(this, 3500 + i * rnd * 30, 190 + Math.random() * 150));
    }

    //this.createWave3();
  }

  createWave3() {
    console.log("create 3");
    for (let i = 0; i < 5; i++) {
      this.enemies.push(new Barbarian(this, 4200 + i * 30, 190 + Math.random() * 150));
    }

    for (let i = 0; i < 5; i++) {
      this.enemies.push(new Knight(this, 4333 + i * 50, 190 + Math.random() * 150));
    }

    for (let i = 0; i < 4; i++) {
      this.enemies.push(new Greek(this, 4100 + i * 30, 190 + Math.random() * 150));
      this.enemies.push(new Knight(this, 4600 + i * 30, 190 + Math.random() * 150));
    }
  }

  drawGame() {
    this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    this.bg.draw();
    this.castle.draw();
    this.context.font = "bold 20px Times New Roman";
    this.context.fillStyle = "White";
    this.context.fillText(`Wave: ${this.wave}`, 490, 20);
    this.resource.draw();

    if (this.csm.selected) {
      this.csm.drawSlots();
    }
  }

  drawPreGame() {
    this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    this.bg.drawPreGame();
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
    this.context.drawImage(this.restart_btn_img, 400, 280, 220, 80);
  }

  pause() {
    console.log("pausou");
    this.state = "paused";
    this.context.drawImage(this.restart_btn_img, 400, 280, 220, 80);
  }

  play() {
    console.log("play");
    this.state = "playing";
    this.playing();
  }

  playing() {
    this.resource.generateResources();
    this.waveTime += 1 / 120;
    if (this.waveTime > 30 && this.wave == 1) this.wave += 1;
    if (this.waveTime > 60 && this.wave == 2) this.wave += 1;
    if (this.waveTime > 90 && this.wave == 3) this.wave += 1;
    if (this.waveTime > 120 && this.wave == 4) this.wave += 1;
    if (this.waveTime > 150 && this.wave == 5) this.wave += 1;

    console.log(this.waveTime);

    this.drawGame();
    for (let unit of this.heros) {
      unit.update();
    }

    this.enemies = this.enemies.filter((enemy) => enemy.isAlive);

    for (let unit of this.enemies) {
      unit.update();
    }

    if (this.castle.health <= 0) {
      this.castle.health = 0;
      console.log("game over");
      this.state = "game over";
    }
  }

  restart() {
    this.heros = [];
    this.enemies = [];
    this.wave = 1;
    this.waveTime = 0;
    this.state = "playing";
    this.createWave1();
    this.castle.reset();
    this.resource.reset();
    this.csm.reset();
  }

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

      if (this.isButtonPressed(event, this.restart_btn) && (this.state === "paused" || this.state === "game over"))
        this.restart();

      if (this.isButtonPressed(event, this.addArcher_btn) && this.resource.food >= 6 && this.resource.wood >= 2) {
        this.csm.selected = "Archer";
      }

      if (this.csm.selected) {
        const availableSlot = this.csm.slots.filter((slot) => slot.isEmpty);
        for (let slot of availableSlot) {
          if (this.isButtonPressed(event, slot)) {
            switch (this.csm.selected) {
              case "Archer":
                if (this.resource.food >= 6 && this.resource.wood >= 2) {
                  let newUnit;
                  newUnit = new Archer(this, slot.x, slot.y);
                  const indexToRemove = this.heros.findIndex(
                    (hero, index, arr) => hero.x === slot.x && hero.y === slot.y
                  );
                  console.log(indexToRemove);
                  if (indexToRemove >= 0) {
                    this.heros.splice(indexToRemove, 1, newUnit);
                  } else {
                    this.heros.push(newUnit);
                  }
                } else {
                  this.csm.selected = "";
                }
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
