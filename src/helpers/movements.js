export default class Movements {
  constructor(scene) {
    scene.input.on("drag", function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });
    scene.input.on("dragstart", function (pointer, gameObject) {
      gameObject.setTint(0xff69b4);
      scene.children.bringToTop(gameObject);
    });
    scene.input.on("dragend", function (pointer, gameObject, dropped) {
      gameObject.setTint();
      if (!dropped) {
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    });
    scene.input.on("drop", function (pointer, gameObject, dropZone) {
      const code = gameObject.data.list.code;

      gameObject.x = dropZone.x;
      gameObject.y = dropZone.y;
      gameObject.disableInteractive();
      // Remove card from players hand and update count
      scene.playersCards = scene.playersCards.filter((card) => card !== code);
      scene.playerScore.setText([
        "Cards: ",
        scene.playersCards.length.toString(),
      ]);
      scene.playerCard = gameObject;
      scene.socket.emit("cardPlayed", gameObject, code, scene.isPlayerA);
    });
  }
}
