import Card from "./card";

export default class Dealer {
  constructor(scene) {
    this.dealCards = (cards) => {
      let playerSprite = scene.isPlayerA ? "green-back" : "yellow-back";

      for (let i = 0; i < cards.length; i++) {
        let playerCard = new Card(scene, cards[i]);
        playerCard.render(130 + i * 5, 675, playerSprite);
      }
    };
  }
}
