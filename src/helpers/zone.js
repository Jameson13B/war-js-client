export default class Zone {
  constructor(scene, zone) {
    this.renderZone = () => {
      let dropZone = scene.add
        .zone(145, 425, 175, 235)
        .setRectangleDropZone(175, 250);
      dropZone.setData({ cards: 0 });
      return dropZone;
    };
    this.renderOutline = (dropZone) => {
      let dropZoneOutline = scene.add.graphics();
      dropZoneOutline.lineStyle(4, 0x00ffff);
      dropZoneOutline.strokeRect(
        dropZone.x - dropZone.input.hitArea.width / 2,
        dropZone.y - dropZone.input.hitArea.height / 2,
        dropZone.input.hitArea.width,
        dropZone.input.hitArea.height
      );
    };
  }
}
