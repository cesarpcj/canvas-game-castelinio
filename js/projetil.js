class Projetil {
  constructor(game, x, y, speed, str) {
    this.game = game;
    this.context = game.context;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.strength = str;
  }
}
