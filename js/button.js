class Button {
  constructor(game, x, y, w, h) {
    this.game = game;
    this.context = game.context;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    this.context.save();

    this.context.fillStyle = "rgba(111,111,111,0.5)";
    this.context.fillRect(this.x, this.y, this.w, this.h);
    this.context.restore();
  }
}
