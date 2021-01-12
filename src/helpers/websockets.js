import Card from "../helpers/card";
import io from "socket.io-client";

export default class Websockets {
  constructor(scene) {
    scene.socket = io("http://localhost:3000");

    scene.socket.on("connect", function () {
      console.log("Connected!");
    });

    scene.socket.on("isPlayerA", function () {
      scene.isPlayerA = true;
    });

    scene.socket.on("dealCards", function ({ cardsA, cardsB }) {
      scene.playersCards = scene.isPlayerA ? cardsA : cardsB;
      scene.dealer.dealCards(scene.isPlayerA ? cardsA : cardsB);
      scene.playerScore.setText(["Cards", "26"]);
      scene.opponentScore.setText(["Cards", "26"]);
      scene.dealText.disableInteractive();
    });

    scene.socket.on("twoPlayersIn", function () {
      scene.readyIndicator.setText("GO").setColor("lightgreen");
      alert("Both Players Ready!");
    });

    scene.socket.on("twoPlayersReq", function () {
      alert("Two players required. Wait for second player.");
    });

    scene.socket.on("cardPlayed", function (gameObject, code, isPlayerA) {
      if (isPlayerA !== scene.isPlayerA) {
        let sprite = gameObject.textureKey;
        scene.opponentCount--;
        scene.opponentScore.setText(["Count", scene.opponentCount]);
        let card = new Card(scene, code);
        scene.opponentCard = card
          .render(scene.opponentZone.x, scene.opponentZone.y, sprite)
          .disableInteractive();
      }

      if (
        scene.opponentCard.data.list.code &&
        scene.playerCard.data.list &&
        scene.playerCard.data.list.code
      ) {
        const oppCode = scene.opponentCard.data.list.code;
        const playerCode = scene.playerCard.data.list.code;

        // Dynamically load card image for Opponent
        if (scene.textures.exists(oppCode)) {
          // texture already exists so just create a card and return it
          scene.opponentCard.setTexture(oppCode);
        } else {
          scene.load.image(oppCode, `src/assets/cards/${oppCode}.png`);

          scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
            // texture loaded so use instead of the placeholder
            scene.opponentCard.setTexture(oppCode);
          });
          scene.load.start();
        }
        // Dynamically load card image for Player
        if (scene.textures.exists(playerCode)) {
          scene.playerCard.setTexture(playerCode);
        } else {
          scene.load.image(playerCode, `src/assets/cards/${playerCode}.png`);

          scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
            scene.playerCard.setTexture(playerCode);
          });
          scene.load.start();
        }

        // TODO: Determine winner and process follow up operations
      }
    });

    scene.socket.on("playerAbandoned", function (msg) {
      scene.readyIndicator.setText("WAIT").setColor("red");
      alert("Player Abandoned. Starting new game, you are Player A.");
      scene.playersCards = [];
      scene.opponentCount = 26;
      scene.playerCard;
      scene.opponentCard;
      scene.opponentScore.setText(["Count", "0"]);
      scene.playerScore.setText(["Count", "0"]);
    });
  }
}
