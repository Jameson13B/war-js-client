export class Instructions extends Phaser.Scene {
  constructor() {
    super({
      key: "Instructions",
    });
  }

  preload() {}

  create() {
    this.header1 = this.add.text(75, 75, "THE DEAL");
    this.paragraph1 = this.add.text(
      75,
      90,
      "The deck is divided evenly, with each player receiving 26 cards, face down. Stack of cards are placed face down in front of each player."
    );
    this.header2 = this.add.text(75, 105, "THE PLAY");
    this.paragraph2 = this.add.text(
      75,
      120,
      "Each player turns up a card at the same time and the player with the higher card takes both cards and puts them, face down, on the bottom of his stack."
    );
    this.paragraph2 = this.add.text(
      75,
      135,
      "If the cards are the same rank, it is War. Each player turns up two card face down and one card face up. The player with the higher cards takes both piles (8 cards). If the turned-up cards are again the same rank, each player places another two card face down and turns another card face up. The player with the higher card takes all 14 cards, and so on."
    );
    this.header3 = this.add.text(75, 150, "THE WIN");
    this.paragraph3 = this.add.text(
      75,
      165,
      "The game ends when one player has won all the cards."
    );
    this.closeInstructions = this.add.text(75, 165, "CLOSE").setInteractive();
  }

  update() {}
}
