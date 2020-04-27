const $canvas = document.getElementById("canvas");

window.onload = () => {
  const game = new Game($canvas);

  game.playing();
};
