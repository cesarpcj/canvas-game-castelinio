class Character {
  constructor(game, x, y, w, h, health) {
    this.game = game;
    this.context = game.context;
    this.isAlive = true;
    this.canAttack = true;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.health = health;
  }

  draw() {
    this.context.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  receiveDamage(damage) {
    this.health -= damage;
    //console.log("health is: ", this.health);
  }
}
