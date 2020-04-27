class Castle {
  constructor(game) {
    this.game = game;
    this.context = game.context;

    this.level = 0;
    this.images = [
      "./images/castle/Castle_00.png",
      "./images/castle/Castle_01.png",
      "./images/castle/Castle_02.png",
      "./images/castle/Castle_03.png",
      "./images/castle/Castle_04.png",
      "./images/castle/Castle_05.png",
      "./images/castle/Castle_06.png",
    ];
    this.img = new Image();
    this.img.src = this.images[0];
    this.img.onload = () => {
      this.draw();
    };
  }

  draw() {
    this.context.drawImage(this.img, 250, 70, 225, 315);
  }

  upgrade() {
    this.level += 1;
    this.img.src = this.images[this.level];
  }
}
