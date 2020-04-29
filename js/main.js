const $canvas = document.getElementById("canvas");

window.onload = () => {
  const game = new Game($canvas);

  function gameStateLoop() {
    switch (game.state) {
      case "playing":
        game.playing();
        break;
      case "pre game":
        game.drawPreGame();
        break;
      case "game over":
        game.drawGameOver();
    }

    setTimeout(() => {
      gameStateLoop();
    }, 1000 / 120);
  }

  gameStateLoop();
};
