class Character {
  constructor(game, x, y, w, h) {
    this.game = game;
    this.context = game.context;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    this.context.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}
