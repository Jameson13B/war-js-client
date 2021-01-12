export default class Card {
  constructor(scene, code) {
    this.render = (x, y, sprite) => {
      let card = scene.add
        .image(x, y, sprite)
        .setScale(0.2, 0.2)
        .setData("code", code)
        .setInteractive();
      scene.input.setDraggable(card);
      return card;
    };
    this.code = code;
  }
}
