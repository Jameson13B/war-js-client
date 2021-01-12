export default class Text {
  constructor(scene) {
    scene.dealText = scene.add
      .text(230, 20, ["DEAL CARDS"])
      .setFontSize(15)
      .setFontFamily("Trebuchet MS")
      .setColor("#00ffff")
      .setInteractive();
    scene.dealText.on("pointerdown", function () {
      scene.socket.emit("dealCards");
    });
    scene.dealText.on("pointerover", function () {
      scene.dealText.setColor("#ff69b4");
    });
    scene.dealText.on("pointerout", function () {
      scene.dealText.setColor("#00ffff");
    });
    scene.logo = scene.add
      .text(20, 15, "War.js")
      .setColor("lime")
      .setFontSize(25);
    scene.readyIndicator = scene.add
      .text(320, 20, "WAIT")
      .setColor("red")
      .setFontSize(15)
      .setFontFamily("Trebuchet MS");
    scene.playerScore = scene.add
      .text(270, 425, ["Cards", "0"])
      .setFontSize(25)
      .setFontFamily("Trebuchet MS")
      .setColor("#00ffff")
      .setAlign("center");
    scene.opponentScore = scene.add
      .text(270, 170, ["Cards", "0"])
      .setFontSize(25)
      .setFontFamily("Trebuchet MS")
      .setColor("#ff69b4")
      .setAlign("center");
  }
}
