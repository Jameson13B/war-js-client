import Dealer from "../helpers/dealer";
import Movements from "../helpers/movements";
import Text from "../helpers/text";
import Websockets from "../helpers/websockets";
import Zone from "../helpers/zone";

export default class Game extends Phaser.Scene {
  constructor() {
    super({
      key: "Game",
    });
  }

  preload() {
    this.load.image("green-back", "src/assets/green_back.png");
    this.load.image("yellow-back", "src/assets/yellow_back.png");
  }

  create() {
    let self = this;
    this.isPlayerA = false;
    this.playersCards = [];
    this.opponentCount = 26;
    this.playerCard;
    this.opponentCard;

    // Websockets
    this.websocket = new Websockets(this);

    // Display Text/Buttton
    this.text = new Text(this);

    // Deal Cards
    this.dealer = new Dealer(this);

    // Dropzone
    this.opponentZone = this.add.rectangle(145, 175, 175, 235);
    this.opponentOutline = this.opponentZone.setStrokeStyle(4, 0xff69b4);
    this.playerZone = new Zone(this, "B");
    this.playerDropZone = this.playerZone.renderZone();
    this.playerOutline = this.playerZone.renderOutline(this.playerDropZone);

    // Movements
    this.movements = new Movements(this);
  }

  update() {}
}
