import Card from "./card";

export default class Dealer {
  constructor(scene) {
    this.dealCards = () => {
      let playerSprite = scene.isPlayerA ? "green-back" : "yellow-back";

      for (let i = 0; i < 26; i++) {
        let playerCard = new Card(scene);
        playerCard.render(130 + i * 5, 675, playerSprite);
      }
    };
  }
}
