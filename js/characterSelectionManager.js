class CharacterSelectionManager {
  constructor(game) {
    this.game = game;
    this.context = game.context;
    this.selected = "";
    this.slotAlpha = 0;
    this.slots = [
      { id: 0, isEmpty: true, x: 415, y: 260, w: 50, h: 50 },
      { id: 1, isEmpty: true, x: 338, y: 260, w: 50, h: 50 },
      { id: 2, isEmpty: true, x: 261, y: 260, w: 50, h: 50 },
      { id: 3, isEmpty: true, x: 415, y: 190, w: 50, h: 50 },
      { id: 4, isEmpty: true, x: 338, y: 190, w: 50, h: 50 },
      { id: 5, isEmpty: true, x: 261, y: 190, w: 50, h: 50 },
      { id: 6, isEmpty: true, x: 415, y: 120, w: 50, h: 50 },
      { id: 7, isEmpty: true, x: 338, y: 120, w: 50, h: 50 },
      { id: 8, isEmpty: true, x: 261, y: 120, w: 50, h: 50 },
    ];
  }

  drawSlots() {
    this.context.save();
    this.slotAlpha = this.slotAlpha % 4;
    this.context.fillStyle = `rgba(0,0,0,${0.1 + this.slotAlpha / 10})`;
    for (let slot of this.slots) {
      if (slot.isEmpty) {
        this.context.fillRect(slot.x, slot.y, 50, 50);
      }
    }
    this.slotAlpha += 0.5;
    this.context.restore();
  }
}
