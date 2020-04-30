class Archer extends Character {
  constructor(game, x, y) {
    super(game, x, y, 50, 50, 20);

    this.speed = 2;
    this.strength = 5;
    this.arrow = "";
    this.target = "";
    this.cost = { food: 6, stone: 0, wood: 2 };

    this.img = new Image();
    this.img.src = "./images/archer.png";
    this.game.resource.food -= this.cost.food; //remove
    this.game.resource.wood -= this.cost.wood;
    this.img.onload = () => {
      this.draw();
    };
  }

  attack() {
    this.arrow = new Arrow(this.game, this.x + 30, this.y + 10, this.target);
    this.canAttack = false;

    setTimeout(() => {
      this.target = "";
      this.canAttack = true;
    }, 3000);
  }

  searchTarget() {
    const sortedEnemies = this.game.enemies.sort((a, b) => a.x - b.x);
    this.target = sortedEnemies[0];
  }

  update() {
    if (this.canAttack) {
      this.searchTarget();
      if (this.target) this.attack();
    }

    if (this.arrow && !this.arrow.hit) {
      this.arrow.OnCollision();
      this.arrow.draw();
    }

    this.draw();
  }
}
