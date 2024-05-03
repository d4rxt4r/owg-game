const { Assets, Sprite } = PIXI;

const JOY_W = 200;
const JOY_H = 200;

/**
 * @typedef {Object} StickData
 * @property {string} cardinalDirection
 * @property {string} x
 * @property {string} y
 * @property {number} xPosition
 * @property {number} yPosition
 */

class Player {
   #sprite;
   // movement
   #acc = { x: 0, y: 0 };
   #speed = 0.05;

   constructor() {}

   async init(app) {
      const texture = await Assets.load('../tex/chel.jpg');
      const sprite = new Sprite(texture);

      sprite.setSize(64, 64);
      sprite.anchor.set(0.5);

      sprite.x = app.screen.width / 2;
      sprite.y = app.screen.height / 2;

      app.stage.addChild(sprite);

      app.ticker.add((time) => {
         this.#sprite.x += this.#acc.x * time.deltaTime;
         this.#sprite.y += this.#acc.y * time.deltaTime;
      });

      this.#sprite = sprite;
   }

   /**
    * @param {StickData} stickData
    */
   moveHandler = (stickData) => {
      this.#acc.x = this.#speed * (stickData.xPosition - JOY_W / 2);
      this.#acc.y = this.#speed * (stickData.yPosition - JOY_H / 2);
   };
}

export default Player;
