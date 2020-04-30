class Arrow extends Projetil {
  constructor(game, x, y, target) {
    super(game, x, y, 5, 5);
    this.target = target;
    this.w = 30;
    this.h = 9;
    this.acc = 0.01;
    this.strength = 5;
    this.hit = false;
    this.distance = this.target.x - this.x;
    this.posY = (this.target.y + 30 - this.y) / 150;
    this.img = new Image();
    this.img.src = "./images/Arrow.png";
    this.img.onload = () => {
      this.draw();
    };
  }

  draw() {
    let aux2;
    if (this.distance < 40) {
      aux2 = 4;
      this.x += 1.2;
    } else if (this.distance < 120) {
      aux2 = 1;
      this.x += 2.5;
    } else if (this.distance < 300) {
      aux2 = 0.5;
      this.x += 3.5;
    } else if (this.distance < 600) {
      aux2 = 0.1;
      this.x += 3.5;
    } else {
      aux2 = 0.3;
      this.x += 3.5;
    }
    const aux = (5 - this.distance / 150) * 0.6 + aux2; //5.5

    this.y = this.y + this.posY * aux; //4]
    //console.log(this.distance);
    /*
    console.log(this.aux);
    

    this.angle += 0.3;

    if (this.isGoingUp) {
      //console.log(this.x, " menor q ", this.middleWayX);
      //console.log(this.y, this.topY);
      if (this.x < this.middleWayX) {
        //console.log("y mais ");
        //this.angularSpeed -= this.acc;
        this.angularSpeed -= this.acc - this.aux * 3;
        if (this.angularSpeed < 0) {
          this.angularSpeed = 0;
          this.isGoingUp = false;
        }
        //console.log(this.angularSpeed);
        this.y -= this.angularSpeed;
      } else {
        this.angularSpeed = 0.1;
        this.isGoingUp = false;
      }
    } else {
      //console.log(this.angularSpeed);
      this.angularSpeed += this.acc;
      //this.angularSpeed += this.acc + this.aux * 2;
      this.y += this.angularSpeed;
    }
    */

    this.context.save();

    this.context.translate(this.x, this.y);
    this.context.rotate(this.angle * (Math.PI / 180));
    this.context.drawImage(this.img, 0, 0, this.w, this.h);

    this.context.restore();
  }

  OnCollision() {
    if (this.isCollided(this.target, this)) {
      this.target.receiveDamage(this.strength);
      this.hit = true;
    }
  }

  isCollided(a, b) {
    if (a.x + 30 < b.x + b.w && a.x + a.w > b.x + b.w && a.y < b.y + b.h && a.y + a.h > b.y) {
      return true;
    }
  }
}
