import Card from "../helpers/card";
import Dealer from "../helpers/dealer";
import Zone from "../helpers/zone";
import io from "socket.io-client";

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
    this.opponentCard;

    // Websockets
    this.socket = io("http://localhost:3000");
    this.socket.on("connect", function () {
      console.log("Connected!");
    });
    this.socket.on("isPlayerA", function () {
      self.isPlayerA = true;
    });
    this.socket.on("dealCards", function () {
      self.dealer.dealCards();
      self.playerCount.setText("Cards: 26");
      self.opponentCount.setText("Cards: 26");
      self.dealText.disableInteractive();
    });

    // Display Text/Buttton
    this.dealText = this.add
      .text(140, 20, ["DEAL CARDS"])
      .setFontSize(18)
      .setFontFamily("Trebuchet MS")
      .setColor("#00ffff")
      .setInteractive();
    this.dealText.on("pointerdown", function () {
      self.socket.emit("dealCards");
    });
    this.dealText.on("pointerover", function () {
      self.dealText.setColor("#ff69b4");
    });
    this.dealText.on("pointerout", function () {
      self.dealText.setColor("#00ffff");
    });
    this.playerCount = this.add
      .text(250, 425, "Cards: 0")
      .setFontSize(25)
      .setFontFamily("Trebuchet MS")
      .setColor("lightgreen");
    this.opponentCount = this.add
      .text(250, 170, "Cards: 0")
      .setFontSize(25)
      .setFontFamily("Trebuchet MS")
      .setColor("yellow");

    // Deal Cards
    this.dealer = new Dealer(this);

    // Dropzone
    this.opponentZone = this.add.rectangle(145, 175, 175, 235);
    this.opponentOutline = this.opponentZone.setStrokeStyle(4, 0xffff00);
    this.playerZone = new Zone(this, "B");
    this.playerDropZone = this.playerZone.renderZone();
    this.playerOutline = this.playerZone.renderOutline(this.playerDropZone);

    // Movements
    this.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    this.input.on("dragstart", function (pointer, gameObject) {
      gameObject.setTint(0xff69b4);
      self.children.bringToTop(gameObject);
    });
    this.input.on("dragend", function (pointer, gameObject, dropped) {
      gameObject.setTint();
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    });
    this.input.on("drop", function (pointer, gameObject, dropZone) {
      dropZone.data.list.cards++;
      gameObject.x = dropZone.x;
      gameObject.y = dropZone.y;
      gameObject.disableInteractive();
    });
  }

  update() {}
}
